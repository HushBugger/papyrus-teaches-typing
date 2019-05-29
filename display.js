'use strict';

var alnum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

var sounds = {
    papyrus: new Audio('sound/papyrus.mp3'),
    pop: new Audio('sound/pop.mp3'),
    sans: new Audio('sound/sans.mp3'),
    text_beep: new Audio('sound/text_beep.wav'),
    bark: new Audio('sound/bark.mp3'),
};
var answerHandler = null;

function createInput() {
    var form = document.createElement('form');
    form.onsubmit = 'return false;';
    form.autocomplete = 'off';
    var input = document.createElement('input');
    input.id = 'answer';
    input.autocomplete = 'off';
    form.appendChild(input);
    document.body.appendChild(form);
    form.addEventListener(
        'submit',
        function (event) {
            // todo: race condition if you submit twice really fast
            event.preventDefault();
            if (answerHandler == null) {
                return;
            }
            var text = input.value;
            input.value = '';
            var line = document.createElement('p')
            line.classList.add('message');
            line.innerText = text;
            document.getElementById('messages').appendChild(line);
            scrollDown();
            answerHandler([text, line]);
            answerHandler = null;
        }
    )
    input.focus();
}

function getAnswer() {
    return new Promise(resolve => {
        answerHandler = resolve;
    });
}

function scrollDown() {
    var messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

async function say(
    text,
    classes = [],
    sound = null,
    baseDelay = 40
) {
    var line = document.createElement('p');
    line.classList.add('message', ...classes);

    messages.appendChild(line);

    var pause = null;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        line.textContent += char;
        if (sound && !' .,":;\''.includes(char)) {
            var soundObj = sound.cloneNode();
            if (sound === sounds.papyrus && !shouldShout) {
                soundObj.volume = 0.3;
            }
            soundObj.play();
        }

        if (sound !== null) {
            if (char === ',') {
                pause = baseDelay * 4;
            } else if ('?!.'.includes(char)) {
                if (i + 1 >= text.length || ! '?!.'.includes(text[i + 1])) {
                    pause = baseDelay * 7.5;
                }
            }
        }

        var delay;
        if (alnum.includes(text[0]) && pause !== null) {
            delay = pause;
            pause = null;
        } else {
            delay = baseDelay;
        }

        scrollDown();
        await sleep(delay);
    }

    return line;
}

var shouldShout = true;

async function pap(text, delay=750) {
    if (shouldShout) {
        text = text.toUpperCase();
    }
    await sleep(delay);
    return await say(text, ['papyrus'], sounds.papyrus);
}

async function sans(text, delay=750) {
    await sleep(delay);
    return await say(text, ['sans'], sounds.sans);
}

async function chara(text, delay=750) {
    await sleep(delay);
    return await say(text, ['chara'], sounds.text_beep);
}

async function info(text, delay=750) {
    await sleep(delay);
    return await say(text);
}

async function space(delay=750) {
    await sleep(delay);
    var line = document.createElement('p');
    line.classList.add('message');
    document.getElementById('messages').appendChild(line);
    return line;
}

async function paps(texts, delay=750) {
    for (let text of texts) {
        await pap(text, delay);
    }
}
