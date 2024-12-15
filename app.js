const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.keyboads > div');
screen.textContent = '0';

let firstNumber = null;
let secondNumber = null;
let operator = null;
let result = 0;

// Función para manejar el input del teclado
function handleKeyboardInput(e) {
    const key = e.key;

    if (!isNaN(key)) { // Si la tecla es un número
        if (screen.textContent === '0') {
            screen.textContent = key;
        } else {
            screen.textContent += key;
        }
    } else if (key === '+' || key === '-' || key === '*' || key === '/') { // Operadores
        firstNumber = parseFloat(screen.textContent);
        operator = key;
        screen.textContent = '0';
    } else if (key === 'Enter' || key === '=') { // Igual (Enter o tecla igual)
        if (operator && firstNumber !== null) {
            secondNumber = parseFloat(screen.textContent);
            if (operator === '+') {
                result = firstNumber + secondNumber;
            }
            if (operator === '-') {
                result = firstNumber - secondNumber;
            }
            if (operator === '*') {
                result = firstNumber * secondNumber;
            }
            if (operator === '/') {
                if (secondNumber === 0) {
                    result = 'Error'; // Manejar división por 0
                } else {
                    const divisionResult = firstNumber / secondNumber;
                    if (divisionResult.toString().includes('.')) {
                        const decimalLength = divisionResult.toString().split('.')[1]?.length;
                        if (decimalLength > 5) {
                            result = divisionResult.toFixed(5); // Limitar a 5 decimales
                        } else {
                            result = divisionResult; // Mantener el valor original
                        }
                    } else {
                        result = divisionResult;
                    }
                }
            }
            screen.textContent = result;
            firstNumber = null;
            secondNumber = null;
            operator = null;
        }
    } else if (key === 'Backspace') { // Borrar último dígito
        if (screen.textContent.length > 1) {
            screen.textContent = screen.textContent.slice(0, -1);
        } else {
            screen.textContent = '0';
        }
    } else if (key === 'Escape' || key === 'c' || key === 'C') { // Resetear (Escape o tecla C)
        screen.textContent = '0';
        firstNumber = null;
        secondNumber = null;
        operator = null;
    }
}

// Agregar eventos de teclado
document.addEventListener('keydown', handleKeyboardInput);

// Lógica existente para botones de la calculadora
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const getNumber = e.target.textContent;
        if (!isNaN(getNumber)) {
            if (screen.textContent === '0') {
                screen.textContent = getNumber;
            } else {
                screen.textContent += getNumber;
            }
        } else if (getNumber === '+' || getNumber === '-' || getNumber === '*' || getNumber === '/') {
            firstNumber = parseFloat(screen.textContent);
            operator = getNumber;
            screen.textContent = '0';
        } else if (getNumber === '=') {
            if (operator && firstNumber !== null) {
                secondNumber = parseFloat(screen.textContent);
                if (operator === '+') {
                    result = firstNumber + secondNumber;
                }
                if (operator === '-') {
                    result = firstNumber - secondNumber;
                }
                if (operator === '*') {
                    result = firstNumber * secondNumber;
                }
                if (operator === '/') {
                    if (secondNumber === 0) {
                        result = 'Error';
                    } else {
                        const divisionResult = firstNumber / secondNumber;
                        if (divisionResult.toString().includes('.')) {
                            const decimalLength = divisionResult.toString().split('.')[1]?.length;
                            if (decimalLength > 5) {
                                result = divisionResult.toFixed(5);
                            } else {
                                result = divisionResult;
                            }
                        } else {
                            result = divisionResult;
                        }
                    }
                }
                screen.textContent = result;
                firstNumber = null;
                secondNumber = null;
            }
        } else if (getNumber === 'C') {
            screen.textContent = '0';
            firstNumber = null;
            secondNumber = null;
            operator = null;
        }
    });
});

