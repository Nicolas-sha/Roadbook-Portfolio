// AI News Carousel using NewsAPI
const API_KEY = '05d311af538a4fdfb02eea14a1f0dc02';
const API_URL = `https://newsapi.org/v2/everything?q=artificial+intelligence+OR+AI+OR+machine+learning&language=en&sortBy=publishedAt&pageSize=9&apiKey=${API_KEY}`;

let currentIndex = 0;
let articles = [];
let autoSlideInterval;

// Fetch AI news from NewsAPI
async function fetchAINews() {
    const carousel = document.getElementById('newsCarousel');
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles && data.articles.length > 0) {
            articles = data.articles;
            displayNews();
            startAutoSlide();
        } else {
            showError('No AI news available at the moment.');
        }
    } catch (error) {
        console.error('Error fetching AI news:', error);
        showError('Unable to load AI news. Please try again later.');
    }
}

// Display news in carousel
function displayNews() {
    const carousel = document.getElementById('newsCarousel');
    
    carousel.innerHTML = articles.map(article => {
        const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200/D4C4A8/3E2723?text=AI+News';
        const sourceName = article.source?.name || 'Unknown Source';
        const title = article.title || 'No title available';
        const url = article.url || '#';
        
        return `
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="news-item">
                <img src="${imageUrl}" alt="${title}" class="news-image" onerror="this.src='https://via.placeholder.com/400x200/D4C4A8/3E2723?text=AI+News'">
                <div class="news-content">
                    <h4 class="news-title">${title}</h4>
                    <p class="news-source">${sourceName}</p>
                    <span class="news-link">Read more →</span>
                </div>
            </a>
        `;
    }).join('');
}

// Show error message
function showError(message) {
    const carousel = document.getElementById('newsCarousel');
    carousel.innerHTML = `<div class="news-error">${message}</div>`;
}

// Carousel navigation
function updateCarousel() {
    const carousel = document.getElementById('newsCarousel');
    const itemWidth = carousel.querySelector('.news-item')?.offsetWidth || 0;
    const gap = 20;
    const offset = -(currentIndex * (itemWidth + gap));
    carousel.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, articles.length - itemsPerView);
    currentIndex = Math.min(currentIndex + 1, maxIndex);
    updateCarousel();
    resetAutoSlide();
}

function prevSlide() {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
    resetAutoSlide();
}

function getItemsPerView() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 968) return 2;
    return 3;
}

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, articles.length - itemsPerView);
        
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchAINews();
    
    // Navigation buttons
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Responsive resize
    window.addEventListener('resize', updateCarousel);
});

