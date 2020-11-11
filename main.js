
quotes_array = [
    "Push yourself, because no one else is going to do it for you.",
    "Failure is the condiment that gives success its flavor.",
    "Wake up with determination. Go to bed with satisfaction.",
    "It's going to be hard, but hard does not mean impossible.",
    "Manor we shall merit by chief wound no or would. Oh towards between subject passage sending mention or it. Sight happy do burst fruit to woody begin at. Assurance perpetual he in oh determine as. The year paid met him does eyes same. Own marianne improved sociable not out. Thing do sight blush mr an.",
    "Learning never exhausts the mind.",
    "Throwing consider dwelling bachelor joy her proposal laughter. Raptures returned disposed one entirely her men ham. By to admire vanity county an mutual as roused.",
    "The only way to do great work is to love what you do."
];

let timerTxt = document.querySelector('.time')
let accuracyTxt = document.querySelector('.accuracy')
let errorTxt = document.querySelector('.error')
let wpmTxt = document.querySelector('.wpm')
let restart = document.querySelector('.btn')
let input = document.querySelector('.input')
let prgrp = document.querySelector('.pharagraph')
let start = document.querySelector('.start')
let prgrphDiv = document.querySelector('.prgrphDiv')
let inputDiv = document.querySelector('.inputDiv')
let resetBtn = document.querySelector('.reset')

let time = 0
let qouteNo = 0
let errors = 0
let accuracy = 0
let wpm = 0
let totalErrors = 0
let characterTyped = 0
let currentQuote = ''
let currentInput = ''
let startTimer = null

// start.addEventListener('click', begin)
resetBtn.addEventListener('click', checkBtn)
input.addEventListener('input', currentText)

function checkBtn() {
    if (resetBtn.innerText === 'Start') {
        resetBtn.innerText = 'Reset'
        begin()
    }
    else {
        resetBtn.innerText = 'Start'
        reset()
    }
}


function begin() {
    prgrphDiv.style.display = 'block'
    inputDiv.style.display = 'block'
    input.focus()
    getPhar()
    startTimer = setInterval(countTime, 1000)
}


function countTime() {
    time++
    timerTxt.innerText = time + 's'
}


function reset() {
    clearInterval(startTimer)
    time = 0
    timerTxt.innerText = 0
    errorTxt.innerText = 0
    wpmTxt.innerText = 0
    accuracyTxt.innerText = 0
    input.value = ''
    prgrphDiv.style.display = 'none'
    inputDiv.style.display = 'none'

    qouteNo = 0
    errors = 0
    totalErrors = 0
    characterTyped = 0
    currentQuote = ''
    currentInput = ''
    startTimer = null
}

function getPhar() {
    prgrp.textContent = null
    currentQuote = quotes_array[qouteNo]

    currentQuote.split('').forEach(text => {
        const txtSpan = document.createElement('span')
        txtSpan.innerText = text
        prgrp.appendChild(txtSpan)
    })
    if (qouteNo < quotes_array.length - 1) {
        qouteNo++
    }
    else {
        qouteNo = 0
    }
}


function currentText() {
    currentInput = input.value
    currentInputArr = currentInput.split('')

    characterTyped++
    errors = totalErrors
    const prgrpSpanArr = prgrp.querySelectorAll('span')
    prgrpSpanArr.forEach((text, index) => {
        typedText = currentInputArr[index]

        if (typedText == null) {
            text.classList.remove('incorrect')
            text.classList.remove('correct')
        }
        else if (typedText === text.innerText) {
            text.classList.add('correct')
            text.classList.remove('incorrect')
        }
        else {
            text.classList.add('incorrect')
            text.classList.remove('correct')
            errors++
            errorTxt.innerText = errors;
        }
        let correctVal = (characterTyped - errors)
        accuracy = (correctVal / characterTyped) * 100
        console.log(correctVal)
        accuracyTxt.innerText = Math.round(accuracy)
        wpm = Math.round(((characterTyped / 5) / time) * 60);
        wpmTxt.innerText = wpm
    })
    if (currentInput.length === currentQuote.length) {
        getPhar()
        totalErrors += errors
        input.value = ''
    }

}

