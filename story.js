'use strict';

function begin() {
    if (!localStorage.getItem('completedIntro')) {
        intro();
    } else {
        pap("Welcome back!");
        createInput();
        startCourse();
    }

    document.body.removeChild(
        document.getElementById('begin')
    );

    setTimeout(proceed, 1000);
}

function intro() {
    pap("Hello, human! It is I, Papyrus!");
    pap("Do not worry! I am not stuck in your computer monitor.");
    pap("I have merely come here to teach you how to type!");
    pap("Do you know how to type?");
    info('("yes" or "no")');
    space(2000);
    pap("Oh no! I forgot!");
    pap("Here, take this textbox!");
    func(function () {
        sounds.pop.play();
        createInput();
    });
    canYouType();
}

function canYouType() {
    info("(Do you know how to type?)");
    var done = false;
    handleAnswerWith(
        [
            [ifStartsWith('ye'), function (text) {
                pap("Splendid!");
                pap("I assume you're here for a refresher, then!");
                localStorage.setItem('completedIntro', 'true');
                done = true;
            }],
            [ifStartsWith('no'), function (text) {
                pap("Oh dear!");
                pap("Well, you came to the right place!");
                localStorage.setItem('completedIntro', 'true');
                done = true;
            }],
            ...shenanigans
        ],
        null,
        function (text) {
            if (done) {
                startCourse();
            } else {
                canYouType();
            }
        }
    );
}

function exerciseLoop(challenge = 'dfdfdfdf', num = 1) {
    var done = false;
    handleAnswerWith(
        [
            [ifSame(challenge), function (text) {
                if (num > 5) {
                    pap("Wow!!!");
                    pap("You're a great typist!");
                    pap("...that must mean I'm a great teacher!");
                    pap("Time for a break!");
                    done = true;
                    return;
                }
                pap("Yeah" + '!'.repeat(num));
                if (num === 1) {
                    pap("Do it again!");
                }
                num++;
            }],
            ...shenanigans
        ],
        function (text) {
            pap("Oh no! You made a mistake!");
            pap("That's okay! Try again!");
            pap("Type this:");
            pap(challenge);
        },
        function (text) {
            if (done) {
                breakTime();
                pap("Tell me if you need anything.");
            } else {
                exerciseLoop(challenge, num);
            }
        }
    );
}

function startCourse() {
    pap("Let's begin.");
    pap("To type at truly dazzling speeds, you should put your right index "
        + "finger on the 'J' key, and your left index finger on the 'F' key.");
    pap("Try to remember where the keys are. No peeking!");
    pap("Type this:");
    var challenge = 'dfdfdfdf';
    pap(challenge);
    exerciseLoop(challenge, 1);
}

function breakTime() {
    handleAnswerWith(shenanigans, null, breakTime);
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

var shenanigans = [
    [ifIncludes("thank you"), function (text) {
        pap("You're welcome!");
    }],
    [ifIncludes("shout", "loud", "quiet"), function (text) {
        if (shouldShout) {
            shouldShout = false;
            pap("Oh! I'm sorry.");
            pap("Is this better?");
        } else {
            shouldShout = true;
            pap("Alrighty then! Back to normal!");
        }
    }],
    [ifIncludes("stupid doodoo butt", "legendary fartmaster"), function (text) {
        sans("nice try.");
        pap("Sans! I'm teaching! Get out!!!");
        sans("sorry.");
    }],
    [ifSame('credits'), function (text) {
        function sayCredits(text, delay = 1000, pauseEvents = true) {
            schedule(delay, say, text, [], null, pauseEvents, 100);
        }
        // todo: include links
        pap("Credits? Like money?", 750, false);
        sayCredits("CREDITS", 1000, false);
        pap("What the heck! Who's doing that?", 1000, false);
        sayCredits("UNDERTALE by Toby Fox", 1000);
        sayCredits("Determination Mono by Haley Wakamatsu");
        sayCredits("UT Sans & UT Papyrus by Carter Sande");
        sayCredits("Popping sound effect by wubitog");
        sayCredits("Typing lessons by Papyrus");
        pap("Well! That was weird!", 1500);
    }],
];

function handleAnswerWith(handlers, fallback = null, finisher = null) {
    func(function () {
        answerHandler = function (text) {
            try {
                for (var handler of handlers) {
                    if (handler[0](text.toLowerCase())) {
                        handler[1](text);
                        return;
                    }
                }
                if (fallback !== null) {
                    fallback(text);
                } else {
                    pap("I didn't quite catch that.");
                }
            } finally {
                if (finisher !== null) {
                    finisher(text);
                }
            }
        };
    }, 0);
}
