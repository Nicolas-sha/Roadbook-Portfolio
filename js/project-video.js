document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach((container) => {
        const video = container.querySelector('.project-video');
        const playBtn = container.querySelector('.video-play-btn');
        const fullscreenBtn = container.querySelector('.video-fullscreen-btn');
        const progressBar = container.querySelector('.video-progress-bar');
        const progressFilled = container.querySelector('.video-progress-filled');

        if (!video || !playBtn) return;

        // Force video to load and show first frame
        const ensureFirstFrame = () => {
            if (video.paused && video.readyState >= 1) {
                video.currentTime = 0.1; // Set to 0.1s to ensure we get a visible frame
            }
        };
        
        // Try to set first frame immediately if already loaded
        ensureFirstFrame();
        
        // When video metadata is loaded, set to first frame
        video.addEventListener('loadedmetadata', () => {
            setTimeout(ensureFirstFrame, 100);
        });

        // Ensure the first frame is displayed
        video.addEventListener('loadeddata', () => {
            setTimeout(ensureFirstFrame, 100);
        });
        
        // One more attempt after everything loads
        video.addEventListener('canplay', () => {
            setTimeout(ensureFirstFrame, 100);
        });
        
        // Final fallback after a delay
        setTimeout(ensureFirstFrame, 500);

        // Play button click handler
        playBtn.addEventListener('click', () => {
            container.classList.add('playing');
            video.play();
        });

        // Fullscreen button click handler
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    // Enter fullscreen
                    if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.webkitRequestFullscreen) {
                        container.webkitRequestFullscreen();
                    } else if (container.mozRequestFullScreen) {
                        container.mozRequestFullScreen();
                    } else if (container.msRequestFullscreen) {
                        container.msRequestFullscreen();
                    }
                } else {
                    // Exit fullscreen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            });
        }

        // Update fullscreen button icon when entering/exiting fullscreen
        const updateFullscreenButton = () => {
            if (fullscreenBtn) {
                const isFullscreen = document.fullscreenElement === container;
                const svg = fullscreenBtn.querySelector('svg path');
                if (svg) {
                    if (isFullscreen) {
                        // Exit fullscreen icon
                        svg.setAttribute('d', 'M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z');
                    } else {
                        // Enter fullscreen icon
                        svg.setAttribute('d', 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z');
                    }
                }
            }
        };

        document.addEventListener('fullscreenchange', updateFullscreenButton);
        document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
        document.addEventListener('mozfullscreenchange', updateFullscreenButton);
        document.addEventListener('msfullscreenchange', updateFullscreenButton);

        // Video click handler (pause/play)
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                container.classList.add('playing');
            } else {
                video.pause();
                container.classList.remove('playing');
            }
        });

        // Show play button when video ends
        video.addEventListener('ended', () => {
            container.classList.remove('playing');
            video.currentTime = 0;
        });

        // Show play button when video is paused
        video.addEventListener('pause', () => {
            if (video.currentTime < video.duration) {
                container.classList.remove('playing');
            }
        });

        // Hide play button when video is playing
        video.addEventListener('play', () => {
            container.classList.add('playing');
        });

        // Progress bar functionality
        if (progressBar && progressFilled) {
            // Update progress bar as video plays
            video.addEventListener('timeupdate', () => {
                const percent = (video.currentTime / video.duration) * 100;
                progressFilled.style.width = `${percent}%`;
            });

            // Click on progress bar to seek
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });

            // Drag functionality for progress bar
            let isDragging = false;

            progressBar.addEventListener('mousedown', (e) => {
                isDragging = true;
                const rect = progressBar.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    const rect = progressBar.getBoundingClientRect();
                    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    video.currentTime = pos * video.duration;
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });

            // Touch support for mobile
            progressBar.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                const rect = progressBar.getBoundingClientRect();
                const pos = (touch.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });

            progressBar.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = progressBar.getBoundingClientRect();
                const pos = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
                video.currentTime = pos * video.duration;
            });
        }
    });
});

