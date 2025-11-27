// Typing effect for hero tagline
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typingText');
    
    if (!typingElement) {
        console.error('Typing element not found');
        return;
    }

    const text = 'Data, AI & Automation';
    let charIndex = 0;
    
    // Wait a bit before starting the typing effect (to sync with title animation)
    setTimeout(() => {
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                typingElement.textContent = text.substring(0, charIndex + 1);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingElement.classList.add('typing-complete');
                }, 1000);
            }
        }, 100); // Speed of typing (100ms per character)
    }, 1300); // Delay before starting (sync with other animations)
});

