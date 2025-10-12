// Scientific Calculator Implementation
class ScientificCalculator {
    constructor() {
        this.expression = '';
        this.result = '0';
        this.angleMode = 'deg'; // deg, rad, grad
        this.memory = 0;
        this.shouldResetDisplay = false;
        this.hasDecimal = false;
        this.operatorPressed = false;
        this.lastAnswer = 0;
        
        this.constants = {
            pi: Math.PI,
            e: Math.E,
            phi: (1 + Math.sqrt(5)) / 2, // Golden ratio
            sqrt2: Math.SQRT2,
            sqrt1_2: Math.SQRT1_2,
            ln2: Math.LN2,
            ln10: Math.LN10,
            log2e: Math.LOG2E,
            log10e: Math.LOG10E
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.updateAngleMode();
    }

    bindEvents() {
        const calculator = document.getElementById('scientific-calculator');
        if (!calculator) return;

        // Button events
        const buttons = calculator.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
            });
        });

        // Angle mode buttons
        const angleBtns = calculator.querySelectorAll('.angle-btn');
        angleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.setAngleMode(mode);
            });
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

    inputNumber(num = '') {
        if (this.shouldResetDisplay) {
            this.expression = '';
            this.result = '0';
            this.shouldResetDisplay = false;
            this.hasDecimal = false;
        }

        if (this.result === '0' && num !== '.') {
            this.result = num;
        } else if (this.result.length < 20) {
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
            case '(':
                this.inputOpenParenthesis();
                break;
            case ')':
                this.inputCloseParenthesis();
                break;
            case '=':
                this.calculate();
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'asin':
            case 'acos':
            case 'atan':
            case 'log':
            case 'ln':
            case 'sqrt':
            case 'abs':
            case 'factorial':
                this.applyFunction(action);
                break;
            case 'pow':
                this.inputPower();
                break;
            case 'pi':
                this.inputConstant('pi');
                break;
            case 'e':
                this.inputConstant('e');
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    clear() {
        this.expression = '';
        this.result = '0';
        this.shouldResetDisplay = false;
        this.hasDecimal = false;
        this.operatorPressed = false;
        this.updateDisplay();
    }

    backspace() {
        if (this.shouldResetDisplay || this.result === '0') {
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

        if (!this.hasDecimal && this.result.length < 19) {
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
        } else if (this.expression !== '' && !this.operatorPressed) {
            const tempExpression = this.expression + this.result;
            try {
                const tempResult = this.evaluateExpression(tempExpression);
                this.result = this.formatResult(tempResult);
                this.expression = this.result + ' ' + this.formatOperator(operator) + ' ';
            } catch (error) {
                this.showError();
                return;
            }
        } else if (this.operatorPressed) {
            this.expression = this.expression.slice(0, -3) + this.formatOperator(operator) + ' ';
        }

        this.operatorPressed = true;
        this.hasDecimal = false;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    inputOpenParenthesis() {
        if (this.shouldResetDisplay) {
            this.expression = '';
            this.result = '0';
            this.shouldResetDisplay = false;
        }

        if (this.expression === '' || this.operatorPressed) {
            this.expression += '(';
        } else {
            this.expression += ' × (';
        }

        this.result = '0';
        this.hasDecimal = false;
        this.operatorPressed = true;
        this.updateDisplay();
    }

    inputCloseParenthesis() {
        if (!this.operatorPressed && this.result !== '0') {
            this.expression += this.result + ')';
            this.operatorPressed = true;
            this.hasDecimal = false;
            this.updateDisplay();
        }
    }

    inputPower() {
        if (this.result !== '0') {
            this.expression = this.result + '^';
            this.shouldResetDisplay = true;
            this.operatorPressed = true;
            this.hasDecimal = false;
            this.updateDisplay();
        }
    }

    inputConstant(constantName) {
        const value = this.constants[constantName];
        if (value !== undefined) {
            this.result = this.formatResult(value);
            this.shouldResetDisplay = true;
            this.hasDecimal = this.result.includes('.');
            this.operatorPressed = false;
            this.updateDisplay();
        }
    }

    applyFunction(functionName) {
        try {
            const currentValue = parseFloat(this.result) || 0;
            let result;

            switch (functionName) {
                case 'sin':
                    result = Math.sin(this.toRadians(currentValue));
                    break;
                case 'cos':
                    result = Math.cos(this.toRadians(currentValue));
                    break;
                case 'tan':
                    result = Math.tan(this.toRadians(currentValue));
                    break;
                case 'asin':
                    if (Math.abs(currentValue) > 1) {
                        throw new Error('Domain error');
                    }
                    result = this.fromRadians(Math.asin(currentValue));
                    break;
                case 'acos':
                    if (Math.abs(currentValue) > 1) {
                        throw new Error('Domain error');
                    }
                    result = this.fromRadians(Math.acos(currentValue));
                    break;
                case 'atan':
                    result = this.fromRadians(Math.atan(currentValue));
                    break;
                case 'log':
                    if (currentValue <= 0) {
                        throw new Error('Domain error');
                    }
                    result = Math.log10(currentValue);
                    break;
                case 'ln':
                    if (currentValue <= 0) {
                        throw new Error('Domain error');
                    }
                    result = Math.log(currentValue);
                    break;
                case 'sqrt':
                    if (currentValue < 0) {
                        throw new Error('Domain error');
                    }
                    result = Math.sqrt(currentValue);
                    break;
                case 'abs':
                    result = Math.abs(currentValue);
                    break;
                case 'factorial':
                    if (currentValue < 0 || !Number.isInteger(currentValue) || currentValue > 170) {
                        throw new Error('Invalid input');
                    }
                    result = this.factorial(currentValue);
                    break;
                default:
                    throw new Error('Unknown function');
            }

            // Add to expression history
            const functionExpression = `${functionName}(${this.result})`;
            
            if (window.historyManager) {
                window.historyManager.addCalculation(functionExpression, this.formatResult(result), 'scientific');
            }

            this.result = this.formatResult(result);
            this.shouldResetDisplay = true;
            this.hasDecimal = this.result.includes('.');
            this.operatorPressed = false;
            this.updateDisplay();

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
        fullExpression = fullExpression.replace(/\s[+\-×÷^]\s*$/, '');

        if (fullExpression === '') {
            return;
        }

        try {
            const calculatedResult = this.evaluateExpression(fullExpression);
            
            if (!isFinite(calculatedResult)) {
                throw new Error('Invalid calculation');
            }

            // Add to history
            if (window.historyManager) {
                window.historyManager.addCalculation(fullExpression, this.formatResult(calculatedResult), 'scientific');
            }

            this.lastAnswer = calculatedResult;
            this.result = this.formatResult(calculatedResult);
            this.expression = '';
            this.shouldResetDisplay = true;
            this.hasDecimal = this.result.includes('.');
            this.operatorPressed = false;
            
            this.updateDisplay();
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    evaluateExpression(expr) {
        // Replace display operators and functions with JavaScript equivalents
        let jsExpression = expr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')
            .replace(/\^/g, '**')
            .replace(/π/g, Math.PI.toString())
            .replace(/e/g, Math.E.toString());

        // Handle scientific functions
        jsExpression = this.replaceFunctions(jsExpression);

        try {
            const result = Function('"use strict"; return (' + jsExpression + ')')();
            return result;
        } catch (error) {
            throw new Error('Invalid expression');
        }
    }

    replaceFunctions(expr) {
        const functions = {
            'sin': (x) => Math.sin(this.toRadians(x)),
            'cos': (x) => Math.cos(this.toRadians(x)),
            'tan': (x) => Math.tan(this.toRadians(x)),
            'asin': (x) => this.fromRadians(Math.asin(x)),
            'acos': (x) => this.fromRadians(Math.acos(x)),
            'atan': (x) => this.fromRadians(Math.atan(x)),
            'log': (x) => Math.log10(x),
            'ln': (x) => Math.log(x),
            'sqrt': (x) => Math.sqrt(x),
            'abs': (x) => Math.abs(x),
            'factorial': (x) => this.factorial(x)
        };

        let result = expr;
        
        Object.keys(functions).forEach(func => {
            const regex = new RegExp(`${func}\\((.*?)\\)`, 'g');
            result = result.replace(regex, (match, args) => {
                return `(${functions[func].toString()})(${args})`;
            });
        });

        return result;
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        if (n < 0 || !Number.isInteger(n)) throw new Error('Invalid input');
        if (n > 170) throw new Error('Number too large');
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    toRadians(degrees) {
        switch (this.angleMode) {
            case 'rad':
                return degrees;
            case 'grad':
                return degrees * Math.PI / 200;
            case 'deg':
            default:
                return degrees * Math.PI / 180;
        }
    }

    fromRadians(radians) {
        switch (this.angleMode) {
            case 'rad':
                return radians;
            case 'grad':
                return radians * 200 / Math.PI;
            case 'deg':
            default:
                return radians * 180 / Math.PI;
        }
    }

    setAngleMode(mode) {
        this.angleMode = mode;
        this.updateAngleMode();
    }

    updateAngleMode() {
        const angleBtns = document.querySelectorAll('#scientific-calculator .angle-btn');
        angleBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === this.angleMode) {
                btn.classList.add('active');
            }
        });
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

    formatResult(num) {
        if (isNaN(num) || !isFinite(num)) {
            throw new Error('Invalid result');
        }

        if (num === Infinity || num === -Infinity) {
            throw new Error('Overflow');
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
        return rounded.toString();
    }

    updateDisplay() {
        const expressionElement = document.getElementById('scientific-expression');
        const resultElement = document.getElementById('scientific-result');

        if (expressionElement) {
            expressionElement.textContent = this.expression || '\u00A0';
        }

        if (resultElement) {
            resultElement.textContent = this.result;
            resultElement.style.color = '';
        }
    }

    showError(message = 'Error') {
        this.result = message;
        this.expression = '';
        this.shouldResetDisplay = true;
        this.hasDecimal = false;
        this.operatorPressed = false;
        
        const resultElement = document.getElementById('scientific-result');
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

    // Memory functions
    memoryClear() {
        this.memory = 0;
        this.showNotification('Memory cleared', 'info');
    }

    memoryRecall() {
        this.result = this.formatResult(this.memory);
        this.shouldResetDisplay = true;
        this.hasDecimal = this.result.includes('.');
        this.updateDisplay();
        this.showNotification('Memory recalled', 'info');
    }

    memoryStore() {
        try {
            this.memory = parseFloat(this.result) || 0;
            this.showNotification('Value stored to memory', 'success');
        } catch (error) {
            this.memory = 0;
        }
    }

    memoryAdd() {
        try {
            this.memory += parseFloat(this.result) || 0;
            this.showNotification('Value added to memory', 'success');
        } catch (error) {
            // Ignore errors
        }
    }

    memorySubtract() {
        try {
            this.memory -= parseFloat(this.result) || 0;
            this.showNotification('Value subtracted from memory', 'success');
        } catch (error) {
            // Ignore errors
        }
    }

    showNotification(message, type) {
        if (window.calculatorApp) {
            window.calculatorApp.showNotification(message, type);
        }
    }

    // Additional scientific functions
    sinh(x) {
        return (Math.exp(x) - Math.exp(-x)) / 2;
    }

    cosh(x) {
        return (Math.exp(x) + Math.exp(-x)) / 2;
    }

    tanh(x) {
        return this.sinh(x) / this.cosh(x);
    }

    // Statistical functions
    combination(n, r) {
        if (r > n || r < 0 || !Number.isInteger(n) || !Number.isInteger(r)) {
            throw new Error('Invalid input');
        }
        return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
    }

    permutation(n, r) {
        if (r > n || r < 0 || !Number.isInteger(n) || !Number.isInteger(r)) {
            throw new Error('Invalid input');
        }
        return this.factorial(n) / this.factorial(n - r);
    }
}

// Initialize scientific calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.scientificCalculator = new ScientificCalculator();
});

// Export for use in other modules
window.ScientificCalculator = ScientificCalculator;