document.addEventListener('DOMContentLoaded', () => {
    // 1. Balloon Generation
    const balloonsContainer = document.getElementById('balloons-container');
    const balloonColors = ['#F9E4EB', '#E2A4B3', '#D68A9D', '#FDF1F4', '#e6b9c6'];
    const balloonCount = 15;

    for (let i = 0; i < balloonCount; i++) {
        createBalloon();
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        // Randomize properties
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const left = Math.random() * 100; // 0 to 100vw
        const width = 40 + Math.random() * 40; // 40px to 80px
        const height = width * 1.2;
        const animationDuration = 1.5 + Math.random() * 2; // 1.5s to 3.5s (very fast!)
        const animationDelay = Math.random() * 0.5; // 0s to 0.5s

        // Apply styles
        balloon.style.backgroundColor = color;
        balloon.style.color = color; // For the triangle tip
        balloon.style.left = `${left}vw`;
        balloon.style.width = `${width}px`;
        balloon.style.height = `${height}px`;
        balloon.style.animationDuration = `${animationDuration}s`;
        balloon.style.animationDelay = `${animationDelay}s`;

        // Add string
        const string = document.createElement('div');
        string.classList.add('balloon-string');
        balloon.appendChild(string);

        balloonsContainer.appendChild(balloon);

        // Remove balloon after animation ends, do not recreate so they just fly up once
        setTimeout(() => {
            balloon.remove();
        }, (animationDuration + animationDelay) * 1000);
    }



    // 2. Intersection Observer for Fade-in sections
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // 3. Gift Box Interactions
    const giftBoxes = document.querySelectorAll('.gift-box');
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeVideoBtn = document.getElementById('close-video-btn');

    const videos = {
        '1': 'images/twilight.mp4',
        '2': 'images/birthday cake.mp4'
    };

    giftBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const isAlreadyOpen = box.classList.contains('open');
            box.classList.add('open');
            
            const giftId = box.getAttribute('data-gift');
            const videoSrc = videos[giftId];

            if (videoSrc) {
                // If it wasn't open before, delay slightly for the lid animation
                const delay = isAlreadyOpen ? 0 : 600;
                
                setTimeout(() => {
                    modalVideo.src = videoSrc;
                    videoModal.classList.remove('hidden');
                    // Play returns a promise, catch potential autoplay restrictions
                    modalVideo.play().catch(e => console.log("Video auto-play prevented:", e));
                }, delay);
            }
        });
    });

    // Close Video Modal
    closeVideoBtn.addEventListener('click', () => {
        videoModal.classList.add('hidden');
        setTimeout(() => {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.src = "";
        }, 400); // Wait for CSS fade out
    });

    // Close when clicking outside video content
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoBtn.click();
        }
    });
});
