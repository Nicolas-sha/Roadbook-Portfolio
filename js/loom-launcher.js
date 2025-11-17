document.addEventListener('DOMContentLoaded', () => {
    const videoFrames = document.querySelectorAll('.project-video-frame');

    videoFrames.forEach((frame) => {
        const launchBtn = frame.querySelector('.project-video-launch');
        const closeBtn = frame.querySelector('.project-video-close');
        const iframe = frame.querySelector('.project-video-iframe');
        const baseSrc = frame.dataset.loomSrc;
        const thumbnail = frame.querySelector('.project-video-thumbnail');
        const thumbnailImg = frame.querySelector('.project-video-thumb-img');
        const thumbnailSrc = frame.dataset.thumbnail;

        if (thumbnailImg && thumbnailSrc) {
            thumbnailImg.src = thumbnailSrc;
        }

        if (!launchBtn || !iframe || !baseSrc) {
            return;
        }

        const buildSrc = (autoplay = false) => {
            if (!autoplay) return baseSrc;
            return baseSrc.includes('?') ? `${baseSrc}&autoplay=1` : `${baseSrc}?autoplay=1`;
        };

        launchBtn.addEventListener('click', () => {
            frame.classList.add('playing');
            iframe.src = buildSrc(true);
        });

        const closeVideo = () => {
            frame.classList.remove('playing');
            iframe.src = '';
        };

        closeBtn?.addEventListener('click', closeVideo);
    });
});

