"use strict";
const C = window.CONFIG;
const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const photos = C.photos.slice();
let wishI = 0, cur = 0, typing = null;

document.title = `Happy Birthday ${C.name} ✨`;

/* ---------- Three.js 3D background ---------- */
(function initScene() {
  const canvas = $("#bg");
  if (!window.THREE) return; // CDN fail ho to site phir bhi chalegi
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.z = 14;

  scene.add(new THREE.AmbientLight(0xffc8e6, 0.7));
  const l1 = new THREE.PointLight(0xff6fae, 2.2, 60); l1.position.set(8, 8, 10); scene.add(l1);
  const l2 = new THREE.PointLight(0xf3d28b, 1.6, 60); l2.position.set(-9, -6, 8); scene.add(l2);

  // Stars
  const n = 1400, pos = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 120;
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffd9ee, size: 0.18, transparent: true, opacity: 0.85 }));
  scene.add(stars);

  // 3D hearts
  const s = new THREE.Shape();
  s.moveTo(.25, .25); s.bezierCurveTo(.25, .25, .2, 0, 0, 0); s.bezierCurveTo(-.3, 0, -.3, .35, -.3, .35);
  s.bezierCurveTo(-.3, .55, -.15, .77, .25, .95); s.bezierCurveTo(.6, .77, .8, .55, .8, .35);
  s.bezierCurveTo(.8, .35, .8, 0, .5, 0); s.bezierCurveTo(.35, 0, .25, .25, .25, .25);
  const hg = new THREE.ExtrudeGeometry(s, { depth: .25, bevelEnabled: true, bevelSize: .08, bevelThickness: .08, bevelSegments: 4 });
  hg.center();
  const colors = [0xff6fae, 0xff9ccc, 0xf3d28b, 0xc58cff];
  const hearts = [];
  for (let i = 0; i < 22; i++) {
    const m = new THREE.Mesh(hg, new THREE.MeshStandardMaterial({ color: colors[i % 4], metalness: .45, roughness: .28 }));
    const sc = 0.6 + Math.random() * 1.4;
    m.scale.setScalar(sc);
    m.position.set((Math.random() - .5) * 30, (Math.random() - .5) * 20, -6 + Math.random() * 8);
    m.userData = { sp: .004 + Math.random() * .01, ph: Math.random() * 6.28, y: m.position.y };
    scene.add(m); hearts.push(m);
  }

  const mouse = { x: 0, y: 0 };
  addEventListener("pointermove", e => {
    mouse.x = e.clientX / innerWidth - .5; mouse.y = e.clientY / innerHeight - .5;
  });
  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize); resize();

  let t = 0;
  (function loop() {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    t += reduce ? 0 : 0.01;
    hearts.forEach(h => {
      h.rotation.y += h.userData.sp; h.rotation.x = Math.sin(t + h.userData.ph) * .3;
      h.position.y = h.userData.y + Math.sin(t + h.userData.ph) * .8;
    });
    stars.rotation.y = t * .03;
    camera.position.x += (mouse.x * 4 - camera.position.x) * .04;
    camera.position.y += (-mouse.y * 3 - scrollY * .004 - camera.position.y) * .04;
    camera.lookAt(0, camera.position.y * .3, 0);
    renderer.render(scene, camera);
  })();
})();

/* ---------- Confetti (2D) ---------- */
const fx = $("#fx"), ctx = fx.getContext("2d");
let bits = [], running = false;
function fxSize() { fx.width = innerWidth; fx.height = innerHeight; }
addEventListener("resize", fxSize); fxSize();
function confetti(x = innerWidth / 2, y = innerHeight / 3, count = 140) {
  if (reduce) count = 20;
  const cols = ["#ff6fae", "#f3d28b", "#fff", "#c58cff", "#7fe3ff", "#ff9ccc"];
  for (let i = 0; i < count; i++) {
    const a = Math.random() * 6.28, v = 3 + Math.random() * 9;
    bits.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, w: 5 + Math.random() * 6, h: 3 + Math.random() * 5,
      r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[i % cols.length], life: 120 + Math.random() * 80 });
  }
  if (!running) { running = true; requestAnimationFrame(drawFx); }
}
function drawFx() {
  ctx.clearRect(0, 0, fx.width, fx.height);
  bits = bits.filter(b => b.life-- > 0 && b.y < fx.height + 20);
  for (const b of bits) {
    b.x += b.vx; b.y += b.vy; b.vy += .16; b.vx *= .99; b.r += b.vr;
    ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
    ctx.globalAlpha = Math.min(1, b.life / 40); ctx.fillStyle = b.c;
    ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore();
  }
  if (bits.length) requestAnimationFrame(drawFx);
  else { running = false; ctx.clearRect(0, 0, fx.width, fx.height); }
}
function bigCelebration() {
  for (let i = 0; i < 6; i++) setTimeout(() => confetti(innerWidth * (.1 + Math.random() * .8), innerHeight * (.2 + Math.random() * .3), 90), i * 250);
}

/* ---------- 3D tilt (works on dynamically added cards too) ---------- */
let tiltEl = null;
function resetTilt() { if (tiltEl) { tiltEl.style.transform = ""; tiltEl = null; } }
document.addEventListener("pointermove", e => {
  if (e.pointerType === "touch" || reduce) return;
  const el = e.target.closest(".tilt");
  if (el !== tiltEl) resetTilt();
  if (!el) return;
  tiltEl = el;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
  el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(10px)`;
});
document.addEventListener("pointerleave", resetTilt);

/* ---------- Gate ---------- */
function setMusicLabel() {
  const p = $("#aud").paused;
  $("#mus").textContent = p ? "♫ Play music" : "♫ Pause music";
  $("#mus").classList.toggle("on", !p);
}
function playIntro() {
  const box = $("#introText"), intro = $("#intro"); let k = 0, done = false;
  box.textContent = "";
  "Welcome to your Surprise Journey".split(" ").forEach(w => {
    const word = document.createElement("span"); word.className = "w";
    [...w].forEach(ch => { const l = document.createElement("span"); l.textContent = ch; l.style.setProperty("--i", k++); word.append(l); });
    box.append(word, " ");
  });
  intro.classList.remove("fade"); intro.hidden = false;
  const end = () => {
    if (done) return; done = true; intro.classList.add("fade");
    setTimeout(() => { intro.hidden = true; $("#app").hidden = false; scrollTo(0, 0); bigCelebration(); }, 700);
  };
  setTimeout(end, 4800); intro.onclick = end;
}
$("#gf").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("#pw");
  if (input.value.trim().toLowerCase() !== C.password.toLowerCase()) {
    $("#err").textContent = "Oops! Sahi secret password try karo 💗";
    input.value = ""; input.focus(); return;
  }
  $("#gate").hidden = true;
  const aud = $("#aud"); aud.src = C.music; aud.volume = .6;
  aud.play().catch(() => addEventListener("pointerdown", () => aud.play().catch(() => {}), { once: true })).finally(setMusicLabel);
  playIntro();
});
$("#aud").addEventListener("play", setMusicLabel);
$("#aud").addEventListener("pause", setMusicLabel);
$("#mus").addEventListener("click", () => {
  const a = $("#aud");
  if (a.paused) a.play().catch(() => alert("music/birthday.mp3 file project me rakho."));
  else a.pause();
});

/* ---------- Hero + countdown ---------- */
$("#hn").textContent = C.name;
$("#tag").textContent = C.tagline;
const target = new Date(C.date);
function tick() {
  const diff = target - new Date();
  const pad = v => String(v).padStart(2, "0");
  if (diff <= 0) {
    ["d", "h", "m", "s"].forEach(id => $("#" + id).textContent = "00");
    $("#cdmsg").textContent = "Aaj aapka din hai! 🎂";
    return;
  }
  const t = Math.floor(diff / 1000);
  $("#d").textContent = pad(Math.floor(t / 86400));
  $("#h").textContent = pad(Math.floor(t % 86400 / 3600));
  $("#m").textContent = pad(Math.floor(t % 3600 / 60));
  $("#s").textContent = pad(t % 60);
  $("#cdmsg").textContent = "Jadoo shuru hone mein…";
}
tick(); setInterval(tick, 1000);
$("#party").addEventListener("click", e => {
  const r = e.currentTarget.getBoundingClientRect();
  confetti(r.left + r.width / 2, r.top, 160); bigCelebration();
});

/* ---------- Lightbox ---------- */
const lb = $("#lb-view");
function showLb() {
  const p = photos[cur]; if (!p) return;
  $("img", lb).src = p.src; $("img", lb).alt = p.cap;
  $("figcaption", lb).textContent = `${p.cap} (${cur + 1}/${photos.length})`;
}
function openLb(i) { cur = i; lb.hidden = false; showLb(); layoutFlow(); }
function stepLb(d) { go(d); showLb(); }
$(".x", lb).addEventListener("click", () => lb.hidden = true);
$(".p", lb).addEventListener("click", () => stepLb(-1));
$(".n", lb).addEventListener("click", () => stepLb(1));
lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") lb.hidden = true;
  if (e.key === "ArrowLeft") stepLb(-1);
  if (e.key === "ArrowRight") stepLb(1);
});

/* ---------- Album: 3D coverflow + thumbnails ---------- */
const flow = $("#flow"), strip = $("#grid"); let auto = null;
const loadImg = p => new Promise(r => { const i = new Image(); i.onload = () => r(p); i.onerror = () => r(null); i.src = p.src; });
function layoutFlow() {
  const n = photos.length; if (!n) return;
  [...flow.children].forEach((el, i) => {
    let o = ((i - cur) % n + n) % n; if (o > n / 2) o -= n;
    const a = Math.abs(o);
    el.style.transform = `translateX(${o * 190}px) translateZ(${-a * 150}px) rotateY(${-o * 38}deg)`;
    el.style.opacity = a > 2 ? 0 : 1 - a * .22;
    el.style.zIndex = 10 - a; el.style.pointerEvents = a > 2 ? "none" : "auto";
  });
  [...strip.children].forEach((t, i) => t.classList.toggle("on", i === cur));
}
function go(d) { if (!photos.length) return; cur = (cur + d + photos.length) % photos.length; layoutFlow(); }
function autoplay() { clearInterval(auto); auto = setInterval(() => { if (!document.hidden && lb.hidden) go(1); }, 3500); }
function renderAlbum() {
  flow.textContent = ""; strip.textContent = "";
  photos.forEach((p, i) => {
    const f = document.createElement("button"); f.type = "button"; f.className = "slide"; f.setAttribute("aria-label", p.cap);
    const im = new Image(); im.src = p.src; im.alt = p.cap;
    const c = document.createElement("span"); c.textContent = p.cap; f.append(im, c);
    f.addEventListener("click", () => { if (i === cur) openLb(i); else { cur = i; layoutFlow(); autoplay(); } });
    flow.append(f);
    const t = document.createElement("button"); t.type = "button"; t.className = "thumb"; t.setAttribute("aria-label", p.cap);
    const ti = new Image(); ti.src = p.src; ti.alt = ""; t.append(ti);
    t.addEventListener("click", () => { cur = i; layoutFlow(); autoplay(); });
    strip.append(t);
  });
  cur = Math.min(cur, Math.max(photos.length - 1, 0)); layoutFlow();
}
$("#fprev").addEventListener("click", () => { go(-1); autoplay(); });
$("#fnext").addEventListener("click", () => { go(1); autoplay(); });
$("#add").addEventListener("change", e => {
  [...e.target.files].forEach(f => photos.push({ src: URL.createObjectURL(f), cap: `New memory ${photos.length + 1}` }));
  e.target.value = ""; renderAlbum(); cur = photos.length - 1; layoutFlow();
});
Promise.all(photos.map(loadImg)).then(r => { photos.splice(0, photos.length, ...r.filter(Boolean)); renderAlbum(); autoplay(); });

/* ---------- Letter (typewriter) ---------- */
$("#lb").addEventListener("click", () => {
  const p = $("#lt"); let i = 0;
  clearInterval(typing); p.textContent = "";
  confetti(innerWidth / 2, innerHeight / 2, 80);
  typing = setInterval(() => {
    if (i >= C.letter.length) return clearInterval(typing);
    p.textContent += (i ? "\n\n" : "") + C.letter[i++];
  }, 1100);
});

/* ---------- Cake ---------- */
const candles = $(".candles"), cakeBox = $(".cakebox");
candles.style.pointerEvents = "auto";
cakeBox.setAttribute("aria-hidden", "false");
for (let i = 0; i < 5; i++) {
  const c = document.createElement("button");
  c.type = "button"; c.className = "candle"; c.setAttribute("aria-label", "Blow candle");
  c.addEventListener("click", () => { c.classList.add("out"); checkCandles(); });
  candles.append(c);
}
function checkCandles() {
  const all = [...candles.children];
  if (all.every(c => c.classList.contains("out"))) {
    $("#cm").textContent = "Wish ho gayi! Happy Birthday 🎉";
    $("#blow").textContent = "Light the candles again";
    bigCelebration();
  } else {
    $("#cm").textContent = `${all.filter(c => !c.classList.contains("out")).length} candles baaki hain…`;
  }
}
$("#blow").addEventListener("click", () => {
  const all = [...candles.children];
  if (all.every(c => c.classList.contains("out"))) {
    all.forEach(c => c.classList.remove("out"));
    $("#cm").textContent = "Naya wish maango ✨"; $("#blow").textContent = "Blow the candles";
  } else { all.forEach(c => c.classList.add("out")); checkCandles(); }
});

/* ---------- Wish jar ---------- */
$("#wb").addEventListener("click", () => {
  $("#wm").textContent = C.wishes[wishI++ % C.wishes.length];
  confetti(innerWidth / 2, innerHeight * .6, 70);
});

/* ---------- Feedback ---------- */
$("#fbo").addEventListener("click", () => $("#fb").showModal());
$("#fbc").addEventListener("click", () => $("#fb").close());

/* ---------- 3D photo cube ---------- */
const faces = [...document.querySelectorAll(".cube .f")];
faces.forEach((f, i) => { if (C.cube[i]) f.style.setProperty("--img", `url("${C.cube[i]}")`); });
$("#cubeAdd").addEventListener("change", e => {
  [...e.target.files].slice(0, 6).forEach((file, i) => faces[i].style.setProperty("--img", `url("${URL.createObjectURL(file)}")`));
  e.target.value = "";
});

/* ---------- Birthday calendar ---------- */
(function () {
  const y = target.getFullYear(), mo = target.getMonth(), bd = target.getDate();
  const month = target.toLocaleString("en", { month: "long" });
  $("#calTitle").textContent = `${month} ${y}`;
  $("#calCap").textContent = `${bd} ${month} · aapka khaas din 🎂`;
  const g = $("#calgrid"), add = (tag, cls, txt) => { const e = document.createElement(tag); e.className = cls; e.textContent = txt; g.append(e); return e; };
  "SMTWTFS".split("").forEach(d => add("span", "wk", d));
  for (let i = 0; i < new Date(y, mo, 1).getDay(); i++) add("span", "day", "");
  for (let d = 1; d <= new Date(y, mo + 1, 0).getDate(); d++) {
    if (d === bd) {
      const b = add("button", "day bd", d); b.type = "button"; b.setAttribute("aria-label", `Birthday ${bd} ${month}`);
      b.addEventListener("click", () => { const r = b.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top, 120); });
    } else add("span", "day", d);
  }
  $("#calImg").src = C.calendarPhoto;
  $("#calAdd").addEventListener("change", e => { if (e.target.files[0]) $("#calImg").src = URL.createObjectURL(e.target.files[0]); e.target.value = ""; });
})();

/* ---------- Feedback -> WhatsApp ---------- */
$("#wf").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#fn").value.trim() || "Anonymous", msg = $("#fm").value.trim();
  const text = `💌 *Birthday Website Feedback*\n👤 Name: ${name}\n📝 Message: ${msg}`;
  window.open(`https://wa.me/${String(C.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  $("#fb").close(); e.target.reset();
});