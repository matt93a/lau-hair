/* Shared chrome: ribbon, header, mobile menu, footer.
   Used by every page. Reads tweak state from window.LAU_TWEAKS. */

(function () {
  const T = (window.LAU_TWEAKS = window.LAU_TWEAKS || {});
  const defaults = {
    ribbonMode: "anniversary", // anniversary | hiring | promo
    showSocialMobile: false,
    cream: false,
  };
  Object.keys(defaults).forEach(k => { if (T[k] === undefined) T[k] = defaults[k]; });

  const RIBBON_MESSAGES = {
    anniversary: [
      "Celebrating 30 years of Lau Hairdressing — 1996 → 2026",
      "We're hiring experienced stylists",
      "30 years. Same passion. Same craft.",
    ],
    hiring: [
      "We're hiring — experienced stylists wanted",
      "Join the Lau team — view positions",
      "Career opportunities in Maidstone",
    ],
    promo: [
      "New client offer — 20% off your first colour service",
      "Book online 24/7",
      "Gift vouchers available in salon",
    ],
  };

  const NAV = [
    { href: "index.html", label: "Salon", page: "home" },
    { href: "our-work.html", label: "Our Work", page: "work" },
    { href: "reviews.html", label: "Reviews", page: "reviews" },
    { href: "#", label: "Stylists" },
    { href: "#", label: "Services" },
    { href: "#", label: "Microblading" },
    { href: "#", label: "Charity" },
    { href: "#", label: "Contact" },
  ];

  function ribbonHTML(mode) {
    const msgs = RIBBON_MESSAGES[mode] || RIBBON_MESSAGES.anniversary;
    const cycle = [...msgs, ...msgs]; // double for seamless scroll
    const link = mode === "hiring"
      ? '<a href="#">View positions →</a>'
      : mode === "promo"
      ? '<a href="#">Book now →</a>'
      : '<a href="#">View positions →</a>';
    return `
      <div class="ribbon" data-mode="${mode}">
        <div class="ribbon-track">
          ${cycle.map(m => `<span>${m}<span class="dot"></span></span>`).join("")}
        </div>
      </div>`;
  }

  function headerHTML(currentPage) {
    return `
      <header class="header">
        <div class="container">
          <div class="header-left">
            <button class="header-burger" aria-label="Menu" id="lau-burger">
              <span></span><span></span><span></span>
            </button>
            <nav class="header-nav">
              <a href="index.html" class="${currentPage === 'home' ? 'active' : ''}">Salon</a>
              <a href="#">Booking</a>
              <a href="#">Stylists</a>
              <a href="#">Services</a>
              <a href="our-work.html" class="${currentPage === 'work' ? 'active' : ''}">Our Work</a>
              <a href="reviews.html" class="${currentPage === 'reviews' ? 'active' : ''}">Reviews</a>
              <a href="#">Charity</a>
              <a href="#">Contact</a>
            </nav>
          </div>
          <a class="header-logo" href="index.html" aria-label="Lau Hairdressing">
            <img src="assets/img/lau-logo-black.png" alt="Lau Hairdressing">
          </a>
          <div class="header-right">
            <div class="header-socials">
              <a href="#" aria-label="X"><img src="assets/img/social-x.png" alt=""></a>
              <a href="#" aria-label="Facebook"><img src="assets/img/social-fb.png" alt=""></a>
              <a href="#" aria-label="Instagram"><img src="assets/img/social-insta.png" alt=""></a>
            </div>
            <a class="header-phone" href="tel:01622670557">01622 670 557</a>
            <a class="btn btn-ghost btn-sm" href="#book">Book now</a>
          </div>
        </div>
      </header>

      <div class="mobile-menu" id="lau-mobile-menu" aria-hidden="true">
        <div class="mobile-menu-inner">
          <div class="mobile-menu-head">
            <img src="assets/img/lau-logo-black.png" alt="Lau" class="mm-logo">
            <button class="mm-close" id="lau-mm-close" aria-label="Close">&times;</button>
          </div>
          <nav class="mobile-menu-nav">
            <a href="index.html">Salon</a>
            <a href="#">Booking</a>
            <a href="#">Stylists</a>
            <a href="#">Services</a>
            <a href="our-work.html">Our Work</a>
            <a href="reviews.html">Reviews</a>
            <a href="#">Microblading</a>
            <a href="#">Charity</a>
            <a href="#">Contact</a>
          </nav>
          <div class="mobile-menu-foot">
            <a class="btn btn-primary" href="#book">Book now</a>
            <a class="header-phone" href="tel:01622670557">01622 670 557</a>
            <div class="header-socials">
              <a href="#" aria-label="X"><img src="assets/img/social-x.png" alt=""></a>
              <a href="#" aria-label="Facebook"><img src="assets/img/social-fb.png" alt=""></a>
              <a href="#" aria-label="Instagram"><img src="assets/img/social-insta.png" alt=""></a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="footer-logo"><img src="assets/img/lau-logo-black.png" alt="Lau"></div>
              <p style="font-size:13px; line-height:1.7;">
                <strong>Lau Salon</strong><br>
                13 Gabriel's Hill<br>
                Maidstone<br>
                Kent, ME15 6HL<br>
                United Kingdom
              </p>
              <a class="btn btn-secondary btn-sm" href="#">Find on a map</a>
            </div>
            <div>
              <h4>Salon Hours</h4>
              <dl class="footer-hours">
                <dt>Mon</dt><dd>Closed</dd>
                <dt>Tue</dt><dd>9:30am – 8pm</dd>
                <dt>Wed</dt><dd>9am – 6pm</dd>
                <dt>Thu</dt><dd>9am – 6pm</dd>
                <dt>Fri</dt><dd>9:30am – 7pm</dd>
                <dt>Sat</dt><dd>8am – 5pm</dd>
                <dt>Sun</dt><dd>Closed</dd>
              </dl>
            </div>
            <div>
              <h4>Navigation</h4>
              <ul>
                <li><a href="index.html">Salon</a></li>
                <li><a href="#">Booking</a></li>
                <li><a href="#">Stylists</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="our-work.html">Our Work</a></li>
                <li><a href="reviews.html">Reviews</a></li>
                <li><a href="#">Microblading</a></li>
                <li><a href="#">Charity</a></li>
              </ul>
            </div>
            <div>
              <h4>Salon Guidelines</h4>
              <p>To avoid deposit loss we request a 48 hr cancellation notice.</p>
              <p style="margin-top:18px;">Thanks x</p>
            </div>
            <div>
              <h4>Salon Contact</h4>
              <p><strong>01622 670 557</strong> to book</p>
              <div class="footer-socials" style="margin-top:14px;">
                <a href="#"><img src="assets/img/social-x.png" alt="X"></a>
                <a href="#"><img src="assets/img/social-fb.png" alt="FB"></a>
                <a href="#"><img src="assets/img/social-insta.png" alt="IG"></a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 Lau Hairdressing — 30 years of craft, 1996–2026</span>
            <span>Hairdresser Maidstone · Terms · Privacy & Cookies</span>
          </div>
        </div>
      </footer>
    `;
  }

  function mountChrome(currentPage) {
    const ribbonHost = document.getElementById("lau-ribbon");
    const headerHost = document.getElementById("lau-header");
    const footerHost = document.getElementById("lau-footer");
    if (ribbonHost) ribbonHost.innerHTML = ribbonHTML(T.ribbonMode);
    if (headerHost) headerHost.innerHTML = headerHTML(currentPage);
    if (footerHost) footerHost.innerHTML = footerHTML();

    if (T.cream) document.body.classList.add("theme-cream"); else document.body.classList.remove("theme-cream");
    if (T.showSocialMobile) document.body.classList.add("show-social-mobile"); else document.body.classList.remove("show-social-mobile");

    // burger
    const burger = document.getElementById("lau-burger");
    const menu = document.getElementById("lau-mobile-menu");
    const close = document.getElementById("lau-mm-close");
    if (burger && menu) {
      burger.addEventListener("click", () => menu.classList.add("is-open"));
      close && close.addEventListener("click", () => menu.classList.remove("is-open"));
      menu.addEventListener("click", e => { if (e.target === menu) menu.classList.remove("is-open"); });
    }
  }

  // expose
  window.LauChrome = {
    mount: mountChrome,
    setRibbon(mode) { T.ribbonMode = mode; const h = document.getElementById("lau-ribbon"); if (h) h.innerHTML = ribbonHTML(mode); },
    setCream(v) { T.cream = !!v; document.body.classList.toggle("theme-cream", !!v); },
    setShowSocialMobile(v) { T.showSocialMobile = !!v; document.body.classList.toggle("show-social-mobile", !!v); },
  };
})();
