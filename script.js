const intro = document.querySelector('#intro');
const invitation = document.querySelector('#invitation');
const openButton = document.querySelector('#openButton');
const envelopeStage = document.querySelector('#envelopeStage');
const music = document.querySelector('#weddingMusic');
const musicToggle = document.querySelector('#musicToggle');

function updateMusicButton() {
  musicToggle.classList.toggle('playing', !music.paused);
  musicToggle.setAttribute('aria-label', music.paused ? 'เปิดเพลง' : 'หยุดเพลง');
}

function openInvitation() {
  if (intro.classList.contains('opening')) return;
  intro.classList.add('opening');
  // This runs in the click gesture, so browsers allow the requested automatic music.
  music.play().catch(() => updateMusicButton());
  updateMusicButton();
  window.setTimeout(() => {
    intro.hidden = true;
    invitation.removeAttribute('aria-hidden');
    invitation.classList.add('ready');
    document.querySelector('.hero-card').classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 850);
}
openButton.addEventListener('click', openInvitation);
envelopeStage.addEventListener('click', event => { if (event.target !== openButton && !openButton.contains(event.target)) openInvitation(); });
musicToggle.addEventListener('click', () => { if (music.paused) music.play(); else music.pause(); });
music.addEventListener('play', updateMusicButton);
music.addEventListener('pause', updateMusicButton);

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(card => observer.observe(card));
