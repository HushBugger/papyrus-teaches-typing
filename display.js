'use strict';

var alnum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

var queue = [];
var queueIndex = 0;
var sounds = {
    papyrus: new Audio('sound/papyrus.mp3'),
    pop: new Audio('sound/pop.mp3'),
    sans: new Audio('sound/sans.mp3'),
    text_beep: new Audio('sound/text_beep.wav'),
};
var answerHandler = null;
var eventsPaused = false;

function createInput() {
    var form = document.createElement('form');
    form.onsubmit = 'return false;';
    var input = document.createElement('input');
    input.id = 'answer';
    form.appendChild(input);
    document.body.appendChild(form);
    form.addEventListener(
        'submit',
        function (event) {
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
            answerHandler(text);
            answerHandler = null;
            proceed();
        }
    )
    input.focus();
}

function scrollDown() {
    var messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}

/**
 * @param {string} text
 * @returns {bool|null}
 */
function affirmative(text) {
    if (text.toLowerCase().startsWith('ye')) {
        return true;
    } else if (text.toLowerCase().startsWith('no')) {
        return false;
    } else {
        return null;
    }
}

function say(
    text,
    classes = [],
    sound = null,
    pauseEvents = true,
    baseDelay = 40
) {
    var line = document.createElement('p');
    line.classList.add('message', ...classes);

    messages.appendChild(line);
    scrollDown();

    var pause = null;

    function scrollText() {
        var char = text[0];
        line.textContent += char;
        text = text.slice(1);
        if (sound && !' .,":;\''.includes(char)) {
            var soundObj = sound.cloneNode();
            if (sound === sounds.papyrus && !shouldShout) {
                soundObj.volume = 0.3;
            }
            soundObj.play();
        }
        if (!text) {
            scrollDown();
            if (pauseEvents) {
                eventsPaused = false;
                proceed();
            }
            return;
        }

        if (sound !== null) {
            if (char === ',') {
                pause = baseDelay * 4;
            } else if (char === '?' || char === '!' || char === '.') {
                pause = baseDelay * 7.5;
            }
        }

        var delay;
        if (alnum.includes(text[0]) && pause !== null) {
            delay = pause;
            pause = null;
        } else {
            delay = baseDelay;
        }

        setTimeout(scrollText, delay);
    }

    scrollText();

    if (pauseEvents) {
        eventsPaused = true;
    }

    return line;
}

function schedule(...args) {
    queue.push(args);
}

function proceed() {
    if (queueIndex < queue.length) {
        var task = queue[queueIndex++];
        setTimeout(
            function () {
                task[1](...task.slice(2));
                if (!eventsPaused) {
                    proceed();
                }
            },
            task[0]
        );
    } else if (answerHandler === null) {
        info("(The end. For now.)");
        schedule(0, function () {
            eventsPaused = true;
        });
        proceed();
    }
}

var shouldShout = true;

function pap(text, delay=750, pauseEvents = true) {
    if (shouldShout) {
        text = text.toUpperCase();
    }
    schedule(delay, say, text, ['papyrus'], sounds.papyrus, pauseEvents);
}

function sans(text, delay=750) {
    schedule(delay, say, text, ['sans'], sounds.sans);
}

function chara(text, delay=750) {
    schedule(delay, say, text, ['chara'], sounds.text_beep);
}

function info(text, delay=750) {
    schedule(delay, say, text);
}

function space(delay=750) {
    schedule(
        delay,
        function () {
            var line = document.createElement('p');
            line.classList.add('message');
            document.getElementById('messages').appendChild(line);
        }
    );
}
