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

  /* ---------- Scroll progress bar ---------- */
  var progress = document.getElementById("progress");
  if (progress) {
    var ticking = false;
    function drawProgress() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = "scaleX(" + Math.min(Math.max(p, 0), 1) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(drawProgress); }
    }, { passive: true });
    drawProgress();
  }

  /* ---------- Engine switcher (hero answer panel) ---------- */
  var eswitch = document.getElementById("eswitch");
  if (eswitch) {
    var tabs = eswitch.querySelectorAll("button");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-engine");
        tabs.forEach(function (t) {
          t.setAttribute("aria-selected", String(t === tab));
        });
        document.querySelectorAll(".answer__panel").forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-engine") !== target;
        });
      });
    });
  }

  /* ---------- ROI bars fill on scroll ---------- */
  var roiFills = document.querySelectorAll(".roi__fill");
  function fillRoi(el) {
    var pct = el.getAttribute("data-fill") || "0";
    if (reduceMotion) { el.style.transition = "none"; }
    el.style.width = pct + "%";
  }
  if (roiFills.length) {
    if ("IntersectionObserver" in window) {
      var rio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { fillRoi(e.target); rio.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      roiFills.forEach(function (el) { rio.observe(el); });
    } else {
      roiFills.forEach(fillRoi);
    }
  }

  /* ---------- Floating "chat with a specialist" button ---------- */
  var fab = document.getElementById("fab");
  if (fab) {
    // Stand down while a full size call to action is already on screen, so the
    // floating button never competes with the one the visitor came to find.
    var visibleCtas = [];
    function nearCta() { return visibleCtas.length > 0; }
    if ("IntersectionObserver" in window) {
      var ctaIo2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var i = visibleCtas.indexOf(e.target);
          if (e.isIntersecting && i === -1) visibleCtas.push(e.target);
          else if (!e.isIntersecting && i !== -1) visibleCtas.splice(i, 1);
        });
        drawFab();
      }, { threshold: 0.1 });
      document.querySelectorAll(".cta-strip, .cta, .chatcta").forEach(function (el) {
        ctaIo2.observe(el);
      });
    }
    var fabTicking = false;
    function drawFab() {
      fab.classList.toggle("show", window.scrollY > 500 && !nearCta());
      fabTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (!fabTicking) { fabTicking = true; requestAnimationFrame(drawFab); }
    }, { passive: true });
    drawFab();
  }

  /* ---------- Blog topic filters ---------- */
  var filters = document.getElementById("filters");
  if (filters) {
    var chips = filters.querySelectorAll(".chip");
    var posts = document.querySelectorAll("#postsGrid .post");
    var countEl = document.getElementById("filterCount");
    var emptyEl = document.getElementById("postsEmpty");

    function applyFilter(cat) {
      var shown = 0;
      posts.forEach(function (post) {
        var match = cat === "All" || post.getAttribute("data-cat") === cat;
        post.hidden = !match;
        if (match) { shown++; post.classList.add("in"); }
      });
      if (countEl) {
        countEl.textContent = shown + (shown === 1 ? " article" : " articles") +
          (cat === "All" ? "" : " in " + cat);
      }
      if (emptyEl) emptyEl.hidden = shown > 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("active", on);
          c.setAttribute("aria-pressed", String(on));
        });
        applyFilter(chip.getAttribute("data-filter"));
      });
    });
    applyFilter("All");
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
