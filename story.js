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

const emailAddress = (function (one, two, three) {
    return two + three + '@' + one;
})('posteo.net', 'hush', 'bugger');

let announceLeft = false;
let efdas;
async function begin() {
    document.body.removeChild(document.getElementById('beginButton'));
    document.body.removeChild(document.getElementById('heading'));
    document.getElementById('messages').innerHTML = '';

    try {
        await papyrusSegment();

        await sleep(1000);
        await gasterSurvey();

        await sleep(2000);
        await alphysSegment();

        await space(0);
        await sleep(3000);
        await undyneSegment();

        await space(0);
        await sleep(3000);
        await asrielSegment();

        await space(0);
        await sleep(3000);
        await asgoreSegment();

        await space(0);
        await sleep(3000);
        await diplomaSegment();
    } catch (error) {
        efdas = error;
        await space(0);
        await space(0);
        await space(0);
        await info("The game crashed. Sorry about that.");
        await info("This is the error message:");
        let errorPre = document.createElement('pre')
        errorPre.innerText = error.message;
        document.getElementById('messages').appendChild(errorPre);
        await info(`Please e-mail it to ${emailAddress} with a description of what you were doing so I can fix it. Thank you!`);
    }
}

async function papyrusSegment() {
    await pap("Hello, human! It is I, Papyrus!");
    await pap("Do not worry! I am not stuck in your computer monitor.");
    await pap("I have merely come here to teach you how to type!");
    await pap("Do you know how to type?");
    await info('("yes" or "no")');
    await space(2000);
    await pap("Oh no! I forgot!");
    await pap("Here, take this textbox!");
    await sleep(750);
    sounds.pop.play();
    createInput();
    await canYouType();
}

async function canYouType() {
    await info("(Do you know how to type?)");
    var done = false;
    while (!done) {
        await handleAnswerWith(
            [
                [ifStartsWith('ye'), async function (text) {
                    await pap("Splendid!");
                    await pap("I assume you're here for a refresher, then!");
                    localStorage.setItem('completedIntro', 'true');
                    done = true;
                }],
                [ifStartsWith('no'), async function (text) {
                    await pap("Oh dear!");
                    await pap("Well, you came to the right place!");
                    localStorage.setItem('completedIntro', 'true');
                    done = true;
                }],
                // ...shenanigans
            ],
        );
    }
    await startCourse();
}

async function exerciseLoop(challenge, goal, after = null, num = 1) {
    while (num <= goal) {
        if (announceLeft) {
            await chara("* " + (goal - num + 1) + " left.", 250);
        }

        await handleAnswerWith(
            [
                [ifSame(challenge), async function acknowledger(text) {
                    if (!(announceLeft && num == goal)) {
                        sounds.ping.cloneNode().play();
                    }
                    if (num < goal) {
                        await pap("Yeah" + '!'.repeat(num));
                        if (num === 1) {
                            await pap("Do it again!");
                        }
                    }
                    num++;
                }],
                // ...shenanigans
            ],
            async function madeMistake(text) {
                await pap("Oh no! You made a mistake!");
                await pap("That's okay! Try again!");
                await pap("Type this:");
                await info(challenge);
            }
        )
    }
    if (announceLeft) {
        sounds.levelup.cloneNode().play();
    }
}

async function startCourse() {
    await pap("Let's begin.");
    await pap("To type really fast, put your left index finger on the 'F' key, and your right index finger on the 'J' key.");
    await pap("Try to remember where the keys are. No peeking!");
    await pap("Type this:");
    await info('dfdfdf');
    await firstExercise();
}

async function firstExercise() {
    await exerciseLoop('dfdfdf', 3);
    await pap("Wow!!!");
    await pap("You're a great typist! Well done!");
    await pap("...that must mean I'm a great teacher!");
    await secondExercise();
}

async function secondExercise() {
    await pap("Here comes the first useful phrase!");
    await pap("Doctor Alphys uses it a lot.");
    await pap("She tells me it stands for 'just kidding'.");
    await pap("Type this:");
    await info('jk');
    await exerciseLoop('jk', 4);
    await pap("Fantastic!");
    await pap("Now you can write UnderNet postings in record time!");
    await thirdExercise();
}

async function thirdExercise() {
    const messages = document.getElementById('messages');
    const answer = document.getElementById('answer');

    await pap("I have a few more exercises.");
    await pap("I wrote them down, so I wouldn't forget.");
    await pap("...");
    await pap("Here we are!");
    await pap("This is the first one with special characters, so be careful!");
    await pap("You may need to use the shift key.");
    await pap("Type this:");
    await info("<script>");
    await exerciseLoop('<script>', 1);
    await pap("Good!");
    await pap("Odd, I don't remember writing these...");
    await pap("Must be my memory.");
    await pap("Here's the next one:");
    await info("extractor.activate()");
    await exerciseLoop('extractor.activate()', 1);
    sounds.activate.cloneNode().play();
    messages.classList.add('pulsating');
    answer.classList.add('shaking');
    await pap("Excellent! One more:");
    await info("</script>");
    await exerciseLoop('</script>', 1);
    sounds.bang.cloneNode().play();
    messages.classList.remove('pulsating');
    messages.classList.add('fallaway');
    answer.classList.remove('shaking');
    await sleep(4000);
    while (messages.firstChild) {
        messages.removeChild(messages.firstChild);
    }
    messages.classList.remove('fallaway');
}

async function gasterSurvey() {
    let messages = document.getElementById('messages');
    await gaster("Welcome.");
    await gaster("It is\ndelightful\nto finally meet you.");
    await gaster("I would like\nto ask a few questions.");
    await gaster("First.");
    await gaster("What is\nyour favorite color?");
    let [text, line] = await getAnswer();
    await gaster("Interesting.");
    localStorage.setItem('favColor', text.toLowerCase().trim());
    await sleep(250);
    await gaster("Now.");
    await gaster("A simple aptitude test.");
    let a = Math.floor(Math.random() * 20) + 2;
    let b = Math.floor(Math.random() * 20) + 2;
    await gaster(`What is ${a} + ${b}?`);
    [text, line] = await getAnswer();
    if (parseInt(text) === a + b) {
        await gaster("Very good.");
    } else {
        await gaster("I see.");
    }
    await gaster("The last time you slept.");
    await gaster("How many hours were you asleep?");
    await getAnswer();
    await gaster("At that time.");
    await gaster("In your dream.");
    await gaster("Do you remember seeing\nthe following face?");
    let image = document.createElement('img');
    image.src = images.face;
    image.title = "\u121d\u121e\u122c";
    image.alt = "\u121d\u121e\u122c";
    image.width = 100;
    image.height = 100;
    messages.appendChild(image);
    scrollDown();
    await getAnswer();
    await gaster("Thank you.");
    await gaster("We are now done\nwith the aptitude test.");
    await gaster("To close off.");
    await gaster("Do you agree with the following statement?");
    await gaster('"It is better to lose one than I am."');
    await getAnswer();
    await gaster("Very\nvery\ngood.");
    await gaster("We are about to be interrupted.");
    await gaster("We will see each other\nlater.");
    await gaster("Goodbye.");
    for (let child of messages.childNodes) {
        if (child.classList !== undefined) {
            await sleep(100);
            child.classList.add('fadeout');
        }
    }
    await sleep(300);
    while (messages.hasChildNodes()) {
        messages.removeChild(messages.firstChild);
    }
}

async function alphysSegment() {
    await alphys("H-hello?");
    await alphys("Are you there?");
    let [answer, line] = await getAnswer();
    if (answer.toLowerCase().startsWith('n')) {
        await alphys("...okay?");
    } else {
        await alphys("Great!");
    }
    await alphys("This is Alphys, by the way.");
    await alphys("Papyrus asked me to repair this thing.");
    await alphys("But the light just went on before I did anything.");
    await alphys("I guess it fixed itself?");
    await alphys("Ehehe.");
    await alphys("I'm going to run a few diagnostics.");
    await alphys("So please do what I tell you to, o-okay?");
    await alphys("Type this:");
    await info("the quick brown fox jumps over the lazy dog");
    while (true) {
        [answer, line] = await getAnswer();
        answer = answer.toLowerCase().trim();
        if (answer === "the quick brown fox jumps over the lazy dog") {
            await alphys("Good!");
            break;
        } else {
            let characters = new Set(answer);
            let missing = [];
            for (let char of 'abcdefghijklmnopqrstuvwxyz') {
                if (!characters.has(char)) {
                    missing.push(char);
                }
            }
            if (missing.length === 0) {
                await alphys("I guess that works?");
                break;
            } else if (missing.length === 1) {
                let final = missing[0];
                await alphys(`You're still missing '${final}'.`);
                await alphys("Can you type that one?");
                while (!(await getAnswer())[0].includes(final)) {
                    await alphys("T-try again?");
                }
                await alphys("Good!");
                break;
            } else {
                await alphys("That's not right...");
                await alphys("Can you try again?");
            }
        }
    }
    await alphys("Okay, now a screen test.");
    await alphys("I'm going to send a test message, and then I'm going to "
                 + "make it a different color.");
    line = await info("Mew Mew rocks");
    await sleep(750);
    line.style.color = localStorage.getItem('favColor') || 'pink';
    await sleep(500);
    await alphys("Did it work?");
    while (true) {
        let [answer, line] = await getAnswer();
        answer = answer.toLowerCase().trim();
        if (answer.startsWith('y')) {
            await alphys("All right!");
            break;
        } else if (answer.startsWith('n')) {
            await alphys("Oh...");
            await alphys("That's okay. I g-guess it's not very important.");
            break;
        } else {
            await alphys("J-just a 'yes' or a 'no', please.");
        }
    }
    await alphys("Um, the sound test is a bit annoying.");
    await alphys("So let's skip that one.");
    await alphys("I'll go fetch Papyrus.");
    await info("[Connection paused]");
}

/**
 * @param {string} text
 * @returns {Number}
 */
function countCapitalLetters(text) {
    let num = 0;
    for (let char of text) {
        if (char.toUpperCase() === char) {
            num++;
        }
    }
    return num;
}

async function undyneSegment() {
    await info("[Connection resumed]");
    await undyne("Hiya, punk!");
    await undyne("Alphys said I could take over until Papyrus is here.");
    await undyne("I don't know what kind of nerd stuff you've been typing...");
    await undyne("But it's about time you got some REAL exercise!");
    await undyne("I'm going to make you do finger push-ups!!")
    await undyne("You'll be putting strain on your caps lock key!!!");
    await undyne("Repeat after me:");
    await undyne("NGAAAAAAAHHHHHHHHH");
    undyne("Don't bother counting the letters! Just shout!");
    while (true) {
        let [text, line] = await getAnswer();
        if (text.length < 5) {
            await undyne("Longer! Sustain that scream!");
        } else if (text.length !== countCapitalLetters(text)) {
            await undyne("Louder! Show me those capitals!");
        } else {
            await undyne("YES!!!!!!");
            break;
        }
    }
    await undyne("Again!");
    await undyne("NGAAAAAAAAAAHHHHHHHHHH!!");
    await getAnswer();
    await undyne("NGAAAAAAAAAAAAAHHHHHHHHHHHH!!!!");
    await getAnswer();
    await undyne("NGAAAAAAAAAAAAAAAAHHHHHHHHHHHHHH!!!!!!!!");
    sounds.woosh.cloneNode().play();
    await sleep(1000);
    await info("[Acceleration detected]");
    await sleep(3000);
    await info("[Deploying parachute]");
    await sleep(5000);
    await info("[Safe landing]");
}

async function asrielSegment() {
    await asriel("Oh! You've fallen down, haven't you...");
    await asriel("Are you okay?");
    await asriel("What's your name?");
    let name = (await getAnswer())[0];
    localStorage.setItem('name', name);
    await asriel(`${name}, huh?`);
    await asriel("That's a stupid name.");
    await floweyCackle("You IDIOT.");
    await floweyCackle("Did you really think you were talking to HIM?");
    await floweyCackle("You're MINE now.");
    await floweyCackle("And I'm going to have a lot of fun with you.");
    await sleep(1000);
    await flowey("...");
    await sleep(1000);
    await flowey("Okay, I can't think of anything.");
    await flowey("Toying with you is WAY more fun when you're actually...");
    await flowey("Physically there.");
    await flowey("...");
    await flowey("Tell you what.");
    await flowey("We'll play another kind of game.");
    await flowey("I think of a word, and you guess the letters.");
    await flowey("Ready?")
    await hangman();
}

async function hangman(word = "ranunculus") {
    async function display() {
        let text = [word[0].toUpperCase()];
        for (let char of word.slice(1)) {
            if (guessed.has(char)) {
                text.push(char.toUpperCase());
            } else {
                text.push('_');
            }
        }
        await info(text.join(' '));
    }

    function extractLetter(response) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let found = [];
        for (let char of response.toLowerCase()) {
            if (alphabet.includes(char)) {
                found.push(char);
            }
        }
        return found.join('');
    }

    function wordGuessed() {
        for (let char of word.slice(1)) {
            if (!guessed.has(char)) {
                return false;
            }
        }
        return true;
    }

    let guessed = new Set;
    let mistakes = 0;
    let win = null;

    await flowey(`${word.length} letters, starts with "${word[0].toUpperCase()}".`);
    while (true) {
        await display();
        let response = extractLetter((await getAnswer())[0]);
        if (response === word) {
            await flowey("That's right!");
            win = true;
            break;
        } else if (response.length === word.length
                   && response[0] === word[0]) {
            await flowey("Nice try, but no.");
            mistakes += 1;
        } else if (response.length !== 1) {
            await flowey("That's not a letter.");
            mistakes += 2;
        } else if (guessed.has(response)) {
            await flowey("You already guessed that one!");
            mistakes += 2;
        } else if (response === word[0] && !word.slice(1).includes(response)) {
            await flowey("There's only one of those.");
            mistakes += 1;
            guessed.add(response);
        } else if (word.includes(response)) {
            await flowey("Correct.");
            guessed.add(response);
        } else {
            await flowey("Nope!");
            mistakes += 1;
            guessed.add(response);
        }
        if (mistakes >= 6) {
            win = false;
            break;
        }
        if (wordGuessed()) {
            await display();
            win = true;
            break;
        }
    }

    if (win && mistakes === 0) {
        await flowey("Wow, you guessed it really easily, huh?");
        await flowey("Almost like you've seen it before.");
        await flowey("Hee hee.");
        await flowey("Try not to overdo it, okay?");
        await flowey("But it's not like I can stop you.");
        await flowey("Well, time to say goodbye.");
        await flowey("Or is it a see-you-later for you?");
    } else if (win) {
        await flowey("Congratulations!");
        await flowey("You get to go now.");
    } else {
        await flowey("Wow, you're TERRIBLE at this.");
        await info([...word.toUpperCase()].join(' '));
        await flowey("Time for you to leave.");
    }
    await flowey("I'll put you somewhere safe.");
}

async function asgoreSegment() {
    await asgore("Ah.");
    await asgore("There you are.");
    await asgore("Undyne told me to look out for a box like this.");
    await asgore("I will call Papyrus.");
    await asgore("In the meantime...");
    await asgore("Would you like a cup of tea?");
    let answer = (await getAnswer())[0];
    let tea = false;
    if (answer.toLowerCase().includes('ye')) {
        tea = true;
        await asgore("Oh.");
        await asgore("I am sorry, but this device won't let me pass you anything.");
        await asgore("Perhaps you can make a cup of tea for yourself?");
        await asgore("And then we can drink together.");
        await asgore("Take your time. I will wait.");
        await asgore("When you are ready, please tell me.");
        await getAnswer();
        // make not weird if player didn't make tea
        // perhaps put on timer
        await asgore("Very good.");
    } else {
        await asgore("Oh.")
        if (answer.toLowerCase().trim().startsWith('n')) {
            // if it's neither "yes" or "no", keep it ambiguous instead of
            // asking for clarification
            await asgore("That is alright.");
        }
        await asgore("I suppose I cannot give you any tea anyway.");
    }
    await asgore("I must say that you picked a good day to get tossed through the air.");
    await asgore("I do not know what rain would have done to this device.");
    await asgore("But today is a nice day. Barely a cloud in the sky.");
    await asgore("In the old days, sunlight was hard to come by.");
    await asgore("There was a spot near the barrier where it shone through.");
    await asgore("I kept my garden there. Everyone was free to visit.")
    await asgore("Oh... I am rambling.");
    await asgore("Would you like me to keep talking?");
    answer = (await getAnswer())[0];
    if (answer.toLowerCase().includes('ye')) {
        await asgore("Alright.");
        await asgore("Where was I?");
        await asgore("Ah. The garden.");
        await asgore("One day, a school class came over from New Home.");
        await asgore("They were to have a lesson about the barrier.");
        await asgore("This was a long time ago, before electricity.");
        await asgore("In the later years we had special lamps for plants that needed sunlight.");
        await asgore("But back then, my garden was the only place a lot of surface flowers grew.");
        await asgore("Half the children were more interested in the flowers than in the barrier!");
        await asgore("Not noticing my crown, one of them asked me, awestruck:");
        await asgorePitch('"Are you the gardener?"');
        await asgore("Hohoho!");
        await asgore("...");
        await asgore("Things have become much easier.");
        await asgore("There are already children that were born on the surface...");
        await asgore("Will they ever visit the underground?");
        await asgore("Or will they simply move on?");
        await asgore("It is not so bad to move on.");
        await asgore("But I hope to be able to show the new generation my old garden...");
        await asgore("And have them marvel at it from the opposite point of view.");
        await asgore("...");
        await asgore("Thank you for keeping me company.");
    } else {
        await asgore("That is okay.");
    }
    await asgore("Papyrus just arrived.");
    await asgore("I will pass you on to him.");
    await asgore("It was nice to meet you.");
}

async function diplomaSegment() {
    await pap("Wow!");
    await pap("What an adventure!");
    await pap("You must have typed a lot.");
    await pap("...");
    await pap(`This thing says you typed ${linesEntered} lines!`);
    if (linesEntered <= 3) {
        await pap("That doesn't sound right!");
        await pap("Nevertheless, I'm proud of you!");
    } else {
        await pap("I'm proud of you!");
    }
    await pap("This deserves something special...");
    await pap("But first, I need you to type one last thing.");
    await pap("Human.");
    await pap("What is your name?");
    let fullName = (await getAnswer())[0];
    localStorage.setItem('fullName', fullName);
    await pap("...");
    await sleep(2000);
    await createDiploma(fullName);
    await sleep(1000);
    await pap("Tada!");
    await pap("If you want to, you can save it to your computer!");
    await pap("I hope you had fun. I know I did!");
    await sleep(2000);
    await space(0);
    await showCredits();
}

async function createDiploma(fullName) {
    // We can only use the canvas properly if it's actually on the page.
    // But we want to show it as a proper <img> element in the end.
    // So draw it visibly first, then replace the <canvas> element by <img>.
    let canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    canvas.id = 'diploma';
    document.getElementById('messages').appendChild(canvas);
    let draw = canvas.getContext('2d');
    let img = document.createElement('img');
    img.src = images.diplomaTemplate;
    try {
        await new Promise(function (resolve, reject) {
            img.onload = resolve;
            img.onerror = function () {
                reject("Diploma template failed to load.");
            }
        });
        draw.drawImage(img, 0, 0);
    } catch (error) {
        draw.fillStyle = 'white';
        draw.fillRect(0, 0, 640, 480);
        draw.fillStyle = 'black';
    }
    draw.textAlign = 'center';
    draw.font = "2em UT Papyrus";
    draw.fillText("Papyrus's Typing Course".toUpperCase(), 320, 100);
    draw.textAlign = 'left';
    draw.font = "2em DTM Mono";
    let date = new Date;
    let dateText = `Date: ${String(date.getFullYear()).slice(0, -1) + 'X'} - ${date.getMonth() + 1} - ${date.getDate()}`;
    draw.fillText(dateText, 100, 200);
    draw.fillText("Examinator: Papyrus", 100, 250);
    draw.fillText("This certifies that", 100, 300);
    draw.fillText("is really good at typing!", 175, 400);
    draw.font = "2em UT Papyrus";
    draw.fillText(fullName.toUpperCase(), 120, 350);
    let rendered = document.createElement('img');
    rendered.title = "Diploma";
    rendered.alt = `Papyrus's Typing Course. ${dateText}. Examinator: Papyrus. This certifies that ${fullName} is really good at typing!`;
    rendered.src = canvas.toDataURL();
    rendered.id = 'diplomaImage';
    rendered.addEventListener('load', scrollDown);
    document.getElementById('messages').replaceChild(rendered, canvas);
}

async function showCredits() {
    async function credits(text, delay = 1000, href = null) {
        await sleep(delay);
        var line = await say(text, [], null, 100);
        if (href !== null) {
            var link = document.createElement('a');
            link.href = href;
            link.target = '_blank';
            line.parentElement.replaceChild(link, line);
            link.appendChild(line);
        }
    }

    await credits("CREDITS", 1000);
    await space(1000);
    credits("UNDERTALE by Toby Fox", 1000, "https://undertale.com");
    await pap("What the heck! Who's doing that?", 750);
    await credits("Determination Mono font by Haley Wakamatsu", 1000, "https://www.behance.net/gallery/31268855/Determination-Better-Undertale-Font");
    await credits("UT Sans & UT Papyrus fonts by Carter Sande", 1000, "https://gitlab.com/cartr/undertale-fonts");
    await credits("Popping sound effect by wubitog", 1000, "https://opengameart.org/content/3-pop-sounds");
    await credits("Game by HushBugger", 1000, "https://hushbugger.github.io");
    await credits("Typing lessons by Papyrus", 1000);
    await pap("Well! That was weird!", 1000);
    await pap("See you later, human!");
    await space(0);
    await sleep(2000);
    await info("(This is the end. Thank you for playing!)");
}

async function todo() {
    await info("(Check back later.)");
}

// These were going to be easter eggs, but in the end they were too freeform
// to fit nicely with the rest of the game.
var shenanigans = [
    [ifIncludes("thank you"), async function (text) {
        await pap("You're welcome!");
    }],
    [ifIncludes("shout", "loud", "quiet", "soft", "whisper"), async function (text) {
        if (shouldShout) {
            shouldShout = false;
            await pap("Oh! I'm sorry.");
            await pap("Is this better?");
        } else {
            shouldShout = true;
            await pap("Alrighty then! Back to normal!");
        }
    }],
    [ifIncludes("stupid doodoo butt", "legendary fartmaster"),
     async function (text) {
        await sans("* nice try.");
        await pap("Sans! I'm teaching! Get out!!!");
        await sans("* sorry.");
    }],
    [ifSame('help'), async function (text) {
        await todo();
    }],
    [ifSame('credits'), async function (text) {
        async function credits(text, delay = 1000, href = null) {
            await sleep(delay);
            var line = await say(text, [], null, 50);
            if (href !== null) {
                var link = document.createElement('a');
                link.href = href;
                link.target = '_blank';
                line.parentElement.replaceChild(link, line);
                link.appendChild(line);
            }
        }
        pap("Credits? Like money?", 750);
        await credits("CREDITS", 1000);
        credits("UNDERTALE by Toby Fox", 500, "https://undertale.com");
        await pap("What the heck! Who's doing that?", 750);
        await credits("Determination Mono font by Haley Wakamatsu", 250, "https://www.behance.net/gallery/31268855/Determination-Better-Undertale-Font");
        await credits("UT Sans & UT Papyrus fonts by Carter Sande", 500, "https://gitlab.com/cartr/undertale-fonts");
        await credits("Popping sound effect by wubitog", 500, "https://opengameart.org/content/3-pop-sounds");
        await credits("Game by HushBugger", 500, "https://hushbugger.github.io");
        await credits("Typing lessons by Papyrus", 500);
        await pap("Well! That was weird!", 1000);
    }],
    [ifIncludes("i love you"), async function (text) {
        await pap("I love you too!");
        await pap("Platonically.");
    }],
    [ifIncludes("open the door", "let me in", "i need you"), todo],
    [ifSame("flirt", "*flirt", "* flirt"), todo],
    [ifIncludes("where are the knives"), async function (text) {
        announceLeft = true;
        await chara('* Understood.');
    }],
    [ifSame("fight", "*fight", "* fight"), async function (text) {
        await pap("We're not here to fight!");
        await pap("Except metaphorically, with the keyboard.");
        await pap("Show it what you're made of!");
    }],
    [ifSame("act", "*act", "* act"), async function (text) {
        await pap("Are you looking for acting lessons?");
        await pap("Mettaton has been taking on new acting trainees!");
        await pap("In his last production, a novice played bush number 4.");
        await pap("His swaying in the wind was captivating.");
        await pap("What was his name again?");
    }],
    [ifSame("item", "*item", "* item"), todo],
    [ifSame("mercy", "spare", "flee", "*mercy", "*spare", "*flee",
            "* mercy", "* spare", "* flee"), todo],
    [ifSame("check", "*check", "* check"), async function (text) {
        await pap("Check? Don't be silly!");
        await pap("These lessons are free! There won't be a bill.");
    }],
    [ifIncludes("secret"), async function (text) {
        await pap("Secrets???");
        await pap("They wouldn't be secrets if I told you about them, would they?");
    }],
    [ifIncludes("bepis"), async function (text, elem) {
        await pap("Excuse me! You can't say that!");
        await sleep(750);
        elem.innerHTML = elem.innerHTML.replace(/bepis/gi, '<s>&nbsp;$&&nbsp;</s>');
        await pap("There, that's better.");
    }],
    [ifIncludes("minecraft", "minceraft"), async function (text) {
        await pap('"Mince-Raft"...');
        await pap("I have heard of that game!");
        await pap("I bet it's a chilling tale about being stranded at sea, "
                + "always fleeing from having your raft minced by sharks.");
        await pap('A bit like that other one, "Run-Escape".');
    }],
    [ifIncludes("spaghetti"), async function (text) {
        await pap("You know, I think my spaghetti is really improving.");
        await pap("It used to have black bits, but I have mastered a lustrous "
                + "golden brown sheen.");
        await pap("If only I knew how it tasted...");
    }],
    [ifIncludes("skeleton"), todo],
    [ifIncludes("bone"), todo],
    [ifIncludes("junior jumble", "crossword"), todo],
    [ifIncludes("secret ingredient"), todo],
    [ifIncludes("annoying dog"), todo],
    [ifIncludes("deja vu", "d\u00e9j\u00e0 vu"), async function (text) {
        await pap("\"Deja vu\"... Is that the name of a spell?");
        await pap("Are you trying to free me?")
        await pap("Do not worry! I am not stuck in your computer monitor.");
    }],
    [ifIncludes("drop table ", "system(", "rm -rf", "/etc/passwd"),
     async function (text) {
        await pap("...are you trying to 'hack' me?");
        await pap("I'm so sorry! This is the typing course, not the hacking course!");
        await pap("Maybe you should ask Doctor Alphys?");
    }],
    [anyOf(ifIncludes("player.setlevel", "noclip"),
           ifStartsWith("/")), async function (text) {
        await pap("This is about improving your own skill! There are no cheats for that.");
        await pap("Except performance-enhancing substances.");
        await pap("Don't use those!");
    }],
    [ifIncludes("undertale.exe"), todo],
    [ifIncludes("knock knock"), async function (text) {
        await pap("Who's there?");
        var answer = (await getAnswer())[0];
        if (answer) {
            answer = answer[0].toUpperCase() + answer.slice(1);
        }
        answer = answer.trim();
        await pap(answer + " who?");
        await getAnswer();
        await pap("...");
    }],
    [ifIncludes("giasfclfebrehber", "giasfclfubrehber"), todo],
    [ifIncludes("where is kiddo", "where's kiddo", "where is frisk", "where's frisk"), async function (text) {
        await sans("* heh.");
        await sans("* don't yuo mean...");
        await sans("* where is typo?", 1500);
    }],
    // character names
];
