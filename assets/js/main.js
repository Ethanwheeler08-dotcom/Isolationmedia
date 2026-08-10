/* =========================================================
   ISOLATION MEDIA · interactions
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero entrance ---------- */
  function heroIn() {
    document.body.classList.add("loaded");
    var hero = document.getElementById("hero");
    if (hero) hero.classList.add("in");
  }
  if (reduceMotion) heroIn();
  else setTimeout(heroIn, 120);

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sticky / hide-on-scroll nav ---------- */
  var nav = document.getElementById("nav");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      nav.classList.toggle("solid", y > 40);
      if (y > 600 && y > lastY) nav.classList.add("hide");
      else nav.classList.remove("hide");
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  function toggleMenu(force) {
    if (!menu || !burger) return;
    var open = typeof force === "boolean" ? force : !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { toggleMenu(); });
  if (menu) menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { toggleMenu(false); });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var wordEls = document.querySelectorAll(".reveal-word");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    // staggered words
    var wio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var words = e.target.querySelectorAll(".reveal-word");
        words.forEach(function (w, i) {
          setTimeout(function () { w.classList.add("in"); }, i * 45);
        });
        wio.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    document.querySelectorAll(".intro__headline").forEach(function (el) { wio.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    wordEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
    function render(v) {
      return prefix + v.toFixed(decimals) + '<span class="u">' + suffix + "</span>";
    }
    if (reduceMotion) { el.innerHTML = render(target); return; }
    var start = null, dur = 1700;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = render(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".stat__num");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- CTA title reveal ---------- */
  var cta = document.getElementById("contact");
  if (cta && "IntersectionObserver" in window && !reduceMotion) {
    var ctaIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { cta.classList.add("in"); ctaIo.unobserve(cta); } });
    }, { threshold: 0.25 });
    ctaIo.observe(cta);
  } else if (cta) { cta.classList.add("in"); }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var msg = form.message.value.trim();
      if (!name || !email || !msg) {
        if (note) note.textContent = "Fill in your name, email and what you want to be the answer for, and we'll be in touch.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (note) note.textContent = "That email doesn't look right. Mind checking it?";
        return;
      }
      // No backend yet: open the user's mail client with a prefilled message.
      var subject = encodeURIComponent("Free GEO audit request from " + name);
      var body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email +
        "\nCompany: " + (form.company.value.trim() || "Not given") +
        "\nPhone: " + (form.phone.value.trim() || "Not given") +
        "\n\nWhat they want to be the answer for:\n" + msg
      );
      window.location.href = "mailto:admin@isolationmedia.com?subject=" + subject + "&body=" + body;
      if (note) note.textContent = "Opening your email app… or reach us directly at admin@isolationmedia.com";
      form.reset();
    });
  }

  /* ---------- Smooth anchor offset for fixed nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
