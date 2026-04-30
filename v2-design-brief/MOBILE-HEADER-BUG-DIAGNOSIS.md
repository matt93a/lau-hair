# Mobile Header Bug — Diagnosis

## Symptom
On mobile (<620px wide), the gold "WE'RE HIRING" recruiting banner overlaps the black `<header>` and cuts off the Lau logo.

## Root cause

In CSS:

```css
.recruiting-banner {
  position: fixed; top: 0; z-index: 1001;
}

.recruiting-banner__inner {
  flex-direction: row;          /* desktop default */
  padding: 8px 2rem;
}

/* Mobile breakpoint */
@media (max-width: 620px) {
  .recruiting-banner__inner {
    flex-direction: column;     /* stacks vertically */
    padding: 6px 1rem;
  }
}

.has-recruiting-banner .site-header {
  top: 34px;                    /* HARDCODED — no mobile media query */
}
```

**The bug:** The banner stacks vertically on mobile and grows from 35px tall (desktop) to ~78–90px tall (mobile). But `.site-header` is positioned at `top: 34px` with no mobile override, so the header overlaps the banner by ~44–56px — pushing the logo behind the banner.

There's also a related rule `.has-recruiting-banner .page-top` (truncated in inspection) that adds top padding to push page content below the fixed header — that probably needs the same mobile fix or content will sit at wrong offset.

## Fix (CSS-only)

```css
@media (max-width: 620px) {
  .has-recruiting-banner .site-header { top: 78px; }
  .has-recruiting-banner .page-top { padding-top: 148px; }   /* 78px banner + 70px header */
}
```

**Better:** measure the banner height in JS on resize and set a CSS variable, so the offset adapts to whatever banner copy is used:

```js
function setBannerHeight() {
  const b = document.querySelector('.recruiting-banner');
  if (b) document.documentElement.style.setProperty('--banner-h', b.offsetHeight + 'px');
}
setBannerHeight();
window.addEventListener('resize', setBannerHeight);
```

```css
.has-recruiting-banner .site-header { top: var(--banner-h, 34px); }
.has-recruiting-banner .page-top { padding-top: calc(var(--banner-h, 34px) + 70px); }
```

The dynamic version handles future copy changes (e.g. "Celebrating 30 years — recruiting stylists" might wrap differently).

## Implementation note for v2

Pick the JS approach. Robust to:
- Future banner copy changes (30th anniversary messaging)
- Multiple breakpoints
- Banner being toggled on/off
