import AOS from 'aos';

export function initAnimations() {
    initAOS();
    initTypewriter();
    initCursorEffect();
    initEasterEgg();
    // Skill bars are handled by scroll event, so we expose the function
}

function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

function initTypewriter() {
    const typewriterElement = document.querySelector('.hero-tagline .highlight');
    if (typewriterElement) {
        const originalText = typewriterElement.textContent;
        let index = 0;

        const typeWriter = function () {
            if (index < originalText.length) {
                typewriterElement.textContent = originalText.substring(0, index + 1);
                index++;
                setTimeout(typeWriter, 150);
            }
        };

        // Enable typewriter effect
        typewriterElement.textContent = '';
        typeWriter();
    }
}

function initCursorEffect() {
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    showNotification('🚀 Easter Egg Activated! Hope is the key to innovation!', 'success');
    document.body.style.animation = 'rainbow 2s linear infinite';

    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    setTimeout(() => {
        document.body.style.animation = '';
        rainbowStyle.remove();
    }, 2000);
}

/**
 * Animate skill bars when they come into view.
 */
export function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (barPosition < screenPosition && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        }
    });
}
