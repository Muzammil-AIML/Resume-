/* =========================================
   RESUME — script.js
   Dynamic interactions & animations
   ========================================= */
 
'use strict';
 
// ── 1. Last-updated date ──────────────────────────────────────────────────────
(function setDate() {
  const el = document.getElementById('last-updated');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
})();
 
// ── 2. Intersection Observer — scroll-reveal for jobs & project cards ─────────
(function initReveal() {
  const targets = document.querySelectorAll('.job, .project-card, .edu-item, .cert-item');
  targets.forEach(el => el.classList.add('reveal'));
 
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
 
  targets.forEach(el => io.observe(el));
})();
 
// ── 3. Skill pill active-toggle on click ─────────────────────────────────────
(function initPills() {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
    });
  });
})();
 
// ── 4. Typed cursor effect on the hero name ──────────────────────────────────
(function typedTagline() {
  const phrases = [
    'Building scalable systems that people love to use.',
    'Turning ideas into clean, performant products.',
    'Engineering with empathy. Shipping with confidence.',
    'Open to exciting full-stack opportunities.',
  ];
  const el = document.querySelector('.header-tagline');
  if (!el) return;
 
  let pi = 0, ci = 0, deleting = false;
  const speed = { type: 52, delete: 28, pause: 2000 };
 
  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      ci++;
      // Wrap last word in <em> if it's the first phrase
      el.innerHTML = phrase.slice(0, ci)
        .replace(/(love to use|clean|empathy|exciting)/, '<em>$1</em>');
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, speed.pause);
        return;
      }
    } else {
      ci--;
      el.innerHTML = phrase.slice(0, ci)
        .replace(/(love to use|clean|empathy|exciting)/, '<em>$1</em>');
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type);
  }
 
  // Start after hero animation completes
  setTimeout(tick, 900);
})();
 
// ── 5. Language bar animated fill on scroll ───────────────────────────────────
(function animateBars() {
  const langSection = document.getElementById('sec-lang');
  if (!langSection) return;
  let fired = false;
 
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      document.querySelectorAll('.bar.on').forEach((bar, i) => {
        bar.style.opacity = '0';
        setTimeout(() => {
          bar.style.transition = 'opacity .3s ease';
          bar.style.opacity = '1';
        }, i * 60 + 200);
      });
    }
  }, { threshold: 0.3 });
 
  io.observe(langSection);
})();
 
// ── 6. Active nav highlight (header shrink on scroll) ────────────────────────
(function headerScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 40
      ? 'rgba(200,75,47,.25)'
      : 'rgba(15,14,12,.18)';
  }, { passive: true });
})();
 
// ── 7. Tooltip on job dates ───────────────────────────────────────────────────
(function jobDateTooltip() {
  document.querySelectorAll('.job-date').forEach(el => {
    const raw = el.textContent.trim();
    const parts = raw.split('–').map(s => s.trim());
 
    if (parts.length === 2) {
      const start = parts[0];
      const end   = parts[1];
 
      // Compute rough duration in months
      function toDate(str) {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const [mon, yr] = str.split(' ');
        if (!yr) return null; // "Present"
        return new Date(+yr, months.indexOf(mon));
      }
 
      const s = toDate(start);
      const e = end === 'Present' ? new Date() : toDate(end);
 
      if (s && e) {
        const diff = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
        const yrs  = Math.floor(diff / 12);
        const mos  = diff % 12;
        const label = [yrs && `${yrs}y`, mos && `${mos}m`].filter(Boolean).join(' ');
        el.title = `Duration: ${label}`;
      }
    }
  });
})();
 
// ── 8. Console easter egg ─────────────────────────────────────────────────────
console.log(
  '%c👋 Hey there!',
  'font-size:22px; font-weight:bold; color:#c84b2f;'
);
console.log(
  '%cThanks for inspecting the source — I build things like this for fun.\nLet\'s connect: alex@mercer.dev',
  'font-size:13px; color:#3d3b35;'
);