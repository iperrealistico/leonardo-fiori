#!/usr/bin/env bash
set -euo pipefail

export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export PWCLI="$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh"
export PLAYWRIGHT_CLI_SESSION="${PLAYWRIGHT_CLI_SESSION:-lf9}"

BASE_URL="${1:-http://127.0.0.1:3001}"
OUT_ROOT="output/playwright/phase9-local-qa"
SCREENSHOT_ROOT="$OUT_ROOT/screenshots"
STATE_ROOT="$OUT_ROOT/states"
BEHAVIOR_ROOT="$OUT_ROOT/behaviors"

rm -rf "$OUT_ROOT"
mkdir -p "$SCREENSHOT_ROOT" "$STATE_ROOT" "$BEHAVIOR_ROOT"

pw() {
  "$PWCLI" "$@"
}

pw_raw() {
  "$PWCLI" --raw "$@"
}

wait_until_ready() {
  local ready="false"

  for _ in $(seq 1 60); do
    ready="$(pw_raw eval "(() => {
      const main = document.querySelector('main');
      const primaryImage = document.querySelector('.site-gallery-photo');
      return document.readyState === 'complete' && !!main && (!primaryImage || primaryImage.complete);
    })()")"

    if [[ "$ready" == "true" ]]; then
      sleep 0.5
      return 0
    fi

    sleep 0.25
  done

  return 1
}

capture_state() {
  local viewport_name="$1"
  local slug="$2"
  local state_file="$3"

  pw_raw eval "(() => {
    const textOf = (node) => node?.textContent?.replace(/\s+/g, ' ').trim() || null;
    const visible = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return false;
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.width >= 0 && rect.height >= 0;
    };
    const focusables = Array.from(document.querySelectorAll('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex=\"-1\"])'))
      .filter((el) => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      })
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        text: textOf(el),
        ariaLabel: el.getAttribute('aria-label'),
        href: el.getAttribute('href'),
        className: el.getAttribute('class'),
      }));

    const currentImage = document.querySelector('.site-gallery-photo');
    const mobileNav = document.querySelector('.site-mobile-nav');
    const headings = Array.from(document.querySelectorAll('main h1, main h2, main h3')).map((node) => ({
      tag: node.tagName.toLowerCase(),
      text: textOf(node),
    }));

    return {
      viewport: '$viewport_name',
      slug: '$slug',
      url: window.location.href,
      pathname: window.location.pathname,
      lang: document.documentElement.lang || null,
      documentTitle: document.title,
      canonical: document.querySelector('link[rel=\"canonical\"]')?.href || null,
      metaDescription: document.querySelector('meta[name=\"description\"]')?.content || null,
      openGraphImage: document.querySelector('meta[property=\"og:image\"]')?.content || null,
      siteTitleText: textOf(document.querySelector('.site-title')),
      desktopNavVisible: visible('.site-navigation'),
      hamburgerVisible: visible('.site-hamburger'),
      mobileMenuOpen: mobileNav?.open ?? false,
      mobileMenuVisible: visible('.site-mobile-menu'),
      activeDesktopNavItems: Array.from(document.querySelectorAll('.site-navigation .site-nav-item[aria-current=\"page\"]')).map(textOf),
      activeMobileNavItems: Array.from(document.querySelectorAll('.site-mobile-menu .site-nav-item[aria-current=\"page\"]')).map(textOf),
      galleryExists: !!document.querySelector('#gallery, .site-gallery-container'),
      desktopArrowsVisible: visible('.site-gallery-arrow--prev') || visible('.site-gallery-arrow--next'),
      mobileControlsVisible: visible('.site-gallery-mobile-controls'),
      currentImageSrc: currentImage?.getAttribute('src') || null,
      currentImageAlt: currentImage?.getAttribute('alt') || null,
      bodyOverflow: window.getComputedStyle(document.body).overflow,
      headings,
      focusables,
      mainTextPreview: (document.querySelector('main')?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 400),
      jsonLdCount: document.querySelectorAll('script[type=\"application/ld+json\"]').length,
    };
  })()" > "$state_file"
}

capture_screenshot() {
  local dest="$1"
  local raw_output latest_path

  raw_output="$(pw_raw screenshot)"
  latest_path="$(printf '%s\n' "$raw_output" | sed -n 's/.*(\(.*\.png\)).*/\1/p')"
  cp "$latest_path" "$dest"
}

capture_page() {
  local viewport_name="$1"
  local width="$2"
  local height="$3"
  local slug="$4"
  local path="$5"

  local viewport_dir="$SCREENSHOT_ROOT/$viewport_name"
  local state_dir="$STATE_ROOT/$viewport_name"
  mkdir -p "$viewport_dir" "$state_dir"

  pw resize "$width" "$height" >/dev/null
  pw goto "${BASE_URL}${path}" >/dev/null
  wait_until_ready

  capture_state "$viewport_name" "$slug" "$state_dir/${slug}.json"
  capture_screenshot "$viewport_dir/${slug}.png"
}

pw open "$BASE_URL" >/dev/null

capture_page "desktop-1440x900" 1440 900 "home" "/"
capture_page "desktop-1440x900" 1440 900 "radici" "/radici"
capture_page "desktop-1440x900" 1440 900 "emulsione" "/emulsione"
capture_page "desktop-1440x900" 1440 900 "about" "/about"

pw goto "${BASE_URL}/radici" >/dev/null
pw resize 1440 900 >/dev/null
wait_until_ready
pw press ArrowRight >/dev/null
sleep 0.4
capture_state "desktop-1440x900" "radici__after-arrow-right" "$STATE_ROOT/desktop-1440x900/radici__after-arrow-right.json"
capture_screenshot "$SCREENSHOT_ROOT/desktop-1440x900/radici__after-arrow-right.png"
pw_raw eval "(() => ({
  pathname: window.location.pathname,
  currentImageSrc: document.querySelector('.site-gallery-photo')?.getAttribute('src') || null,
  currentImageAlt: document.querySelector('.site-gallery-photo')?.getAttribute('alt') || null
}))()" > "$BEHAVIOR_ROOT/desktop-keyboard-after-arrow-right.json"

pw goto "${BASE_URL}/emulsione" >/dev/null
pw resize 1440 900 >/dev/null
wait_until_ready
pw snapshot >/dev/null
pw click e23 >/dev/null
sleep 0.4
pw_raw eval "(() => ({
  pathname: window.location.pathname,
  currentImageSrc: document.querySelector('.site-gallery-photo')?.getAttribute('src') || null,
  currentImageAlt: document.querySelector('.site-gallery-photo')?.getAttribute('alt') || null
}))()" > "$BEHAVIOR_ROOT/desktop-next-arrow-click.json"
capture_state "desktop-1440x900" "emulsione__after-next-click" "$STATE_ROOT/desktop-1440x900/emulsione__after-next-click.json"
capture_screenshot "$SCREENSHOT_ROOT/desktop-1440x900/emulsione__after-next-click.png"

capture_page "tablet-1024x768" 1024 768 "home" "/"
capture_page "tablet-1024x768" 1024 768 "radici" "/radici"
capture_page "tablet-1024x768" 1024 768 "emulsione" "/emulsione"
capture_page "tablet-1024x768" 1024 768 "about" "/about"

capture_page "breakpoint-768x1024" 768 1024 "home" "/"
capture_page "breakpoint-768x1024" 768 1024 "radici" "/radici"
capture_page "breakpoint-768x1024" 768 1024 "emulsione" "/emulsione"
capture_page "breakpoint-768x1024" 768 1024 "about" "/about"

capture_page "mobile-390x844" 390 844 "home" "/"
pw snapshot >/dev/null
pw click e6 >/dev/null
sleep 0.2
pw_raw eval "(() => ({
  mobileMenuOpen: document.querySelector('.site-mobile-nav')?.open ?? false,
  bodyOverflow: window.getComputedStyle(document.body).overflow
}))()" > "$BEHAVIOR_ROOT/mobile-menu-open.json"
capture_state "mobile-390x844" "home__menu-open" "$STATE_ROOT/mobile-390x844/home__menu-open.json"
capture_screenshot "$SCREENSHOT_ROOT/mobile-390x844/home__menu-open.png"

capture_page "mobile-390x844" 390 844 "radici" "/radici"
capture_page "mobile-390x844" 390 844 "emulsione" "/emulsione"
capture_page "mobile-390x844" 390 844 "about" "/about"

pw resize 1440 900 >/dev/null
pw goto "${BASE_URL}/" >/dev/null
wait_until_ready
pw snapshot >/dev/null
pw click e7 >/dev/null
sleep 0.2
pw_raw eval "(() => ({
  pathname: window.location.pathname,
  activeDesktopNavItems: Array.from(document.querySelectorAll('.site-navigation .site-nav-item[aria-current=\"page\"]')).map((node) => node.textContent.trim())
}))()" > "$BEHAVIOR_ROOT/desktop-nav-click-radici.json"
pw goto "${BASE_URL}/radici" >/dev/null
wait_until_ready
pw snapshot >/dev/null
pw click e10 >/dev/null
sleep 0.2
pw_raw eval "({ pathname: window.location.pathname })" > "$BEHAVIOR_ROOT/site-title-home.json"

pw goto "${BASE_URL}/about" >/dev/null
wait_until_ready
pw go-back >/dev/null
wait_until_ready
pw_raw eval "({ pathname: window.location.pathname, url: window.location.href })" > "$BEHAVIOR_ROOT/history-back.json"
pw go-forward >/dev/null
wait_until_ready
pw_raw eval "({ pathname: window.location.pathname, url: window.location.href })" > "$BEHAVIOR_ROOT/history-forward.json"

pw resize 390 844 >/dev/null
pw goto "${BASE_URL}/radici" >/dev/null
wait_until_ready
pw_raw eval "(() => {
  const gallery = document.getElementById('gallery');
  if (!gallery || typeof Touch === 'undefined' || typeof TouchEvent === 'undefined') {
    return 'unsupported';
  }

  const makeTouch = (clientX) => new Touch({
    identifier: 1,
    target: gallery,
    clientX,
    clientY: 200,
    pageX: clientX,
    pageY: 200,
    screenX: clientX,
    screenY: 200,
    radiusX: 2,
    radiusY: 2,
    rotationAngle: 0,
    force: 1
  });

  gallery.dispatchEvent(new TouchEvent('touchstart', {
    bubbles: true,
    cancelable: true,
    touches: [makeTouch(300)],
    targetTouches: [makeTouch(300)],
    changedTouches: [makeTouch(300)]
  }));
  gallery.dispatchEvent(new TouchEvent('touchmove', {
    bubbles: true,
    cancelable: true,
    touches: [makeTouch(200)],
    targetTouches: [makeTouch(200)],
    changedTouches: [makeTouch(200)]
  }));
  gallery.dispatchEvent(new TouchEvent('touchend', {
    bubbles: true,
    cancelable: true,
    touches: [],
    targetTouches: [],
    changedTouches: [makeTouch(200)]
  }));

  return 'swiped';
})()" >/dev/null
sleep 0.4
pw_raw eval "(() => ({
  supported: typeof Touch !== 'undefined' && typeof TouchEvent !== 'undefined',
  after: document.querySelector('.site-gallery-photo')?.getAttribute('src') || null
}))()" > "$BEHAVIOR_ROOT/touch-handler-advance.json"

printf '%s\n' "$OUT_ROOT"
