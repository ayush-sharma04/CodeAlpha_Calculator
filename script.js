let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
    display.classList.add('updated');
    setTimeout(() => display.classList.remove('updated'), 300);
}

function appendNumber(num) {
    if (waitingForSecondOperand) {
        displayValue = num;
        waitingForSecondOperand = false;
    } else {
        if (num === '.' && displayValue.includes('.')) return;
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    updateDisplay();
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate();
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculate() {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null || operator === null) {
        return inputValue;
    }

    let result;
    switch (operator) {
        case '+':
            result = firstOperand + inputValue;
            break;
        case '-':
            result = firstOperand - inputValue;
            break;
        case '*':
            result = firstOperand * inputValue;
            break;
        case '/':
            if (inputValue === 0) {
                clearDisplay();
                displayValue = 'Error';
                updateDisplay();
                return 0;
            }
            result = firstOperand / inputValue;
            break;
        default:
            return inputValue;
    }

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
    return result;
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteDigit() {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteDigit();
    }
});

// Initialize display
updateDisplay();