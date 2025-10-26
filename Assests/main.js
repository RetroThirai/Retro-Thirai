import './style.css';

// Sample poster data with 30+ posters
const posterData = [
  { id: 1, title: "Ajith Kumar Racing", category: "Cinema", image: "images/1.jpg" },
  { id: 2, title: "MS Dhoni Forever", category: "Sports", image: "images/2.jpeg" },
  { id: 3, title: "F1 Movie", category: "Cinema", image: "images/3.jpeg" },
  { id: 4, title: "Ferrari", category: "Cars", image: "images/4.jpeg" },
  { id: 5, title: "Hardik Pandiya Comeback", category: "Cinema", image: "images/5.jpeg" },
  { id: 6, title: "JD from Thalapathy's Master", category: "Cinema", image: "images/6.jpeg" },
  { id: 7, title: "Jersey Movie Selfie Poster", category: "Cinema", image: "images/7.jpeg" },
  { id: 8, title: "Kabilan from Sarpatta Parambarai", category: "Cinema", image: "images/8.jpg" },
  { id: 9, title: "Life of Ram Poster", category: "Cinema", image: "images/9.jpeg" },
  { id: 10, title: "Meiyazhagan", category: "Cinema", image: "images/10.jpeg" },
  { id: 11, title: "Messi the GOAT", category: "Sports", image: "images/11.jpeg" },
  { id: 12, title: "Lionel Messi", category: "Sports", image: "images/12.jpeg" },
  { id: 13, title: "Skyline Car", category: "Cinema", image: "images/13.jpeg" },
  { id: 14, title: "Kadhaipoma from Oh My Kadavule", category: "Cinema", image: "images/14.jpg" },
  { id: 15, title: "OK Kanmani Movie", category: "Cinema", image: "images/15.jpeg" },
  { id: 16, title: "Premalu", category: "Cinema", image: "images/16.jpeg" },
  { id: 17, title: "Pursuit of Happyness Movie", category: "Cinema", image: "images/17.jpeg" },
  { id: 18, title: "RDR 2 Game", category: "Games", image: "images/18.jpeg" },
  { id: 19, title: "Get the Hell Out of Here from RDR 2", category: "Games", image: "images/19.jpeg" },
  { id: 20, title: "I Tried, In the end I did from RDR 2", category: "Games", image: "images/20.jpeg" },
  { id: 21, title: "Fly High from Soorarai Potru", category: "Cinema", image: "images/21.jpeg" },
  { id: 22, title: "Start Again from Pursuit of Happyness", category: "Cinema", image: "images/22.jpeg" },
  { id: 23, title: "Test Cricket", category: "Sports", image: "images/23.jpeg" },
  { id: 24, title: "Ajith Kumar", category: "Cinema", image: "images/24.jpeg" },
  { id: 25, title: "Un Kanne Aayiram Kadha Pesudhe", category: "Cinema", image: "images/25.jpg" },
  { id: 26, title: "Superstar Iconic Pose in Thalapathi", category: "Cinema", image: "images/26.jpeg" },
  { id: 27, title: "Thalapathy Vijay", category: "Cinema", image: "images/27.jpeg" },
  { id: 28, title: "Thiruchitrambalam", category: "Cinema", image: "images/28.jpeg" },
  { id: 29, title: "Vaaranam Aayiram", category: "Cinema", image: "images/29.jpg" },
  { id: 30, title: "Today or Never Virat", category: "Sports", image: "images/30.jpeg" },
  { id: 31, title: "Elon Musk Quote", category: "Motivation", image: "images/31.jpeg" },
  { id: 32, title: "Jersey Movie Motivation", category: "Cinema", image: "images/32.jpeg" },
];

// Gallery state
let currentPosterIndex = 0;

// Initialize the application
function init() {
  renderGallery();
  setupEventListeners();
  hideLoading();
}

// Render gallery items
function renderGallery() {
  const gallery = document.getElementById('gallery');

  posterData.forEach((poster, index) => {
    const galleryItem = createGalleryItem(poster, index);
    gallery.appendChild(galleryItem);
  });
}

// Create a single gallery item
function createGalleryItem(poster, index) {
  const item = document.createElement('article');
  item.className = 'gallery-item';
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', `View ${poster.title} poster`);
  item.style.animationDelay = `${index * 0.05}s`;

  item.innerHTML = `
    <div class="gallery-image-wrapper">
      <div class="image-placeholder"></div>
      <img
        src="${poster.image}"
        alt="${poster.title} - ${poster.category} poster"
        class="gallery-image loading"
        loading="lazy"
      />
    </div>
    <div class="gallery-overlay">
      <h3 class="gallery-title">${poster.title}</h3>
      <p class="gallery-category">${poster.category}</p>
    </div>
  `;

  // Handle image loading
  const img = item.querySelector('.gallery-image');
  const placeholder = item.querySelector('.image-placeholder');

  img.addEventListener('load', () => {
    img.classList.remove('loading');
    img.classList.add('loaded');
    if (placeholder) {
      placeholder.remove();
    }
  });

  img.addEventListener('error', () => {
    img.alt = 'Image failed to load';
    if (placeholder) {
      placeholder.remove();
    }
  });

  // Click handler
  item.addEventListener('click', () => openLightbox(index));

  // Keyboard handler
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });

  return item;
}

// Setup event listeners
function setupEventListeners() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  // Close lightbox
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
      }
    }
  });
}

// Open lightbox with specific poster
function openLightbox(index) {
  currentPosterIndex = index;
  const poster = posterData[index];
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');

  lightboxImage.src = poster.image;
  lightboxImage.alt = `${poster.title} - ${poster.category} poster`;
  lightboxTitle.textContent = poster.title;
  lightboxCategory.textContent = poster.category;

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Navigate between posters in lightbox
function navigateLightbox(direction) {
  currentPosterIndex += direction;

  if (currentPosterIndex < 0) {
    currentPosterIndex = posterData.length - 1;
  } else if (currentPosterIndex >= posterData.length) {
    currentPosterIndex = 0;
  }

  openLightbox(currentPosterIndex);
}

// Hide loading overlay
function hideLoading() {
  setTimeout(() => {
    const loadingOverlay = document.getElementById('loading');
    loadingOverlay.classList.add('hidden');
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 300);
  }, 800);
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
