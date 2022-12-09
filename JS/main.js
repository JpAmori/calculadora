'use stict';

const display = document.getElementById('tela')
const number = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

let nvNumber = true;
let operador;
let numAnterior;

const opPendente = () => operador !== undefined


//Operadores = + - / *
const calcular = () => {
    if (opPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.')) 
        nvNumber = true;
        const resultado = eval(`${numAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}

//Novos Números no Display
const atualizarDisplay = (texto) => {
    
    if (nvNumber) {
        display.textContent = texto.toLocaleString('BR');
        nvNumber = false;
    }
    else{
        display.textContent += texto.toLocaleString('BR');
    }

}

const InserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

number.forEach (numero => numero.addEventListener('click', InserirNumero));

//Selecionando os Operadores
const selecionarOperador = (evento) => {
    if (!nvNumber) {
        calcular();
        nvNumber = true;
        operador = evento.target.textContent
        numAnterior = parseFloat(display.textContent.replace(',','.'))
    }
    
}

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

//Botão de =
const acionarResult = () => {
    calcular();
    operador = undefined;
}

document.getElementById('resul').addEventListener('click', acionarResult);

const limparDisplay = () => display.textContent = '';

document.getElementById('limpar').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    numeroAtual = true;
    numAnterior = undefined;

}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNum = () => display.textContent = display.textContent.slice(0, -1);

document.getElementById('backspace').addEventListener('click', removerUltimoNum)

const inverterSinal = () => {
    nvNumber = true;
    atualizarDisplay(display.textContent*-1) 
}

document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',')
        }
        else{
            atualizarDisplay('0,')
        }
    }
}

document.getElementById('virg').addEventListener('click', inserirDecimal);

const teclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadordiv',
    '*'         : 'operadormult',
    '-'         : 'operadorsub',
    '+'         : 'operadorsoma',
    '='         : 'igual',
    Enter       : 'igual',
    Backspace   : 'backspace',
    c           : 'limpar',
    Escape      : 'limparCalculo',
    ','         : 'decimais' 
}

const tDigitadas = (evento) => {
    const tecla = evento.key;
    const teclaP = () => Object.keys(teclado).indexOf(tecla) !== -1;
    if (teclaP()) {
        document.getElementById(teclado[tecla]).click();    
    }
    
}

document.addEventListener('keydown', tDigitadas);
