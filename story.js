'use strict';

var announceLeft = false;

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
    info('* ("yes" or "no")');
    space(2000);
    pap("Oh no! I forgot!");
    pap("Here, take this textbox!");
    schedule(750, function () {
        sounds.pop.play();
        createInput();
    });
    canYouType();
}

function canYouType() {
    info("* (Do you know how to type?)");
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

function exerciseLoop(challenge, goal, after = null, num = 1) {
    var done = false;
    if (num === 1) {
        pap("Type this:");
        pap(challenge);
    }
    if (announceLeft) {
        chara("* " + (goal - num + 1) + " left.", 250);
    }
    handleAnswerWith(
        [
            [ifSame(challenge), function (text) {
                if (num >= goal) {
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
                after();
            } else {
                exerciseLoop(challenge, goal, after, num);
            }
        }
    );
}

function startCourse() {
    pap("Let's begin.");
    pap("To type really fast, put your left index finger on the 'F' key, "
        + "and your right index finger on the 'J' key.");
    pap("Try to remember where the keys are. No peeking!");
    firstExercise();
}

function firstExercise() {
    exerciseLoop('dfdfdf', 4, function () {
        pap("Wow!!!");
        pap("You're a great typist! Well done!");
        pap("...that must mean I'm a great teacher!");
        secondExercise();
    })
}

function secondExercise() {
    pap("Here comes the first useful phrase!");
    pap("Doctor Alphys uses it a lot.");
    pap("She tells me it stands for 'just kidding'.");
    exerciseLoop('jk', 5, function () {
        pap("Fantastic!");
        pap("Now you can write UnderNet postings in record time!");
        pap("Let's take a break. Tell me if you need anything!");
        breakTime();
    })
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

function todo() {
    info("* (Check back later.)");
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
        sans("* nice try.");
        pap("Sans! I'm teaching! Get out!!!");
        sans("* sorry.");
    }],
    [ifSame('help'), function (text) {
        todo();
    }],
    [ifSame('credits'), function (text) {
        function credits(text, delay = 1000, pauseEvents = true, href = null) {
            schedule(delay, function () {
                var line = say(text, [], null, pauseEvents, 100);
                if (href !== null) {
                    var link = document.createElement('a');
                    link.href = href;
                    link.target = '_blank';
                    line.parentElement.replaceChild(link, line);
                    link.appendChild(line);
                }
            })
        }
        pap("Credits? Like money?", 750, false);
        credits("CREDITS", 1000);
        credits("UNDERTALE by Toby Fox", 1000, false, "https://undertale.com");
        pap("What the heck! Who's doing that?", 1000, false);
        credits("Determination Mono font by Haley Wakamatsu", 2000, true, "https://www.behance.net/gallery/31268855/Determination-Better-Undertale-Font");
        credits("UT Sans & UT Papyrus fonts by Carter Sande", 1000, true, "https://gitlab.com/cartr/undertale-fonts");
        credits("Popping sound effect by wubitog", 1000, true, "https://opengameart.org/content/3-pop-sounds");
        credits("Game by HushBugger", 1000, true, "https://hushbugger.github.io");
        credits("Typing lessons by Papyrus", 1000, true, document.location);
        pap("Well! That was weird!", 1500);
    }],
    [ifIncludes('i love you'), function (text) {
        pap("I love you too!");
        pap("Platonically.");
    }],
    [ifIncludes('where are the knives'), function (text) {
        announceLeft = true;
        chara('* Understood.');
    }],
    [ifSame('fight', 'act', 'item', 'mercy'), function (text) {
        todo();
    }],
    [ifIncludes('drop table ', 'system(', 'rm -rf', '/etc/passwd'), function (text) {
        pap("...are you trying to 'hack' me?");
        pap("I'm so sorry! This is the typing course!");
        pap("Maybe you should ask Doctor Alphys?");
    }]
];

function handleAnswerWith(handlers, fallback = null, finisher = null) {
    schedule(0, function () {
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
    });
}
