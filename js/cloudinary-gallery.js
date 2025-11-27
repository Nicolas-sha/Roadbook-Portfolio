// Cloudinary Gallery - 4L Trophy images with auto-refresh capability
document.addEventListener('DOMContentLoaded', () => {
    const cloudName = 'df2vkglqk';
    
    console.log('🎨 Loading Cloudinary 4L Trophy gallery...');
    
    // Sélectionner les 3 rectangles
    const rectangles = document.querySelectorAll('.story-image-placeholder');
    
    if (rectangles.length === 0) {
        console.error('❌ No gallery rectangles found');
        return;
    }
    
    // Liste des images du dossier 4L Trophy (URLs directes)
    // Ces images sont chargées automatiquement depuis Cloudinary
    const trophyImages = [
        {
            public_id: '2_soutient_au_marocain_hyox0w',
            format: 'jpg',
            display_name: 'Soutien au Marocain'
        },
        {
            public_id: '4l-trophy-avec-equipage-iim-simon-baudin-clement-belouin_gnwyyb',
            format: 'webp',
            display_name: '4L Trophy Équipage'
        },
        {
            public_id: '27f00db3-af45-4310-9b8a-4ec3eb627e8e_2_ocs8hr',
            format: 'jpg',
            display_name: '4L Trophy Rally'
        }
    ];
    
    console.log(`✅ Loading ${trophyImages.length} images from 4L Trophy folder`);
        
    // Fonction pour mélanger un tableau (ordre aléatoire)
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Pour chaque rectangle, créer un carrousel avec toutes les images (ordre aléatoire)
    rectangles.forEach((rectangle, rectIndex) => {
        // Ordre aléatoire différent pour chaque rectangle
        const shuffledImages = shuffleArray(trophyImages);
        
        // Créer le HTML du carrousel
        const carouselHTML = `
            <div class="trophy-carousel">
                ${shuffledImages.map((img, index) => {
                    // Construire l'URL Cloudinary optimisée
                    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_1000,h_700,c_fill,g_auto,q_80,f_auto/${img.public_id}.${img.format}`;
                    return `
                        <img 
                            src="${imageUrl}" 
                            alt="4L Trophy - ${img.display_name}" 
                            class="trophy-carousel-image ${index === 0 ? 'active' : ''}"
                            loading="${index === 0 ? 'eager' : 'eager'}"
                        >
                    `;
                }).join('')}
            </div>
        `;
        
        rectangle.innerHTML = carouselHTML;
        
        // Précharger toutes les images pour une transition fluide
        const carouselImages = rectangle.querySelectorAll('.trophy-carousel-image');
        
        // Attendre que toutes les images soient chargées
        const imagePromises = Array.from(carouselImages).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve;
                }
            });
        });
        
        Promise.all(imagePromises).then(() => {
            console.log(`✅ All images preloaded for rectangle ${rectIndex + 1}`);
        });
        
        let currentIndex = 0;
        
        function showNextImage() {
            // Cacher l'image actuelle
            carouselImages[currentIndex].classList.remove('active');
            
            // Passer à l'image suivante (boucle)
            currentIndex = (currentIndex + 1) % carouselImages.length;
            
            // Afficher la nouvelle image
            carouselImages[currentIndex].classList.add('active');
        }
        
        // Démarrer le défilement automatique toutes les 3 secondes
        // Décalage de 1 seconde entre chaque rectangle pour effet asynchrone
        const delay = rectIndex * 1000;
        
        setTimeout(() => {
            setInterval(showNextImage, 3000);
        }, delay);
        
        console.log(`✅ Rectangle ${rectIndex + 1}: ${shuffledImages.length} images, starting in ${delay}ms`);
    });
    
    console.log('🎉 4L Trophy gallery initialized successfully!');
});

