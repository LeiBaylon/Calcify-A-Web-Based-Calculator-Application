// Currency Calculator Implementation
class CurrencyCalculator {
    constructor() {
        this.fromCurrency = 'USD';
        this.toCurrency = 'EUR';
        this.exchangeRates = {};
        this.baseCurrency = 'USD'; // Base currency for exchange rates
        this.lastUpdated = null;
        this.isLoading = false;
        
        // Default exchange rates (fallback if API fails)
        this.defaultRates = {
            'USD': 1.00,
            'EUR': 0.85,
            'GBP': 0.73,
            'JPY': 110.0,
            'CAD': 1.25,
            'AUD': 1.35,
            'CHF': 0.92,
            'CNY': 6.45,
            'INR': 74.5,
            'BRL': 5.2,
            'RUB': 75.0,
            'KRW': 1180.0,
            'SGD': 1.35,
            'MXN': 20.0,
            'ZAR': 14.8
        };
        
        this.currencyNames = {
            'USD': 'US Dollar',
            'EUR': 'Euro',
            'GBP': 'British Pound',
            'JPY': 'Japanese Yen',
            'CAD': 'Canadian Dollar',
            'AUD': 'Australian Dollar',
            'CHF': 'Swiss Franc',
            'CNY': 'Chinese Yuan',
            'INR': 'Indian Rupee',
            'BRL': 'Brazilian Real',
            'RUB': 'Russian Ruble',
            'KRW': 'South Korean Won',
            'SGD': 'Singapore Dollar',
            'MXN': 'Mexican Peso',
            'ZAR': 'South African Rand'
        };
        
        this.init();
    }

    init() {
        this.loadDefaultRates();
        this.bindEvents();
        this.updateCurrencySelects();
        this.updateExchangeRateDisplay();
        this.loadRatesFromStorage();
        
        // Try to fetch fresh rates
        this.fetchExchangeRates();
    }

    bindEvents() {
        const fromCurrencySelect = document.getElementById('from-currency');
        const toCurrencySelect = document.getElementById('to-currency');
        const fromValueInput = document.getElementById('from-currency-value');
        const convertBtn = document.getElementById('convert-currency-btn');
        const refreshBtn = document.getElementById('refresh-rates');
        const swapBtn = document.getElementById('swap-currencies');

        if (fromCurrencySelect) {
            fromCurrencySelect.addEventListener('change', (e) => {
                this.fromCurrency = e.target.value;
                this.updateExchangeRateDisplay();
                this.convert();
            });
        }

        if (toCurrencySelect) {
            toCurrencySelect.addEventListener('change', (e) => {
                this.toCurrency = e.target.value;
                this.updateExchangeRateDisplay();
                this.convert();
            });
        }

        if (fromValueInput) {
            fromValueInput.addEventListener('input', (e) => {
                this.convert();
            });

            fromValueInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.convert();
                }
            });
        }

        if (convertBtn) {
            convertBtn.addEventListener('click', () => {
                this.convert();
            });
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.fetchExchangeRates(true);
            });
        }

        if (swapBtn) {
            swapBtn.addEventListener('click', () => {
                this.swapCurrencies();
            });
        }
    }

    updateCurrencySelects() {
        const fromSelect = document.getElementById('from-currency');
        const toSelect = document.getElementById('to-currency');
        
        if (!fromSelect || !toSelect) return;

        // Clear existing options
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';

        // Add currency options
        Object.keys(this.currencyNames).forEach(code => {
            const name = this.currencyNames[code];
            
            const fromOption = document.createElement('option');
            fromOption.value = code;
            fromOption.textContent = `${code} - ${name}`;
            fromSelect.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.value = code;
            toOption.textContent = `${code} - ${name}`;
            toSelect.appendChild(toOption);
        });

        // Set default values
        fromSelect.value = this.fromCurrency;
        toSelect.value = this.toCurrency;
    }

    loadDefaultRates() {
        this.exchangeRates = { ...this.defaultRates };
        this.lastUpdated = new Date().toISOString();
    }

    async fetchExchangeRates(forceRefresh = false) {
        // Check if we have recent rates and don't force refresh
        if (!forceRefresh && this.hasRecentRates()) {
            return;
        }

        this.isLoading = true;
        this.updateLoadingState();

        try {
            // Using a free API (Exchange Rates API)
            // Note: In production, you might want to use a paid service for better reliability
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            const data = await response.json();
            
            if (data && data.rates) {
                this.exchangeRates = {
                    [this.baseCurrency]: 1,
                    ...data.rates
                };
                this.lastUpdated = new Date().toISOString();
                this.saveRatesToStorage();
                this.updateExchangeRateDisplay();
                this.convert(); // Update current conversion with new rates
                
                if (window.calculatorApp) {
                    window.calculatorApp.showNotification('Exchange rates updated', 'success');
                }
            }

        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            
            // Fall back to stored rates or default rates
            if (Object.keys(this.exchangeRates).length === 0) {
                this.loadDefaultRates();
            }
            
            if (window.calculatorApp) {
                window.calculatorApp.showNotification('Using cached exchange rates', 'info');
            }
        } finally {
            this.isLoading = false;
            this.updateLoadingState();
        }
    }

    hasRecentRates() {
        if (!this.lastUpdated) return false;
        
        const lastUpdate = new Date(this.lastUpdated);
        const now = new Date();
        const hoursSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60);
        
        // Consider rates recent if updated within last 4 hours
        return hoursSinceUpdate < 4;
    }

    updateLoadingState() {
        const refreshBtn = document.getElementById('refresh-rates');
        const exchangeRateInfo = document.getElementById('exchange-rate');
        
        if (refreshBtn) {
            if (this.isLoading) {
                refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                refreshBtn.disabled = true;
            } else {
                refreshBtn.innerHTML = '<i class="fas fa-refresh"></i>';
                refreshBtn.disabled = false;
            }
        }
        
        if (exchangeRateInfo && this.isLoading) {
            exchangeRateInfo.textContent = 'Updating rates...';
        }
    }

    updateExchangeRateDisplay() {
        const exchangeRateElement = document.getElementById('exchange-rate');
        if (!exchangeRateElement) return;

        if (this.fromCurrency === this.toCurrency) {
            exchangeRateElement.textContent = '1.00000';
            return;
        }

        const rate = this.getExchangeRate(this.fromCurrency, this.toCurrency);
        if (rate) {
            exchangeRateElement.innerHTML = `
                1 ${this.fromCurrency} = ${this.formatCurrency(rate)} ${this.toCurrency}
                <br><small>Updated: ${this.getLastUpdatedString()}</small>
            `;
        } else {
            exchangeRateElement.textContent = 'Rate not available';
        }
    }

    getLastUpdatedString() {
        if (!this.lastUpdated) return 'Unknown';
        
        const lastUpdate = new Date(this.lastUpdated);
        const now = new Date();
        const diffMs = now - lastUpdate;
        
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }

    convert() {
        const fromValueInput = document.getElementById('from-currency-value');
        const toValueInput = document.getElementById('to-currency-value');

        if (!fromValueInput || !toValueInput) return;

        const inputValue = parseFloat(fromValueInput.value);
        
        if (isNaN(inputValue) || fromValueInput.value === '') {
            toValueInput.value = '';
            return;
        }

        try {
            const convertedValue = this.performConversion(inputValue, this.fromCurrency, this.toCurrency);
            toValueInput.value = this.formatCurrency(convertedValue);

            // Add to history
            const expression = `${this.formatCurrency(inputValue)} ${this.fromCurrency} → ${this.toCurrency}`;
            const result = `${this.formatCurrency(convertedValue)} ${this.toCurrency}`;
            
            if (window.historyManager) {
                window.historyManager.addCalculation(expression, result, 'currency');
            }

        } catch (error) {
            toValueInput.value = 'Error';
            console.error('Currency conversion error:', error);
        }
    }

    performConversion(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) {
            return amount;
        }

        const rate = this.getExchangeRate(fromCurrency, toCurrency);
        if (!rate) {
            throw new Error('Exchange rate not available');
        }

        return amount * rate;
    }

    getExchangeRate(fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) {
            return 1;
        }

        const fromRate = this.exchangeRates[fromCurrency];
        const toRate = this.exchangeRates[toCurrency];

        if (!fromRate || !toRate) {
            return null;
        }

        // Convert through base currency (USD)
        return toRate / fromRate;
    }

    swapCurrencies() {
        // Swap the currencies
        const temp = this.fromCurrency;
        this.fromCurrency = this.toCurrency;
        this.toCurrency = temp;

        // Update the select elements
        const fromSelect = document.getElementById('from-currency');
        const toSelect = document.getElementById('to-currency');
        
        if (fromSelect && toSelect) {
            fromSelect.value = this.fromCurrency;
            toSelect.value = this.toCurrency;
        }

        // Swap the values
        const fromValueInput = document.getElementById('from-currency-value');
        const toValueInput = document.getElementById('to-currency-value');
        
        if (fromValueInput && toValueInput) {
            const tempValue = fromValueInput.value;
            fromValueInput.value = toValueInput.value;
            toValueInput.value = tempValue;
        }

        // Update display and convert
        this.updateExchangeRateDisplay();
        this.convert();

        // Visual feedback
        const swapBtn = document.getElementById('swap-currencies');
        if (swapBtn) {
            swapBtn.style.transform = 'scale(1.1) rotate(180deg)';
            setTimeout(() => {
                swapBtn.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }
    }

    formatCurrency(amount, precision = 4) {
        if (!isFinite(amount) || isNaN(amount)) {
            return 'Error';
        }

        // Adjust precision based on amount
        let decimals = precision;
        if (amount >= 1000) {
            decimals = 2;
        } else if (amount >= 1) {
            decimals = 3;
        }

        // Format with appropriate decimal places
        const formatted = amount.toFixed(decimals);
        
        // Remove trailing zeros
        return parseFloat(formatted).toString();
    }

    saveRatesToStorage() {
        try {
            const data = {
                rates: this.exchangeRates,
                lastUpdated: this.lastUpdated,
                baseCurrency: this.baseCurrency
            };
            localStorage.setItem('currency-exchange-rates', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving rates to storage:', error);
        }
    }

    loadRatesFromStorage() {
        try {
            const data = localStorage.getItem('currency-exchange-rates');
            if (data) {
                const parsed = JSON.parse(data);
                
                // Check if stored rates are not too old (max 24 hours)
                if (parsed.lastUpdated) {
                    const lastUpdate = new Date(parsed.lastUpdated);
                    const now = new Date();
                    const hoursDiff = (now - lastUpdate) / (1000 * 60 * 60);
                    
                    if (hoursDiff < 24 && parsed.rates) {
                        this.exchangeRates = parsed.rates;
                        this.lastUpdated = parsed.lastUpdated;
                        this.baseCurrency = parsed.baseCurrency || this.baseCurrency;
                        this.updateExchangeRateDisplay();
                    }
                }
            }
        } catch (error) {
            console.error('Error loading rates from storage:', error);
        }
    }

    // Get currency list with current rates
    getCurrencyList() {
        return Object.keys(this.exchangeRates).map(code => ({
            code,
            name: this.currencyNames[code] || code,
            rate: this.exchangeRates[code],
            rateToUSD: this.getExchangeRate(code, 'USD')
        }));
    }

    // Historical rate simulation (for demo purposes)
    getHistoricalRate(fromCurrency, toCurrency, daysAgo = 1) {
        const currentRate = this.getExchangeRate(fromCurrency, toCurrency);
        if (!currentRate) return null;

        // Simulate historical fluctuation (±5% random variation)
        const variation = (Math.random() - 0.5) * 0.1; // ±5%
        return currentRate * (1 + variation);
    }

    // Currency trend simulation
    getCurrencyTrend(currency, days = 7) {
        const trend = [];
        const baseRate = this.exchangeRates[currency] || 1;
        
        for (let i = days; i >= 0; i--) {
            const variation = (Math.random() - 0.5) * 0.02; // ±1% daily variation
            const rate = baseRate * (1 + variation);
            trend.push({
                date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                rate: rate
            });
        }
        
        return trend;
    }

    // Batch currency conversion
    batchConvert(amount, fromCurrency) {
        const results = {};
        
        Object.keys(this.currencyNames).forEach(toCurrency => {
            if (toCurrency !== fromCurrency) {
                try {
                    const convertedAmount = this.performConversion(amount, fromCurrency, toCurrency);
                    results[toCurrency] = {
                        amount: convertedAmount,
                        formatted: this.formatCurrency(convertedAmount),
                        name: this.currencyNames[toCurrency]
                    };
                } catch (error) {
                    results[toCurrency] = {
                        amount: null,
                        formatted: 'Error',
                        name: this.currencyNames[toCurrency]
                    };
                }
            }
        });
        
        return results;
    }

    // Add custom currency (for future use)
    addCustomCurrency(code, name, rate) {
        this.currencyNames[code] = name;
        this.exchangeRates[code] = rate;
        this.updateCurrencySelects();
        this.saveRatesToStorage();
    }

    // Remove custom currency
    removeCustomCurrency(code) {
        if (this.currencyNames[code]) {
            delete this.currencyNames[code];
            delete this.exchangeRates[code];
            this.updateCurrencySelects();
            this.saveRatesToStorage();
        }
    }

    // Get popular currency pairs
    getPopularPairs() {
        return [
            { from: 'USD', to: 'EUR' },
            { from: 'USD', to: 'GBP' },
            { from: 'USD', to: 'JPY' },
            { from: 'EUR', to: 'GBP' },
            { from: 'EUR', to: 'USD' },
            { from: 'GBP', to: 'USD' }
        ];
    }
}

// Initialize currency calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.currencyCalculator = new CurrencyCalculator();
});

// Export for use in other modules
window.CurrencyCalculator = CurrencyCalculator;