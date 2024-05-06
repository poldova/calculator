function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error";
    }
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function pow(a, b) {
    return Math.pow(a,b);
}

const buttons = document.querySelectorAll('#button');
const display = document.querySelector('.text');
const oper = document.querySelector('.oper');

let currNum;
let nextNum;
let op;
let value = '';

function operator(curr, next, op) {
    if (isNaN(curr) || isNaN(next)) {
        return "Error";
    }

    switch (op) {
        case '+':
            return add(curr, next);
        case '-':
            return subtract(curr, next);
        case '*':
            return multiply(curr, next);
        case '/':
            return divide(curr, next);
        case '%':
            return modulo(curr, next);
        case 'Pow':
            return pow(curr, next);
    }
}

function clear() {
    currNum = undefined;
    nextNum = undefined;
    display.textContent = '';
    oper.textContent = '';
    value ='';
}

function removeLastChar() {
    value = value.slice(0, -1);
    display.textContent = value;
}

function update() {
    display.textContent = currNum;
    oper.textContent = op;
}

document.addEventListener('keydown', e => {
    let key = e.key;
    console.log(key);
    buttons.forEach(button => {
        if (key === button.textContent) button.click()
    })
})

buttons.forEach(button => {
    button.addEventListener('click', e => {
        let target = e.target.textContent;
    
        switch (target) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case 'Pow':
                if (op === undefined) {
                    currNum = parseFloat(value);
                } else {
                    nextNum = parseFloat(value);
                    currNum = operator(currNum, nextNum, op);
                }
                op = target;
                value = '';
                update();
                break;
    
            case '=':
                nextNum = parseFloat(value);
                currNum = operator(currNum, nextNum, op);
                update();
                op = undefined;
                value = '';
                break;
    
            case 'Delete':
                clear();
                break;
            case 'Backspace':
                removeLastChar();
                break;
            default:
                value += target;
                display.textContent = value;
        }
    
    })
});