/* ===========================================================
   ams&watchco — interactions
   =========================================================== */

/* ---------- SVG watch generator ---------- */
const THEMES = {
  classic: { case:['#f3d98a','#a67c1d'], strap:['#3a3a40','#15151a'], dial:'#0a0a0d', mark:'#d4af37', hand:'#d4af37', text:'#d4af37' },
  rose:    { case:['#f2c6a6','#a8683f'], strap:['#e0b090','#8d5a38'], dial:'#f4efe9', mark:'#b8764f', hand:'#8d5a38', text:'#8d5a38' },
  smart:   { case:['#4a4a52','#17171c'], strap:['#26262c','#0c0c10'], dial:'#050507', mark:'#d4af37', hand:'#fff',    text:'#fff', digital:true },
  chrono:  { case:['#e4e4ea','#7b7b86'], strap:['#cfcfd6','#6c6c76'], dial:'#0b0d18', mark:'#e8e8f0', hand:'#e8e8f0', text:'#7fb2ff', blue:true }
};

let uid = 0;
function watchSVG(kind = 'classic') {
  const t = THEMES[kind]; const id = 'w' + (uid++);
  let marks = '';
  for (let i = 0; i < 12; i++) {
    const long = i % 3 === 0;
    marks += `<rect x="${100 - (long ? 2.2 : 1.2)}" y="${long ? 22 : 24}" width="${long ? 4.4 : 2.4}" height="${long ? 15 : 10}" rx="1.2" fill="${t.mark}" transform="rotate(${i * 30} 100 100)"/>`;
  }
  const face = t.digital
    ? `<text x="100" y="112" text-anchor="middle" font-family="Montserrat,sans-serif" font-weight="600" font-size="46" fill="#fff" letter-spacing="1">10</text>
       <text x="100" y="150" text-anchor="middle" font-family="Montserrat,sans-serif" font-weight="600" font-size="46" fill="#fff">08</text>
       <circle cx="146" cy="100" r="5" fill="${t.mark}"/>`
    : `${marks}
       ${t.blue ? `<circle cx="100" cy="132" r="14" fill="none" stroke="${t.text}" stroke-width="1.5"/><circle cx="70" cy="100" r="14" fill="none" stroke="${t.text}" stroke-width="1.5"/><circle cx="130" cy="100" r="14" fill="none" stroke="${t.text}" stroke-width="1.5"/>` : ''}
       <text x="100" y="${t.blue ? 66 : 70}" text-anchor="middle" font-family="Cinzel,serif" font-size="7" fill="${t.text}" letter-spacing="1.5">AMS&amp;WATCHCO</text>
       <g transform="rotate(-60 100 100)"><rect x="97.6" y="52" width="4.8" height="52" rx="2.4" fill="${t.hand}"/></g>
       <g transform="rotate(60 100 100)"><rect x="98.2" y="34" width="3.6" height="70" rx="1.8" fill="${t.hand}"/></g>
       <rect x="99.3" y="30" width="1.4" height="84" fill="${kind === 'rose' ? '#8d5a38' : '#d4af37'}" transform="rotate(150 100 100)"/>
       <circle cx="100" cy="100" r="5" fill="${t.hand}"/><circle cx="100" cy="100" r="2" fill="#000"/>`;

  return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${kind} watch">
    <defs>
      <linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.case[0]}"/><stop offset="1" stop-color="${t.case[1]}"/></linearGradient>
      <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.strap[1]}"/><stop offset=".5" stop-color="${t.strap[0]}"/><stop offset="1" stop-color="${t.strap[1]}"/></linearGradient>
      <radialGradient id="${id}g" cx=".3" cy=".25" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></radialGradient>
    </defs>
    <!-- strap -->
    <path d="M62 0h76l-6 82H68z" fill="url(#${id}s)"/>
    <path d="M68 218h64l6 82H62z" fill="url(#${id}s)"/>
    <g stroke="rgba(0,0,0,.35)" stroke-width="1.2">
      <path d="M66 22h68M65 44h70M66 66h68M66 234h68M65 256h70M64 278h72"/>
    </g>
    <!-- case -->
    <g transform="translate(0 50)">
      <circle cx="100" cy="100" r="90" fill="url(#${id}c)"/>
      <circle cx="100" cy="100" r="82" fill="#0006"/>
      <circle cx="100" cy="100" r="78" fill="url(#${id}c)"/>
      <circle cx="100" cy="100" r="73" fill="${t.dial}"/>
      <rect x="188" y="92" width="10" height="16" rx="4" fill="url(#${id}c)"/>
      ${face}
      <circle cx="100" cy="100" r="73" fill="url(#${id}g)"/>
    </g>
  </svg>`;
}

/* ---------- Data ---------- */
const CATEGORIES = [
  { name: "Men's Watches", kind: 'chrono' },
  { name: "Women's Watches", kind: 'rose' },
  { name: 'Smartwatches', kind: 'smart' },
  { name: 'Luxury Collection', kind: 'classic' }
];
const PRODUCTS = [
  { name: 'Classic Heritage', type: "Men's Analog Watch",     price: 4999,  rating: 4, count: 124, kind: 'classic' },
  { name: 'Rose Elegance',    type: "Women's Watch",          price: 5499,  rating: 5, count: 98,  kind: 'rose' },
  { name: 'Urban Fit',        type: 'Smartwatch',             price: 7999,  rating: 4, count: 210, kind: 'smart' },
  { name: 'Ocean Master',     type: "Men's Luxury Watch",     price: 12999, rating: 5, count: 176, kind: 'chrono' }
];
const SLIDES = [
  { kind: 'classic', name: 'Classic Heritage' },
  { kind: 'rose',    name: 'Rose Elegance' },
  { kind: 'chrono',  name: 'Ocean Master' }
];

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = n => '₹ ' + n.toLocaleString('en-IN');

/* ---------- Render ---------- */
$('#catGrid').innerHTML = CATEGORIES.map(c => `
  <article class="cat reveal" tabindex="0">
    <div class="cat-img">${watchSVG(c.kind)}</div>
    <div class="cat-label"><span>${c.name}</span><b>→</b></div>
  </article>`).join('');

$('#prodGrid').innerHTML = PRODUCTS.map((p, i) => `
  <article class="prod reveal" style="transition-delay:${i * 90}ms">
    <button class="wish" aria-label="Add to wishlist"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.600-9 9-9 9z"/></svg></button>
    <div class="prod-img">${watchSVG(p.kind)}</div>
    <h3>${p.name}</h3>
    <div class="type">${p.type}</div>
    <div class="price">${inr(p.price)}</div>
    <div class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}<small>(${p.count})</small></div>
    <button class="add" data-name="${p.name}">Add to Cart</button>
  </article>`).join('');

$('#giftWatch').innerHTML = watchSVG('classic');
$('#fallbackWatch').innerHTML = watchSVG('classic');

/* ---------- Hero slider ---------- */
let cur = 0, timer;
const heroWatch = $('#heroWatch'), heroName = $('#heroName');
function showSlide(i) {
  cur = (i + SLIDES.length) % SLIDES.length;
  heroWatch.classList.add('swap');
  setTimeout(() => {
    heroWatch.innerHTML = watchSVG(SLIDES[cur].kind);
    heroName.textContent = SLIDES[cur].name;
    heroWatch.classList.remove('swap');
  }, 350);
  $$('#heroDots .dot').forEach((d, k) => d.classList.toggle('active', k === cur));
}
function autoplay() { clearInterval(timer); timer = setInterval(() => showSlide(cur + 1), 5000); }
heroWatch.innerHTML = watchSVG(SLIDES[0].kind);
$('#nextSlide').onclick = () => { showSlide(cur + 1); autoplay(); };
$('#prevSlide').onclick = () => { showSlide(cur - 1); autoplay(); };
$$('#heroDots .dot').forEach(d => d.onclick = () => { showSlide(+d.dataset.i); autoplay(); });
autoplay();

/* ---------- Cart / wishlist / toast ---------- */
let cart = 0;
const toast = $('#toast');
function say(msg) {
  toast.textContent = msg; toast.classList.add('show');
  clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove('show'), 2200);
}
document.addEventListener('click', e => {
  const add = e.target.closest('.add');
  if (add) {
    cart++; const c = $('#cartCount'); c.textContent = cart;
    c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
    say(`${add.dataset.name} added to cart`);
  }
  const w = e.target.closest('.wish');
  if (w) { w.classList.toggle('on'); say(w.classList.contains('on') ? 'Saved to wishlist' : 'Removed from wishlist'); }
});
$('#searchBtn').onclick = () => say('Search coming soon');
$('#cartBtn').onclick = () => say(cart ? `${cart} item(s) in your cart` : 'Your cart is empty');

/* ---------- Newsletter ---------- */
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  $('#newsMsg').textContent = 'Thank you for subscribing ✓';
  e.target.reset();
});

/* ---------- Mobile nav + active link ---------- */
$('#burger').onclick = () => $('#nav').classList.toggle('open');
$$('#nav a').forEach(a => a.addEventListener('click', () => $('#nav').classList.remove('open')));
const sections = ['home', 'shop', 'about', 'contact'].map(id => document.getElementById(id));
addEventListener('scroll', () => {
  const y = scrollY + 140; let active = 'home';
  sections.forEach(s => { if (s && s.offsetTop <= y) active = s.id; });
  $$('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));
}, { passive: true });

/* ---------- Video ---------- */
const video = $('#brandVideo'), card = $('#videoCard'), fb = $('#videoFallback');
video.addEventListener('loadeddata', () => fb.classList.add('hidden'));
video.addEventListener('error', () => fb.classList.remove('hidden'));
video.querySelector('source').addEventListener('error', () => fb.classList.remove('hidden'));

function toggleVideo() {
  if (video.paused) { video.play().catch(() => say('Add assets/watch-video.mp4 to play the video')); }
  else video.pause();
}
video.addEventListener('play',  () => card.classList.add('playing'));
video.addEventListener('pause', () => card.classList.remove('playing'));
$('#playBtn').onclick = toggleVideo;
video.onclick = toggleVideo;
$('#muteBtn').onclick = e => { video.muted = !video.muted; e.currentTarget.textContent = video.muted ? '🔇' : '🔊'; };
$('#fsBtn').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : card.requestFullscreen?.());
// autoplay when visible, pause when scrolled away
new IntersectionObserver(([en]) => {
  if (!video.readyState) return;
  if (en.isIntersecting && en.intersectionRatio > .6) video.play().catch(() => {});
  else video.pause();
}, { threshold: [0, .6] }).observe(card);

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- Clay tilt on hover (cards) ---------- */
$$('.cat, .prod').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `translateY(-10px) perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});
