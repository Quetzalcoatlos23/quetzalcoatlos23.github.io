(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shot = (n) => `shots/${n}.png`;
  const MODS = window.DOCS || [];

  /* ---------- Lenis ---------- */
  const lenis = window.Lenis ? new window.Lenis({ duration: 1.15 }) : null;
  if (lenis) {
    const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    lenis.stop();
  }
  const go = (sel) => (lenis ? lenis.scrollTo(sel, { offset: -64 }) : document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" }));
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) { e.preventDefault(); go(a.getAttribute("href")); }
  });

  /* ---------- Boot ---------- */
  const LOGS = ["Booting CentOS Linux 7 (Core) kernel 3.10.0-1160.el7.x86_64", "Mounting filesystems...", "Mounted /boot (xfs)", "Started udev Kernel Device Manager", "Starting network daemon...", "Bringing up interface enp0s3: 192.168.56.103", "Started firewalld - dynamic firewall daemon", "Starting OpenSSH server daemon (sshd)...", "Starting Berkeley Internet Name Domain (named)...", "Loaded zone georelbonai.com/IN", "Starting NTP client/server (chronyd)...", "Starting The Apache HTTP Server (httpd)...", "Starting Postfix Mail Transport Agent...", "Starting Dovecot IMAP/POP3 email server...", "Starting MariaDB database server...", "Loading sysadmin modules...", "Loading SquirrelMail plugins", "Loading mod_ssl /etc/pki/tls/certs/server.crt", "Reached target Multi-User System", "gebon login: root"];
  const boot = $("#boot"), pctEl = $("#boot-pct"), bar = $("#boot-bar"), log = $("#boot-log");
  let booted = false, shownLogs = 0;
  const finishBoot = () => {
    if (booted) return;
    booted = true;
    boot.classList.add("out");
    setTimeout(() => boot.remove(), 900);
    document.body.classList.add("ready");
    lenis && lenis.start();
    startTyped();
  };
  const t0 = performance.now();
  const tick = (now) => {
    if (booted) return;
    const p = Math.min(100, Math.floor((Math.max(0, now - t0) / 3000) ** 0.9 * 100));
    pctEl.textContent = p; bar.style.width = p + "%";
    const want = Math.ceil((p / 100) * LOGS.length);
    while (shownLogs < want) {
      const d = document.createElement("div");
      d.className = "truncate";
      d.innerHTML = `<span class="text-muted-cy">[${(shownLogs * 0.137).toFixed(6).padStart(12, " ")}]</span> <span class="text-neon">[  OK  ]</span> ${esc(LOGS[shownLogs])}`;
      log.appendChild(d); shownLogs++;
    }
    if (p < 100) requestAnimationFrame(tick); else setTimeout(finishBoot, 450);
  };
  requestAnimationFrame(tick);
  $("#boot-skip").onclick = finishBoot;
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !booted) finishBoot(); });

  /* ---------- CRT ---------- */
  let crt = true;
  $("#crt-toggle").onclick = (e) => {
    crt = !crt;
    document.body.classList.toggle("crt-off", !crt);
    const sw = e.currentTarget.querySelector("span");
    sw.className = `relative block w-10 h-5 border ${crt ? "border-neon bg-neon/15" : "border-white/25"}`;
    $("#crt-knob").className = `absolute left-0 top-[3px] h-3 w-3 transition-transform duration-300 ${crt ? "translate-x-[22px] bg-neon shadow-[0_0_10px_#00ff66]" : "translate-x-[3px] bg-white/50"}`;
  };

  /* ---------- Typed subtitle ---------- */
  function startTyped() {
    const s = "8 services. 1 box. Every step documented, every screenshot kept.";
    let i = 0;
    const id = setInterval(() => { $("#typed").textContent = s.slice(0, ++i); if (i >= s.length) clearInterval(id); }, 32);
  }

  /* ---------- Hero cursor (hero only) ---------- */
  const hero = $("#top"), cur = $("#cursor"), dot = $(".cursor-dot"), ring = $(".cursor-ring");
  if (matchMedia("(pointer: fine)").matches) {
    hero.classList.add("cursor-none-zone");
    let x = 0, y = 0, rx = 0, ry = 0;
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect(); x = e.clientX - r.left; y = e.clientY - r.top;
      ring.classList.toggle("is-hot", !!e.target.closest("a,button,#stack-zone"));
    });
    hero.addEventListener("mouseenter", () => (cur.style.opacity = 1));
    hero.addEventListener("mouseleave", () => (cur.style.opacity = 0));
    const loop = () => { rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; dot.style.transform = `translate(${x}px,${y}px)`; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); };
    loop();
  } else cur.remove();

  /* ---------- 3D stack ---------- */
  const stack = $("#stack");
  const layers = [[4, -60, "left-0 top-6 w-[78%] rotate-[-4deg] opacity-70"], [11, 20, "right-0 top-[32%] w-[80%] rotate-[3deg]"], [8, 90, "left-[8%] bottom-0 w-[72%]"]];
  stack.innerHTML = layers.map(([n, z, c]) => `
    <div class="absolute ${c} border border-cyan/40 bg-black shadow-[0_30px_80px_-20px_rgba(0,240,255,0.35)]" style="transform:translateZ(${z}px)">
      <div class="flex items-center gap-1.5 px-3 h-6 border-b border-white/10 bg-[#0d0e15]"><i class="w-2 h-2 rounded-full bg-[#ff5f56]"></i><i class="w-2 h-2 rounded-full bg-[#ffbd2e]"></i><i class="w-2 h-2 rounded-full bg-[#27c93f]"></i><span class="ml-2 text-[10px] text-muted-cy">root@gebon:~</span></div>
      <img src="${shot(n)}" alt="Terminal screenshot ${n}" class="w-full aspect-[16/10] object-contain bg-black" />
    </div>`).join("") + `<div class="absolute right-0 lg:-right-2 top-0 text-[11px] text-neon border border-neon/40 px-2 py-1 bg-black/70" style="transform:translateZ(130px)">nslookup ✓ 192.168.56.103</div>`;
  const zone = $("#stack-zone");
  zone.addEventListener("mousemove", (e) => {
    const r = zone.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5, my = (e.clientY - r.top) / r.height - 0.5;
    stack.style.transform = `rotateX(${-my * 20}deg) rotateY(${mx * 28}deg)`;
  });
  zone.addEventListener("mouseleave", () => (stack.style.transform = ""));

  /* ---------- Marquee ---------- */
  const ITEMS = ["sshd", "named", "chronyd", "httpd", "postfix", "dovecot", "mariadb", "squirrelmail", "mod_ssl", "firewalld"];
  const row = ITEMS.map((t, i) => `<span class="flex items-center font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter px-6 sm:px-10"><span class="${i % 2 ? "text-outline" : "text-white"}">${t}</span><span class="ml-12 sm:ml-20 text-neon text-3xl">◆</span></span>`).join("");
  $("#marquee").innerHTML = `<div class="flex shrink-0 items-center">${row}</div><div class="flex shrink-0 items-center" aria-hidden="true">${row}</div>`;

  /* ---------- Terminal typing ---------- */
  const SCRIPTS = [
    { file: "named.conf", lines: [["c", "yum -y install bind bind-utils"], ["o", "Complete!"], ["c", "cat /etc/named.conf | grep -A3 forwarders"], ["o", "        forwarders { 192.168.56.1; 8.8.8.8; };"], ["o", 'zone "georelbonai.com" IN { type master; file "db.georel.com"; };'], ["o", 'zone "56.168.192.in-addr.arpa" IN { type master; file "db.56.168.192"; };'], ["c", "systemctl enable --now named"], ["c", "nslookup georelbonai.com"], ["o", "Name:    georelbonai.com"], ["o", "Address: 192.168.56.103"]] },
    { file: "firewalld", lines: [["c", "firewall-cmd --add-service={dns,ntp,http,https,smtp} --permanent"], ["o", "success"], ["c", "firewall-cmd --add-port={110/tcp,143/tcp} --permanent"], ["o", "success"], ["c", "firewall-cmd --reload"], ["o", "success"], ["c", "firewall-cmd --list-services"], ["o", "dhcpv6-client dns http https ntp smtp ssh"]] },
    { file: "chrony.conf", lines: [["c", "cp /etc/chrony.conf /etc/chrony.conf.backup"], ["c", "grep ^server /etc/chrony.conf"], ["o", "server 0.id.pool.ntp.org iburst"], ["o", "server 1.id.pool.ntp.org iburst"], ["o", "allow 192.168.56.0/24"], ["c", "systemctl enable --now chronyd"], ["c", "chronyc sources"], ["o", "^* ntp.id.pool  2   6  377   21  +312us[ +401us] +/- 18ms"]] },
    { file: "openssl", lines: [["c", "cd /etc/pki/tls/certs/"], ["c", "openssl genrsa -aes128 > server.key"], ["o", "Generating RSA private key, 2048 bit long modulus"], ["c", "openssl req -utf8 -new -key server.key -out server.csr"], ["c", "openssl x509 -in server.csr -out server.crt -req -signkey server.key -days 3650"], ["o", "Signature ok  subject=/C=ID/CN=www.georelbonai.com"], ["c", "chmod 600 server.key && systemctl restart httpd"], ["o", "https://georelbonai.com  ->  200 OK (TLS)"]] },
  ];
  const PROMPT = '<span class="text-neon">[root@gebon ~]# </span>';
  const tBody = $("#term-body"), tTabs = $("#term-tabs");
  let tIdx = 0, tTimer = null;
  tTabs.innerHTML = SCRIPTS.map((s, i) => `<button data-i="${i}" class="term-tab px-4 sm:px-5 py-2.5 text-xs whitespace-nowrap border-r border-white/10 text-muted-cy transition-colors">${s.file}</button>`).join("");
  tTabs.onclick = (e) => { const b = e.target.closest("button"); if (b) runScript(+b.dataset.i); };
  function runScript(i) {
    clearTimeout(tTimer); tIdx = i; tBody.innerHTML = "";
    tTabs.querySelectorAll("button").forEach((b, k) => b.classList.toggle("on", k === i));
    $("#term-title").textContent = `root@gebon: ~ — ${SCRIPTS[i].file}`;
    const lines = SCRIPTS[i].lines; let li = 0, ch = 0, el = null;
    const step = () => {
      const cur = lines[li];
      if (!cur) {
        tBody.insertAdjacentHTML("beforeend", `<div>${PROMPT}<span class="caret"></span></div>`);
        tTimer = setTimeout(() => runScript((tIdx + 1) % SCRIPTS.length), 2600); return;
      }
      if (cur[0] === "o") {
        tBody.insertAdjacentHTML("beforeend", `<div class="text-[#aab6c4] whitespace-pre-wrap break-all">${esc(cur[1])}</div>`);
        li++; tBody.scrollTop = tBody.scrollHeight; tTimer = setTimeout(step, 140); return;
      }
      if (!el) { el = document.createElement("div"); el.className = "whitespace-pre-wrap break-all text-white"; tBody.appendChild(el); }
      if (ch < cur[1].length) {
        ch++; el.innerHTML = PROMPT + esc(cur[1].slice(0, ch)) + '<span class="caret"></span>';
        tBody.scrollTop = tBody.scrollHeight; tTimer = setTimeout(step, 24 + Math.random() * 30);
      } else {
        el.innerHTML = PROMPT + esc(cur[1]); el = null; ch = 0; li++; tTimer = setTimeout(step, 420);
      }
    };
    step();
  }
  runScript(0);
  $("#term-copy").onclick = (e) => {
    navigator.clipboard?.writeText(SCRIPTS[tIdx].lines.filter((l) => l[0] === "c").map((l) => l[1]).join("\n")).catch(() => {});
    e.target.textContent = "copied"; setTimeout(() => (e.target.textContent = "copy"), 1400);
  };

  /* ---------- Docs ---------- */
  const tone = { green: "text-neon", cyan: "text-cyan", magenta: "text-magenta" };
  const modTabs = $("#mod-tabs"), panel = $("#mod-panel");
  modTabs.innerHTML = MODS.map((m) => `
    <button data-id="${m.id}" class="mod-tab shrink-0 lg:w-full min-w-0 flex items-center gap-4 px-4 py-3 lg:py-4 text-left border border-white/5 hover:border-white/20 transition-colors duration-300">
      <span class="n font-display text-xs text-muted-cy">${m.num}</span>
      <span class="whitespace-nowrap min-w-0"><span class="t block text-sm text-[#aab6c4]">${esc(m.title)}</span><span class="hidden lg:block truncate text-[11px] text-muted-cy mt-0.5">${esc(m.daemon)} · ${esc(m.port)}</span></span>
    </button>`).join("");
  modTabs.onclick = (e) => { const b = e.target.closest("button"); if (b) showModule(b.dataset.id); };

  const stepHtml = (s, i) => `
    <div class="acc ${i === 0 ? "open" : ""} border-b border-white/10">
      <button class="acc-head w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 px-1 text-left group">
        <span class="acc-num font-display text-sm tabular-nums text-muted-cy">${String(i + 1).padStart(2, "0")}</span>
        <span class="flex-1 min-w-0"><span class="block text-[11px] tracking-[0.2em] uppercase text-muted-cy">${esc(s.section)}</span><span class="block mt-1 text-base sm:text-lg text-white group-hover:text-cyan transition-colors">${esc(s.title)}</span></span>
        ${s.shots.length ? `<span class="hidden sm:inline text-[11px] text-magenta">${s.shots.length} img</span>` : ""}
        <span class="acc-plus text-cyan text-xl transition-transform duration-500">+</span>
      </button>
      <div class="acc-body"><div class="overflow-hidden"><div class="pb-8 pl-1 sm:pl-12 pr-1 space-y-5">
        <p class="text-sm sm:text-base text-[#aab6c4] leading-relaxed max-w-2xl">${esc(s.desc)}</p>
        ${s.cmds.length ? `<div class="space-y-2">${s.cmds.map((c) => `<div class="flex items-start gap-3 bg-black border border-white/10 px-4 py-2.5 text-[12px] sm:text-[13px]"><span class="text-neon select-none">$</span><code class="flex-1 text-[#e0e6ed] break-all">${esc(c)}</code><button class="copy-cmd text-muted-cy hover:text-neon text-[11px]" data-c="${esc(c)}">copy</button></div>`).join("")}</div>` : ""}
        ${s.shots.length ? `<div class="grid gap-3 ${s.shots.length > 1 ? "sm:grid-cols-2" : ""}">${s.shots.map((n, k) => `<button class="shot-frame group/shot" data-shots="${s.shots.join(",")}" data-k="${k}" data-title="${esc(s.title)}"><img src="${shot(n)}" alt="Screenshot ${n}" loading="lazy" class="w-full h-full object-contain transition-transform duration-700 group-hover/shot:scale-[1.04]" /><span class="absolute top-2 left-2 text-[10px] tracking-widest text-cyan bg-black/80 px-1.5 py-0.5">${String(n).padStart(2, "0")}.png</span></button>`).join("")}</div>` : ""}
      </div></div></div>
    </div>`;

  function showModule(id) {
    const m = MODS.find((x) => x.id === id) || MODS[0];
    modTabs.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.id === m.id));
    const shots = m.steps.reduce((a, s) => a + s.shots.length, 0);
    panel.innerHTML = `
      <div class="flex flex-wrap items-end gap-x-8 gap-y-4 pb-8 border-b border-white/10">
        <span class="font-display font-extrabold text-7xl sm:text-8xl leading-none tracking-tighter ${tone[m.color]}">${m.num}</span>
        <div class="flex-1 min-w-[240px]"><h3 class="font-display font-bold text-2xl sm:text-3xl text-white">${esc(m.title)}</h3><p class="mt-2 text-sm sm:text-base text-[#aab6c4] max-w-xl">${esc(m.summary)}</p></div>
        <div class="flex gap-6 text-xs text-muted-cy">
          <span><b class="block text-white text-lg font-display">${m.steps.length}</b>steps</span>
          <span><b class="block text-white text-lg font-display">${shots}</b>shots</span>
          <span><b class="block text-white text-lg font-display">${esc(m.port)}</b>port</span>
        </div>
      </div>${m.steps.map(stepHtml).join("")}`;
    panel.animate([{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "none" }], { duration: 500, easing: "cubic-bezier(.16,1,.3,1)" });
  }
  panel.addEventListener("click", (e) => {
    const head = e.target.closest(".acc-head");
    if (head) return head.parentElement.classList.toggle("open");
    const cp = e.target.closest(".copy-cmd");
    if (cp) { navigator.clipboard?.writeText(cp.dataset.c).catch(() => {}); cp.textContent = "copied"; return setTimeout(() => (cp.textContent = "copy"), 1200); }
    const f = e.target.closest(".shot-frame");
    if (f) openLb(f.dataset.shots.split(",").map(Number), +f.dataset.k, f.dataset.title);
  });
  showModule(MODS[0]?.id);

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"); let lbList = [], lbK = 0, lbTitle = "";
  const renderLb = () => {
    const n = lbList[lbK];
    $("#lb-img").src = shot(n);
    $("#lb-cap").innerHTML = `<span class="text-neon">${String(n).padStart(2, "0")}.png</span> — ${esc(lbTitle)} · ${lbK + 1}/${lbList.length}`;
    $("#lb-prev").style.display = $("#lb-next").style.display = lbList.length > 1 ? "" : "none";
  };
  function openLb(list, k, title) { lbList = list; lbK = k; lbTitle = title; renderLb(); lb.classList.add("show"); lenis && lenis.stop(); }
  const closeLb = () => { lb.classList.remove("show"); lenis && lenis.start(); };
  const stepLb = (d) => { lbK = (lbK + d + lbList.length) % lbList.length; renderLb(); };
  lb.onclick = (e) => { if (e.target === lb || e.target.id === "lb-close" || e.target.parentElement === lb && e.target.tagName === "DIV") closeLb(); };
  $("#lb-close").onclick = closeLb;
  $("#lb-prev").onclick = (e) => { e.stopPropagation(); stepLb(-1); };
  $("#lb-next").onclick = (e) => { e.stopPropagation(); stepLb(1); };
  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("show")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") stepLb(1);
    if (e.key === "ArrowLeft") stepLb(-1);
  });

  /* ---------- Services ---------- */
  const SVC = [
    ["dns", "Bind9 DNS", "named", "53", "lg:col-span-7 sm:col-span-2", true, "Authoritative master for georelbonai.com with forward + reverse zones and forwarders to 8.8.8.8."],
    ["ssh", "OpenSSH", "sshd", "22", "lg:col-span-5", false, "Root login disabled. Remote admin from Windows 10 CMD."],
    ["ntp", "Chrony NTP", "chronyd", "123", "lg:col-span-4", false, "Synced to the Indonesian pool, serving Linux and Windows clients."],
    ["web", "Apache HTTPd", "httpd", "80", "lg:col-span-4", false, "Custom site and name-based VirtualHost."],
    ["db", "MariaDB", "mariadb", "3306", "lg:col-span-4", false, "UTF-8 defaults, secured install, phpMyAdmin."],
    ["mail", "Postfix + Dovecot", "smtp · imap", "25/143", "lg:col-span-5", false, "SMTP delivery into Maildir, POP3/IMAP retrieval."],
    ["webmail", "SquirrelMail", "webmail", "443", "lg:col-span-4", false, "Browser mail with secure_login plugin."],
    ["ssl", "SSL / TLS", "mod_ssl", "443", "lg:col-span-3", false, "Self-signed, 3650 days."],
  ];
  const grid = $("#svc-grid");
  grid.innerHTML = SVC.map(([id, name, d, p, span, big, text]) => `
    <div class="reveal ${span}"><button data-id="${id}" class="svc-card group w-full h-full min-h-[200px] text-left p-6 flex flex-col">
      <div class="flex items-start justify-between"><span class="font-display text-cyan text-sm">:${p}</span><span class="flex items-center gap-2 text-[11px] tracking-widest text-neon"><i class="pulse-dot"></i>ACTIVE</span></div>
      <div class="mt-auto">
        <h3 class="font-display font-bold text-white ${big ? "text-3xl sm:text-4xl" : "text-xl"}">${name} <span class="text-magenta opacity-0 group-hover:opacity-100 transition-opacity">↗</span></h3>
        <p class="mt-2 text-[13px] text-[#aab6c4] leading-relaxed">${text}</p>
        <div class="mt-4 flex gap-2 text-[11px]"><span class="px-2 py-0.5 border border-white/15 text-[#c7d0db]">${d}</span><span class="px-2 py-0.5 border border-cyan/30 text-cyan">:${p}</span></div>
      </div>
    </button></div>`).join("");
  grid.addEventListener("mousemove", (e) => {
    const c = e.target.closest(".svc-card"); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
  grid.addEventListener("click", (e) => { const c = e.target.closest(".svc-card"); if (c) { showModule(c.dataset.id); go("#docs"); } });

  /* ---------- Scroll reveals ---------- */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
