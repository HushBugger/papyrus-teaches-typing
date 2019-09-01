/**
 * @licstart  The following is the entire license notice for the JavaScript code in this page.
 *
 * Copyright 2019 HushBugger
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * @licend  The above is the entire license notice for the JavaScript code in this page.
 */

'use strict';

const alnum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let answerHandler = null;

let linesEntered = 0;

function createInput() {
    var form = document.createElement('form');
    form.onsubmit = 'return false;';
    form.autocomplete = 'off';
    var input = document.createElement('input');
    input.id = 'answer';
    input.autocomplete = 'off';
    input.disabled = true;
    form.appendChild(input);
    document.body.appendChild(form);
    form.addEventListener(
        'submit',
        function formListener(event) {
            // todo: race condition if you submit twice really fast
            event.preventDefault();
            if (answerHandler == null) {
                return;
            }
            var text = input.value;
            if (text.trim() === '') {
                return;
            }
            input.value = '';
            input.disabled = true;
            var line = document.createElement('p')
            line.classList.add('message', 'player');
            line.innerText = text;
            document.getElementById('messages').appendChild(line);
            scrollDown();
            answerHandler([text, line]);
            answerHandler = null;
            linesEntered++;
        }
    )
    if (answerHandler != null) {
        input.disabled = false;
        input.focus();
        scrollDown();
    }
}

/**
 * @returns {Promise<[string, HTMLParagraphElement]>}
 */
function getAnswer() {
    return new Promise(function (resolve) {
        let answer = document.getElementById('answer');
        answer.disabled = false;
        answer.focus();
        answerHandler = resolve;
    });
}

function scrollDown() {
    let messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}

function sleep(delay) {
    return new Promise(function sleepResolver(resolve) {
        setTimeout(resolve, delay)
    });
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
                if (i + 1 >= text.length || text[i + 1] == ' ') {
                    pause = baseDelay * 7.5;
                }
            } else if (char === '-') {
                pause = baseDelay * 3;
            }
        }
        if (char === '\n') {
            pause = baseDelay * 10;
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

async function gaster(text, delay=1000) {
    await sleep(delay);
    return await say(text.toUpperCase(), ['gaster'], sounds.text_tick, 100);
}

async function alphys(text, delay=750) {
    await sleep(delay);
    return await say(text, ['alphys'], sounds.alphys);
}

async function undyne(text, delay=750) {
    await sleep(delay);
    return await say(text, ['undyne'], sounds.undyne);
}

async function asriel(text, delay=750) {
    await sleep(delay);
    return await say(text, ['asriel'], sounds.asriel, 60);
}

async function flowey(text, delay=750) {
    await sleep(delay);
    return await say(text, ['flowey'], sounds.flowey);
}

async function floweyCackle(text, delay=750) {
    await sleep(delay);
    return await say(text, ['flowey'], sounds.floweyCackle, 75);
}

async function asgore(text, delay=750) {
    await sleep(delay);
    return await say(text, ['asgore'], sounds.asgore, 60);
}

async function asgorePitch(text, delay=750) {
    await sleep(delay);
    return await say(text, ['asgore'], sounds.asgorePitch, 60);
}

async function space(delay=750) {
    await sleep(delay);
    var line = document.createElement('p');
    line.classList.add('message');
    document.getElementById('messages').appendChild(line);
    return line;
}

function ifIncludes(...needles) {
    return function (text) {
        for (var needle of needles) {
            if (text.includes(needle)) {
                return true;
            }
        }
        return false;
    };
}

function ifSame(...needles) {
    return function (text) {
        for (var needle of needles) {
            if (text === needle) {
                return true;
            }
        }
        return false;
    }
}

function ifStartsWith(...needles) {
    return function (text) {
        for (var needle of needles) {
            if (text.startsWith(needle)) {
                return true;
            }
        }
        return false;
    }
}

function anyOf(...specs) {
    return function (text) {
        for (var spec of specs) {
            if (spec(text)) {
                return true;
            }
        }
        return false;
    }
}

async function handleAnswerWith(handlers, fallback = null) {
    let [text, elem] = await getAnswer();
    for (var handler of handlers) {
        if (handler[0](text.toLowerCase())) {
            await handler[1](text, elem);
            return;
        }
    }
    if (fallback !== null) {
        await fallback(text);  // pass elem too?
    } else {
        await pap("I didn't quite catch that.");
    }
}
