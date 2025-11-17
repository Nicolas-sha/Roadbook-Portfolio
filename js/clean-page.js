// Fonction pour nettoyer la page et garder seulement le background

function cleanPage() {
    // Empêcher les clics multiples
    if (document.body.classList.contains('cleaning')) {
        return;
    }
    
    // Ajouter une classe pour l'animation de fade out
    document.body.classList.add('cleaning');
    
    // Sélectionner tous les éléments à supprimer
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero-section');
    const backgroundImage = document.querySelector('.background-image');
    
    // Fonction pour animer et supprimer un élément
    function fadeOutAndRemove(element, delay = 0) {
        if (!element) return;
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '0';
            
            // Animation différente selon l'élément
            if (element.tagName === 'HEADER') {
                element.style.transform = 'translateY(-50px)';
            } else if (element.classList.contains('hero-section')) {
                element.style.transform = 'translateY(50px) scale(0.95)';
            } else {
                element.style.transform = 'scale(0.95)';
            }
            
            // Supprimer après l'animation
            setTimeout(() => {
                if (element.parentNode) {
                    element.remove();
                }
            }, 800);
        }, delay);
    }
    
    // Animer et supprimer tous les éléments sauf le background
    fadeOutAndRemove(header, 0);
    fadeOutAndRemove(heroSection, 100);
    
    // Supprimer tous les scripts sauf celui-ci
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        if (!script.src.includes('clean-page.js')) {
            fadeOutAndRemove(script, 200);
        }
    });
    
    // Retirer la classe après l'animation et ajouter le nouveau contenu
    setTimeout(() => {
        document.body.classList.remove('cleaning');
        // S'assurer que seul le background reste
        const remainingElements = Array.from(document.body.children);
        remainingElements.forEach(element => {
            if (element !== backgroundImage && element.tagName !== 'SCRIPT') {
                element.remove();
            }
        });
        
        // Créer et ajouter le nouveau H1 "Base camp"
        const newHeader = document.createElement('header');
        newHeader.className = 'base-camp-header';
        newHeader.style.position = 'absolute';
        newHeader.style.top = '50px';
        newHeader.style.left = '50%';
        newHeader.style.transform = 'translateX(-50%)';
        newHeader.style.width = '100%';
        newHeader.style.textAlign = 'center';
        newHeader.style.padding = '0 20px';
        newHeader.style.zIndex = '10';
        newHeader.style.background = 'none';
        newHeader.style.opacity = '0';
        newHeader.style.transition = 'opacity 1s ease-in';
        
        const h1 = document.createElement('h1');
        h1.textContent = 'Base camp';
        h1.style.fontFamily = "'Great Vibes', cursive";
        h1.style.fontSize = '6.5rem';
        h1.style.fontWeight = '400';
        h1.style.color = '#1a0d00';
        h1.style.textShadow = 
            '1px 1px 0px rgba(0, 0, 0, 0.5), ' +
            '2px 2px 4px rgba(0, 0, 0, 0.4), ' +
            '0 0 3px rgba(26, 13, 0, 0.9)';
        h1.style.margin = '0';
        h1.style.letterSpacing = '2px';
        h1.style.lineHeight = '1.2';
        h1.style.filter = 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))';
        
        newHeader.appendChild(h1);
        document.body.appendChild(newHeader);
        
        // Animer l'apparition du nouveau header
        setTimeout(() => {
            newHeader.style.opacity = '1';
        }, 100);
    }, 1000);
}

