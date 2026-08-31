/* WEB AUDIO ENGINE */

let equalizerContext = null;
let mediaSource = null;

let bassFilter = null;
let midFilter = null;
let trebleFilter = null;

let analyser = null;

let equalizerInitialized = false;

function initializeEqualizer(){

    if(equalizerInitialized) return;

    if(!audio) return;

    equalizerContext = new (window.AudioContext || window.webkitAudioContext)();

    if(equalizerContext.state === "suspended"){
        equalizerContext.resume().catch(console.error);
    }

    mediaSource = equalizerContext.createMediaElementSource(audio);

    /* BASS FILTER */
    bassFilter = equalizerContext.createBiquadFilter();

    bassFilter.type = "lowshelf";

    bassFilter.frequency.value = 200;

    /* MID FILTER */

    midFilter = equalizerContext.createBiquadFilter();

    midFilter.type = "peaking";

    midFilter.frequency.value = 1000;

    midFilter.Q.value = 1;

    /* TREBLE FILTER */

    trebleFilter = equalizerContext.createBiquadFilter();

    trebleFilter.type = "highshelf";

    trebleFilter.frequency.value = 3000;

    /* ANALYSER */

    analyser = equalizerContext.createAnalyser();

    analyser.fftSize = 256;

    window.equalizerAnalyser = analyser;

    mediaSource.connect(bassFilter);

    bassFilter.connect(midFilter);

    midFilter.connect(trebleFilter);

    trebleFilter.connect(analyser);

    analyser.connect(equalizerContext.destination);

    equalizerInitialized = true;
}

/* EQUALIZER STATE */
function applyEqualizerState(){

    const enabled = window.eqState && window.eqState.eqEnabled !== false;

    if (bassFilter)
        bassFilter.gain.value = enabled ? window.eqState.bass.gain : 0;

    if (midFilter)
        midFilter.gain.value = enabled ? window.eqState.mid.gain : 0;

    if (trebleFilter)
        trebleFilter.gain.value = enabled ? window.eqState.treble.gain : 0;

}