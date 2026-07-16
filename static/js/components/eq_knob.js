const knobs = document.querySelectorAll(".eq-knob");

/* LIMITS */

const MIN_ROTATION = -135;
const MAX_ROTATION = 135;

const MIN_DB = -12;
const MAX_DB = 12;

/* KNOB STATE */

const knobStates = {

    bass: {

        value: 0,
        rotation: 0,
        filter: null

    },

    mid: {

        value: 0,
        rotation: 0,
        filter: null

    },

    treble: {

        value: 0,
        rotation: 0,
        filter: null

    }

};

const knobElements = {};

/* HELPERS */

function clamp(value, min, max){

    return Math.min(

        Math.max(value, min),

        max

    );

}


function rotationToDb(rotation){

    return Math.round(

        ((rotation - MIN_ROTATION) /

        (MAX_ROTATION - MIN_ROTATION))

        *

        (MAX_DB - MIN_DB)

        +

        MIN_DB

    );

}

function setKnobRotation(band, rotation){

    const state = knobStates[band];

    state.rotation = clamp(

        rotation,

        MIN_ROTATION,

        MAX_ROTATION

    );

    state.value = rotationToDb(
        state.rotation
    );

    const elements = knobElements[band];

    elements.wheel.style.transform =
        `rotate(${state.rotation}deg)`;

    elements.valueText.textContent =
        `${state.value > 0 ? "+" : ""}${state.value} dB`;

}

/* INITIALIZE */

knobs.forEach(knob => {

    const band =

        knob.dataset.band;

    const state =

        knobStates[band];

    const wheel =

        knob.querySelector(".eq-knob-wheel");

    const valueText =

        knob.querySelector(".eq-knob-value");
    
    knobElements[band] = {

        wheel,

        valueText

    };
    

    knob.addEventListener("click", () => {


        knobs.forEach(k =>

            k.classList.remove("active")

        );

        knob.classList.add("active");

        knobElements[band] = {

            wheel,

            valueText
        };

    });

});

window.eqKnobs = {

    states: knobStates,

    setKnobRotation

};