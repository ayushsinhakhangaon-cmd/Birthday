"use strict";
const C = window.CONFIG;
const $ = (s, r = document) => r.querySelector(s);
<<<<<<< HEAD
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const photos = C.photos.slice();
const TAU = Math.PI * 2;
let wishI = 0, cur = 0, typing = null;
window.__modal = false;

document.title = `Happy Birthday ${C.name} ✨`;

/* ---------- soft round sprite texture (stars / sparkles) ---------- */
function dotTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(.35, "rgba(255,255,255,.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

=======
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const photos = C.photos.slice();
let wishI = 0, cur = 0, typing = null;

document.title = `Happy Birthday ${C.name} ✨`;

>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
/* ---------- Three.js 3D background ---------- */
(function initScene() {
  const canvas = $("#bg");
  if (!window.THREE) return; // CDN fail ho to site phir bhi chalegi
<<<<<<< HEAD
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return; }
=======
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.z = 14;

  scene.add(new THREE.AmbientLight(0xffc8e6, 0.7));
  const l1 = new THREE.PointLight(0xff6fae, 2.2, 60); l1.position.set(8, 8, 10); scene.add(l1);
  const l2 = new THREE.PointLight(0xf3d28b, 1.6, 60); l2.position.set(-9, -6, 8); scene.add(l2);
<<<<<<< HEAD
  const l3 = new THREE.PointLight(0xb98cff, 1.4, 60); l3.position.set(0, 10, 4); scene.add(l3);

  // Stars (soft glowing dots)
=======

  // Stars
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
  const n = 1400, pos = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 120;
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
<<<<<<< HEAD
  const stars = new THREE.Points(sg, new THREE.PointsMaterial({
    color: 0xffd9ee, size: 0.5, map: dotTexture(), transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending
  }));
=======
  const stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffd9ee, size: 0.18, transparent: true, opacity: 0.85 }));
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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

<<<<<<< HEAD
  // Crystals
  const crystals = [];
  const cgeo = new THREE.IcosahedronGeometry(.6, 0);
  for (let i = 0; i < 9; i++) {
    const m = new THREE.Mesh(cgeo, new THREE.MeshStandardMaterial({ color: i % 2 ? 0xc58cff : 0x7fe3ff, metalness: .6, roughness: .2, flatShading: true }));
    m.scale.setScalar(.6 + Math.random() * 1.1);
    m.position.set((Math.random() - .5) * 34, (Math.random() - .5) * 22, -8 + Math.random() * 6);
    m.userData = { rx: .004 + Math.random() * .01, ry: .004 + Math.random() * .01 };
    scene.add(m); crystals.push(m);
  }

  // Golden rings
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(new THREE.TorusGeometry(5 + i * 2.2, .035, 16, 160),
      new THREE.MeshBasicMaterial({ color: 0xf3d28b, transparent: true, opacity: .32 - i * .06 }));
    r.position.z = -14; r.rotation.set(1 + i * .4, i * .6, 0);
    scene.add(r); rings.push(r);
  }

=======
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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
<<<<<<< HEAD
    if (document.hidden || window.__modal) return;
=======
    if (document.hidden) return;
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
    t += reduce ? 0 : 0.01;
    hearts.forEach(h => {
      h.rotation.y += h.userData.sp; h.rotation.x = Math.sin(t + h.userData.ph) * .3;
      h.position.y = h.userData.y + Math.sin(t + h.userData.ph) * .8;
    });
<<<<<<< HEAD
    crystals.forEach(c => { c.rotation.x += c.userData.rx; c.rotation.y += c.userData.ry; });
    rings.forEach((r, i) => { r.rotation.z += .002 * (i + 1); r.rotation.x += .0012; });
=======
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
    stars.rotation.y = t * .03;
    camera.position.x += (mouse.x * 4 - camera.position.x) * .04;
    camera.position.y += (-mouse.y * 3 - scrollY * .004 - camera.position.y) * .04;
    camera.lookAt(0, camera.position.y * .3, 0);
    renderer.render(scene, camera);
  })();
})();

<<<<<<< HEAD
/* ---------- Confetti + sparkle trail (2D) ---------- */
=======
/* ---------- Confetti (2D) ---------- */
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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
<<<<<<< HEAD
let lastTrail = 0;
document.addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse" || reduce) return;
  const now = performance.now(); if (now - lastTrail < 35) return; lastTrail = now;
  bits.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2 - .4,
    w: 3 + Math.random() * 3, h: 3 + Math.random() * 3, r: Math.random() * 6, vr: .1,
    c: Math.random() < .5 ? "#f3d28b" : "#ff9ccc", life: 34 });
  if (!running) { running = true; requestAnimationFrame(drawFx); }
});

/* ---------- 3D tilt + glass sheen + hero parallax ---------- */
=======

/* ---------- 3D tilt (works on dynamically added cards too) ---------- */
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
let tiltEl = null;
function resetTilt() { if (tiltEl) { tiltEl.style.transform = ""; tiltEl = null; } }
document.addEventListener("pointermove", e => {
  if (e.pointerType === "touch" || reduce) return;
<<<<<<< HEAD
  const el = e.target.closest ? e.target.closest(".tilt") : null;
  if (el !== tiltEl) resetTilt();
  if (el) {
    tiltEl = el;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(10px)`;
  }
  const g = e.target.closest ? e.target.closest(".glass") : null;
  if (g) {
    const r = g.getBoundingClientRect();
    g.style.setProperty("--mx", (e.clientX - r.left) + "px");
    g.style.setProperty("--my", (e.clientY - r.top) + "px");
  }
  const hero = $(".hero");
  if (hero) {
    hero.style.setProperty("--ry", ((e.clientX / innerWidth - .5) * 16) + "deg");
    hero.style.setProperty("--rx", (-(e.clientY / innerHeight - .5) * 12) + "deg");
  }
});
document.addEventListener("pointerleave", resetTilt);

/* ---------- helpers: toast + clipboard ---------- */
let toastT = null;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 4200);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fallback */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.cssText = "position:fixed;opacity:0;left:-999px";
    document.body.append(ta); ta.select();
    const ok = document.execCommand("copy"); ta.remove(); return ok;
  } catch (e) { return false; }
}

=======
  const el = e.target.closest(".tilt");
  if (el !== tiltEl) resetTilt();
  if (!el) return;
  tiltEl = el;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
  el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(10px)`;
});
document.addEventListener("pointerleave", resetTilt);

>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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
<<<<<<< HEAD
    setTimeout(() => { intro.hidden = true; openCake(); }, 700);
=======
    setTimeout(() => { intro.hidden = true; $("#app").hidden = false; scrollTo(0, 0); bigCelebration(); }, 700);
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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

<<<<<<< HEAD
/* ---------- Hero + countdown (gate + hero dono jagah) ---------- */
$("#hn").textContent = C.name;
$("#tag").textContent = C.tagline;
const target = new Date(C.date);
const cdIds = [["d", "gd"], ["h", "gh"], ["m", "gm"], ["s", "gs"]];
function setCd(vals) { cdIds.forEach(([a, b], i) => { $("#" + a).textContent = vals[i]; $("#" + b).textContent = vals[i]; }); }
function tick() {
  const diff = target - new Date();
  const over = diff <= 0;
  $("#gcd").hidden = over; $("#gdone").hidden = !over;
  $("#cd").hidden = over; $("#hdone").hidden = !over;
  if (over) { setCd(["00", "00", "00", "00"]); $("#cdmsg").textContent = ""; return; }
  const pad = v => String(v).padStart(2, "0");
  const t = Math.floor(diff / 1000);
  setCd([pad(Math.floor(t / 86400)), pad(Math.floor(t % 86400 / 3600)), pad(Math.floor(t % 3600 / 60)), pad(t % 60)]);
=======
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
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
  $("#cdmsg").textContent = "Jadoo shuru hone mein…";
}
tick(); setInterval(tick, 1000);
$("#party").addEventListener("click", e => {
  const r = e.currentTarget.getBoundingClientRect();
  confetti(r.left + r.width / 2, r.top, 160); bigCelebration();
});

<<<<<<< HEAD
/* =====================================================================
   DOLL CAKE POPUP (Three.js): doll cake + knife cut + 3D gold text
   ===================================================================== */
function buildCake(canvas) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
  const look = new THREE.Vector3(0, 3.7, 0);
  const camBase = new THREE.Vector3();

  // lights
  scene.add(new THREE.AmbientLight(0xffdcee, .6));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4, 9, 9); scene.add(key);
  const pl1 = new THREE.PointLight(0xff6fae, 1.4, 40); pl1.position.set(-7, 4, 6); scene.add(pl1);
  const pl2 = new THREE.PointLight(0xf3d28b, 1.5, 40); pl2.position.set(7, 7, 5); scene.add(pl2);
  const rim = new THREE.PointLight(0x9ad7ff, 1.1, 40); rim.position.set(0, 5, -9); scene.add(rim);

  // materials
  const M = (c, o) => new THREE.MeshPhysicalMaterial(Object.assign({ color: c, roughness: .38, metalness: .04, clearcoat: .7, clearcoatRoughness: .25 }, o || {}));
  const inner = M(0xfff1d8, { side: THREE.DoubleSide, roughness: .9, clearcoat: 0 });
  const gold = M(0xf3d28b, { metalness: .85, roughness: .28, clearcoat: .4 });
  const skin = M(0xffd8bf, { roughness: .6, clearcoat: .15 });
  const dot = dotTexture();

  // floor glow
  (function () {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const x = c.getContext("2d"), g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255,140,200,.65)"); g.addColorStop(.5, "rgba(255,111,174,.18)"); g.addColorStop(1, "rgba(255,111,174,0)");
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    m.rotation.x = -Math.PI / 2; m.position.y = -.02; scene.add(m);
  })();

  // cake = main body + removable slice (wedge)
  const cake = new THREE.Group(); scene.add(cake);
  const main = new THREE.Group(), slice = new THREE.Group(); cake.add(main, slice);
  const W = .72, cutFaces = [];

  const plate = new THREE.Mesh(new THREE.CylinderGeometry(3.9, 4.05, .15, 80), gold); plate.position.y = .075; cake.add(plate);
  const prim = new THREE.Mesh(new THREE.TorusGeometry(3.98, .05, 12, 100), gold); prim.rotation.x = Math.PI / 2; prim.position.y = .15; cake.add(prim);

  function face(th, rb, rt, y0, h, m) {
    const s = Math.sin(th), c = Math.cos(th), g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array([rb * s, y0, rb * c, rt * s, y0 + h, rt * c, 0, y0 + h, 0, 0, y0, 0]), 3));
    g.setIndex([0, 1, 2, 0, 2, 3]); g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
  const pearlG = new THREE.SphereGeometry(.11, 16, 12), pearlM = M(0xffffff, { roughness: .2, metalness: .2, clearcoat: 1 });
  const inSlice = a => { a = ((a + Math.PI) % TAU + TAU) % TAU - Math.PI; return Math.abs(a) <= W / 2; };
  function ring(r, y, cnt) {
    for (let i = 0; i < cnt; i++) {
      const a = i / cnt * TAU, m = new THREE.Mesh(pearlG, pearlM);
      m.position.set(Math.sin(a) * r, y, Math.cos(a) * r);
      (inSlice(a) ? slice : main).add(m);
    }
  }
  const rb = [2.7, 2.3, 1.95, 1.62], rt = [2.35, 2.0, 1.68, 1.38], H = .85, base0 = .15;
  const tierCols = [0xffa8d0, 0xffc9e3, 0xff8dc0, 0xffd6ea];
  for (let i = 0; i < 4; i++) {
    const y0 = base0 + i * H, mat = M(tierCols[i]);
    const mm = new THREE.Mesh(new THREE.CylinderGeometry(rt[i], rb[i], H, 72, 1, false, W / 2, TAU - W), mat);
    mm.position.y = y0 + H / 2; main.add(mm);
    const ms = new THREE.Mesh(new THREE.CylinderGeometry(rt[i], rb[i], H, 24, 1, false, -W / 2, W), mat);
    ms.position.y = y0 + H / 2; slice.add(ms);
    [W / 2, -W / 2].forEach(a => {
      const fm = face(a, rb[i], rt[i], y0, H, inner), fs = face(a, rb[i], rt[i], y0, H, inner);
      fm.visible = fs.visible = false; main.add(fm); slice.add(fs); cutFaces.push(fm, fs);
    });
    ring(rb[i] + .02, y0 + .06, Math.round(TAU * rb[i] / .3));
  }
  ring(1.25, base0 + 4 * H + .05, 22);
  // center core (doll ko support deta hai, slice nikalne par bhi rehta hai)
  const core = new THREE.Mesh(new THREE.CylinderGeometry(.9, .9, 4 * H - .02, 40), inner);
  core.position.y = base0 + (4 * H - .02) / 2; cake.add(core);

  // ---- doll ----
  const doll = new THREE.Group(); doll.position.y = base0 + 4 * H; cake.add(doll);
  const hairM = M(0x2a0f1f, { roughness: .35, clearcoat: .8 }), dressM = M(0xff5fa8);
  const put = (geo, mat, x, y, z, parent) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); (parent || doll).add(m); return m; };
  put(new THREE.CylinderGeometry(.46, .72, 1.0, 40), dressM, 0, .5, 0);                       // bodice
  put(new THREE.TorusGeometry(.7, .045, 12, 48), gold, 0, .08, 0).rotation.x = Math.PI / 2;    // belt
  put(new THREE.SphereGeometry(.09, 16, 12), gold, 0, .1, .7);                                 // buckle
  put(new THREE.SphereGeometry(.5, 28, 20), skin, 0, 1.08, 0).scale.set(1.05, .4, .7);         // shoulders
  put(new THREE.CylinderGeometry(.13, .16, .3, 20), skin, 0, 1.3, 0);                          // neck
  const neck = put(new THREE.TorusGeometry(.2, .014, 8, 40), gold, 0, 1.2, .02); neck.rotation.x = Math.PI / 2.4; // necklace
  put(new THREE.SphereGeometry(.5, 40, 32), skin, 0, 1.78, 0);                                 // head
  put(new THREE.SphereGeometry(.54, 36, 28), hairM, 0, 1.82, -.07);                            // hair back
  put(new THREE.CylinderGeometry(.5, .64, 1.9, 28, 1, true, Math.PI - 1.5, 3.0), M(0x2a0f1f, { side: THREE.DoubleSide, roughness: .35, clearcoat: .8 }), 0, 1.0, -.05); // long hair
  const bangs = put(new THREE.SphereGeometry(.52, 36, 18, 0, TAU, 0, .9), hairM, 0, 1.8, .02); bangs.rotation.x = .55; // fringe
  [-1, 1].forEach(sx => {
    put(new THREE.SphereGeometry(.055, 14, 12), new THREE.MeshStandardMaterial({ color: 0x1a0a14, roughness: .2 }), sx * .17, 1.74, .47);
    put(new THREE.SphereGeometry(.018, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }), sx * .17 + .018, 1.76, .52);
    const bl = put(new THREE.CircleGeometry(.08, 20), new THREE.MeshBasicMaterial({ color: 0xff7aa8, transparent: true, opacity: .45 }), sx * .29, 1.62, .39);
    bl.rotation.y = sx * .6;
  });
  put(new THREE.TorusGeometry(.1, .013, 8, 24, Math.PI), new THREE.MeshBasicMaterial({ color: 0xc2335f }), 0, 1.62, .485).rotation.z = Math.PI; // smile
  const crown = new THREE.Group(); crown.position.set(0, 2.38, 0); crown.rotation.x = -.12; doll.add(crown);
  put(new THREE.CylinderGeometry(.3, .33, .14, 28), gold, 0, 0, 0, crown);
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * TAU, px = Math.sin(a) * .31, pz = Math.cos(a) * .31;
    put(new THREE.ConeGeometry(.07, .26, 10), gold, px, .2, pz, crown);
    put(new THREE.SphereGeometry(.035, 10, 8), M(0xff4f9a, { emissive: 0x551133 }), px, .35, pz, crown);
  }
  const arms = [];
  [-1, 1].forEach(sd => {
    const p = new THREE.Group(); p.position.set(sd * .55, 1.08, 0); doll.add(p);
    put(new THREE.SphereGeometry(.17, 16, 12), dressM, 0, 0, 0, p);
    put(new THREE.CylinderGeometry(.065, .055, .85, 14), skin, 0, -.45, 0, p);
    put(new THREE.SphereGeometry(.09, 14, 12), skin, 0, -.9, 0, p);
    p.rotation.z = sd * 2.3; arms.push([p, sd]);
  });

  // ---- sparkles + burst ----
  const SN = 220, sp = new Float32Array(SN * 3), sv = new Float32Array(SN);
  for (let i = 0; i < SN; i++) { sp[i * 3] = (Math.random() - .5) * 10; sp[i * 3 + 1] = Math.random() * 9; sp[i * 3 + 2] = (Math.random() - .5) * 6; sv[i] = .004 + Math.random() * .012; }
  const sgeo = new THREE.BufferGeometry(); sgeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sgeo, new THREE.PointsMaterial({ color: 0xffe3a8, size: .28, map: dot, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));

  const BN = 380, bp = new Float32Array(BN * 3), bv = new Float32Array(BN * 3), bc = new Float32Array(BN * 3);
  const bgeo = new THREE.BufferGeometry();
  bgeo.setAttribute("position", new THREE.BufferAttribute(bp, 3)); bgeo.setAttribute("color", new THREE.BufferAttribute(bc, 3));
  const bmat = new THREE.PointsMaterial({ size: .26, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const bpts = new THREE.Points(bgeo, bmat); bpts.visible = false; bpts.frustumCulled = false; scene.add(bpts);
  let bT = 0;
  function burst() {
    const pal = [[1, .44, .68], [.95, .82, .55], [1, 1, 1], [.77, .55, 1], [.5, .89, 1]];
    for (let i = 0; i < BN; i++) {
      bp[i * 3] = 0; bp[i * 3 + 1] = 4.2; bp[i * 3 + 2] = 0;
      const a = Math.random() * TAU, u = Math.random() * 2 - 1, sc = .08 + Math.random() * .2, r = Math.sqrt(1 - u * u);
      bv[i * 3] = r * Math.cos(a) * sc; bv[i * 3 + 1] = u * sc + .06; bv[i * 3 + 2] = r * Math.sin(a) * sc;
      const c = pal[i % pal.length]; bc[i * 3] = c[0]; bc[i * 3 + 1] = c[1]; bc[i * 3 + 2] = c[2];
    }
    bgeo.attributes.position.needsUpdate = true; bgeo.attributes.color.needsUpdate = true;
    bpts.visible = true; bmat.opacity = 1; bT = 1;
  }

  // ---- 3D gold text ----
  let textMesh = null;
  if (THREE.FontLoader && THREE.TextGeometry) {
    new THREE.FontLoader().load("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json", font => {
      const g = new THREE.TextGeometry("HAPPY BIRTHDAY", { font, size: .55, height: .22, curveSegments: 8, bevelEnabled: true, bevelThickness: .04, bevelSize: .025, bevelSegments: 3 });
      g.center(); g.computeBoundingBox();
      const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0xf3d28b, metalness: .6, roughness: .3, emissive: 0x4a2a00, emissiveIntensity: .45 }));
      const w = g.boundingBox.max.x - g.boundingBox.min.x; if (w > 6) m.scale.setScalar(6 / w);
      m.position.y = 7.6; scene.add(m); textMesh = m;
    }, undefined, () => {});
  }

  // ---- knife ----
  const knife = new THREE.Group(); knife.visible = false; scene.add(knife);
  put(new THREE.BoxGeometry(.05, 1.6, 1.8), new THREE.MeshStandardMaterial({ color: 0xe9eef7, metalness: .9, roughness: .18 }), 0, 0, 0, knife);
  put(new THREE.BoxGeometry(.14, .2, .8), M(0x8a2f64), 0, .78, .8, knife);
  put(new THREE.BoxGeometry(.18, .26, .08), gold, 0, .78, .38, knife);

  // ---- state machine ----
  let state = "idle", ct = 0, onDone = null, rotY = 0, dragging = false, lastX = 0, shake = 0, t = 0;
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const seg = (v, a, b) => cl((v - a) / (b - a), 0, 1);
  const ease = v => 1 - Math.pow(1 - v, 3);
  const easeIO = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  function setKnife(th, y) { knife.rotation.y = th; knife.position.set(Math.sin(th) * 1.95, y, Math.cos(th) * 1.95); }

  function step(dt) {
    t += dt;
    if (state === "cut") {
      ct += dt;
      rotY += (Math.round(rotY / TAU) * TAU - rotY) * Math.min(1, dt * 6);
      if (ct > .9) knife.visible = ct < 4.3;
      const th = -W / 2 + W * easeIO(seg(ct, 2.1, 2.5));
      let y;
      if (ct < 1.6) y = 8 - 7.05 * ease(seg(ct, .9, 1.6));
      else if (ct < 2.1) y = .95 + 3.05 * ease(seg(ct, 1.6, 2.1));
      else if (ct < 2.5) y = 4;
      else if (ct < 3.5) y = 4 - 3.05 * ease(seg(ct, 2.5, 3.1));
      else y = .95 + 7.05 * ease(seg(ct, 3.5, 4.1));
      setKnife(th, y);
      if (ct > 1.2 && !cutFaces[0].visible) cutFaces.forEach(f => f.visible = true);
      if ((ct > 1.55 && ct - dt <= 1.55) || (ct > 3.05 && ct - dt <= 3.05)) shake = .12;
      const s = ease(seg(ct, 3.6, 4.8));
      slice.position.set(0, s * .18, s * 1.1);
      if (ct >= 4.9) { state = "done"; burst(); shake = .1; if (onDone) onDone(); }
    } else if (!dragging) {
      rotY += dt * .35;
    }
    cake.rotation.y = rotY;
    const excited = state === "done";
    arms.forEach(([p, sd]) => { p.rotation.z = sd * (2.3 + Math.sin(t * (excited ? 6 : 2) + (sd > 0 ? 0 : 1.5)) * (excited ? .35 : .1)); });
    for (let i = 0; i < SN; i++) { sp[i * 3 + 1] += sv[i]; if (sp[i * 3 + 1] > 9) sp[i * 3 + 1] = 0; }
    sgeo.attributes.position.needsUpdate = true;
    if (bT > 0) {
      for (let i = 0; i < BN; i++) { bp[i * 3] += bv[i * 3]; bp[i * 3 + 1] += bv[i * 3 + 1]; bp[i * 3 + 2] += bv[i * 3 + 2]; bv[i * 3 + 1] -= .0025; }
      bgeo.attributes.position.needsUpdate = true;
      bT -= .006; bmat.opacity = Math.min(1, bT * 1.5);
      if (bT <= 0) bpts.visible = false;
    }
    if (textMesh) { textMesh.position.y = 7.6 + Math.sin(t * 1.5) * .12; textMesh.rotation.y = Math.sin(t * .8) * .3; }
    shake *= .9;
    camera.position.set(camBase.x + (Math.random() - .5) * shake, camBase.y + (Math.random() - .5) * shake, camBase.z);
    camera.lookAt(look);
  }

  function resize() {
    const p = canvas.parentElement, w = p.clientWidth || 300, h = p.clientHeight || 360;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    camBase.set(0, 5.2, Math.max(13.2, 12.9 / camera.aspect));
  }
  addEventListener("resize", () => { if (window.__modal) resize(); });

  canvas.addEventListener("pointerdown", e => { if (state === "cut") return; dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", e => { if (!dragging) return; rotY += (e.clientX - lastX) * .01; lastX = e.clientX; });
  const endDrag = () => { dragging = false; };
  canvas.addEventListener("pointerup", endDrag); canvas.addEventListener("pointercancel", endDrag);

  let raf = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(.05, (now - last) / 1000 || 0); last = now;
    step(dt); renderer.render(scene, camera);
  }
  return {
    resize,
    start() { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(loop); },
    stop() { cancelAnimationFrame(raf); },
    cut(cb) { if (state !== "idle") return; state = "cut"; ct = 0; onDone = cb; }
  };
}

let cakeAPI = null;
function openCake() {
  const modal = $("#cakeModal");
  modal.classList.remove("fade"); modal.hidden = false;
  document.body.classList.add("modal-open"); window.__modal = true;
  if (!cakeAPI && window.THREE) cakeAPI = buildCake($("#cakeCanvas"));
  if (cakeAPI) { cakeAPI.resize(); cakeAPI.start(); }
  else $(".cm-stage").innerHTML = '<div class="cake-emoji" aria-hidden="true">🎂</div>';
}
$("#cutBtn").addEventListener("click", () => {
  $("#cutBtn").disabled = true;
  $("#cmMsg").textContent = "Chhuri chal rahi hai… 🔪🎂";
  const done = () => {
    $("#cmTitle").textContent = "Happy Birthday, Queen!";
    $("#cmMsg").textContent = "Cake cut ho gaya! Ab apni duniya mein chalo 💗";
    $("#cutBtn").hidden = true; $("#enterBtn").hidden = false;
    bigCelebration();
  };
  if (cakeAPI) cakeAPI.cut(done); else setTimeout(done, 900);
});
$("#enterBtn").addEventListener("click", () => {
  const m = $("#cakeModal"); m.classList.add("fade");
  setTimeout(() => {
    m.hidden = true; if (cakeAPI) cakeAPI.stop();
    window.__modal = false; document.body.classList.remove("modal-open");
    $("#app").hidden = false; scrollTo(0, 0); bigCelebration();
  }, 600);
});

=======
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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
<<<<<<< HEAD
=======
$("#add").addEventListener("change", e => {
  [...e.target.files].forEach(f => photos.push({ src: URL.createObjectURL(f), cap: `New memory ${photos.length + 1}` }));
  e.target.value = ""; renderAlbum(); cur = photos.length - 1; layoutFlow();
});
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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

<<<<<<< HEAD
/* ---------- Candle cake (section) ---------- */
=======
/* ---------- Cake ---------- */
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
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

<<<<<<< HEAD
/* ---------- 3D photo cube ---------- */
$$(".cube .f").forEach((f, i) => { if (C.cube[i]) f.style.setProperty("--img", `url("${C.cube[i]}")`); });
=======
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
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa

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
<<<<<<< HEAD
})();

/* ---------- Review: Instagram + WhatsApp ---------- */
let rating = 5;
const starBtns = $$("#stars button");
function paintStars() { starBtns.forEach((b, i) => b.classList.toggle("on", i < rating)); }
starBtns.forEach((b, i) => b.addEventListener("click", () => { rating = i + 1; paintStars(); }));
paintStars();
$("#fbo").addEventListener("click", () => $("#fb").showModal());
$("#fbc").addEventListener("click", () => $("#fb").close());
function reviewParts() {
  return { name: $("#fn").value.trim() || "Anonymous", msg: $("#fm").value.trim(), stars: "★".repeat(rating) + "☆".repeat(5 - rating) };
}
$("#sendIg").addEventListener("click", async () => {
  if (!$("#wf").reportValidity()) return;
  const r = reviewParts();
  const text = `💌 Birthday Website Review\n👤 Name: ${r.name}\n⭐ Rating: ${r.stars} (${rating}/5)\n📝 Message: ${r.msg}`;
  const ok = await copyText(text);
  toast(ok ? "Review copy ho gaya ✅ Instagram DM mein paste karke send kar do" : "Instagram khul raha hai: apna review DM mein likh dena");
   const url = `https://www.instagram.com/${C.instagram}/`;
  if (!window.open(url, "_blank", "noopener")) location.href = url;
  $("#fb").close(); $("#wf").reset(); rating = 5; paintStars();
});
$("#sendWa").addEventListener("click", () => {
  if (!$("#wf").reportValidity()) return;
  const r = reviewParts();
  const text = `💌 *Birthday Website Review*\n👤 Name: ${r.name}\n⭐ Rating: ${r.stars} (${rating}/5)\n📝 Message: ${r.msg}`;
  window.open(`https://wa.me/${String(C.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  $("#fb").close(); $("#wf").reset(); rating = 5; paintStars();
});

/* ---------- Scroll reveal ---------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$("#app section").forEach(s => { s.classList.add("rv"); io.observe(s); });
}
=======
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
>>>>>>> 9bf1680d82bde9dc0a7dabf5094f7bb3825970aa
