// Animated scroll cars with absolute positioning (scroll speed independent)
document.addEventListener('DOMContentLoaded', () => {
    const cars = document.querySelectorAll('.scroll-car');
    const aboutSection = document.querySelector('.about-section');
    const projectsTitle = document.querySelector('.projects-section .section-title');
    
    if (!cars.length || !aboutSection) {
        return;
    }

    let ticking = false;
    let aboutSectionTop = 0;
    let diagonalStartY = 0;

    // Calculate reference points once
    function calculateReferencePoints() {
        const aboutRect = aboutSection.getBoundingClientRect();
        aboutSectionTop = aboutRect.top + window.scrollY;
        
        if (projectsTitle) {
            const titleRect = projectsTitle.getBoundingClientRect();
            diagonalStartY = titleRect.top + window.scrollY;
        }
    }

    function updateCars() {
        const scrollY = window.scrollY;
        
        // Recalculate reference points on first scroll or if not set
        if (aboutSectionTop === 0) {
            calculateReferencePoints();
        }
        
        // Calculate scroll progress relative to About section
        // Only start moving when About section is visible
        const scrollProgress = Math.max(0, scrollY - aboutSectionTop);
        
        cars.forEach(car => {
            // Base speed: all cars move at same rate for symmetry
            const baseSpeed = 0.6;
            
            // Cars start moving immediately when About Me section appears
            const movementDelay = 0;
            const adjustedProgress = Math.max(0, scrollProgress - movementDelay);
            
            // Vertical movement only - straight down (negative because cars are rotated 180°)
            const translateY = -(adjustedProgress * baseSpeed);
            
            // Calculate absolute position of car for fade out
            const carAbsoluteY = aboutSectionTop + Math.abs(translateY);
            
            // Opacity: fade out gradually after passing Projects section
            let opacity = 0.7;
            if (diagonalStartY > 0 && carAbsoluteY >= diagonalStartY + 400) {
                const fadeProgress = Math.min(1, (carAbsoluteY - (diagonalStartY + 400)) / 300);
                opacity = 0.7 * (1 - fadeProgress);
            }
            
            // Apply vertical transform + 180° rotation to flip car direction
            car.style.transform = `rotate(180deg) translateY(${translateY}px)`;
            car.style.opacity = opacity;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateCars);
            ticking = true;
        }
    }

    // Recalculate on resize
    window.addEventListener('resize', () => {
        calculateReferencePoints();
        updateCars();
    });

    // Listen to scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial calculation and position
    calculateReferencePoints();
    updateCars();
});
