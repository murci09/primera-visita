const whatsappBase = 'https://wa.me/3816090933';

const range = document.querySelector('#compareRange');
const before = document.querySelector('#beforeLayer');
const line = document.querySelector('#compareLine');
const comparison = document.querySelector('.comparison');
const beforeImage = before?.querySelector('img');

const imageViewer = document.querySelector('#imageViewer');
const viewerImage = imageViewer?.querySelector('img');
const viewerCaption = imageViewer?.querySelector('p');
const viewerClose = imageViewer?.querySelector('.viewer-close');

if (range) {
  const updateComparison = () => {
    before.style.width = '100%';
    before.style.clipPath = `inset(0 ${100 - range.value}% 0 0)`;
    line.style.left = `${range.value}%`;
  };
  range.addEventListener('input', updateComparison);
  updateComparison();
}

function resizeComparisonImages() {
  if (!comparison) return;
  const width = comparison.clientWidth;
  comparison.querySelectorAll(':scope > div img').forEach(image => {
    image.style.width = `${width}px`;
  });
}

resizeComparisonImages();
window.addEventListener('resize', resizeComparisonImages);

const form = document.querySelector('#leadForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const message = [
    'Hola, quiero consultar por Primera Visita',
    '',
    '*Datos del diagnóstico:*',
    `• Nombre: ${data.get('nombre') || '-'}`,
    `• WhatsApp: ${data.get('whatsapp') || '-'}`,
    `• Zona: ${data.get('zona') || '-'}`,
    `• Operación: ${data.get('operacion') || '-'}`,
    `• Fecha de publicación: ${data.get('fecha') || '-'}`
  ].join('\n');

  window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

function openImageViewer(image) {
  if (!imageViewer || !viewerImage) return;
  viewerImage.src = image.currentSrc || image.src;
  viewerImage.alt = image.alt;
  viewerCaption.textContent = image.closest('.compare-base') ? 'después' : image.closest('.compare-before') ? 'antes' : '';
  imageViewer.showModal();
}

document.querySelectorAll('.service-image, .compare-base img, .compare-before img').forEach(image => {
  image.addEventListener('click', () => openImageViewer(image));
});

viewerClose?.addEventListener('click', () => imageViewer.close());
imageViewer?.addEventListener('click', event => {
  if (event.target === imageViewer) imageViewer.close();
});
