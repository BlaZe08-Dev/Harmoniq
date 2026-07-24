const closeEqualizerBtn = document.getElementById("closeEqualizer");
const resetEqualizerBtn = document.getElementById("resetEqualizer");
const presetChips = document.querySelectorAll(".preset-chip");
const eqKnobs = document.querySelectorAll(".eq-knob");


let activeKnob = null;
let activeState = null;
let lastPointerX = 0;

if(closeEqualizerBtn){

    closeEqualizerBtn.addEventListener("click",()=>{

        closeEqualizer();
        
    });

}

if(resetEqualizerBtn){

    resetEqualizerBtn.addEventListener("click", () => {

        applyPreset("flat");

    });

}

presetChips.forEach(chip => {

    chip.addEventListener("click", () => {

        applyPreset(chip.dataset.preset);

    });

});

function setupEqualizerKnobs(){
    eqKnobs.forEach(knob => {
        const band = knob.dataset.band;
        
        const indicator = knob.querySelector(".eq-knob-indicator");
        
        const valueText = knob.querySelector(".eq-knob-value");

        const state = window.eqState[band];

        function updateKnob(){
            
            indicator.style.transform = `rotate(${state.rotation}deg)`;
            
            valueText.innerText = `${state.gain >= 0 ? "+" : ""}${state.gain.toFixed(1)} dB`;
        }
        
        updateKnob();

        let isEqDragging = false;

        knob.addEventListener("pointerdown", (e) => {

            activeKnob = knob;

            activeState = state;

            lastPointerX = e.clientX;

            knob.setPointerCapture(e.pointerId);

        });
        
    });

}
setupEqualizerKnobs();

document.addEventListener("pointermove", (e) => {

    if (!activeKnob) return;

    const deltaX = e.clientX - lastPointerX;

    lastPointerX = e.clientX;

    activeState.gain += deltaX * 0.15;

    activeState.gain = Math.max(-12, Math.min(12, activeState.gain));

    activeState.rotation = activeState.gain * 11;

    const indicator = activeKnob.querySelector(".eq-knob-indicator");

    const valueText = activeKnob.querySelector(".eq-knob-value");

    indicator.style.transform =`rotate(${activeState.rotation}deg)`;

    valueText.innerText =
        `${activeState.gain >= 0 ? "+" : ""}${activeState.gain.toFixed(1)} dB`;

    applyEqualizerState();

});

document.addEventListener("pointerup", () => {

    activeKnob = null;

    activeState = null;

});

function refreshEqualizerUI(){

    eqKnobs.forEach(knob=>{

        const band = knob.dataset.band;

        const state = window.eqState[band];

        const indicator =
            knob.querySelector(".eq-knob-indicator");

        const value =
            knob.querySelector(".eq-knob-value");

        indicator.style.transform =
            `rotate(${state.rotation}deg)`;

        value.innerText =
            `${state.gain >= 0 ? "+" : ""}${state.gain.toFixed(1)} dB`;

    });
    presetChips.forEach(chip => {

        chip.classList.toggle(
            "active", chip.dataset.preset === window.eqState.activePreset
        );

    });

}