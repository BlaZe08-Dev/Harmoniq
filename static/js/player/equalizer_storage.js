/* EQUALIZER STORAGE */

const EQ_STORAGE_KEY = "harmoniq_equalizer_settings";

function saveEqualizerSettings() {
    if (!window.eqState) return;
    try {
        const dataToSave = {
            bass: window.eqState.bass.gain,
            mid: window.eqState.mid.gain,
            treble: window.eqState.treble.gain,
            activePreset: window.eqState.activePreset,
            eqEnabled: window.eqState.eqEnabled
        };
        localStorage.setItem(EQ_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
        console.error("Failed to save equalizer settings to localStorage:", e);
    }
}

function loadEqualizerSettings() {
    if (!window.eqState) return;

    let saved = null;
    try {
        const raw = localStorage.getItem(EQ_STORAGE_KEY);
        if (raw) {
            saved = JSON.parse(raw);
        }
    } catch (e) {
        console.error("Failed to parse equalizer settings from localStorage:", e);
    }

    const bassGain = (saved && typeof saved.bass === "number") ? saved.bass : 0;
    const midGain = (saved && typeof saved.mid === "number") ? saved.mid : 0;
    const trebleGain = (saved && typeof saved.treble === "number") ? saved.treble : 0;
    const activePreset = (saved && typeof saved.activePreset === "string") ? saved.activePreset : "flat";
    const eqEnabled = (saved && typeof saved.eqEnabled === "boolean") ? saved.eqEnabled : true;

    window.eqState.bass.gain = bassGain;
    window.eqState.bass.rotation = bassGain * 11;

    window.eqState.mid.gain = midGain;
    window.eqState.mid.rotation = midGain * 11;

    window.eqState.treble.gain = trebleGain;
    window.eqState.treble.rotation = trebleGain * 11;

    window.eqState.activePreset = activePreset;
    window.eqState.eqEnabled = eqEnabled;

    if (typeof applyEqualizerState === "function") {
        applyEqualizerState();
    }

    if (typeof refreshEqualizerUI === "function") {
        refreshEqualizerUI();
    }
}

loadEqualizerSettings();
