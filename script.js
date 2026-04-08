// Modal controls
const modal = document.getElementById('svModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('svClose');

function openModal(){ modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeModal(){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.querySelector('.sv-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// Spin logic
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const resultEl = document.getElementById('result');

const labels = ['200 points','JACKPOT','500 points','ZONK','1000 points','One More Spin'];

// Requested: offset 30 degrees so prize reads at top exactly
const sliceOffsetDeg = 60;

const slices = labels.length;
const sliceAngle = 360 / slices;

let spinning = false;
let currentAngle = 0;

function spin(){
  if(spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  resultEl.textContent = 'Memutar...';

  const targetIndex = Math.floor(Math.random()*slices);
  const min = targetIndex * sliceAngle;
  const max = (targetIndex + 1) * sliceAngle;
  const targetAngleWithinSlice = Math.random() * (max - min) + min;

  const turns = 5 + Math.floor(Math.random()*3);
  const targetGlobalAngle = turns*360 + (360 - targetAngleWithinSlice) + sliceOffsetDeg;

  const duration = 4200 + Math.random()*1200;
  wheel.style.setProperty('--duration', duration+'ms');
  currentAngle = targetGlobalAngle % 360;
  wheel.style.setProperty('--angle', targetGlobalAngle+'deg');

  const onDone = () => {
    wheel.removeEventListener('transitionend', onDone);
    const final = (360 - (currentAngle - sliceOffsetDeg)) % 360;
    const index = Math.floor(final / sliceAngle) % slices;
    resultEl.textContent = '🎉 Kamu mendapatkan: ' + labels[index] + '!';
    spinning = false;
    spinBtn.disabled = false;
  };
  wheel.addEventListener('transitionend', onDone);
}

spinBtn.addEventListener('click', spin);
