const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const setText = (selector, value) => { const element = $(selector); if (element) element.textContent = value ?? ""; };
const slugify = (value) => String(value || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const link = (label, href, className = "", testId = "") => {
  const anchor = document.createElement("a");
  anchor.textContent = label;
  anchor.href = href;
  anchor.className = className;
  if (testId) anchor.dataset.testid = testId;
  if (!href.startsWith("mailto:")) { anchor.target = "_blank"; anchor.rel = "noopener noreferrer"; }
  return anchor;
};

function storageGet(key) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}
function storageSet(key, value) {
  try { window.sessionStorage.setItem(key, value); } catch { }
}

function initLenis() {
  if (reducedMotion || typeof window.Lenis === "undefined") return null;
  const lenis = new window.Lenis({ duration: 1.08, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  const raf = (time) => { if (!document.hidden) lenis.raf(time); window.requestAnimationFrame(raf); };
  window.requestAnimationFrame(raf);
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = $(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: -88 });
  });
  return lenis;
}

function initBootSequence() {
  const overlay = $("#boot-overlay");
  if (!overlay) return;
  if (storageGet("gb-boot-complete") === "true") { overlay.remove(); return; }
  const lines = [
    ["INITIALIZING GB-PORTFOLIO KERNEL", "ok"],
    ["VERIFYING IDENTITY // GEOREL BONAI", "ok"],
    ["MOUNTING CREDENTIAL ARCHIVE", "ok"],
    ["ESTABLISHING SECURE VISUAL CHANNEL", "ok"],
    ["SIGNAL LOCKED — INTERFACE READY", "ok"]
  ];
  const output = $("#boot-lines");
  const progress = $("#boot-progress");
  const skip = $("#boot-skip");
  overlay.hidden = false;
  let cancelled = false;
  const timers = [];
  const finish = () => {
    if (cancelled) return;
    cancelled = true;
    timers.forEach(window.clearTimeout);
    storageSet("gb-boot-complete", "true");
    overlay.classList.add("is-exiting");
    window.setTimeout(() => overlay.remove(), reducedMotion ? 20 : 360);
  };
  lines.forEach(([text, status], index) => {
    timers.push(window.setTimeout(() => {
      const line = document.createElement("p");
      line.innerHTML = `<span class="ok">[${status.toUpperCase()}]</span> ${text}`;
      output.append(line);
      progress.textContent = `${String(Math.round(((index + 1) / lines.length) * 100)).padStart(3, "0")}%`;
      if (index === lines.length - 1) timers.push(window.setTimeout(finish, 420));
    }, reducedMotion ? index * 35 : index * 250));
  });
  skip.addEventListener("click", finish, { once: true });
}

function initHeroTypewriter(profile = {}) {
  const first = $("#hero-first");
  const last = $("#hero-last");
  if (!first || !last) return;
  const firstText = profile.heroFirst || profile.name?.split(" ")[0] || first.textContent;
  const lastText = profile.heroLast || profile.name?.split(" ").at(-1) || last.textContent;
  if (reducedMotion) { first.textContent = firstText; last.textContent = lastText; return; }
  const bootPending = Boolean($("#boot-overlay"));
  first.textContent = "";
  last.textContent = "";
  const type = (element, text, done) => {
    let index = 0;
    const step = () => {
      element.textContent = text.slice(0, index + 1);
      index += 1;
      if (index < text.length) window.setTimeout(step, 42); else if (done) window.setTimeout(done, 120);
    };
    step();
  };
  window.setTimeout(() => type(first, firstText, () => type(last, lastText)), bootPending ? 1350 : 180);
}

function initScramble() {
  if (reducedMotion) return;
  const glyphs = "01#$%&@*+<>/\\";
  $$("[data-scramble]").forEach((element) => {
    const original = element.textContent;
    element.setAttribute("aria-label", original);
    let active = false;
    const run = () => {
      if (active) return;
      active = true;
      const start = performance.now();
      const animate = (time) => {
        const progress = Math.min(1, (time - start) / 200);
        element.textContent = original.split("").map((char, index) => {
          if (char === " " || char === "/" || char === "↗") return char;
          return index / original.length < progress ? char : glyphs[Math.floor(Math.random() * glyphs.length)];
        }).join("");
        if (progress < 1) window.requestAnimationFrame(animate);
        else { element.textContent = original; active = false; }
      };
      window.requestAnimationFrame(animate);
    };
    element.addEventListener("mouseenter", run);
    element.addEventListener("focus", run);
  });
}

function initParticleNetwork() {
  const canvas = $("#particle-canvas");
  const frame = $(".hero-visual");
  if (!canvas || !frame || reducedMotion) return;
  const context = canvas.getContext("2d");
  let points = [];
  let width = 0;
  let height = 0;
  let running = true;
  let rafId = null;
  const pointer = { x: -9999, y: -9999 };
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, width * ratio);
    canvas.height = Math.max(1, height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(44, Math.max(24, Math.floor(width / 14)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .32,
      vy: (Math.random() - .5) * .32,
      size: Math.random() * 1.6 + .6
    }));
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      const dx = pointer.x - point.x;
      const dy = pointer.y - point.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 110 && distance > 1) { point.x -= dx / distance * .18; point.y -= dy / distance * .18; }
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
      context.beginPath();
      context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      context.fillStyle = "rgba(0, 234, 255, .62)";
      context.fill();
    });
    for (let a = 0; a < points.length; a += 1) {
      for (let b = a + 1; b < points.length; b += 1) {
        const first = points[a];
        const second = points[b];
        const distance = Math.hypot(first.x - second.x, first.y - second.y);
        if (distance < 105) {
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = `rgba(0, 234, 255, ${(1 - distance / 105) * .28})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    }
    if (running) rafId = window.requestAnimationFrame(draw);
  };
  frame.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });
  frame.addEventListener("pointerleave", () => { pointer.x = -9999; pointer.y = -9999; });
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running && !rafId) draw();
    if (!running && rafId) { window.cancelAnimationFrame(rafId); rafId = null; }
  });
  window.addEventListener("resize", resize);
  resize();
  draw();
}

function initHeroParallax() {
  const hero = $(".hero");
  const visual = $(".hero-visual");
  if (!hero || !visual || reducedMotion) return;
  let frame = null;
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    if (frame) window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => {
      visual.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateZ(0)`;
    });
  });
  hero.addEventListener("pointerleave", () => {
    if (frame) window.cancelAnimationFrame(frame);
    visual.style.transform = "";
  });
}

function initScrollReveals() {
  const targets = $$("[data-reveal]");
  if (!targets.length) return;
  if (reducedMotion) { targets.forEach((target) => target.classList.add("is-visible")); return; }
  document.body.classList.add("motion-pending");
  const fallback = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -8%" });
    targets.forEach((target) => observer.observe(target));
  };
  import("https://cdn.jsdelivr.net/npm/motion@12/+esm").then(({ animate, inView }) => {
    targets.forEach((target, index) => {
      const stop = inView(target, () => {
        target.classList.add("is-visible");
        animate(target, { opacity: [0, 1], y: [34, 0] }, { duration: .72, delay: (index % 3) * .055, easing: [.16, 1, .3, 1] });
        stop();
      }, { margin: "0px 0px -10%" });
    });
  }).catch(fallback);
}

function animateDialogContent(element) {
  if (!element || reducedMotion || !element.animate) return;
  element.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 230, easing: "cubic-bezier(.16,1,.3,1)" });
}

function initPortfolio(profile) {
  const year = new Date().getFullYear();
  setText("#brand-initials", profile.initials);
  setText("#visual-code", `${profile.initials}-001`);
  setText("#role", profile.role);
  setText("#intro", profile.intro);
  setText("#footer-name", profile.name);
  setText("#copyright-name", profile.name);
  setText("#location", profile.location);
  setText("#year", year);
  setText("#year-range", year);
  $("#portrait").src = profile.portrait || "assets/cyber-portrait.svg";
  $("#portrait").alt = `Portrait of ${profile.name}`;
  $("#hero-heading").setAttribute("aria-label", profile.name);
  document.title = `Portfolio | ${profile.name}`;
  document.querySelector('meta[name="description"]').content = `Portfolio of ${profile.name}`;
  const heroCv = $("#hero-cv");
  if (profile.cv) { heroCv.href = profile.cv; heroCv.hidden = false; }

  const groups = Array.isArray(profile.certificateGroups) ? profile.certificateGroups
    : Array.isArray(profile.certificates) ? [{ heading: "Certificates", note: "Update config.js to group these", items: profile.certificates }] : [];
  const availableCertificates = [];
  const list = $("#certificate-list");
  groups.forEach((group, groupIndex) => {
    const section = document.createElement("section");
    section.className = "certificate-group";
    section.dataset.reveal = "";
    section.dataset.testid = `certificate-group-${groupIndex + 1}`;
    const heading = document.createElement("h3");
    heading.className = "certificate-category";
    heading.textContent = group.heading;
    const note = document.createElement("p");
    note.className = "category-note";
    note.textContent = group.note || "";
    const grid = document.createElement("div");
    grid.className = "certificate-grid";
    (group.items || []).forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "certificate-card";
      card.dataset.reveal = "";
      card.dataset.testid = `certificate-card-${slugify(item.title)}`;
      const top = document.createElement("div");
      top.className = "card-top";
      const code = document.createElement("span");
      code.className = "card-code";
      code.textContent = `${String(index + 1).padStart(2, "0")} / ${String((group.items || []).length).padStart(2, "0")} · ${item.year || "CERTIFICATE"}`;
      top.append(code);
      const hasModal = Boolean(item.file || item.activityImages?.length);
      let position = -1;
      if (hasModal) {
        position = availableCertificates.push({ item, category: group.heading }) - 1;
        const view = document.createElement("button");
        view.type = "button";
        view.className = "certificate-view";
        view.textContent = item.activityImages?.length ? "↗ ACTIVITY LOG" : "↗ VIEW PDF";
        view.dataset.testid = `certificate-view-${slugify(item.title)}`;
        view.addEventListener("click", () => openCertificate(position, view));
        top.append(view);
      }
      const preview = document.createElement(hasModal ? "button" : "div");
      preview.className = "certificate-preview";
      if (hasModal) {
        preview.type = "button";
        preview.setAttribute("aria-label", `Inspect ${item.title}`);
        preview.dataset.testid = `certificate-preview-${slugify(item.title)}`;
        preview.addEventListener("click", () => openCertificate(position, preview));
        if (item.activityImages?.length) {
          preview.classList.add("activity-preview");
          const activityText = document.createElement("p");
          activityText.className = "activity-preview-label";
          activityText.textContent = item.activityLabel;
          preview.append(activityText);
        } else if (item.preview) {
          const image = document.createElement("img");
          image.src = item.preview;
          image.alt = `Preview of ${item.title}`;
          image.loading = "lazy";
          preview.append(image);
        } else {
          const pdf = document.createElement("iframe");
          pdf.src = `${encodeURI(item.file)}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
          pdf.title = `PDF preview: ${item.title}`;
          pdf.tabIndex = -1;
          pdf.loading = "lazy";
          preview.append(pdf);
        }
        const inspect = document.createElement("span");
        inspect.className = "inspect-label";
        inspect.textContent = item.activityImages?.length ? "⌕ OPEN ACTIVITY LOG" : "⌕ INSPECT PDF";
        preview.append(inspect);
      } else {
        preview.classList.add("preview-empty");
        preview.textContent = "PDF PREVIEW / ADD FILE IN CONFIG.JS";
      }
      const middle = document.createElement("div");
      const title = document.createElement("h4");
      title.textContent = item.title;
      const description = document.createElement("p");
      description.textContent = item.description;
      middle.append(title, description);
      const meta = document.createElement("div");
      meta.className = "certificate-meta";
      const number = document.createElement("p");
      number.textContent = item.certificateNumber ? `CERT NO. ${item.certificateNumber}` : (item.year ? `YEAR / ${item.year}` : "CERTIFICATE SLOT");
      meta.append(number);
      const tags = document.createElement("div");
      tags.className = "certificate-tags";
      (item.keywords || []).forEach((keyword) => {
        const tag = document.createElement("span");
        tag.textContent = keyword;
        tags.append(tag);
      });
      meta.append(tags);
      card.append(top, preview, middle, meta);
      grid.append(card);
    });
    section.append(heading, note, grid);
    list.append(section);
  });

  const dialog = $("#certificate-dialog");
  const documentArea = $("#dialog-document");
  const activityCounter = $("#dialog-activity-counter");
  let currentCertificate = 0;
  let currentActivityImage = 0;
  let lastTrigger = null;

  function showCertificate(position) {
    currentCertificate = (position + availableCertificates.length) % availableCertificates.length;
    const { item, category } = availableCertificates[currentCertificate];
    setText("#dialog-counter", `${String(currentCertificate + 1).padStart(2, "0")} / ${String(availableCertificates.length).padStart(2, "0")}`);
    setText("#dialog-category", category.toUpperCase());
    setText("#dialog-title", item.title);
    setText("#dialog-description", item.description);
    setText("#dialog-meta", [item.certificateNumber && `CERT NO. ${item.certificateNumber}`, item.year && `YEAR ${item.year}`, ...(item.keywords || [])].filter(Boolean).join(" · "));
    currentActivityImage = 0;
    $("#dialog-open-pdf").href = item.file || "#";
    $("#dialog-open-pdf").hidden = !item.file;
    documentArea.replaceChildren();
    if (item.activityImages?.length) {
      const image = document.createElement("img");
      image.className = "activity-gallery-image";
      image.src = item.activityImages[currentActivityImage];
      image.alt = `${item.title} activity image 1 of ${item.activityImages.length}`;
      documentArea.append(image);
      activityCounter.textContent = `ACTIVITY IMAGE 01 / ${String(item.activityImages.length).padStart(2, "0")}`;
      activityCounter.hidden = false;
    } else if (item.preview) {
      const image = document.createElement("img");
      image.src = item.preview;
      image.alt = `Preview of ${item.title}`;
      documentArea.append(image);
      activityCounter.hidden = true;
    } else {
      const pdf = document.createElement("iframe");
      pdf.src = `${encodeURI(item.file)}#page=1&toolbar=0&navpanes=0&view=FitH`;
      pdf.title = `Certificate PDF: ${item.title}`;
      documentArea.append(pdf);
      activityCounter.hidden = true;
    }
    $(".dialog-previous").disabled = item.activityImages?.length ? item.activityImages.length < 2 : availableCertificates.length < 2;
    $(".dialog-next").disabled = item.activityImages?.length ? item.activityImages.length < 2 : availableCertificates.length < 2;
    animateDialogContent(documentArea);
  }

  function showActivityImage(step) {
    const { item } = availableCertificates[currentCertificate];
    if (!item.activityImages?.length) return;
    currentActivityImage = (currentActivityImage + step + item.activityImages.length) % item.activityImages.length;
    const image = $(".activity-gallery-image");
    image.src = item.activityImages[currentActivityImage];
    image.alt = `${item.title} activity image ${currentActivityImage + 1} of ${item.activityImages.length}`;
    activityCounter.textContent = `ACTIVITY IMAGE ${String(currentActivityImage + 1).padStart(2, "0")} / ${String(item.activityImages.length).padStart(2, "0")}`;
    animateDialogContent(image);
  }

  function openCertificate(position, trigger = null) {
    lastTrigger = trigger;
    showCertificate(position);
    if (!dialog.open) dialog.showModal();
    dialog.classList.remove("is-closing");
    window.requestAnimationFrame(() => dialog.classList.add("is-open"));
  }

  function closeCertificate() {
    dialog.classList.add("is-closing");
    window.setTimeout(() => {
      if (dialog.open) dialog.close();
      dialog.classList.remove("is-open", "is-closing");
    }, reducedMotion ? 0 : 190);
  }

  $(".dialog-close").addEventListener("click", closeCertificate);
  $(".dialog-previous").addEventListener("click", () => availableCertificates[currentCertificate].item.activityImages?.length ? showActivityImage(-1) : showCertificate(currentCertificate - 1));
  $(".dialog-next").addEventListener("click", () => availableCertificates[currentCertificate].item.activityImages?.length ? showActivityImage(1) : showCertificate(currentCertificate + 1));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) closeCertificate(); });
  dialog.addEventListener("close", () => {
    documentArea.replaceChildren();
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && (availableCertificates[currentCertificate].item.activityImages?.length || availableCertificates.length > 1)) $(".dialog-previous").click();
    if (event.key === "ArrowRight" && (availableCertificates[currentCertificate].item.activityImages?.length || availableCertificates.length > 1)) $(".dialog-next").click();
  });

  (profile.focus || []).forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "focus-row";
    row.dataset.reveal = "";
    row.dataset.testid = `focus-row-${slugify(item.title)}`;
    const count = document.createElement("span");
    count.className = "focus-number";
    count.textContent = String(index + 1).padStart(2, "0");
    const block = document.createElement("div");
    block.className = "focus-title";
    const title = document.createElement("h3");
    title.textContent = item.title;
    const tags = document.createElement("div");
    tags.className = "tag-list";
    (item.tags || []).forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      tags.append(tagElement);
    });
    block.append(title, tags);
    const description = document.createElement("p");
    description.textContent = item.description;
    const arrow = document.createElement("span");
    arrow.className = "focus-arrow";
    arrow.textContent = "↗";
    row.append(count, block, description, arrow);
    $("#focus-list").append(row);
  });

  const resources = [
    ["DIRECT LINE", profile.email ? `mailto:${profile.email}` : "", profile.email, "✉", "contact-email"],
    ["DOCUMENT / 01", profile.cv, "OFFICIAL CV", "↧", "contact-cv"],
    ["DOCUMENT / 02", profile.coverLetter, "COVER LETTER", "↧", "contact-cover-letter"]
  ];
  resources.forEach(([label, href, detail, icon, testId]) => {
    const card = href ? link("", href, "resource-card", testId) : document.createElement("div");
    if (!href) card.className = "resource-card resource-inactive";
    card.dataset.testid = testId;
    const symbol = document.createElement("span");
    symbol.className = "resource-icon";
    symbol.textContent = icon;
    const info = document.createElement("span");
    const small = document.createElement("small");
    small.textContent = label;
    const strong = document.createElement("strong");
    strong.textContent = href ? detail : `${detail || label} — ADD FILE IN CONFIG.JS`;
    info.append(small, strong);
    card.append(symbol, info);
    $("#contact-links").append(card);
  });
  [["GITHUB", profile.github], ["LINKEDIN", profile.linkedin], ["EMAIL", profile.email ? `mailto:${profile.email}` : ""], ["CV", profile.cv], ["COVER LETTER", profile.coverLetter]].forEach(([name, href]) => {
    if (href) $("#social-links").append(link(name, href, "", `social-link-${slugify(name)}`));
  });
  initCommandTerminal(profile, groups);
}

function initCommandTerminal(profile, groups) {
  const output = $("#terminal-output");
  const form = $("#terminal-form");
  const input = $("#terminal-input");
  if (!output || !form || !input) return;
  const print = (text, type = "") => {
    const line = document.createElement("p");
    line.className = `terminal-line ${type}`.trim();
    line.textContent = text;
    output.append(line);
    output.scrollTop = output.scrollHeight;
  };
  const welcome = () => {
    print("GB-PORTFOLIO SHELL v2.0 — secure guest channel established", "success");
    print("Type `help` to list available commands.", "info");
  };
  const commands = {
    help: () => ["help                 show available commands", "about                identity and current interests", "projects             credentials and focus archive", "cv                   open the configured CV", "clear                clear the terminal"],
    about: () => [profile.name, profile.role, profile.intro, `LOCATION // ${profile.location}`, `EMAIL    // ${profile.email}`],
    projects: () => {
      const certificates = groups.flatMap((group) => (group.items || []).map((item) => `${group.heading} :: ${item.title}`));
      const focus = (profile.focus || []).map((item) => `FOCUS :: ${item.title}`);
      return [...focus, ...certificates];
    },
    cv: () => {
      if (!profile.cv) return ["CV is not configured in config.js."];
      window.open(profile.cv, "_blank", "noopener,noreferrer");
      return [`OPENING CV // ${profile.cv}`];
    },
    resume: () => commands.cv(),
    clear: () => { output.replaceChildren(); return []; }
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    print(`guest@gb:~$ ${raw}`, "command");
    input.value = "";
    const command = raw.toLowerCase().split(/\s+/)[0];
    if (!commands[command]) { print(`command not found: ${command}. Type \`help\`.`, "error"); return; }
    commands[command]().forEach((line, index) => print(line, command === "cv" || index === 0 ? "info" : ""));
  });
  $(".terminal-shell").addEventListener("click", () => input.focus());
  welcome();
}

function initMenu() {
  const menu = $(".menu-button");
  const nav = $(".site-nav");
  if (!menu || !nav) return;
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }
  });
}

initLenis();
initBootSequence();
initScramble();
initParticleNetwork();
initHeroParallax();
initMenu();

if (typeof PORTFOLIO === "undefined") {
  const warning = document.createElement("p");
  warning.className = "config-error";
  warning.textContent = "Portfolio gagal dimuat. Periksa sintaks config.js dan pastikan file ada di samping index.html.";
  $("#certificate-list").append(warning);
  initScrollReveals();
} else {
  initPortfolio(PORTFOLIO);
  initHeroTypewriter(PORTFOLIO);
  initScrollReveals();
}
