// ── Download links from manifest ──
(async () => {
  try {
    const res = await fetch('zips/manifest.json');
    if (!res.ok) return;
    const files = await res.json();
    document.querySelectorAll('.btn-download[data-platform]').forEach(btn => {
      const platform = btn.dataset.platform.toLowerCase();
      const match = files.find(f => f.toLowerCase().replace(/\.zip$/, '').endsWith('_' + platform));
      if (match) {
        btn.href = 'zips/' + match;
        btn.setAttribute('download', '');
      }
    });
  } catch (e) {
    console.warn('Nie można załadować manifest.json:', e);
  }
})();

const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const inner = document.getElementById('carouselInner');
const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
  if (!inner) return;
  inner.style.transform = `translateX(-${currentSlide * 100}%)`;
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === currentSlide);
  });
}

function moveSlide(dir) {
  if (slides.length === 0) return;
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  updateCarousel();
}

function setSlide(index) {
  if (slides.length === 0) return;
  currentSlide = index;
  updateCarousel();
}

// Lightbox functions
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add('show');
}

function closeLightbox(e) {
  if (!lightbox) return;
  if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('show');
  }
}

// Attach click listeners to carousel images
slides.forEach(slide => {
  const img = slide.querySelector('img');
  if (img) {
    img.addEventListener('click', () => {
      openLightbox(img.src);
    });
  }
});
