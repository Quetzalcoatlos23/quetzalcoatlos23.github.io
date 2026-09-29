/* Hanya config.js yang perlu diedit untuk mengubah isi portfolio. */
const $ = (selector) => document.querySelector(selector);
const setText = (selector, value) => { $(selector).textContent = value ?? ""; };
const link = (label, href, className = "") => {
  const a = document.createElement("a");
  a.textContent = label;
  a.href = href;
  a.className = className;
  if (!href.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  return a;
};

if (typeof PORTFOLIO === "undefined") {
  const warning = document.createElement("p");
  warning.className = "config-error";
  warning.textContent = "Portfolio gagal dimuat. Periksa sintaks config.js dan pastikan file ada di samping index.html.";
  $("#certificate-list").append(warning);
} else {
  const profile = PORTFOLIO;
  const year = new Date().getFullYear();
  setText("#brand-initials", profile.initials);
  setText("#hero-first", profile.heroFirst || profile.name.split(" ")[0]);
  setText("#hero-last", profile.heroLast || profile.name.split(" ").at(-1));
  $("#hero-heading").setAttribute("aria-label", profile.name);
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
  document.title = `Portfolio | ${profile.name}`;
  document.querySelector('meta[name="description"]').content = `Portfolio of ${profile.name}`;

  const groups = Array.isArray(profile.certificateGroups) ? profile.certificateGroups
    : Array.isArray(profile.certificates) ? [{ heading: "Certificates", note: "Update config.js to group these", items: profile.certificates }] : [];
  const availableCertificates = [];
  groups.forEach((group) => {
    const section = document.createElement("section"); section.className = "certificate-group";
    const heading = document.createElement("h3"); heading.className = "certificate-category"; heading.textContent = group.heading;
    const note = document.createElement("p"); note.className = "category-note"; note.textContent = group.note || "";
    const grid = document.createElement("div"); grid.className = "certificate-grid";
    const items = group.items || [];
    items.forEach((item, index) => {
      const card = document.createElement("article"); card.className = "certificate-card";
      const top = document.createElement("div"); top.className = "card-top";
      const code = document.createElement("span"); code.className = "card-code"; code.textContent = `${String(index + 1).padStart(2,"0")} / ${String(items.length).padStart(2,"0")} · ${item.year || "CERTIFICATE"}`;
      top.append(code);
      if (item.file) {
        const view = document.createElement("button"); view.type = "button"; view.className = "certificate-view"; view.textContent = "↗ VIEW PDF";
        const position = availableCertificates.push({ item, category: group.heading }) - 1;
        view.addEventListener("click", () => openCertificate(position)); top.append(view);
      }
      const preview = document.createElement(item.file ? "button" : "div");
      preview.className = "certificate-preview";
      if (item.file) {
        preview.type = "button";
        preview.setAttribute("aria-label", `Inspect ${item.title}`);
        const position = availableCertificates.length - 1;
        preview.addEventListener("click", () => openCertificate(position));
        if (item.preview) {
          const image = document.createElement("img"); image.src = item.preview; image.alt = `Preview of ${item.title}`; image.loading = "lazy"; preview.append(image);
        } else {
          const pdf = document.createElement("iframe");
          pdf.src = `${encodeURI(item.file)}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
          pdf.title = `PDF preview: ${item.title}`; pdf.tabIndex = -1; pdf.loading = "lazy";
          preview.append(pdf);
        }
        const inspect = document.createElement("span"); inspect.className = "inspect-label"; inspect.textContent = "⌕ INSPECT PDF"; preview.append(inspect);
      } else { preview.classList.add("preview-empty"); preview.textContent = "PDF PREVIEW / ADD FILE IN CONFIG.JS"; }
      const middle = document.createElement("div");
      const title = document.createElement("h4"); title.textContent = item.title;
      const description = document.createElement("p"); description.textContent = item.description;
      middle.append(title, description);
      const meta = document.createElement("div"); meta.className = "certificate-meta";
      const number = document.createElement("p"); number.textContent = item.certificateNumber ? `CERT NO. ${item.certificateNumber}` : (item.year ? `YEAR / ${item.year}` : "CERTIFICATE SLOT");
      meta.append(number);
      const tags = document.createElement("div"); tags.className = "certificate-tags";
      (item.keywords || []).forEach((keyword) => { const tag = document.createElement("span"); tag.textContent = keyword; tags.append(tag); });
      meta.append(tags);
      card.append(top, preview, middle, meta); grid.append(card);
    });
    section.append(heading, note, grid); $("#certificate-list").append(section);
  });

  const dialog = $("#certificate-dialog");
  let currentCertificate = 0;
  function showCertificate(position) {
    currentCertificate = (position + availableCertificates.length) % availableCertificates.length;
    const { item, category } = availableCertificates[currentCertificate];
    setText("#dialog-counter", `${String(currentCertificate + 1).padStart(2,"0")} / ${String(availableCertificates.length).padStart(2,"0")}`);
    setText("#dialog-category", category.toUpperCase());
    setText("#dialog-title", item.title);
    setText("#dialog-description", item.description);
    setText("#dialog-meta", [item.certificateNumber && `CERT NO. ${item.certificateNumber}`, item.year && `YEAR ${item.year}`, ...(item.keywords || [])].filter(Boolean).join(" · "));
    $("#dialog-open-pdf").href = item.file;
    const documentArea = $("#dialog-document"); documentArea.replaceChildren();
    if (item.preview) {
      const image = document.createElement("img"); image.src = item.preview; image.alt = `Preview of ${item.title}`; documentArea.append(image);
    } else {
      const pdf = document.createElement("iframe"); pdf.src = `${encodeURI(item.file)}#page=1&toolbar=0&navpanes=0&view=FitH`; pdf.title = `Certificate PDF: ${item.title}`; documentArea.append(pdf);
    }
    $(".dialog-previous").disabled = availableCertificates.length < 2;
    $(".dialog-next").disabled = availableCertificates.length < 2;
  }
  function openCertificate(position) { showCertificate(position); dialog.showModal(); }
  $(".dialog-close").addEventListener("click", () => dialog.close());
  $(".dialog-previous").addEventListener("click", () => showCertificate(currentCertificate - 1));
  $(".dialog-next").addEventListener("click", () => showCertificate(currentCertificate + 1));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => $("#dialog-document").replaceChildren());
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && availableCertificates.length > 1) showCertificate(currentCertificate - 1);
    if (event.key === "ArrowRight" && availableCertificates.length > 1) showCertificate(currentCertificate + 1);
  });

  (profile.focus || []).forEach((item, index) => {
    const row = document.createElement("article"); row.className = "focus-row";
    const count = document.createElement("span"); count.className = "focus-number"; count.textContent = String(index + 1).padStart(2,"0");
    const block = document.createElement("div"); block.className = "focus-title";
    const title = document.createElement("h3"); title.textContent = item.title;
    const tags = document.createElement("div"); tags.className = "tag-list";
    (item.tags || []).forEach((tag) => { const s = document.createElement("span"); s.textContent = tag; tags.append(s); });
    block.append(title, tags);
    const description = document.createElement("p"); description.textContent = item.description;
    const arrow = document.createElement("span"); arrow.className = "focus-arrow"; arrow.textContent = "↗";
    row.append(count, block, description, arrow); $("#focus-list").append(row);
  });

  const resources = [
    ["DIRECT LINE", profile.email ? `mailto:${profile.email}` : "", profile.email, "✉"],
    ["DOCUMENT / 01", profile.cv, "OFFICIAL CV", "↧"],
    ["DOCUMENT / 02", profile.coverLetter, "COVER LETTER", "↧"]
  ];
  resources.forEach(([label, href, detail, icon]) => {
    const card = href ? link("", href, "resource-card") : document.createElement("div");
    if (!href) card.className = "resource-card resource-inactive";
    const symbol = document.createElement("span"); symbol.className = "resource-icon"; symbol.textContent = icon;
    const info = document.createElement("span");
    const small = document.createElement("small"); small.textContent = label;
    const strong = document.createElement("strong"); strong.textContent = href ? detail : `${detail || label} — ADD FILE IN CONFIG.JS`;
    info.append(small, strong); card.append(symbol, info); $("#contact-links").append(card);
  });
  [["GITHUB", profile.github], ["LINKEDIN", profile.linkedin], ["EMAIL", profile.email ? `mailto:${profile.email}` : ""], ["CV", profile.cv], ["COVER LETTER", profile.coverLetter]].forEach(([name, href]) => {
    if (href) $("#social-links").append(link(name, href));
  });
  const menu = $(".menu-button");
  menu.addEventListener("click", () => { const open = $(".site-nav").classList.toggle("open"); menu.setAttribute("aria-expanded", String(open)); });
  $(".site-nav").addEventListener("click", (event) => {
    if (event.target.closest("a")) { $(".site-nav").classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }
  });
}
