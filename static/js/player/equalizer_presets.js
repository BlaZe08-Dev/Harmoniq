/* EQUALIZER PRESETS */

const equalizerPresets = {

    flat: {
        bass: 0,
        mid: 0,
        treble: 0
    },

    "bass-boost": {
        bass: 6,
        mid: 2,
        treble: 3
    },

    vocal: {
        bass: -2,
        mid: 5,
        treble: 2
    },

    rock: {
        bass: 4,
        mid: -1,
        treble: 5
    },

    jazz: {
        bass: 3,
        mid: 2,
        treble: 4
    },

    classical: {
        bass: -1,
        mid: 3,
        treble: 5
    }

};

function applyPreset(presetName){

    const preset = equalizerPresets[presetName];

    if(!preset) return;

    window.eqState.bass.gain = preset.bass;
    window.eqState.mid.gain = preset.mid;
    window.eqState.treble.gain = preset.treble;

    window.eqState.bass.rotation = preset.bass * 11;
    window.eqState.mid.rotation = preset.mid * 11;
    window.eqState.treble.rotation = preset.treble * 11;

    window.eqState.activePreset = presetName;

    applyEqualizerState();

    refreshEqualizerUI();

}