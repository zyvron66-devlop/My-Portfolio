// Cursor-following light on glass surfaces
document.querySelectorAll('.glass').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});
document.getElementById('year').textContent = new Date().getFullYear();

// Stagger children of [data-stagger]
document.querySelectorAll('[data-stagger]').forEach(p =>
  [...p.children].forEach((c, i) => c.style.setProperty('--d', (i * 0.09) + 's')));

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Scroll progress bar
const bar = document.querySelector('.progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.scale = (h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1)) + ' 1';
}, { passive: true });

// Typewriter
document.querySelectorAll('.type').forEach(el => {
  const w = el.dataset.words.split('|');
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) { el.textContent = w[0]; return; }
  let i = 0, j = 0, del = false;
  (function tick() {
    const word = w[i];
    el.textContent = word.slice(0, j);
    if (!del && j === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && j === 0) { del = false; i = (i + 1) % w.length; }
    j += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
});

// Contact form opens the visitor's email app
const f = document.getElementById('cf');
if (f) f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const body = d.get('message') + '\n\n- ' + d.get('name') + ' (' + d.get('email') + ')';
  location.href = 'mailto:you@example.com?subject=' + encodeURIComponent('Message from ' + d.get('name')) + '&body=' + encodeURIComponent(body);
});
