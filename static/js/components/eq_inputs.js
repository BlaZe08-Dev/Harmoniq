let activeBand = null;

let pointerStartX = 0;

let rotationStart = 0;

const DRAG_SENSITIVITY = 1;

document
    .querySelectorAll(".eq-knob-wheel")
    .forEach(wheel=>{

        wheel.addEventListener(

            "pointerdown",

            startDrag

        );

    });

window.addEventListener(

    "pointermove",

    dragKnob

);

window.addEventListener(

    "pointerup",

    endDrag

);

function startDrag(e){

    const knob =

        e.currentTarget.closest(".eq-knob");

    activeBand =
        knob.dataset.band;

    pointerStartX = e.clientX;

    rotationStart =
        eqKnobs.states[activeBand].rotation;

}

function dragKnob(e){

    if(!activeBand) return;

    const delta =

        (e.clientX - pointerStartX)

        *

        DRAG_SENSITIVITY;

    eqKnobs.setKnobRotation(

        activeBand,

        rotationStart + delta

    );

}

function endDrag(){

    activeBand = null;

}