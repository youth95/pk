let p = 0.5;
const speed = 0.02;

const audio = new Audio('bgm.m4a');
const boysAudio = new Audio("boys.m4a");
const girlsAudio = new Audio("girls.m4a");

audio.load();
boysAudio.load();
girlsAudio.load();
audio.addEventListener('ended', () => audio.play());

let bgmPlayed = false;
const applyP = () => {
  if (bgmPlayed === false) {
    bgmPlayed = true;
    // audio.play();
  }
  const girls = p * 100;
  const boys = (1 - p) * 100;
  document.querySelector<HTMLDivElement>('.boys')!.style.width = boys + '%'
  document.querySelector<HTMLDivElement>('.girls')!.style.width = girls + '%'
}

const check = () => {
  if (p <= 0.1) {
    showWin('Boys WIN', 'blue');
    reset();
  }

  if (p >= 0.9) {
    showWin('Girls WIN', 'red');
    reset();
  }
}

const reset = () => {
  setTimeout(() => {
    p = 0.5;
    document.querySelector<HTMLDivElement>('.win')!.style.display = 'none';
    applyP();
  }, 3000);
}

const showWin = (text: string, color: string) => {
  document.querySelector<HTMLDivElement>('.win')!.style.display = 'flex';
  document.querySelector<HTMLDivElement>('.win')!.style.backgroundColor = color;
  document.querySelector<HTMLDivElement>('.win-title')!.textContent = text;
}

document.querySelector<HTMLDivElement>('.boys')!.addEventListener('pointerdown', () => {
  p -= speed;
  applyP();
  check();
  boysAudio.pause();
  boysAudio.currentTime = 0;
  boysAudio.play();
});

document.querySelector<HTMLDivElement>('.girls')!.addEventListener('pointerdown', () => {
  p += speed;
  applyP();
  check();
  girlsAudio.pause();
  girlsAudio.currentTime = 0;
  girlsAudio.play();
});

window.addEventListener('touchstart', ev => {
  ev.stopPropagation();
  ev.preventDefault();
})