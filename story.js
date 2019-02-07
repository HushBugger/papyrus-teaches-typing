'use strict';

function intro() {
    pap("Hello, human! It is I, Papyrus!")
    pap("Do not worry! I am not stuck in your computer monitor!")
    pap("I have merely come to teach you how to type!");
    pap("Do you know how to type?");
    info('("yes" or "no")')
    space(5000);
    pap("Oh no! I forgot!");
    pap("Here! Take this textbox!");
    func(createInput);
    canYouType();
}

function canYouType() {
    info("(Do you know how to type?)");
    useAnswer(function (text) {
        switch (affirmative(text)) {
            case true:
                pap("Splendid!")
                break;
            case false:
                pap("Oh dear!");
                break;
            default:
                pap("I didn't quite catch that.");
                canYouType();
        }
    });
}

intro();
