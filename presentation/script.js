document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    let primeiroNumero = null;
    let operador = null;
    let novoNumero = false;
    
    function atualizarDisplay(valor) {
        display.textContent = valor;
    }

    function handleNumero(numero) {
        if (display.textContent === '0' || novoNumero) {
            atualizarDisplay(numero);
            novoNumero = false;
        } else if (display.textContent.length < 12) { 
            atualizarDisplay(display.textContent + numero);
        }
    }

    function handleOperacao(op) {
        primeiroNumero = parseFloat(display.textContent.replace(',', '.'));
        operador = op;
        novoNumero = true;
    }

    function calcularResultado() {
        if (operador === null || novoNumero) return;

        const segundoNumero = parseFloat(display.textContent.replace(',', '.'));
        let resultado;

        switch (operador) {
            case '+':
                resultado = primeiroNumero + segundoNumero;
                break;
            case '-':
                resultado = primeiroNumero - segundoNumero;
                break;
            case '×':
                resultado = primeiroNumero * segundoNumero;
                break;
            case '÷':
                if (segundoNumero === 0) {
                    atualizarDisplay('Erro');
                    return;
                }
                resultado = primeiroNumero / segundoNumero;
                break;
        }

        resultado = resultado.toLocaleString('pt-BR', {
            maximumFractionDigits: 8,
            useGrouping: true
        });

        atualizarDisplay(resultado);
        primeiroNumero = null;
        operador = null;
        novoNumero = true;
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const valor = button.textContent;

            if (/[0-9]/.test(valor)) {
                handleNumero(valor);
            }
            else if (['+', '-', '×', '÷'].includes(valor)) {
                handleOperacao(valor);
            }
            else if (valor === '=') {
                calcularResultado();
            }
            else if (valor === ',') {
                if (!display.textContent.includes(',') && !novoNumero) {
                    atualizarDisplay(display.textContent + ',');
                }
            }
            else if (valor === 'C') {
                atualizarDisplay('0');
                primeiroNumero = null;
                operador = null;
                novoNumero = false;
            }
            else if (valor === '⌫') {
                if (display.textContent.length > 1) {
                    atualizarDisplay(display.textContent.slice(0, -1));
                } else {
                    atualizarDisplay('0');
                }
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            handleNumero(e.key);
        } else if (e.key === '.') {
            if (!display.textContent.includes(',')) {
                atualizarDisplay(display.textContent + ',');
            }
        } else if (['+', '-'].includes(e.key)) {
            handleOperacao(e.key);
        } else if (e.key === '*') {
            handleOperacao('×');
        } else if (e.key === '/') {
            e.preventDefault();
            handleOperacao('÷');
        } else if (e.key === 'Enter' || e.key === '=') {
            calcularResultado();
        } else if (e.key === 'Backspace') {
            if (display.textContent.length > 1) {
                atualizarDisplay(display.textContent.slice(0, -1));
            } else {
                atualizarDisplay('0');
            }
        } else if (e.key === 'Escape') {
            atualizarDisplay('0');
            primeiroNumero = null;
            operador = null;
            novoNumero = false;
        }
    });
});