// Main App Controller
class CalculatorApp {
    constructor() {
        this.currentCalculator = 'home';
        this.theme = 'light';
        
        this.init();
    }

    init() {
        this.showSplashScreen();
        this.initializeTheme();
        this.initializeEventListeners();
        this.initializeQuotes();
        this.initializeHomePage();
        
        // Hide splash screen after 3 seconds
        setTimeout(() => {
            this.hideSplashScreen();
        }, 3000);
    }

    showSplashScreen() {
        const splash = document.getElementById('splash-screen');
        splash.classList.remove('hidden');
    }

    hideSplashScreen() {
        const splash = document.getElementById('splash-screen');
        const mainApp = document.getElementById('main-app');
        
        splash.classList.add('hidden');
        mainApp.classList.remove('hidden');
        
        // Initialize with home page visible
        this.switchCalculator('home');
        
        // Remove splash screen from DOM after animation
        setTimeout(() => {
            if (splash.parentNode) {
                splash.parentNode.removeChild(splash);
            }
        }, 500);
    }

    initializeTheme() {
        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('calculator-theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.theme = theme;
        document.body.setAttribute('data-theme', theme);
        
        const themeIcon = document.getElementById('theme-icon');
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        
        // Save theme preference
        localStorage.setItem('calculator-theme', theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    initializeEventListeners() {
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const calculator = e.currentTarget.dataset.calculator;
                this.switchCalculator(calculator);
            });
        });

        // View all buttons on home page
        const viewAllBtns = document.querySelectorAll('.view-all-btn');
        viewAllBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Switch to formulas page for now, can be extended for other sections
                this.switchCalculator('formulas');
            });
        });

        // Quote section toggle
        const quotesToggle = document.querySelector('.quotes-toggle');
        const quoteSection = document.getElementById('quote-section');
        quotesToggle.addEventListener('click', () => {
            quoteSection.style.display = quoteSection.style.display === 'none' ? 'block' : 'none';
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
    }

    switchCalculator(calculatorType) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-calculator="${calculatorType}"]`).classList.add('active');

        // Hide all calculator containers
        document.querySelectorAll('.calculator-container').forEach(container => {
            container.classList.remove('active');
        });

        if (calculatorType === 'home') {
            // Show home page only
            document.getElementById('home-calculator').classList.add('active');
            this.updateHomePageStats();
            this.displayRecentActivity();
        } else {
            // Show specific calculator only, hide home page
            document.getElementById(`${calculatorType}-calculator`).classList.add('active');
            this.currentCalculator = calculatorType;
            
            // Ensure calculator is properly initialized
            this.initializeCalculator(calculatorType);
        }
    }

    // History is now managed by the dedicated HistoryManager class

    // updateHistory is now handled by HistoryManager

    // All history functionality moved to HistoryManager class

    showRecentCalculatorHistory() {
        // Show combined history from all calculators
        const historyContent = document.getElementById('history-content');
        const allCalculations = [];

        // Collect all calculations with their calculator type
        Object.entries(this.history).forEach(([calculatorType, calculations]) => {
            calculations.forEach(calc => {
                allCalculations.push({
                    ...calc,
                    calculatorType: calculatorType
                });
            });
        });

        // Sort by timestamp (most recent first)
        allCalculations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (allCalculations.length === 0) {
            historyContent.innerHTML = `
                <div class="no-history">
                    <i class="fas fa-clock"></i>
                    <p>No calculations yet</p>
                    <small>Use any calculator to build history</small>
                </div>
            `;
            return;
        }

        // Show recent calculations from all calculators
        const recentCalculations = allCalculations.slice(0, 20); // Show last 20 calculations
        historyContent.innerHTML = recentCalculations.map(item => `
            <div class="history-item" data-id="${item.id}" data-calculator="${item.calculatorType}">
                <div class="history-calculator-type">${item.calculatorType.toUpperCase()}</div>
                <div class="history-expression">${this.escapeHtml(item.expression)}</div>
                <div class="history-result">${this.escapeHtml(item.result)}</div>
                <div class="history-timestamp">${item.timestamp}</div>
            </div>
        `).join('');

        // Add click listeners to history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const calculatorType = e.currentTarget.dataset.calculator;
                const expression = e.currentTarget.querySelector('.history-expression').textContent;
                
                // Switch to the appropriate calculator
                this.switchCalculator(calculatorType);
                
                // Load the expression
                setTimeout(() => {
                    this.loadFromHistory(expression);
                }, 100);
            });
        });
    }

    initializeQuotes() {
        // Initialize quotes functionality
        if (window.QuotesManager) {
            this.quotesManager = new QuotesManager();
        }
    }

    handleKeyboardInput(e) {
        // Handle keyboard shortcuts
        const key = e.key;
        const ctrl = e.ctrlKey || e.metaKey;

        // Theme toggle: Ctrl/Cmd + D
        if (ctrl && key === 'd') {
            e.preventDefault();
            this.toggleTheme();
            return;
        }

        // History toggle: Ctrl/Cmd + H
        if (ctrl && key === 'h') {
            e.preventDefault();
            const historyPanel = document.getElementById('history-panel');
            historyPanel.classList.toggle('open');
            return;
        }

        // Calculator switching: Ctrl/Cmd + 1-6
        if (ctrl && key >= '1' && key <= '6') {
            e.preventDefault();
            const calculators = ['basic', 'scientific', 'programming', 'conversion', 'currency', 'formulas'];
            const index = parseInt(key) - 1;
            if (calculators[index]) {
                this.switchCalculator(calculators[index]);
            }
            return;
        }

        // Pass other keyboard events to active calculator
        const activeCalculator = document.querySelector('.calculator-container.active');
        if (activeCalculator && this.currentCalculator !== 'formulas' && this.currentCalculator !== 'home') {
            this.handleCalculatorKeyboard(e);
        }
    }

    handleCalculatorKeyboard(e) {
        const key = e.key;
        let button = null;

        // Number keys
        if (key >= '0' && key <= '9') {
            button = document.querySelector(`#${this.currentCalculator}-calculator .btn[data-value="${key}"]`);
        }
        // Operator keys
        else if (key === '+' || key === '-' || key === '*' || key === '/') {
            let operator = key;
            if (key === '*') operator = '*';
            button = document.querySelector(`#${this.currentCalculator}-calculator .btn[data-action="${operator}"]`);
        }
        // Decimal point
        else if (key === '.' || key === ',') {
            button = document.querySelector(`#${this.currentCalculator}-calculator .btn[data-action="."]`);
        }
        // Enter or equals
        else if (key === 'Enter' || key === '=') {
            button = document.querySelector(`#${this.currentCalculator}-calculator .btn[data-action="="]`);
        }
        // Backspace
        else if (key === 'Backspace') {
            button = document.querySelector(`#${this.currentCalculator}-calculator .btn[data-action="backspace"]`);
        }
        // Clear (Escape or Delete)
        else if (key === 'Escape' || key === 'Delete') {
            button = document.querySelector(`#${this.currentCalculator}-calculator .btn[data-action="clear"]`);
        }

        if (button && !button.disabled) {
            e.preventDefault();
            button.click();
            
            // Visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Utility methods for calculators
    formatNumber(num) {
        if (isNaN(num) || !isFinite(num)) {
            return 'Error';
        }

        // Handle very large or very small numbers
        if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
            return num.toExponential(10);
        }

        // Remove trailing zeros and unnecessary decimal point
        return parseFloat(num.toFixed(10)).toString();
    }

    showError(message = 'Error') {
        const resultElement = document.getElementById(`${this.currentCalculator}-result`);
        if (resultElement) {
            resultElement.textContent = message;
            resultElement.style.color = '#ef4444';
            
            // Reset color after 2 seconds
            setTimeout(() => {
                resultElement.style.color = '';
            }, 2000);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Hide and remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Calculator Initialization
    initializeCalculator(calculatorType) {
        // Ensure the specific calculator is properly initialized
        switch(calculatorType) {
            case 'basic':
                if (window.basicCalculator) {
                    window.basicCalculator.bindEvents();
                }
                break;
            case 'scientific':
                if (window.scientificCalculator) {
                    window.scientificCalculator.bindEvents();
                }
                break;
            case 'programming':
                if (window.programmingCalculator) {
                    window.programmingCalculator.bindEvents();
                }
                break;
            case 'conversion':
                if (window.conversionCalculator) {
                    window.conversionCalculator.bindEvents();
                }
                break;
            case 'currency':
                if (window.currencyCalculator) {
                    window.currencyCalculator.bindEvents();
                }
                break;
        }
    }

    // Home Page Methods
    initializeHomePage() {
        this.setupCalculatorCards();
        this.updateHomePageStats();
        this.displayRecentActivity();
    }

    setupCalculatorCards() {
        const calculatorCards = document.querySelectorAll('.calc-card');
        calculatorCards.forEach(card => {
            card.addEventListener('click', () => {
                const calculatorType = card.dataset.calculator;
                if (calculatorType) {
                    this.switchCalculator(calculatorType);
                }
            });
        });
    }

    updateHomePageStats() {
        const totalCalculationsElement = document.querySelector('.stat-item .stat-number');
        const calculatorsAvailableElement = document.querySelectorAll('.stat-item .stat-number')[1];
        const formulasAvailableElement = document.querySelectorAll('.stat-item .stat-number')[2];

        if (totalCalculationsElement && window.historyManager) {
            const totalCalculations = Object.values(window.historyManager.history).reduce((total, history) => total + history.length, 0);
            totalCalculationsElement.textContent = totalCalculations;
        }

        if (calculatorsAvailableElement) {
            calculatorsAvailableElement.textContent = '6';
        }

        if (formulasAvailableElement) {
            formulasAvailableElement.textContent = '20+';
        }
    }

    displayRecentActivity() {
        const recentCalculations = document.querySelector('.recent-calculations');
        if (!recentCalculations || !window.historyManager) return;

        // Get last 3 calculations from history manager
        const allCalculations = [];
        Object.entries(window.historyManager.history).forEach(([type, calculations]) => {
            calculations.forEach(calc => {
                allCalculations.push({
                    ...calc,
                    calculatorType: type
                });
            });
        });

        // Sort by timestamp and get last 3
        allCalculations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const recentItems = allCalculations.slice(0, 3);

        if (recentItems.length === 0) {
            recentCalculations.innerHTML = `
                <div class="no-recent">
                    <i class="fas fa-calculator"></i>
                    <p>No recent calculations</p>
                    <small>Start calculating to see your recent activity</small>
                </div>
            `;
            return;
        }

        recentCalculations.innerHTML = recentItems.map(item => `
            <div class="recent-item" data-calculator="${item.calculatorType}">
                <div class="recent-expression">${this.escapeHtml(item.expression)}</div>
                <div class="recent-result">${this.escapeHtml(item.result)}</div>
            </div>
        `).join('');

        // Add click listeners to recent items
        document.querySelectorAll('.recent-item').forEach(item => {
            item.addEventListener('click', () => {
                const calculatorType = item.dataset.calculator;
                this.switchCalculator(calculatorType);
            });
        });
    }
}

// Notification styles (add to CSS or create as inline styles)
const notificationStyles = `
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: var(--shadow-heavy);
        z-index: 1000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification-success {
        border-left: 4px solid #10b981;
        color: #10b981;
    }

    .notification-error {
        border-left: 4px solid #ef4444;
        color: #ef4444;
    }

    .notification-info {
        border-left: 4px solid #3b82f6;
        color: #3b82f6;
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification span {
        color: var(--text-primary);
        font-weight: 500;
    }
`;

// Add notification styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main app
    window.calculatorApp = new CalculatorApp();
    
    // History is now managed by HistoryManager class

    // Service Worker registration for PWA functionality (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (window.calculatorApp) {
        window.calculatorApp.showNotification('An unexpected error occurred', 'error');
    }
});

// Prevent context menu on calculator buttons (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('btn')) {
        e.preventDefault();
    }
});

// Export for use in other modules
window.CalculatorApp = CalculatorApp;