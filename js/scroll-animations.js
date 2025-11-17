document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.reveal');

    if (!targets.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        },
        {
            root: null,
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px',
        }
    );

    targets.forEach((el) => observer.observe(el));
});

