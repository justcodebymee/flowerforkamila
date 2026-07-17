// ---------- Twinkling stars background ----------
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.floor((canvas.width * canvas.height) / 6500);
  stars = Array.from({length: count}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.3 + 0.3,
    baseAlpha: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.015 + 0.004,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawStars(time){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(const s of stars){
    const twinkle = Math.sin(time * s.speed + s.phase) * 0.35 + 0.65;
    ctx.beginPath();
    ctx.fillStyle = `rgba(246, 241, 255, ${(s.baseAlpha * twinkle).toFixed(3)})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
requestAnimationFrame(drawStars);

// ---------- Replay the bloom + message animation ----------
const replayBtn = document.getElementById('replay');
const animatedSelectors = '.stem, .leaf, .flower, .petal, .line, .glow, .replay';

replayBtn.addEventListener('click', () => {
  const elements = document.querySelectorAll(animatedSelectors);
  elements.forEach(el => {
    el.style.animation = 'none';
  });
  // force reflow so the browser "forgets" the previous animation state
  void document.body.offsetWidth;
  elements.forEach(el => {
    el.style.animation = '';
  });
});