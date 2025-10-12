// Conversion Calculator Implementation
class ConversionCalculator {
    constructor() {
        this.currentCategory = 'length';
        this.fromUnit = 'm';
        this.toUnit = 'km';
        this.fromValue = '';
        this.toValue = '';
        
        // Conversion data with base unit conversions (to meters, kilograms, etc.)
        this.conversionData = {
            length: {
                baseUnit: 'm',
                units: {
                    // Metric
                    'mm': { name: 'Millimeter', factor: 0.001 },
                    'cm': { name: 'Centimeter', factor: 0.01 },
                    'm': { name: 'Meter', factor: 1 },
                    'km': { name: 'Kilometer', factor: 1000 },
                    // Imperial
                    'in': { name: 'Inch', factor: 0.0254 },
                    'ft': { name: 'Foot', factor: 0.3048 },
                    'yd': { name: 'Yard', factor: 0.9144 },
                    'mi': { name: 'Mile', factor: 1609.344 },
                    // Other
                    'nm': { name: 'Nanometer', factor: 1e-9 },
                    'μm': { name: 'Micrometer', factor: 1e-6 },
                    'ly': { name: 'Light Year', factor: 9.461e15 },
                    'au': { name: 'Astronomical Unit', factor: 1.496e11 }
                }
            },
            weight: {
                baseUnit: 'kg',
                units: {
                    // Metric
                    'mg': { name: 'Milligram', factor: 1e-6 },
                    'g': { name: 'Gram', factor: 0.001 },
                    'kg': { name: 'Kilogram', factor: 1 },
                    'ton': { name: 'Metric Ton', factor: 1000 },
                    // Imperial
                    'oz': { name: 'Ounce', factor: 0.0283495 },
                    'lb': { name: 'Pound', factor: 0.453592 },
                    'st': { name: 'Stone', factor: 6.35029 },
                    // Other
                    'ct': { name: 'Carat', factor: 0.0002 }
                }
            },
            temperature: {
                baseUnit: 'K',
                units: {
                    'C': { name: 'Celsius', convert: (c) => c + 273.15, convertFrom: (k) => k - 273.15 },
                    'F': { name: 'Fahrenheit', convert: (f) => (f - 32) * 5/9 + 273.15, convertFrom: (k) => (k - 273.15) * 9/5 + 32 },
                    'K': { name: 'Kelvin', convert: (k) => k, convertFrom: (k) => k },
                    'R': { name: 'Rankine', convert: (r) => r * 5/9, convertFrom: (k) => k * 9/5 }
                }
            },
            area: {
                baseUnit: 'm²',
                units: {
                    // Metric
                    'mm²': { name: 'Square Millimeter', factor: 1e-6 },
                    'cm²': { name: 'Square Centimeter', factor: 1e-4 },
                    'm²': { name: 'Square Meter', factor: 1 },
                    'km²': { name: 'Square Kilometer', factor: 1e6 },
                    'ha': { name: 'Hectare', factor: 10000 },
                    // Imperial
                    'in²': { name: 'Square Inch', factor: 0.00064516 },
                    'ft²': { name: 'Square Foot', factor: 0.092903 },
                    'yd²': { name: 'Square Yard', factor: 0.836127 },
                    'mi²': { name: 'Square Mile', factor: 2.59e6 },
                    'ac': { name: 'Acre', factor: 4046.86 }
                }
            },
            volume: {
                baseUnit: 'L',
                units: {
                    // Metric
                    'mL': { name: 'Milliliter', factor: 0.001 },
                    'L': { name: 'Liter', factor: 1 },
                    'm³': { name: 'Cubic Meter', factor: 1000 },
                    // Imperial
                    'tsp': { name: 'Teaspoon', factor: 0.00492892 },
                    'tbsp': { name: 'Tablespoon', factor: 0.0147868 },
                    'fl oz': { name: 'Fluid Ounce', factor: 0.0295735 },
                    'cup': { name: 'Cup', factor: 0.236588 },
                    'pt': { name: 'Pint', factor: 0.473176 },
                    'qt': { name: 'Quart', factor: 0.946353 },
                    'gal': { name: 'Gallon', factor: 3.78541 },
                    // Other
                    'in³': { name: 'Cubic Inch', factor: 0.0163871 },
                    'ft³': { name: 'Cubic Foot', factor: 28.3168 }
                }
            },
            time: {
                baseUnit: 's',
                units: {
                    'ns': { name: 'Nanosecond', factor: 1e-9 },
                    'μs': { name: 'Microsecond', factor: 1e-6 },
                    'ms': { name: 'Millisecond', factor: 0.001 },
                    's': { name: 'Second', factor: 1 },
                    'min': { name: 'Minute', factor: 60 },
                    'hr': { name: 'Hour', factor: 3600 },
                    'day': { name: 'Day', factor: 86400 },
                    'week': { name: 'Week', factor: 604800 },
                    'month': { name: 'Month', factor: 2629746 }, // Average month
                    'year': { name: 'Year', factor: 31556952 } // Average year
                }
            },
            speed: {
                baseUnit: 'm/s',
                units: {
                    'm/s': { name: 'Meters per Second', factor: 1 },
                    'km/h': { name: 'Kilometers per Hour', factor: 0.277778 },
                    'mph': { name: 'Miles per Hour', factor: 0.44704 },
                    'ft/s': { name: 'Feet per Second', factor: 0.3048 },
                    'kn': { name: 'Knots', factor: 0.514444 },
                    'c': { name: 'Speed of Light', factor: 299792458 }
                }
            },
            energy: {
                baseUnit: 'J',
                units: {
                    'J': { name: 'Joule', factor: 1 },
                    'kJ': { name: 'Kilojoule', factor: 1000 },
                    'cal': { name: 'Calorie', factor: 4.184 },
                    'kcal': { name: 'Kilocalorie', factor: 4184 },
                    'Wh': { name: 'Watt Hour', factor: 3600 },
                    'kWh': { name: 'Kilowatt Hour', factor: 3.6e6 },
                    'eV': { name: 'Electron Volt', factor: 1.602e-19 },
                    'BTU': { name: 'British Thermal Unit', factor: 1055.06 }
                }
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCategoryUnits();
        this.updateDisplay();
    }

    bindEvents() {
        const categorySelect = document.getElementById('conversion-category');
        const fromUnitSelect = document.getElementById('from-unit');
        const toUnitSelect = document.getElementById('to-unit');
        const fromValueInput = document.getElementById('from-value');
        const convertBtn = document.getElementById('convert-btn');

        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.setCategory(e.target.value);
            });
        }

        if (fromUnitSelect) {
            fromUnitSelect.addEventListener('change', (e) => {
                this.fromUnit = e.target.value;
                this.convert();
            });
        }

        if (toUnitSelect) {
            toUnitSelect.addEventListener('change', (e) => {
                this.toUnit = e.target.value;
                this.convert();
            });
        }

        if (fromValueInput) {
            fromValueInput.addEventListener('input', (e) => {
                this.fromValue = e.target.value;
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

        // Swap units functionality
        this.bindSwapUnits();
    }

    bindSwapUnits() {
        // Create swap button if it doesn't exist
        const conversionContainer = document.querySelector('.conversion-container');
        if (conversionContainer) {
            const swapBtn = document.createElement('button');
            swapBtn.className = 'swap-units-btn';
            swapBtn.innerHTML = '<i class="fas fa-exchange-alt"></i>';
            swapBtn.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                border: none;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                cursor: pointer;
                transition: var(--transition-fast);
                z-index: 10;
            `;

            const arrow = conversionContainer.querySelector('.conversion-arrow');
            if (arrow) {
                arrow.style.position = 'relative';
                arrow.appendChild(swapBtn);

                swapBtn.addEventListener('click', () => {
                    this.swapUnits();
                });
            }
        }
    }

    setCategory(category) {
        this.currentCategory = category;
        this.updateCategoryUnits();
        this.convert();
    }

    updateCategoryUnits() {
        const fromUnitSelect = document.getElementById('from-unit');
        const toUnitSelect = document.getElementById('to-unit');
        
        if (!fromUnitSelect || !toUnitSelect) return;

        const categoryData = this.conversionData[this.currentCategory];
        if (!categoryData) return;

        // Clear existing options
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';

        // Add new options
        Object.keys(categoryData.units).forEach(unitKey => {
            const unit = categoryData.units[unitKey];
            
            const fromOption = document.createElement('option');
            fromOption.value = unitKey;
            fromOption.textContent = `${unitKey} - ${unit.name}`;
            fromUnitSelect.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.value = unitKey;
            toOption.textContent = `${unitKey} - ${unit.name}`;
            toUnitSelect.appendChild(toOption);
        });

        // Set default units
        const unitKeys = Object.keys(categoryData.units);
        this.fromUnit = unitKeys[0];
        this.toUnit = unitKeys[Math.min(1, unitKeys.length - 1)];

        fromUnitSelect.value = this.fromUnit;
        toUnitSelect.value = this.toUnit;
    }

    convert() {
        const fromValueInput = document.getElementById('from-value');
        const toValueInput = document.getElementById('to-value');

        if (!fromValueInput || !toValueInput) return;

        const inputValue = parseFloat(fromValueInput.value);
        
        if (isNaN(inputValue) || fromValueInput.value === '') {
            toValueInput.value = '';
            return;
        }

        try {
            const convertedValue = this.performConversion(inputValue, this.fromUnit, this.toUnit, this.currentCategory);
            toValueInput.value = this.formatResult(convertedValue);

            // Add to history
            const expression = `${inputValue} ${this.fromUnit} → ${this.toUnit}`;
            const result = `${this.formatResult(convertedValue)} ${this.toUnit}`;
            
            if (window.historyManager) {
                window.historyManager.addCalculation(expression, result, 'conversion');
            }

        } catch (error) {
            toValueInput.value = 'Error';
            console.error('Conversion error:', error);
        }
    }

    performConversion(value, fromUnit, toUnit, category) {
        const categoryData = this.conversionData[category];
        if (!categoryData) {
            throw new Error('Invalid category');
        }

        const fromUnitData = categoryData.units[fromUnit];
        const toUnitData = categoryData.units[toUnit];

        if (!fromUnitData || !toUnitData) {
            throw new Error('Invalid units');
        }

        // Handle special conversion (temperature)
        if (category === 'temperature') {
            return this.convertTemperature(value, fromUnit, toUnit);
        }

        // Standard linear conversion through base unit
        const baseValue = value * fromUnitData.factor;
        const convertedValue = baseValue / toUnitData.factor;

        return convertedValue;
    }

    convertTemperature(value, fromUnit, toUnit) {
        const tempData = this.conversionData.temperature.units;
        
        // Convert from source unit to Kelvin
        let kelvinValue;
        if (tempData[fromUnit].convert) {
            kelvinValue = tempData[fromUnit].convert(value);
        } else {
            kelvinValue = value;
        }

        // Convert from Kelvin to target unit
        if (tempData[toUnit].convertFrom) {
            return tempData[toUnit].convertFrom(kelvinValue);
        } else {
            return kelvinValue;
        }
    }

    swapUnits() {
        // Swap the from and to units
        const temp = this.fromUnit;
        this.fromUnit = this.toUnit;
        this.toUnit = temp;

        // Update the select elements
        const fromUnitSelect = document.getElementById('from-unit');
        const toUnitSelect = document.getElementById('to-unit');
        
        if (fromUnitSelect && toUnitSelect) {
            fromUnitSelect.value = this.fromUnit;
            toUnitSelect.value = this.toUnit;
        }

        // Swap the values
        const fromValueInput = document.getElementById('from-value');
        const toValueInput = document.getElementById('to-value');
        
        if (fromValueInput && toValueInput) {
            const tempValue = fromValueInput.value;
            fromValueInput.value = toValueInput.value;
            toValueInput.value = tempValue;
            
            this.fromValue = fromValueInput.value;
        }

        // Perform conversion with swapped values
        this.convert();

        // Visual feedback
        const swapBtn = document.querySelector('.swap-units-btn');
        if (swapBtn) {
            swapBtn.style.transform = 'translate(-50%, -50%) rotate(180deg)';
            setTimeout(() => {
                swapBtn.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            }, 300);
        }
    }

    formatResult(value) {
        if (!isFinite(value) || isNaN(value)) {
            return 'Error';
        }

        // Handle very large or very small numbers
        if (Math.abs(value) >= 1e12 || (Math.abs(value) < 1e-6 && value !== 0)) {
            return value.toExponential(6);
        }

        // Round to appropriate precision
        let precision = 10;
        if (Math.abs(value) >= 1000) {
            precision = 6;
        } else if (Math.abs(value) >= 1) {
            precision = 8;
        }

        const rounded = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
        
        // Remove trailing zeros
        return parseFloat(rounded.toString()).toString();
    }

    updateDisplay() {
        // Update any display elements if needed
        const categorySelect = document.getElementById('conversion-category');
        if (categorySelect && categorySelect.value !== this.currentCategory) {
            categorySelect.value = this.currentCategory;
        }
    }

    // Batch conversion - convert one value to multiple units
    batchConvert(value, fromUnit, category) {
        const categoryData = this.conversionData[category];
        if (!categoryData) {
            return {};
        }

        const results = {};
        Object.keys(categoryData.units).forEach(toUnit => {
            if (toUnit !== fromUnit) {
                try {
                    const convertedValue = this.performConversion(value, fromUnit, toUnit, category);
                    results[toUnit] = {
                        value: convertedValue,
                        formatted: this.formatResult(convertedValue),
                        unit: categoryData.units[toUnit].name
                    };
                } catch (error) {
                    results[toUnit] = {
                        value: null,
                        formatted: 'Error',
                        unit: categoryData.units[toUnit].name
                    };
                }
            }
        });

        return results;
    }

    // Get conversion factor between two units
    getConversionFactor(fromUnit, toUnit, category) {
        try {
            return this.performConversion(1, fromUnit, toUnit, category);
        } catch (error) {
            return null;
        }
    }

    // Add custom unit (for future use)
    addCustomUnit(category, unitKey, unitData) {
        if (this.conversionData[category]) {
            this.conversionData[category].units[unitKey] = unitData;
            this.updateCategoryUnits();
        }
    }

    // Remove custom unit
    removeCustomUnit(category, unitKey) {
        if (this.conversionData[category] && this.conversionData[category].units[unitKey]) {
            delete this.conversionData[category].units[unitKey];
            this.updateCategoryUnits();
        }
    }

    // Export conversion data
    exportConversionData() {
        return JSON.stringify(this.conversionData, null, 2);
    }

    // Import conversion data
    importConversionData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            // Merge with existing data
            Object.keys(importedData).forEach(category => {
                if (this.conversionData[category]) {
                    Object.assign(this.conversionData[category].units, importedData[category].units);
                } else {
                    this.conversionData[category] = importedData[category];
                }
            });
            this.updateCategoryUnits();
            return true;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }
}

// Initialize conversion calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.conversionCalculator = new ConversionCalculator();
});

// Export for use in other modules
window.ConversionCalculator = ConversionCalculator;