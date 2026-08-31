const closeEqualizerBtn = document.getElementById("closeEqualizer");
const resetEqualizerBtn = document.getElementById("resetEqualizer");
const presetChips = document.querySelectorAll(".preset-chip");
const eqKnobs = document.querySelectorAll(".eq-knob");
const eqToggle = document.getElementById("eqToggle");


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

if(eqToggle){

    eqToggle.addEventListener("click", () => {

        window.eqState.eqEnabled = !window.eqState.eqEnabled;

        refreshEqualizerUI();

        applyEqualizerState();

        if (typeof saveEqualizerSettings === "function") {
            saveEqualizerSettings();
        }

    });

}

presetChips.forEach(chip => {

    chip.addEventListener("click", () => {

        if (chip.disabled || chip.dataset.preset === "custom") return;

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

    window.eqState.activePreset = "custom";

    const indicator = activeKnob.querySelector(".eq-knob-indicator");

    const valueText = activeKnob.querySelector(".eq-knob-value");

    indicator.style.transform =`rotate(${activeState.rotation}deg)`;

    valueText.innerText =
        `${activeState.gain >= 0 ? "+" : ""}${activeState.gain.toFixed(1)} dB`;

    refreshEqualizerUI();

    applyEqualizerState();

    if (typeof saveEqualizerSettings === "function") {
        saveEqualizerSettings();
    }

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

    if (eqToggle) {
        const isEnabled = window.eqState.eqEnabled !== false;
        eqToggle.setAttribute("aria-checked", isEnabled ? "true" : "false");
        eqToggle.classList.toggle("off", !isEnabled);
    }

}

refreshEqualizerUI();