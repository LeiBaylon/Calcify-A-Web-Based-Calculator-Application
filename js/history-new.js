/**
 * Clean History Manager
 * Manages calculation history with filtering and storage
 */

class HistoryManager {
    constructor() {
        this.history = {
            basic: [],
            scientific: [],
            programming: [],
            conversion: [],
            currency: []
        };
        
        this.currentFilter = 'all';
        this.maxHistoryItems = 50;
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        // History toggle button
        const toggleBtn = document.getElementById('history-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.togglePanel());
        }

        // Close button
        const closeBtn = document.getElementById('history-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePanel());
        }

        // Filter select
        const filterSelect = document.getElementById('history-filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.updateDisplay();
            });
        }

        // Clear button
        const clearBtn = document.getElementById('clear-history');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearHistory());
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('history-panel');
            const toggleBtn = document.getElementById('history-toggle');
            
            if (panel && panel.classList.contains('open') && 
                !panel.contains(e.target) && 
                (!toggleBtn || !toggleBtn.contains(e.target))) {
                this.closePanel();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                this.togglePanel();
            }
            if (e.key === 'Escape') {
                this.closePanel();
            }
        });
    }

    togglePanel() {
        const panel = document.getElementById('history-panel');
        if (panel) {
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) {
                this.updateDisplay();
            }
        }
    }

    closePanel() {
        const panel = document.getElementById('history-panel');
        if (panel) {
            panel.classList.remove('open');
        }
    }

    addCalculation(expression, result, calculatorType, metadata = {}) {
        if (!this.history[calculatorType]) return;

        const calculation = {
            id: Date.now() + Math.random(),
            expression: expression.toString(),
            result: result.toString(),
            calculatorType,
            timestamp: new Date().toISOString(),
            metadata
        };

        // Add to beginning of array
        this.history[calculatorType].unshift(calculation);

        // Limit history size
        if (this.history[calculatorType].length > this.maxHistoryItems) {
            this.history[calculatorType] = this.history[calculatorType].slice(0, this.maxHistoryItems);
        }

        this.saveToStorage();
        
        // Update display if panel is open
        const panel = document.getElementById('history-panel');
        if (panel && panel.classList.contains('open')) {
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const content = document.getElementById('history-content');
        if (!content) return;

        const filteredHistory = this.getFilteredHistory();

        if (filteredHistory.length === 0) {
            content.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <h4>No calculations yet</h4>
                    <p>Your calculation history will appear here</p>
                </div>
            `;
            return;
        }

        content.innerHTML = filteredHistory.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-item-header">
                    <span class="history-type">${this.getCalculatorDisplayName(item.calculatorType)}</span>
                    <span class="history-timestamp">${this.formatTimestamp(item.timestamp)}</span>
                </div>
                <div class="history-expression" title="${this.escapeHtml(item.expression)}">${this.escapeHtml(this.truncate(item.expression, 50))}</div>
                <div class="history-result" title="${this.escapeHtml(item.result)}">${this.escapeHtml(this.truncate(item.result, 30))}</div>
                <button class="history-delete" data-id="${item.id}" title="Delete">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        // Bind item events
        this.bindItemEvents();
    }

    bindItemEvents() {
        const items = document.querySelectorAll('.history-item');
        const deleteButtons = document.querySelectorAll('.history-delete');

        // Click to reuse calculation
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.history-delete')) return;
                
                const itemId = parseFloat(item.dataset.id);
                this.reuseCalculation(itemId);
            });
        });

        // Delete individual items
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseFloat(btn.dataset.id);
                this.deleteCalculation(itemId);
            });
        });
    }

    reuseCalculation(itemId) {
        const calculation = this.findCalculation(itemId);
        if (!calculation) return;

        // Switch to the appropriate calculator
        if (window.calculatorApp && window.calculatorApp.switchCalculator) {
            window.calculatorApp.switchCalculator(calculation.calculatorType);
        }

        // Wait a moment for calculator to switch, then populate
        setTimeout(() => {
            const expressionEl = document.getElementById(`${calculation.calculatorType}-expression`);
            const resultEl = document.getElementById(`${calculation.calculatorType}-result`);

            if (expressionEl && resultEl) {
                expressionEl.textContent = calculation.expression;
                resultEl.textContent = calculation.result;
            }
        }, 100);

        this.closePanel();

        // Show notification if available
        if (window.calculatorApp && window.calculatorApp.showNotification) {
            window.calculatorApp.showNotification('Calculation loaded', 'success');
        }
    }

    deleteCalculation(itemId) {
        for (const type in this.history) {
            const index = this.history[type].findIndex(item => item.id === itemId);
            if (index !== -1) {
                this.history[type].splice(index, 1);
                break;
            }
        }
        
        this.saveToStorage();
        this.updateDisplay();
    }

    clearHistory() {
        const filterName = this.currentFilter === 'all' ? 'all history' : 
                          `${this.getCalculatorDisplayName(this.currentFilter)} history`;

        if (confirm(`Clear ${filterName}?`)) {
            if (this.currentFilter === 'all') {
                // Clear all
                Object.keys(this.history).forEach(type => {
                    this.history[type] = [];
                });
            } else {
                // Clear specific type
                this.history[this.currentFilter] = [];
            }

            this.saveToStorage();
            this.updateDisplay();

            // Show notification if available
            if (window.calculatorApp && window.calculatorApp.showNotification) {
                window.calculatorApp.showNotification(`${filterName} cleared`, 'info');
            }
        }
    }

    getFilteredHistory() {
        if (this.currentFilter === 'all') {
            // Combine all histories and sort by timestamp
            const allHistory = [];
            Object.keys(this.history).forEach(type => {
                allHistory.push(...this.history[type]);
            });
            return allHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else {
            return [...this.history[this.currentFilter]];
        }
    }

    findCalculation(itemId) {
        for (const type in this.history) {
            const calculation = this.history[type].find(item => item.id === itemId);
            if (calculation) return calculation;
        }
        return null;
    }

    getCalculatorDisplayName(type) {
        const names = {
            basic: 'Basic',
            scientific: 'Scientific',
            programming: 'Programming',
            conversion: 'Unit Conv.',
            currency: 'Currency'
        };
        return names[type] || type;
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        
        const diffMinutes = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    }

    truncate(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveToStorage() {
        try {
            localStorage.setItem('calculator-history', JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('calculator-history');
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge with existing structure
                Object.keys(this.history).forEach(type => {
                    if (parsed[type] && Array.isArray(parsed[type])) {
                        this.history[type] = parsed[type];
                    }
                });
            }
        } catch (error) {
            console.error('Error loading history:', error);
        }
    }

    // Get statistics for home page
    getStatistics() {
        const stats = {
            totalCalculations: 0,
            byType: {},
            mostUsedCalculator: null
        };

        let maxCount = 0;

        Object.keys(this.history).forEach(type => {
            const count = this.history[type].length;
            stats.byType[type] = count;
            stats.totalCalculations += count;

            if (count > maxCount) {
                maxCount = count;
                stats.mostUsedCalculator = type;
            }
        });

        return stats;
    }
}

// Initialize history manager
let historyManager;

function initHistoryManager() {
    if (!window.historyManager) {
        historyManager = new HistoryManager();
        window.historyManager = historyManager;
        console.log('Clean HistoryManager initialized');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistoryManager);
} else {
    initHistoryManager();
}