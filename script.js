document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Hamburger Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 2. Intersection Observer for Scroll Reveal
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger stats counter if element is inside metrics section
                if (entry.target.classList.contains('metrics-grid')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Animated Metrics Counter
    let counterTriggered = false;

    function animateCounters() {
        if (counterTriggered) return;
        counterTriggered = true;

        const counters = document.querySelectorAll('.metric-value');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.innerText.replace(/[\d.]/g, '');
            let current = 0;
            const increment = target / 50;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = (target % 1 === 0 ? Math.ceil(current) : current.toFixed(1)) + suffix;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            updateCounter();
        });
    }
});