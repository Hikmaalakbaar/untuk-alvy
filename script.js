// ==================== Progress Bar ====================
const progressFill = document.getElementById('progressFill');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressFill.style.width = scrolled + '%';
});

// ==================== Detect Mobile Device ====================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// ==================== Custom Cursor ====================
let cursorX = 0;
let cursorY = 0;
let cursorElement = null;

if (!isMobile && window.innerWidth >= 768) {
    cursorElement = document.createElement('div');
    cursorElement.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #FF6B9D;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursorElement);
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        if (cursorElement) {
            cursorElement.style.left = cursorX + 'px';
            cursorElement.style.top = cursorY + 'px';
        }
    });
    
    document.addEventListener('mouseenter', () => {
        if (cursorElement) cursorElement.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        if (cursorElement) cursorElement.style.display = 'none';
    });
    
    // Hover effects
    document.querySelectorAll('a, button, .gallery-item, .play-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorElement) {
                cursorElement.style.width = '30px';
                cursorElement.style.height = '30px';
                cursorElement.style.borderColor = '#C77DFF';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorElement) {
                cursorElement.style.width = '20px';
                cursorElement.style.height = '20px';
                cursorElement.style.borderColor = '#FF6B9D';
            }
        });
    });
}

// ==================== Mouse Trail Effect ====================
const mouseTrailCanvas = document.getElementById('mouseTrail');
if (mouseTrailCanvas && !isMobile) {
    const trailCtx = mouseTrailCanvas.getContext('2d');
    mouseTrailCanvas.width = window.innerWidth;
    mouseTrailCanvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;
    const trail = [];

    window.addEventListener('resize', () => {
        mouseTrailCanvas.width = window.innerWidth;
        mouseTrailCanvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({
            x: mouseX,
            y: mouseY,
            life: 1
        });
        
        if (trail.length > 20) {
            trail.shift();
        }
    });

    function drawTrail() {
        trailCtx.clearRect(0, 0, mouseTrailCanvas.width, mouseTrailCanvas.height);
        
        for (let i = 0; i < trail.length; i++) {
            const point = trail[i];
            point.life -= 0.05;
            
            if (point.life > 0) {
                const gradient = trailCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 30);
                gradient.addColorStop(0, `rgba(255, 107, 157, ${point.life * 0.8})`);
                gradient.addColorStop(1, 'rgba(255, 107, 157, 0)');
                
                trailCtx.fillStyle = gradient;
                trailCtx.beginPath();
                trailCtx.arc(point.x, point.y, 30 * point.life, 0, Math.PI * 2);
                trailCtx.fill();
            }
        }
        
        requestAnimationFrame(drawTrail);
    }
    drawTrail();
} else if (mouseTrailCanvas) {
    mouseTrailCanvas.style.display = 'none';
}

// ==================== Particle System ====================
const particlesCanvas = document.getElementById('particles');
if (particlesCanvas) {
    const particlesCtx = particlesCanvas.getContext('2d');
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = isMobile ? 20 : 50; // Reduce particles on mobile for performance

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = [
                'rgba(255, 107, 157, ',
                'rgba(199, 125, 255, ',
                'rgba(78, 205, 196, ',
                'rgba(255, 230, 109, '
            ][Math.floor(Math.random() * 4)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > particlesCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > particlesCanvas.height) this.speedY *= -1;
        }
        
        draw() {
            particlesCtx.fillStyle = this.color + this.opacity + ')';
            particlesCtx.beginPath();
            particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            particlesCtx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        const maxDistance = isMobile ? 100 : 150; // Reduce connection distance on mobile
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    particlesCtx.strokeStyle = `rgba(255, 107, 157, ${0.2 * (1 - distance / maxDistance)})`;
                    particlesCtx.lineWidth = 1;
                    particlesCtx.beginPath();
                    particlesCtx.moveTo(particles[i].x, particles[i].y);
                    particlesCtx.lineTo(particles[j].x, particles[j].y);
                    particlesCtx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        if (!isMobile) {
            connectParticles(); // Skip connections on mobile for better performance
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('resize', () => {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    });
}

// ==================== Confetti Effect ====================
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#FF6B9D', '#C77DFF', '#4ECDC4', '#FFE66D'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10001';
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        
        document.body.appendChild(confetti);
        
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 0.5;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.style.transition = `all ${animationDuration}s ease-out ${animationDelay}s`;
        
        setTimeout(() => {
            confetti.style.transform = `translate(${xMovement}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + animationDelay) * 1000);
    }
}

// Trigger confetti on reveal button click
const revealBtn = document.getElementById('revealBtn');
if (revealBtn) {
    revealBtn.addEventListener('click', () => {
        createConfetti();
        setTimeout(() => {
            window.scrollTo({
                top: document.getElementById('poem').offsetTop - 100,
                behavior: 'smooth'
            });
        }, 500);
    });
}

// ==================== Audio Player ====================
const playBtn = document.getElementById('playBtn');
const playIcon = playBtn?.querySelector('.play-icon');
const pauseIcon = playBtn?.querySelector('.pause-icon');
const audioVisualizer = document.querySelector('.audio-visualizer');
let audio = null;
let isPlaying = false;

function initAudio() {
    audio = new Audio('audio/voice-note.mp3');
    
    audio.addEventListener('play', () => {
        isPlaying = true;
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'inline-block';
        if (audioVisualizer) audioVisualizer.classList.add('playing');
    });
    
    audio.addEventListener('pause', () => {
        isPlaying = false;
        if (playIcon) playIcon.style.display = 'inline-block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (audioVisualizer) audioVisualizer.classList.remove('playing');
    });
    
    audio.addEventListener('ended', () => {
        isPlaying = false;
        if (playIcon) playIcon.style.display = 'inline-block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (audioVisualizer) audioVisualizer.classList.remove('playing');
    });
    
    audio.addEventListener('error', () => {
        console.log('Audio file not found. Please add your voice note to audio/voice-note.mp3');
        if (playBtn) playBtn.disabled = true;
        if (playBtn) playBtn.style.opacity = '0.5';
    });
}

if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (!audio) {
            initAudio();
        }
        
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(err => {
                console.log('Error playing audio:', err);
            });
        }
    });
}

// ==================== Video Player ====================
const video = document.getElementById('loveVideo');
const videoOverlay = document.getElementById('videoOverlay');
const playOverlay = videoOverlay?.querySelector('.play-overlay');

if (video && playOverlay) {
    playOverlay.addEventListener('click', () => {
        video.play();
        videoOverlay.style.opacity = '0';
        videoOverlay.style.pointerEvents = 'none';
    });
    
    video.addEventListener('play', () => {
        videoOverlay.style.opacity = '0';
        videoOverlay.style.pointerEvents = 'none';
    });
    
    video.addEventListener('pause', () => {
        if (video.currentTime === 0) {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        }
    });
    
    video.addEventListener('error', () => {
        console.log('Video file not found. Please add your video to videos/love-video.mp4');
    });
}

// ==================== Gallery Lightbox ====================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return img ? img.src : '';
}).filter(src => src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            currentImageIndex = images.indexOf(img.src);
            if (currentImageIndex === -1) currentImageIndex = 0;
            openLightbox();
        }
    });
});

function openLightbox() {
    if (lightbox && lightboxImg && images.length > 0) {
        lightbox.classList.add('active');
        lightboxImg.src = images[currentImageIndex];
        document.body.style.overflow = 'hidden';
        createConfetti();
    }
}

function closeLightboxFunc() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentImageIndex];
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFunc);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightboxFunc();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.poem-card, .voice-card, .video-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ==================== Floating Hearts on Click/Touch ====================
function createHeartAtPosition(x, y) {
    if (Math.random() > 0.7) {
        const hearts = ['💖', '💕', '💗', '❤️', '💝'];
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = isMobile ? '20px' : '25px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartClick 1s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.lightbox')) {
        createHeartAtPosition(e.clientX, e.clientY);
    }
});

// Touch support for mobile
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0 && !e.target.closest('.lightbox')) {
        const touch = e.touches[0];
        createHeartAtPosition(touch.clientX, touch.clientY);
    }
});

// Add heart click animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes heartClick {
        0% {
            transform: scale(0) translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) translateY(-80px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Tilt Effect ====================
if (!isMobile) {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ==================== Parallax Effect ====================
if (!isMobile) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax for orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== Floating Navigation Active State ====================
const floatingNav = document.getElementById('floatingNav');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// ==================== Letter Animation on Load ====================
window.addEventListener('load', () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.animation = 'letterReveal 0.8s ease-out forwards';
        }, index * 100);
    });
    
    // Create initial confetti
    setTimeout(() => {
        createConfetti();
    }, 1000);
});

// ==================== Auto-create Floating Hearts ====================
const heartInterval = isMobile ? 4000 : 2000; // Less frequent on mobile
setInterval(() => {
    if (Math.random() > 0.5) {
        const hearts = ['💖', '💕', '💗'];
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.fontSize = (isMobile ? Math.random() * 15 + 10 : Math.random() * 20 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 8s linear';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.top = '-10%';
            heart.style.transform = `translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
        }, 10);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
}, heartInterval);

console.log('💕 Website untuk Alvy Adelya telah dimuat! Semoga berhasil! 💕');
