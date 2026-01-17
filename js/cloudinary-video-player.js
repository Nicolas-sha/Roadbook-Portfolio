// Cloudinary Video Player - Advanced Video Controls
// Features: Skip ±10s, Speed control, Fullscreen, Progress bar

document.addEventListener('DOMContentLoaded', () => {
    const cloudName = 'df2vkglqk';

    console.log('🎬 Initializing Cloudinary Video Players...');

    // Video configurations for each project
    const videoConfigs = [
        {
            containerId: 'video-player-1',
            publicId: 'BDD_dashboard_loom_copie_mzr03o',
            title: 'From Data to Decisions'
        },
        {
            containerId: 'video-player-2',
            publicId: 'Rag_système_copie_mdoubp',
            title: 'Answering System'
        },
        {
            containerId: 'video-player-3',
            publicId: 'AB_Testing_copie_fbdpne',
            title: 'Automated A/B Prospecting Flow'
        }
    ];

    // Wait for Cloudinary SDK to be available
    const initPlayers = () => {
        if (typeof cloudinary === 'undefined' || !cloudinary.videoPlayer) {
            console.log('⏳ Waiting for Cloudinary SDK...');
            setTimeout(initPlayers, 100);
            return;
        }

        console.log('✅ Cloudinary SDK loaded');

        videoConfigs.forEach((config, index) => {
            const container = document.getElementById(config.containerId);

            if (!container) {
                console.error(`❌ Container not found: ${config.containerId}`);
                return;
            }

            // Clean container (prevent duplicates on hot reload)
            container.innerHTML = '';

            // Create video element
            const videoId = `cld-video-${index + 1}`;
            const videoElement = document.createElement('video');
            videoElement.id = videoId;
            videoElement.className = 'cld-video-player cld-fluid';
            videoElement.setAttribute('playsinline', '');

            // Force controls visibility via inline style causing overrides
            const style = document.createElement('style');
            style.textContent = `
                /* Control bar positioning */
                .vjs-control-bar { 
                    display: flex !important; 
                    opacity: 0 !important; 
                    visibility: visible !important;
                    z-index: 2147483647 !important;
                    bottom: 30px !important; /* Lift significantly higher */
                    left: 2% !important;
                    width: 96% !important;
                    background: rgba(40, 40, 40, 0.85) !important; /* Darker neutral background for contrast */
                    border-radius: 8px !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(5px) !important;
                    transform: translateY(150%) !important;
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                    height: 50px !important; /* Slightly taller for better touch */
                }

                /* Show controls on hover */
                .video-container:hover .vjs-control-bar,
                .cld-video-player:hover .vjs-control-bar,
                .cld-video-player.vjs-user-active .vjs-control-bar,
                .cld-video-player.vjs-paused .vjs-control-bar {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                
                /* Always show controls on touch devices when active/paused */
                @media (hover: none) and (pointer: coarse) {
                    .cld-video-player.vjs-user-active .vjs-control-bar,
                    .cld-video-player.vjs-paused .vjs-control-bar {
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                        bottom: 15px !important; /* Slightly lower on mobile for thumb reach */
                    }
                }

                /* Custom button styling */
                .vjs-button {
                    color: #FFFFFF !important;
                    font-size: 1.1em !important;
                }
                
                /* Red Progress Bar (YouTube style) */
                .vjs-play-progress {
                    background-color: #FF0000 !important;
                }
                
                /* Thicker progress bar */
                .vjs-progress-control .vjs-progress-holder {
                    height: 6px !important;
                    border-radius: 3px !important;
                }
                .vjs-progress-control:hover .vjs-progress-holder {
                    height: 10px !important; /* Even thicker on interaction */
                }

                /* --- FULLSCREEN SPECIFIC STYLES --- */
                /* Dock to bottom in fullscreen to avoid blocking view */
                .vjs-fullscreen .vjs-control-bar {
                    bottom: 0px !important;
                    left: 0 !important;
                    width: 100% !important;
                    border-radius: 0 !important;
                    border: none !important;
                    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
                    background: rgba(20, 20, 20, 0.9) !important; /* Almost black for cinema feel */
                }
            `;
            container.appendChild(style);
            container.appendChild(videoElement);

            // Initialize Cloudinary Video Player with advanced controls
            const player = cloudinary.videoPlayer(videoId, {
                cloud_name: cloudName,
                controls: true,
                bigPlayButton: true,
                showJumpControls: true,      // Skip ±10 seconds buttons
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],  // Speed control options
                fluid: true,
                muted: false,
                preload: 'metadata',
                posterOptions: {
                    transformation: {
                        startOffset: 0,       // Use first frame as poster
                        effect: 'blur:100'    // Slight blur for elegant look
                    }
                },
                colors: {
                    base: '#3E2723',         // Desert brown
                    accent: '#A67B5B',       // Clay color
                    text: '#F5F0E8'          // Light sand
                }
            });

            // Load the video source
            player.source(config.publicId, {
                transformation: {
                    quality: 'auto',
                    fetch_format: 'auto'
                }
            });

            console.log(`✅ Video player initialized: ${config.title}`);
        });

        console.log('🎉 All Cloudinary Video Players initialized!');
    };

    // Start initialization
    initPlayers();
});
