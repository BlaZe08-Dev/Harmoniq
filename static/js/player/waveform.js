let pixiApp;

/* BAR STORAGE */

let waveBars = [];
const blurFilter =
    new PIXI.BlurFilter();

blurFilter.blur = 20;

blurFilter.quality = 4;

/* PIXI WAVE ENGINE */

const waveformContainer = document.getElementById("waveformContainer");

async function initPixi(){

    pixiApp = new PIXI.Application();

    await pixiApp.init({

        resizeTo:
            waveformContainer,

        backgroundAlpha: 0,

        antialias: true,

        resolution:
            window.devicePixelRatio || 1
    });

    waveformContainer.appendChild(
        pixiApp.canvas
    );
    pixiApp.stage.addChild(waveGroup);

    pixiApp.stage.addChild(playhead);
    pixiApp.ticker.add(()=>{renderWaveform();});
}

initPixi();

/* MAIN WAVE CONTAINER */

const waveGroup = new PIXI.Container();

/* PLAYHEAD */

const playhead = new PIXI.Graphics();

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

/* GENERATE WAVEFORM */

async function generateWaveform(url){

    if(!waveformContainer) return;

    const response =
        await fetch(url);
    if(!response.ok){
        console.error(
            "Waveform fetch failed"
        );
        return;
    }

    const arrayBuffer =
        await response.arrayBuffer();


    const audioBuffer =
        await audioContext.decodeAudioData(
            arrayBuffer
        );

    const rawData =
        audioBuffer.getChannelData(0);

    const samples = 700;

    const blockSize =
        Math.floor(
            rawData.length / samples
        );
    
    const filteredData = [];

    for(let i = 0; i < samples; i++){
        const blockStart =i * blockSize;
        
        let min = 1;
        let max = -1;

        for(let j = 0; j < blockSize; j++){

            const sample =
                rawData[
                    blockStart + j
                ];

            if(sample < min)
                min = sample;

            if(sample > max)
                max = sample;
            }
            
            const peak = max - min;
            
            filteredData.push(peak);
        }
        
        /* NORMALIZE */

        const maxValue = Math.max(...filteredData);

        for(let i = 0; i < filteredData.length; i++){
            filteredData[i] =filteredData[i] / maxValue;
        }

        window.currentWaveform = filteredData;

        buildWaveformWorld(filteredData);
        console.log(filteredData.length);

        window.animatedWaveform = [...filteredData];
}

let isWaveDragging = false;
let playheadOpacity = 0;

/* PIXI WAVEFORM RENDER */

function renderWaveform(){

    if(
        !window.currentWaveform
    ) return;

    if(
        !audio.duration ||
        !isFinite(audio.duration)
    ) return;

    const width =
        waveformContainer.clientWidth;

    const height =
        waveformContainer.clientHeight;

    const progress =
        audio.currentTime /
        audio.duration;

    const spacing = 5;

    const currentBar = progress * window.currentWaveform.length;
    
    const centerX = width / 2;

    /* CENTER SCROLL */

    waveGroup.x = centerX - (currentBar * spacing);

    waveGroup.y = 0;

    const { r, g, b } =
        window.harmonicColor ||
        {
            r:255,
            g:255,
            b:255
        };

    /* PLAYHEAD */

    playhead.clear();

    playhead.beginFill(0xffffff, 1);

    playhead.drawRoundedRect(
        centerX - 1,
        18,
        2,
        height - 36,
        999
    );

    playhead.endFill();

    if(isWaveDragging){
        playheadOpacity +=
            (1-playheadOpacity)*0.15;

    }
    else{
        playheadOpacity +=
            (0-playheadOpacity)*0.08;
        }

    playhead.alpha = playheadOpacity;

    /* BAR PHYSICS ENGINE */

    for(let i = 0; i < waveBars.length; i++){

        const bar = waveBars[i];
        
        const barX = waveGroup.x + bar.x;

        const distance = Math.abs(centerX - barX);

        const normalized = Math.min(1, distance / centerX);

        const played = barX < centerX;

        /* CENTER FOCUS */

        const curve = 1 - Math.pow(normalized, 1.8);

        /* ALPHA */

        if(played){

            bar.alpha = 0.18 + curve * 0.25;

        }else{

            bar.alpha = 0.45 + curve * 0.45;
        }

        const { r, g, b } =
            window.harmonicColor ||
            {
                r:255,
                g:255,
                b:255
            };

        /* PLAYED COLOR */

        let tint;

        if(played){

            tint =
                PIXI.Color.shared
                .setValue([
                    r * 0.35,
                    g * 0.35,
                    b * 0.35
                ])
                .toNumber();

        }else{

            tint =
                PIXI.Color.shared
                .setValue([
                    r,
                    g,
                    b
                ])
                .toNumber();
        }

        bar.tint = tint;
    }

    console.log(audio.currentTime, waveGroup.x);
    
}

/* WAVEFORM BUILDER */

function buildWaveformWorld(data){

    waveGroup.removeChildren();

    waveBars = [];

    const height = waveformContainer.clientHeight;

    const centerY = height * 0.5;

    const spacing = 5;

    const { r, g, b } =

        window.harmonicColor ||

        {
            r:255,
            g:255,
            b:255
        };

    const boostedR = Math.min(255, r * 1.4);
    const boostedG = Math.min(255, g * 1.4);
    const boostedB = Math.min(255, b * 1.4);

    const color = (boostedR << 16) + (boostedG << 8) + boostedB;

    for(let i = 0; i < data.length; i++){

        const value = data[i];

        const bar = new PIXI.Graphics();


        const dynamicHeight = Math.max(12, value * height * 1.15);

        const x = i * spacing;

        const y = centerY;

        bar.beginFill(color, 1);

        bar.drawRoundedRect( 0, 0, 5, dynamicHeight, 999);

        bar.x = x;

        bar.y = centerY - dynamicHeight / 2;

        bar.pivot.set(0, 0);

        bar.endFill();

        waveGroup.addChild(bar);
        // bar.filters = [blurFilter];

        waveBars.push(bar);
    }

    console.log("Bars:", waveBars.length);
}

/* PLAYHEAD RENDER */

function renderPlayhead(){

    playhead.clear();

    playhead.beginFill(0xffffff, 1);

    playhead.drawRoundedRect(

        waveformContainer.clientWidth / 2,

        15,

        2,

        waveformContainer.clientHeight - 30,

        999
    );

    playhead.endFill();
}