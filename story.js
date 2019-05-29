'use strict';

var announceLeft = false;

async function begin() {
    document.body.removeChild(
        document.getElementById('begin')
    );

    if (!localStorage.getItem('completedIntro')) {
        await intro();
    } else {
        await pap("Welcome back!");
        createInput();
        await startCourse();
    }
}

async function intro() {
    await paps([
        "Hello, human! It is I, Papyrus!",
        "Do not worry! I am not stuck in your computer monitor.",
        "I have merely come here to teach you how to type!",
        "Do you know how to type?",
    ]);
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
                ...shenanigans
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
                    if (num < goal) {
                        await pap("Yeah" + '!'.repeat(num));
                    }
                    if (num === 1) {
                        await pap("Do it again!");
                    }
                    num++;
                }],
                ...shenanigans
            ],
            async function madeMistake(text) {
                await pap("Oh no! You made a mistake!");
                await pap("That's okay! Try again!");
                await pap("Type this:");
                await pap(challenge);
            }
        )
    }
}

async function startCourse() {
    await pap("Let's begin.");
    // pap("To type really fast, put your left index finger on the 'F' key, "
    //     + "and your right index finger on the 'J' key.");
    // pap("Try to remember where the keys are. No peeking!");
    await pap("Type this:");
    await pap('dfdfdf');
    await firstExercise();
}

async function firstExercise() {
    await exerciseLoop('dfdfdf', 4);
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
    await pap('jk');
    await exerciseLoop('jk', 5);
    await pap("Fantastic!");
    await pap("Now you can write UnderNet postings in record time!");
    await pap("Let's take a break. Tell me if you need anything!");
    await breakTime();
}

async function breakTime() {
    while (1) {
        await handleAnswerWith(shenanigans);
        // todo: people are going to try to end the break
    }
}

async function todo() {
    await info("(Check back later.)");
}

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
        await credits("Typing lessons by Papyrus", 500, document.location);
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
