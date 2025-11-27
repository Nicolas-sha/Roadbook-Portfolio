document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) {
        console.error('Form not found!');
        return;
    }

    console.log('Form handler initialized');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Get form data
        const formData = new FormData(form);
        
        // Log form data for debugging
        console.log('Form data:', Object.fromEntries(formData));
        
        try {
            console.log('Sending to:', form.action);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            // Formspree returns 200 for success
            if (response.ok) {
                console.log('Success!');
                // Show success message
                showThankYouMessage();
                // Reset form
                form.reset();
            } else {
                console.error('Error response:', await response.text());
                // Show error message
                showErrorMessage();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Show error message
            showErrorMessage();
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});

function showThankYouMessage() {
    console.log('Showing thank you message');
    
    // Remove existing pop-up if any
    const existingPopup = document.querySelector('.popup-overlay');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create pop-up message container
    const popup = document.createElement('div');
    popup.className = 'popup-message popup-enter';
    
    // Create icon
    const icon = document.createElement('div');
    icon.className = 'popup-icon success';
    icon.textContent = '✓';
    
    // Create title
    const title = document.createElement('div');
    title.className = 'popup-title';
    title.textContent = 'Thank you!';
    
    // Create text
    const text = document.createElement('div');
    text.className = 'popup-text';
    text.textContent = "Your message has been sent successfully. I'll get back to you soon.";
    
    // Assemble pop-up
    popup.appendChild(icon);
    popup.appendChild(title);
    popup.appendChild(text);
    overlay.appendChild(popup);
    
    // Add to body
    document.body.appendChild(overlay);
    
    // Remove after 3.5 seconds with exit animation
    setTimeout(() => {
        popup.classList.remove('popup-enter');
        popup.classList.add('popup-exit');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }, 3500);
}

function showErrorMessage() {
    console.log('Showing error message');
    
    // Remove existing pop-up if any
    const existingPopup = document.querySelector('.popup-overlay');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create pop-up message container
    const popup = document.createElement('div');
    popup.className = 'popup-message popup-enter';
    
    // Create icon
    const icon = document.createElement('div');
    icon.className = 'popup-icon error';
    icon.textContent = '✗';
    
    // Create title
    const title = document.createElement('div');
    title.className = 'popup-title';
    title.textContent = 'Oops!';
    
    // Create text
    const text = document.createElement('div');
    text.className = 'popup-text';
    text.textContent = 'Something went wrong. Please try again or contact me directly.';
    
    // Assemble pop-up
    popup.appendChild(icon);
    popup.appendChild(title);
    popup.appendChild(text);
    overlay.appendChild(popup);
    
    // Add to body
    document.body.appendChild(overlay);
    
    // Remove after 3.5 seconds with exit animation
    setTimeout(() => {
        popup.classList.remove('popup-enter');
        popup.classList.add('popup-exit');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }, 3500);
}
