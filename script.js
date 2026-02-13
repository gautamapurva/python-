// script.js
// Small, beginner-friendly JS to handle navigation toggle, year, and simple reveal effects.

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
if(navToggle){
  navToggle.addEventListener('click', ()=>{
    const expanded = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!expanded));
    if(!expanded){
      nav.style.display = 'flex';
      navToggle.textContent = '✕';
    } else {
      nav.style.display = '';
      navToggle.textContent = '☰';
    }
  });
}

// Set current year in footer
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Simple reveal on scroll using IntersectionObserver
const observerOpts = {threshold: 0.08};
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('reveal');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.card, .skill-card, .profile-card, .contact-card').forEach(el=>{
  el.classList.add('pre-reveal');
  revealObserver.observe(el);
});

// Optional: if CSS `scroll-behavior` isn't supported, add JS fallback for smooth scroll
// (Most modern browsers support it — keep this as a simple polyfill)
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.startsWith('#')){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});
