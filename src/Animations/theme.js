// Theme Management Class
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.darkIcon = document.getElementById('theme-toggle-dark-icon');
        this.lightIcon = document.getElementById('theme-toggle-light-icon');
        this.html = document.documentElement;
        this.transition = document.querySelector('.theme-transition');
        
        this.initializeTheme();
        this.setupEventListeners();
        this.checkReducedMotion();
    }

    initializeTheme() {
        // Check for saved theme or system preference
        const isDark = localStorage.theme === 'dark' || 
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        this.setTheme(isDark ? 'dark' : 'light', false);
    }

    setupEventListeners() {
        // Theme toggle click handler
        this.themeToggle.addEventListener('click', (e) => this.handleThemeToggle(e));
        
        // System theme change handler
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.theme) {
                this.setTheme(e.matches ? 'dark' : 'light', true);
            }
        });
    }

    handleThemeToggle(e) {
        const rect = this.themeToggle.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.animateThemeChange(x, y);
        
        const newTheme = this.html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);
    }

    setTheme(theme, save = true) {
        this.html.setAttribute('data-theme', theme);
        
        // Update icons
        if (theme === 'dark') {
            this.darkIcon.classList.remove('hidden');
            this.lightIcon.classList.add('hidden');
        } else {
            this.darkIcon.classList.add('hidden');
            this.lightIcon.classList.remove('hidden');
        }
        
        // Save theme preference
        if (save) {
            localStorage.theme = theme;
        }
    }

    animateThemeChange(x, y) {
        if (this.transition.classList.contains('active')) return;
        
        this.transition.style.setProperty('--x', `${x}px`);
        this.transition.style.setProperty('--y', `${y}px`);
        
        this.transition.classList.add('active');
        
        setTimeout(() => {
            this.transition.classList.remove('active');
        }, 500);
    }

    checkReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.transition.style.display = 'none';
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
