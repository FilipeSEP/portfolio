// ---------- starfield canvas ----------
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
  const count = Math.floor((canvas.width * canvas.height) / 9000);
  stars = Array.from({length: count}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.3 + 0.2,
    baseAlpha: Math.random()*0.6 + 0.2,
    speed: Math.random()*0.015 + 0.003,
    phase: Math.random()*Math.PI*2
  }));
}

function draw(t){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // nebula band (milky way)
  const grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height*0.6);
  grad.addColorStop(0,'rgba(94,205,240,0.05)');
  grad.addColorStop(0.5,'rgba(232,121,249,0.06)');
  grad.addColorStop(1,'rgba(155,188,15,0.03)');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars.forEach(s=>{
    const twinkle = reduceMotion ? s.baseAlpha : s.baseAlpha + Math.sin(t*s.speed + s.phase)*0.25;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(238,242,246,${Math.max(0,twinkle)})`;
    ctx.fill();
  });

  if(!reduceMotion) requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw(0);

// ---------- active nav highlight ----------
const sections = document.querySelectorAll('main section, .hero');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if(link) link.classList.add('active');
    }
  });
},{rootMargin:'-40% 0px -50% 0px'});
sections.forEach(s=> s.id && observer.observe(s));

// close mobile menu on link click
navLinks.forEach(l => l.addEventListener('click', ()=>{
  document.getElementById('menu-toggle').checked = false;
}));

// ---------- whatsapp form ----------
// Troque o número abaixo pelo seu, no formato DDI+DDD+numero (ex: 5511999999999)
const WHATSAPP_NUMBER = "SEUNUMEROAQUI";

document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const text = encodeURIComponent(`Olá, meu nome é ${name}.\n${message}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
});