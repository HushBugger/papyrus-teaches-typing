'use strict';

var queue = [];
var queueIndex = 0;
var punctuation = ['.', ',', '!', '?'];
var sounds = {
    papyrus: new Audio('sound/papyrus.mp3'),
    pop: new Audio('sound/pop.mp3'),
};
var answerHandlers = [];

function createInput() {
    var form = document.createElement('form');
    form.onsubmit = 'return false;';
    var input = document.createElement('input');
    input.id = 'answer';
    form.appendChild(input);
    document.body.appendChild(form);
    sounds.pop.play();
    form.addEventListener(
        'submit',
        function (event) {
            event.preventDefault();
            var handler = answerHandlers.pop();
            var text = input.value;
            input.value = '';
            var line = document.createElement('p')
            line.innerText = text;
            document.getElementById('messages').appendChild(line);
            if (handler != null) {
                handler(text);
            }
        }
    )
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

function say(text, classes = [], sound = null) {
    var line = document.createElement('p');
    line.classList.add(...classes);

    document.getElementById('messages').appendChild(line);

    function scrollText() {
        var char = text[0];
        line.textContent += char;
        text = text.slice(1);
        if (sound && !' .,!?'.includes(char)) {
            sound.cloneNode().play();
        }
        if (!text) {
            proceed();
            return;
        }

        var delay;

        if (char === ',') {
            delay = 150;
        } else if (char === '?' || char === '!' || char === '.') {
            if (text[0] === ')') {
                delay = 40;
            } else {
                delay = 300;
            }
        } else {
            delay = 40;
        }

        setTimeout(scrollText, delay);
    }

    scrollText();
}

function schedule(...args) {
    queue.push(args);
}

function proceed() {
    if (queueIndex < queue.length) {
        var task = queue[queueIndex++];
        setTimeout(
            task[1],
            task[0],
            ...task.slice(2)
        );
    } else {
        info("(The end. For now.)");
        schedule(0, function(){});
        proceed();
    }
}

function pap(text, delay=750) {
    schedule(delay, say, text.toUpperCase(), ['papyrus'], sounds.papyrus);
}

function info(text, delay=750) {
    schedule(delay, say, text);
}

function space(delay=750) {
    schedule(
        delay,
        function() {
            document.getElementById('messages')
                .appendChild(
                    document.createElement('p')
                );
            proceed();
        }
    );
}

function func(callback, delay=750) {
    schedule(delay, function() {
        callback();
        proceed();
    })
}

function useAnswer(callback) {
    schedule(0, function() {
        answerHandlers.push(function(text) {
            callback(text);
            proceed();
        });
    });
}
