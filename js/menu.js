document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.header__menu-button');
    const menu = document.getElementById('header__nav');
    const menuLinks = document.querySelectorAll('.header__nav-link');
    const html = document.documentElement;
    
    if (menuButton && menu) {
        let isAnimating = false;
        
        const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
        
        function isMobileView() {
            return mobileMediaQuery.matches;
        }
        
        function toggleMenu(isOpen) {
            if (isAnimating) return;
            isAnimating = true;
            
            menuButton.setAttribute('aria-expanded', isOpen);
            menu.setAttribute('aria-hidden', !isOpen);
            
            if (isMobileView()) {
                menuLinks.forEach(link => {
                    link.setAttribute('tabindex', isOpen ? '0' : '-1');
                });
                
                if (isOpen) {
                    menu.classList.add('open');
                    html.classList.add('menu-open');
                    
                    setTimeout(() => {
                        isAnimating = false;
                    }, 400);
                } else {

                    setTimeout(() => {
                        menu.classList.remove('open');
                        html.classList.remove('menu-open');
                        isAnimating = false;
                    }, 300);
                }
            } else {
                menuLinks.forEach(link => {
                    link.removeAttribute('tabindex');
                });
                menu.classList.remove('open');
                html.classList.remove('menu-open');
                isAnimating = false;
            }
        }
        
        menuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMobileView()) {
                    setTimeout(() => {
                        toggleMenu(false);
                    }, 200);
                }
            });
        });
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (!isMobileView()) {
                    menuButton.setAttribute('aria-expanded', 'false');
                    menu.setAttribute('aria-hidden', 'true');
                    menuLinks.forEach(link => {
                        link.removeAttribute('tabindex');
                    });
                    menu.classList.remove('open');
                    html.classList.remove('menu-open');
                    isAnimating = false;
                }
            }, 100);
        });
        
        document.addEventListener('click', function(event) {
            if (isMobileView() && menu.classList.contains('open') && 
                !menu.contains(event.target) && 
                !menuButton.contains(event.target)) {
                toggleMenu(false);
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && menu.classList.contains('open')) {
                toggleMenu(false);
                menuButton.focus();
            }
        });

        if (isMobileView()) {
    
            menu.classList.remove('open');
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const questionItems = document.querySelectorAll('.questions__item');
    
    if (questionItems.length) {
        questionItems.forEach((item, index) => {
            const header = item.querySelector('.questions__item-header');
            const button = item.querySelector('.questions__item-button');
            const content = item.querySelector('.questions__item-content');
            
            if (content) {
                const answerId = `faq-answer-${index}`;
                content.id = answerId;
                
                if (button) {
                    button.setAttribute('aria-controls', answerId);
                    button.setAttribute('aria-expanded', item.classList.contains('questions__item_open') ? 'true' : 'false');
                }
            }
        });
        
        questionItems.forEach(item => {
            const header = item.querySelector('.questions__item-header');
            const button = item.querySelector('.questions__item-button');
            
            if (!header) return;
            
            const toggleQuestion = () => {
                const isOpen = item.classList.contains('questions__item_open');
                
                if (isOpen) {
                    item.classList.remove('questions__item_open');
                    if (button) button.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('questions__item_open');
                    if (button) button.setAttribute('aria-expanded', 'true');
                }
            };
            
            header.style.cursor = 'pointer';
            header.addEventListener('click', toggleQuestion);
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleQuestion();
                }
            });
            
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleQuestion();
                });
                
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleQuestion();
                    }
                });
            }
        });
    }
});

