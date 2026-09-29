/* Tampilan otomatis mengambil data dari config.js. Biasanya file ini tidak perlu diubah. */
const $ = (selector) => document.querySelector(selector);
const setText = (selector, value) => { $(selector).textContent = value || ""; };
const link = (label, href, className = "") => {
  const a = document.createElement("a");
  a.textContent = label;
  a.href = href;
  a.className = className;
  if (!href.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  return a;
};

const profile = PORTFOLIO;
const year = new Date().getFullYear();
setText("#name", profile.name.toUpperCase());
setText("#initials", profile.initials);
setText("#portrait-initials", profile.initials);
setText("#visual-code", `${profile.initials}-001`);
setText("#role", profile.role);
setText("#tagline", profile.tagline);
setText("#intro", profile.intro);
setText("#location", profile.location);
setText("#footer-name", profile.name.toUpperCase());
setText("#copyright-name", profile.name.toUpperCase());
setText("#year", year);
setText("#year-range", year);
document.title = `Portfolio | ${profile.name}`;
document.querySelector('meta[name="description"]').content = `Portfolio pribadi ${profile.name}`;

const certificates = $("#certificate-list");
profile.certificates.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "certificate-card";
  const code = document.createElement("small"); code.textContent = `${String(index + 1).padStart(2, "0")} / ${String(profile.certificates.length).padStart(2, "0")}`;
  const title = document.createElement("h3"); title.textContent = item.title;
  const description = document.createElement("p"); description.textContent = item.description;
  const footer = item.file ? link("VIEW CERTIFICATE ↗", item.file, "certificate-link") : document.createElement("span");
  if (!item.file) footer.textContent = "FILE BELUM DITAMBAHKAN";
  footer.classList.add("card-footer");
  card.append(code, title, description, footer);
  certificates.append(card);
});

profile.focus.forEach((item, index) => {
  const row = document.createElement("article"); row.className = "focus-row";
  const count = document.createElement("span"); count.className = "focus-number"; count.textContent = String(index + 1).padStart(2, "0");
  const content = document.createElement("div");
  const title = document.createElement("h3"); title.textContent = item.title;
  const tags = document.createElement("small"); tags.textContent = item.tags.join("  /  ");
  content.append(title, tags);
  const description = document.createElement("p"); description.textContent = item.description;
  row.append(count, content, description);
  $("#focus-list").append(row);
});

const resources = [
  ["DIRECT LINE", profile.email ? `mailto:${profile.email}` : "", profile.email],
  ["OFFICIAL CV", profile.cv, "PDF DOCUMENT"],
  ["COVER LETTER", profile.coverLetter, "PDF DOCUMENT"]
];
resources.forEach(([label, href, sub]) => {
  const card = href ? link("", href, "resource-card") : document.createElement("div");
  if (!href) card.className = "resource-card inactive";
  const top = document.createElement("small"); top.textContent = label;
  const detail = document.createElement("strong"); detail.textContent = href ? sub : `${label} — BELUM DIISI`;
  const arrow = document.createElement("span"); arrow.textContent = href ? "↗" : "—";
  card.append(top, detail, arrow); $("#contact-links").append(card);
});
[["GITHUB", profile.github], ["LINKEDIN", profile.linkedin], ["EMAIL", profile.email ? `mailto:${profile.email}` : ""]].forEach(([label, href]) => {
  if (href) $("#social-links").append(link(label, href));
});

const menu = $(".menu");
menu.addEventListener("click", () => {
  const open = $(".nav").classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
$(".nav").addEventListener("click", (event) => {
  if (event.target.closest("a")) { $(".nav").classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }
});
