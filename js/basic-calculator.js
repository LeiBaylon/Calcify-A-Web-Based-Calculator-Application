// Basic Calculator Implementation
class BasicCalculator {
    constructor() {
        this.expression = '';
        this.result = '0';
        this.lastResult = 0;
        this.shouldResetDisplay = false;
        this.hasDecimal = false;
        this.operatorPressed = false;
        this.boundButtons = null;
        this.clickHandler = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        const calculator = document.getElementById('basic-calculator');
        if (!calculator) return;

        // Remove existing listeners to avoid duplicates
        if (this.boundButtons) {
            this.boundButtons.forEach(button => {
                button.removeEventListener('click', this.clickHandler);
            });
        }

        const buttons = calculator.querySelectorAll('.btn');
        this.boundButtons = Array.from(buttons);
        this.clickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleButtonClick(e.target);
        };
        
        buttons.forEach(button => {
            button.addEventListener('click', this.clickHandler);
        });
    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (value !== undefined) {
            this.inputNumber(value);
        } else if (action) {
            this.handleAction(action);
        }
    }

    inputNumber(num) {
        if (this.shouldResetDisplay) {
            this.result = '';
            this.shouldResetDisplay = false;
            this.hasDecimal = false;
        }

        if (this.result === '' || this.result === '0') {
            this.result = num;
        } else if (this.result.length < 16) { // Limit display length
            this.result += num;
        }

        this.operatorPressed = false;
        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'backspace':
                this.backspace();
                break;
            case '.':
                this.inputDecimal();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                this.inputOperator(action);
                break;
            case '=':
                this.calculate();
                break;
        }
    }

    clear() {
        this.expression = '';
        this.result = '0';
        this.lastResult = 0;
        this.shouldResetDisplay = false;
        this.hasDecimal = false;
        this.operatorPressed = false;
        this.updateDisplay();
    }

    clearEntry() {
        this.result = '0';
        this.hasDecimal = false;
        this.updateDisplay();
    }

    backspace() {
        if (this.shouldResetDisplay) {
            return;
        }

        if (this.result.length > 1) {
            const removedChar = this.result.slice(-1);
            this.result = this.result.slice(0, -1);
            
            if (removedChar === '.') {
                this.hasDecimal = false;
            }
        } else {
            this.result = '0';
            this.hasDecimal = false;
        }

        this.updateDisplay();
    }

    inputDecimal() {
        if (this.shouldResetDisplay) {
            this.result = '0';
            this.shouldResetDisplay = false;
        }

        if (!this.hasDecimal && this.result.length < 15) {
            if (this.result === '' || this.operatorPressed) {
                this.result = '0';
            }
            this.result += '.';
            this.hasDecimal = true;
            this.operatorPressed = false;
            this.updateDisplay();
        }
    }

    inputOperator(operator) {
        if (this.expression === '' && this.result !== '0') {
            this.expression = this.result + ' ' + this.formatOperator(operator) + ' ';
            this.result = ''; // Clear result to show we're building expression
        } else if (this.expression !== '' && !this.operatorPressed) {
            // Add current number to expression
            this.expression = this.expression + this.result + ' ' + this.formatOperator(operator) + ' ';
            this.result = ''; // Clear result to show we're building expression
        } else if (this.operatorPressed) {
            // Replace the last operator
            this.expression = this.expression.slice(0, -3) + this.formatOperator(operator) + ' ';
        }

        this.operatorPressed = true;
        this.hasDecimal = false;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    formatOperator(op) {
        const operators = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷'
        };
        return operators[op] || op;
    }

    calculate() {
        if (this.expression === '' || this.operatorPressed) {
            return;
        }

        const fullExpression = this.expression + this.result;
        
        try {
            const calculatedResult = this.evaluateExpression(fullExpression);
            
            if (!isFinite(calculatedResult)) {
                throw new Error('Invalid calculation');
            }

            // Add to history
            if (window.historyManager) {
                window.historyManager.addCalculation(fullExpression, this.formatResult(calculatedResult), 'basic');
            }

            this.lastResult = calculatedResult;
            this.result = this.formatResult(calculatedResult);
            this.expression = fullExpression + ' = '; // Show the complete equation
            this.shouldResetDisplay = true;
            this.hasDecimal = this.result.includes('.');
            this.operatorPressed = false;
            
            this.updateDisplay();
            
        } catch (error) {
            this.showError();
        }
    }

    evaluateExpression(expr) {
        // Replace display operators with JavaScript operators
        const jsExpression = expr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        // Use Function constructor for safer evaluation
        try {
            const result = Function('"use strict"; return (' + jsExpression + ')')();
            return result;
        } catch (error) {
            throw new Error('Invalid expression');
        }
    }

    formatResult(num) {
        if (isNaN(num) || !isFinite(num)) {
            throw new Error('Invalid result');
        }

        // Handle division by zero
        if (num === Infinity || num === -Infinity) {
            throw new Error('Division by zero');
        }

        // Handle very large or very small numbers
        if (Math.abs(num) > 1e15) {
            return num.toExponential(10);
        }

        if (Math.abs(num) < 1e-10 && num !== 0) {
            return num.toExponential(10);
        }

        // Round to avoid floating point precision issues
        const rounded = Math.round(num * 1e12) / 1e12;
        
        // Format the number
        let formatted = rounded.toString();
        
        // Add thousand separators for large integers
        if (Math.abs(rounded) >= 1000 && Number.isInteger(rounded)) {
            formatted = rounded.toLocaleString('en-US');
        }

        return formatted;
    }

    updateDisplay() {
        const expressionElement = document.getElementById('basic-expression');
        const resultElement = document.getElementById('basic-result');

        if (expressionElement) {
            // Show the full equation being built
            const fullExpression = this.expression + (this.result || '');
            expressionElement.textContent = fullExpression || '0';
        }

        if (resultElement) {
            // Show current number being entered or final result
            resultElement.textContent = this.result || '0';
            resultElement.style.color = ''; // Reset error color
        }
    }

    showError(message = 'Error') {
        this.result = message;
        this.expression = '';
        this.shouldResetDisplay = true;
        this.hasDecimal = false;
        this.operatorPressed = false;
        
        const resultElement = document.getElementById('basic-result');
        if (resultElement) {
            resultElement.style.color = '#ef4444';
        }
        
        this.updateDisplay();

        // Reset after 2 seconds
        setTimeout(() => {
            if (this.result === message) {
                this.clear();
            }
        }, 2000);
    }

    // Memory functions (can be extended)
    memoryClear() {
        this.memoryValue = 0;
    }

    memoryRecall() {
        this.result = this.formatResult(this.memoryValue || 0);
        this.shouldResetDisplay = true;
        this.hasDecimal = this.result.includes('.');
        this.updateDisplay();
    }

    memoryStore() {
        try {
            this.memoryValue = parseFloat(this.result) || 0;
        } catch (error) {
            this.memoryValue = 0;
        }
    }

    memoryAdd() {
        try {
            this.memoryValue = (this.memoryValue || 0) + (parseFloat(this.result) || 0);
        } catch (error) {
            // Ignore errors
        }
    }

    memorySubtract() {
        try {
            this.memoryValue = (this.memoryValue || 0) - (parseFloat(this.result) || 0);
        } catch (error) {
            // Ignore errors
        }
    }

    // Utility methods
    getCurrentValue() {
        return parseFloat(this.result) || 0;
    }

    setResult(value) {
        this.result = this.formatResult(value);
        this.shouldResetDisplay = true;
        this.hasDecimal = this.result.includes('.');
        this.updateDisplay();
    }

    // Percentage calculation
    percentage() {
        try {
            const currentValue = this.getCurrentValue();
            const percentageValue = currentValue / 100;
            this.setResult(percentageValue);
        } catch (error) {
            this.showError();
        }
    }

    // Square root
    squareRoot() {
        try {
            const currentValue = this.getCurrentValue();
            if (currentValue < 0) {
                throw new Error('Invalid input');
            }
            const sqrtValue = Math.sqrt(currentValue);
            this.setResult(sqrtValue);
        } catch (error) {
            this.showError();
        }
    }

    // Reciprocal (1/x)
    reciprocal() {
        try {
            const currentValue = this.getCurrentValue();
            if (currentValue === 0) {
                throw new Error('Division by zero');
            }
            const reciprocalValue = 1 / currentValue;
            this.setResult(reciprocalValue);
        } catch (error) {
            this.showError();
        }
    }

    // Plus/minus toggle
    toggleSign() {
        try {
            if (this.result !== '0' && this.result !== 'Error') {
                const currentValue = this.getCurrentValue();
                this.setResult(-currentValue);
            }
        } catch (error) {
            this.showError();
        }
    }
}

// Initialize basic calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.basicCalculator = new BasicCalculator();
});

// Export for use in other modules
window.BasicCalculator = BasicCalculator;