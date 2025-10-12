// Programming Calculator Implementation
class ProgrammingCalculator {
    constructor() {
        this.expression = '';
        this.result = '0';
        this.numberSystem = 'dec'; // dec, hex, oct, bin
        this.currentValue = 0;
        this.shouldResetDisplay = false;
        this.operatorPressed = false;
        
        this.maxBits = 64; // Support up to 64-bit integers
        this.maxValue = Math.pow(2, this.maxBits) - 1;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.updateNumberSystem();
        this.updateButtonStates();
    }

    bindEvents() {
        const calculator = document.getElementById('programming-calculator');
        if (!calculator) return;

        // Button events
        const buttons = calculator.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
            });
        });

        // Number system buttons
        const systemBtns = calculator.querySelectorAll('.system-btn');
        systemBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const system = e.target.dataset.system;
                this.setNumberSystem(system);
            });
        });
    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (button.disabled) {
            return;
        }

        if (value !== undefined) {
            this.inputValue(value);
        } else if (action) {
            this.handleAction(action);
        }
    }

    inputValue(value) {
        if (this.shouldResetDisplay) {
            this.result = '0';
            this.expression = '';
            this.shouldResetDisplay = false;
        }

        // Validate input for current number system
        if (!this.isValidInput(value)) {
            return;
        }

        if (this.result === '0' && value !== '.') {
            this.result = value;
        } else {
            this.result += value;
        }

        this.operatorPressed = false;
        this.updateCurrentValue();
        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'backspace':
                this.backspace();
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
            case 'and':
            case 'or':
            case 'xor':
            case 'not':
            case 'lsh':
            case 'rsh':
                this.bitwiseOperation(action);
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    clear() {
        this.expression = '';
        this.result = '0';
        this.currentValue = 0;
        this.shouldResetDisplay = false;
        this.operatorPressed = false;
        this.updateDisplay();
    }

    backspace() {
        if (this.shouldResetDisplay || this.result === '0') {
            return;
        }

        if (this.result.length > 1) {
            this.result = this.result.slice(0, -1);
        } else {
            this.result = '0';
        }

        this.updateCurrentValue();
        this.updateDisplay();
    }

    inputOperator(operator) {
        if (this.expression === '' && this.result !== '0') {
            this.expression = this.result + ' ' + operator + ' ';
        } else if (this.expression !== '' && !this.operatorPressed) {
            const tempExpression = this.expression + this.result;
            try {
                const tempResult = this.evaluateExpression(tempExpression);
                this.result = this.formatResult(tempResult);
                this.expression = this.result + ' ' + operator + ' ';
            } catch (error) {
                this.showError();
                return;
            }
        } else if (this.operatorPressed) {
            this.expression = this.expression.slice(0, -3) + operator + ' ';
        }

        this.operatorPressed = true;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    bitwiseOperation(operation) {
        try {
            const currentVal = this.getCurrentDecimalValue();
            let result;

            switch (operation) {
                case 'not':
                    // Bitwise NOT with mask for specified bit width
                    result = (~currentVal) & this.getBitMask();
                    break;
                case 'and':
                case 'or':
                case 'xor':
                case 'lsh':
                case 'rsh':
                    // These operations require two operands
                    if (this.expression === '') {
                        this.expression = this.result + ' ' + operation.toUpperCase() + ' ';
                        this.shouldResetDisplay = true;
                        this.operatorPressed = true;
                        this.updateDisplay();
                        return;
                    }
                    break;
                default:
                    throw new Error('Unknown operation');
            }

            if (result !== undefined) {
                // Add to history
                const operationExpression = `${operation.toUpperCase()}(${this.result})`;
                if (window.historyManager) {
                    window.historyManager.addCalculation(operationExpression, this.formatResultForSystem(result), 'programming');
                }

                this.currentValue = result;
                this.result = this.formatResultForSystem(result);
                this.shouldResetDisplay = true;
                this.operatorPressed = false;
                this.updateDisplay();
            }

        } catch (error) {
            this.showError(error.message);
        }
    }

    calculate() {
        if (this.expression === '' && this.result === '0') {
            return;
        }

        let fullExpression = this.expression;
        
        if (!this.operatorPressed && this.result !== '0') {
            fullExpression += this.result;
        }

        // Remove trailing operators
        fullExpression = fullExpression.replace(/\s[+\-*/]\s*$/, '');
        fullExpression = fullExpression.replace(/\s(AND|OR|XOR|LSH|RSH)\s*$/, '');

        if (fullExpression === '') {
            return;
        }

        try {
            const calculatedResult = this.evaluateExpression(fullExpression);
            
            if (!Number.isInteger(calculatedResult) || !isFinite(calculatedResult)) {
                throw new Error('Invalid calculation');
            }

            // Ensure result is within bounds
            const boundedResult = this.applyBounds(calculatedResult);

            // Add to history
            if (window.historyManager) {
                window.historyManager.addCalculation(fullExpression, this.formatResultForSystem(boundedResult), 'programming');
            }

            this.currentValue = boundedResult;
            this.result = this.formatResultForSystem(boundedResult);
            this.expression = '';
            this.shouldResetDisplay = true;
            this.operatorPressed = false;
            
            this.updateDisplay();
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    evaluateExpression(expr) {
        // Convert all values in expression to decimal first
        let decimalExpression = expr;
        
        // Handle bitwise operations
        decimalExpression = this.processBitwiseOperations(decimalExpression);
        
        // Replace standard operators
        decimalExpression = decimalExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        try {
            const result = Function('"use strict"; return Math.floor(' + decimalExpression + ')')();
            return result;
        } catch (error) {
            throw new Error('Invalid expression');
        }
    }

    processBitwiseOperations(expr) {
        let result = expr;
        
        // Convert number representations to decimal
        result = result.replace(/\b[0-9A-F]+\b/g, (match) => {
            return this.parseValueToDecimal(match).toString();
        });

        // Process bitwise operations
        result = result.replace(/(\d+)\s+AND\s+(\d+)/g, (match, a, b) => {
            return (parseInt(a) & parseInt(b)).toString();
        });
        
        result = result.replace(/(\d+)\s+OR\s+(\d+)/g, (match, a, b) => {
            return (parseInt(a) | parseInt(b)).toString();
        });
        
        result = result.replace(/(\d+)\s+XOR\s+(\d+)/g, (match, a, b) => {
            return (parseInt(a) ^ parseInt(b)).toString();
        });
        
        result = result.replace(/(\d+)\s+LSH\s+(\d+)/g, (match, a, b) => {
            const shifted = parseInt(a) << parseInt(b);
            return this.applyBounds(shifted).toString();
        });
        
        result = result.replace(/(\d+)\s+RSH\s+(\d+)/g, (match, a, b) => {
            return (parseInt(a) >> parseInt(b)).toString();
        });

        return result;
    }

    setNumberSystem(system) {
        // Convert current value to new system
        const decimalValue = this.getCurrentDecimalValue();
        this.numberSystem = system;
        this.result = this.formatResultForSystem(decimalValue);
        this.currentValue = decimalValue;
        
        this.updateNumberSystem();
        this.updateButtonStates();
        this.updateDisplay();
    }

    updateNumberSystem() {
        const systemBtns = document.querySelectorAll('#programming-calculator .system-btn');
        systemBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.system === this.numberSystem) {
                btn.classList.add('active');
            }
        });
    }

    updateButtonStates() {
        const calculator = document.getElementById('programming-calculator');
        if (!calculator) return;

        // Enable/disable buttons based on current number system
        const numberBtns = calculator.querySelectorAll('.btn[data-value]');
        const hexBtns = calculator.querySelectorAll('.hex-letter');

        numberBtns.forEach(btn => {
            const value = btn.dataset.value;
            btn.disabled = !this.isValidInput(value);
        });

        hexBtns.forEach(btn => {
            btn.disabled = this.numberSystem !== 'hex';
        });
    }

    isValidInput(value) {
        switch (this.numberSystem) {
            case 'bin':
                return /^[01]$/.test(value);
            case 'oct':
                return /^[0-7]$/.test(value);
            case 'dec':
                return /^[0-9]$/.test(value);
            case 'hex':
                return /^[0-9A-F]$/i.test(value);
            default:
                return false;
        }
    }

    getCurrentDecimalValue() {
        return this.parseValueToDecimal(this.result);
    }

    parseValueToDecimal(value) {
        if (value === '0' || value === '') {
            return 0;
        }

        let decimalValue;
        
        switch (this.numberSystem) {
            case 'bin':
                decimalValue = parseInt(value, 2);
                break;
            case 'oct':
                decimalValue = parseInt(value, 8);
                break;
            case 'dec':
                decimalValue = parseInt(value, 10);
                break;
            case 'hex':
                decimalValue = parseInt(value, 16);
                break;
            default:
                decimalValue = 0;
        }

        return isNaN(decimalValue) ? 0 : decimalValue;
    }

    formatResultForSystem(decimalValue) {
        if (!Number.isInteger(decimalValue) || decimalValue < 0) {
            decimalValue = Math.max(0, Math.floor(Math.abs(decimalValue)));
        }

        const boundedValue = this.applyBounds(decimalValue);

        switch (this.numberSystem) {
            case 'bin':
                return boundedValue.toString(2);
            case 'oct':
                return boundedValue.toString(8);
            case 'dec':
                return boundedValue.toString(10);
            case 'hex':
                return boundedValue.toString(16).toUpperCase();
            default:
                return boundedValue.toString(10);
        }
    }

    formatResult(decimalValue) {
        return this.formatResultForSystem(decimalValue);
    }

    applyBounds(value) {
        // Ensure the value fits within the specified bit width
        if (value < 0) {
            return 0;
        }
        if (value > this.maxValue) {
            return this.maxValue;
        }
        return Math.floor(value);
    }

    getBitMask() {
        // Return mask for current bit width
        return (1 << Math.min(this.maxBits, 32)) - 1; // JavaScript bitwise operations are 32-bit
    }

    updateCurrentValue() {
        this.currentValue = this.getCurrentDecimalValue();
    }

    updateDisplay() {
        const expressionElement = document.getElementById('programming-expression');
        const resultElement = document.getElementById('programming-result');

        if (expressionElement) {
            // Show expression with current number system indicator
            const systemIndicator = `[${this.numberSystem.toUpperCase()}] `;
            expressionElement.textContent = systemIndicator + (this.expression || '\u00A0');
        }

        if (resultElement) {
            resultElement.textContent = this.result;
            resultElement.style.color = '';
        }

        // Update conversion display (show value in all number systems)
        this.updateConversionDisplay();
    }

    updateConversionDisplay() {
        // Add a small display showing the current value in all number systems
        const conversionInfo = document.querySelector('.programming-conversion-info');
        if (!conversionInfo) {
            // Create conversion info display if it doesn't exist
            const calculator = document.getElementById('programming-calculator');
            const display = calculator.querySelector('.calculator-display');
            
            const conversionDiv = document.createElement('div');
            conversionDiv.className = 'programming-conversion-info';
            conversionDiv.style.cssText = `
                margin-top: 1rem;
                padding: 1rem;
                background: var(--background-color);
                border-radius: 8px;
                font-size: 0.85rem;
                color: var(--text-secondary);
                border: 1px solid var(--border-color);
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 0.5rem;
                text-align: center;
            `;
            
            display.appendChild(conversionDiv);
        }

        const conversionInfoElement = document.querySelector('.programming-conversion-info');
        if (conversionInfoElement && this.currentValue !== undefined) {
            const decimal = this.currentValue;
            const binary = decimal.toString(2);
            const octal = decimal.toString(8);
            const hex = decimal.toString(16).toUpperCase();

            conversionInfoElement.innerHTML = `
                <div><strong>BIN:</strong><br>${binary}</div>
                <div><strong>OCT:</strong><br>${octal}</div>
                <div><strong>DEC:</strong><br>${decimal}</div>
                <div><strong>HEX:</strong><br>${hex}</div>
            `;
        }
    }

    showError(message = 'Error') {
        this.result = message;
        this.expression = '';
        this.shouldResetDisplay = true;
        this.operatorPressed = false;
        
        const resultElement = document.getElementById('programming-result');
        if (resultElement) {
            resultElement.style.color = '#ef4444';
        }
        
        this.updateDisplay();

        setTimeout(() => {
            if (this.result === message) {
                this.clear();
            }
        }, 3000);
    }

    // Additional bitwise utility functions
    countBits(value) {
        let count = 0;
        while (value) {
            count += value & 1;
            value >>= 1;
        }
        return count;
    }

    reverseBits(value) {
        let result = 0;
        const bits = 32; // Assume 32-bit reversal
        
        for (let i = 0; i < bits; i++) {
            if (value & (1 << i)) {
                result |= (1 << (bits - 1 - i));
            }
        }
        
        return result >>> 0; // Convert to unsigned
    }

    isPowerOfTwo(value) {
        return value > 0 && (value & (value - 1)) === 0;
    }

    // Two's complement conversion
    toTwosComplement(value, bits = 32) {
        const mask = (1 << bits) - 1;
        return (~value + 1) & mask;
    }

    fromTwosComplement(value, bits = 32) {
        const signBit = 1 << (bits - 1);
        if (value & signBit) {
            return value - (1 << bits);
        }
        return value;
    }
}

// Initialize programming calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.programmingCalculator = new ProgrammingCalculator();
});

// Export for use in other modules
window.ProgrammingCalculator = ProgrammingCalculator;