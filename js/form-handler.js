document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form-wrapper');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Get form data
        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                showThankYouMessage();
                // Reset form
                form.reset();
            } else {
                // Show error message
                showErrorMessage();
            }
        } catch (error) {
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
    // Remove existing messages if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create success message
    const message = document.createElement('div');
    message.className = 'form-message form-message-success';
    message.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
    
    // Insert after the form
    const form = document.querySelector('.contact-form-wrapper');
    form.parentNode.insertBefore(message, form.nextSibling);

    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove message after 5 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 5000);
}

function showErrorMessage() {
    // Remove existing messages if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create error message
    const message = document.createElement('div');
    message.className = 'form-message form-message-error';
    message.textContent = 'Oops! Something went wrong. Please try again later.';
    
    // Insert after the form
    const form = document.querySelector('.contact-form-wrapper');
    form.parentNode.insertBefore(message, form.nextSibling);

    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove message after 5 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 5000);
}

