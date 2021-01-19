const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')
const utterance = new SpeechSynthesisUtterance(text)
let currentCharacter

//button clicks
playButton.addEventListener("click", () => {
    playText(textInput.value)
})
pauseButton.addEventListener("click", pauseText)
stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', () => {
    stopText()
    playText(utterance.text.substring(currentCharacter))
})

//Keys pressed


//TODO: combine enter key presses into switch statement?
document.addEventListener("keydown", function(event) {
    //log which key is pressed
    console.log(event.which)

    //enter key(13) is pressed
    if (event.which == 13 && speechSynthesis.speaking == false) {
        console.log("Playing via Enter")
        playText(textInput.value)
    }
    
    if (event.which == 13 && speechSynthesis.pause) {
        console.log("Resuming via Enter")
        speechSynthesis.resume()
    }
    if (event.which == 13 && speechSynthesis.speaking) {
        console.log("Pausing via Enter")
        pauseText()
    }
    //Esc key (27) is pressed
    if (event.which == 27) {
        console.log("Stopping via Esc")
        stopText()
    }
    //Space bar (32) is pressed
    if (event.which == 32) {
        console.log("Pausing via Space")
        pauseText()
    }
})

//play function
function playText(text) {
    if (speechSynthesis.pause && speechSynthesis.speaking) {
        return speechSynthesis.resume()
    }
    utterance.text = text
    utterance.rate = speedInput.value || 1
    textInput.disabled = true
    speechSynthesis.speak(utterance)
}  

//pause function
function pauseText() {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause()
    }
}

//stop function
function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
}

//utterance events
utterance.addEventListener('end', () => {
    textInput.disabled = false
})
utterance.addEventListener('boundary', e=> {
    currentCharacter = e.charIndex
})
