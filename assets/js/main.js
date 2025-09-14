document.addEventListener('DOMContentLoaded', () => {

    // --- Sidebar Menu ---
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    
    if (hamburger && sidebar && closeBtn) {
        hamburger.addEventListener('click', () => sidebar.classList.add('active'));
        closeBtn.addEventListener('click', () => sidebar.classList.remove('active'));
        
        // Close sidebar when a link is clicked
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => sidebar.classList.remove('active'));
        });
    }

    // --- Simple Fade-in Animation on Scroll ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
            setTimeout(() => entry.target.classList.add('visible'), delay);
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- Motion Text (Typing) Effect on Hero Section ---
    const motionTextEl = document.querySelector('.motion-text');
    if (motionTextEl) {
        const words = ["Digital Experiences.", "Powerful Mods.", "eSports Tournaments."];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            motionTextEl.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            
            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 150);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 100);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 1200);
            }
        }
        type();
    }

    // --- Portfolio Filtering ---
    const filterContainer = document.querySelector('.portfolio-filters');
    if (filterContainer) {
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    item.classList.toggle('hide', !(filterValue === 'all' || item.dataset.category === filterValue));
                });
            });
        });
    }

    // --- Sub-brands Modal Logic ---
    document.querySelectorAll('.open-modal-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById(button.dataset.modalTarget).style.display = 'block';
        });
    });
    document.querySelectorAll('.close-modal-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) event.target.style.display = 'none';
    });

    // --- Cookie Consent Banner ---
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    if (cookieConsent && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => cookieConsent.classList.add('show'), 2000);
    }
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            cookieConsent.classList.remove('show');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const name = document.getElementById('name'), email = document.getElementById('email'), message = document.getElementById('message');
            const successMessage = document.getElementById('form-success-message');

            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
            successMessage.style.display = 'none';

            if (name.value.trim() === '') { isValid = false; name.parentElement.classList.add('error'); }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { isValid = false; email.parentElement.classList.add('error'); }
            if (message.value.trim() === '') { isValid = false; message.parentElement.classList.add('error'); }

            if (isValid) {
                console.log('Form Submitted:', { name: name.value, email: email.value, message: message.value });
                successMessage.style.display = 'block';
                contactForm.reset();
            }
        });
    }
});

