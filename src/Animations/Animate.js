// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
  // If you're using AOS library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out-cubic',
      offset: 100,
      // Respect user preferences for reduced motion
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
  
  // Fade in the navbar
  const navbar = document.querySelector('nav');
  setTimeout(() => {
    navbar.classList.remove('opacity-0');
    navbar.classList.add('opacity-100');
  }, 100);

});

 class MobileMenu {
            constructor() {
                this.menuToggle = document.getElementById('mobile-menu-toggle');
                this.menuClose = document.getElementById('mobile-menu-close');
                this.mobileMenu = document.getElementById('mobile-menu');
                this.overlay = document.getElementById('mobile-menu-overlay');
                this.hamburgerIcon = document.getElementById('hamburger-icon');
                this.closeIcon = document.getElementById('close-icon');
                this.isOpen = false;
                
                this.init();
            }
            
            init() {
                // Event listeners
                this.menuToggle.addEventListener('click', () => this.toggle());
                this.menuClose.addEventListener('click', () => this.close());
                this.overlay.addEventListener('click', () => this.close());
                
                // Close menu on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isOpen) {
                        this.close();
                    }
                });
                
                // Close menu on window resize to desktop size
                window.addEventListener('resize', () => {
                    if (window.innerWidth >= 768 && this.isOpen) {
                        this.close();
                    }
                });
                
                // Handle menu item clicks
                const menuItems = this.mobileMenu.querySelectorAll('nav a');
                menuItems.forEach(item => {
                    item.addEventListener('click', () => {
                        // Add a small delay to show the click effect
                        setTimeout(() => this.close(), 200);
                    });
                });
            }
            
            toggle() {
                if (this.isOpen) {
                    this.close();
                } else {
                    this.open();
                }
            }
            
            open() {
                this.isOpen = true;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                
                // Show overlay
                this.overlay.classList.remove('hidden');
                this.overlay.classList.add('overlay-fade-in');
                
                // Show menu
                this.mobileMenu.classList.remove('hidden');
                this.mobileMenu.classList.remove('menu-slide-out'); // Ensure slide-out is not present
                this.mobileMenu.classList.add('menu-slide-in');
                this.mobileMenu.style.transform = 'translateX(0)';
                
                // Toggle icons
                this.hamburgerIcon.classList.add('hidden');
                this.closeIcon.classList.remove('hidden');
                
                // Animate menu items and ensure they are visible
                const menuItems = this.mobileMenu.querySelectorAll('nav a');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                    item.style.display = 'flex'; // Ensure flex for proper layout
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100 + (index * 50));
                });
            }
            
            close() {
                this.isOpen = false;
                document.body.style.overflow = ''; // Restore scrolling
                
                // Hide overlay
                this.overlay.classList.remove('overlay-fade-in');
                this.overlay.classList.add('overlay-fade-out');
                
                // Hide menu
                this.mobileMenu.classList.remove('menu-slide-in');
                this.mobileMenu.classList.add('menu-slide-out');
                this.mobileMenu.style.transform = 'translateX(100%)';
                
                // Toggle icons
                this.hamburgerIcon.classList.remove('hidden');
                this.closeIcon.classList.add('hidden');
                
                // Hide menu items for accessibility and layout
                const menuItems = this.mobileMenu.querySelectorAll('nav a');
                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.display = 'none';
                });
                
                // Clean up after animation
                setTimeout(() => {
                    this.overlay.classList.add('hidden');
                    this.overlay.classList.remove('overlay-fade-out');
                    this.mobileMenu.classList.remove('menu-slide-out');
                    this.mobileMenu.classList.add('hidden');
                }, 300);
            }
        }
        
        // Initialize mobile menu when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new MobileMenu();
        });
        
        // Optional: Add smooth scroll behavior for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });