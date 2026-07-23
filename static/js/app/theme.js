/* DOMINANT COLOR */
function getDominantColor(imgUrl, callback) {

    let img = new Image();

    img.crossOrigin = "Anonymous";

    img.onload = function () {

        let canvas = document.getElementById("colorCanvas");

        if (!canvas) return;

        let ctx = canvas.getContext("2d", { willReadFrequently: true });

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        let data = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;

        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 40) {

            r += data[i];
            g += data[i + 1];
            b += data[i + 2];

            count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        if (callback) {
            callback(`rgb(${r},${g},${b})`);
        }
    };

    img.src = imgUrl;
}

function applySongTheme(song) {
    
    /* DYNAMIC THEME ENGINE */
    getDominantColor(song?.thumbnail, (color) => {

        let rgb = color.match(/\d+/g);
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);

        window.harmonicColor = {r, g, b};

        // 🎨 Convert to pastel (soft color)
        let pastelR = Math.floor((r + 255) / 2);
        let pastelG = Math.floor((g + 255) / 2);
        let pastelB = Math.floor((b + 255) / 2);

        let pastelSoft = `rgba(${pastelR},${pastelG},${pastelB},0.35)`;

        // 🎵 PLAYER BAR (FINAL FIX)
        const playerBar = document.querySelector(".player-bar");
        /* MOBILE PLAYERS */

        const mobileExpandedPlayer = document.getElementById("mobileExpandedPlayer");

        const mobileCompactPlayer = document.getElementById("mobileCompactPlayer");

        const waveProgress =document.querySelector(".wave-progress-fill");
        
        /* FULLSCREEN ELEMENTS */

        const fullscreenPlayer =
            document.querySelector(
                ".fullscreen-player"
            );

        const fsThumbnail =
            document.getElementById(
                "fsThumbnail"
            );

        const fsPlayBtn =
            document.getElementById(
                "fsPlayBtn"
            );

        const fsProgress =
            document.getElementById(
                "fsProgress"
            );

        playerBar.style.background = `
            linear-gradient(
                90deg,
                ${pastelSoft},
                rgba(255,255,255,0.05)
            )
        `;

        playerBar.style.boxShadow = `
            0 -6px 30px ${pastelSoft},
            0 -2px 10px rgba(255,255,255,0.05)
        `;

        // 🌌 GLOBAL BACKGROUND (FIXED — now defined)
        let c1 = `rgba(${r},${g},${b},0.35)`;
        let c2 = `rgba(${Math.min(255,r+60)},${Math.min(255,g+40)},${Math.min(255,b+60)},0.25)`;
        let c3 = `rgba(${Math.max(0,r-40)},${Math.max(0,g-40)},${Math.max(0,b-40)},0.4)`;

        appBg.style.background = `
        radial-gradient(circle at 20% 20%, ${c1}, transparent 35%),
        radial-gradient(circle at 80% 30%, ${c2}, transparent 40%),
        radial-gradient(circle at 50% 80%, ${c3}, transparent 45%),
        radial-gradient(circle at center, rgba(0,0,0,0.92) 65%)
        `;

        /* EXTRA AMBIENT GLOW */
        appBg.style.boxShadow = `
            inset 0 0 120px ${c1},
            inset 0 0 180px ${c2},
            inset 0 0 220px ${c3}
        `;

        // 🎧 FULLSCREEN BG
        fsBg.style.background = `
            radial-gradient(circle at top, ${c2}, #000 75%)
        `;

        /* MOBILE EXPANDED PLAYER */

        if(mobileExpandedPlayer){

            mobileExpandedPlayer.style.background = `
                linear-gradient(
                    135deg,
                    ${pastelSoft},
                    rgba(18,18,18,0.82)
                )
            `;

            mobileExpandedPlayer.style.boxShadow = `
                0 0 25px ${pastelSoft}
            `;
        }


        /* MOBILE COMPACT PLAYER */

        if(mobileCompactPlayer){

            mobileCompactPlayer.style.background = `
                linear-gradient(
                    135deg,
                    ${pastelSoft},
                    rgba(18,18,18,0.82)
                )
            `;

            mobileCompactPlayer.style.boxShadow = `
                0 0 20px ${pastelSoft}
            `;
        }


        /* WAVE GLOW */

        if(waveProgress){

            waveProgress.style.boxShadow = `
                0 0 12px ${pastelSoft},
                0 0 22px ${pastelSoft}
            `;
        }

        /* FULLSCREEN CINEMATIC ATMOSPHERE */

        if(fullscreenPlayer){

            fullscreenPlayer.style.background = `
                radial-gradient(
                    circle at top,
                    ${c2},
                    transparent 35%
                ),

                linear-gradient(
                    180deg,
                    rgba(8,8,8,0.96),
                    rgba(0,0,0,1)
                )
            `;
        }


        /* FULLSCREEN ARTWORK GLOW */

        if(fsThumbnail){

            fsThumbnail.style.boxShadow = `
                0 20px 60px rgba(0,0,0,0.45),

                0 0 45px ${pastelSoft},

                0 0 120px ${c2}
            `;
        }


        /* PLAY BUTTON GLOW */

        if(fsPlayBtn){

            fsPlayBtn.style.boxShadow = `
                0 8px 30px ${pastelSoft},

                inset 0 1px 1px rgba(255,255,255,0.10)
            `;
        }


        /* PROGRESS GLOW */

        if(fsProgress){

            fsProgress.style.boxShadow = `
                0 0 18px ${pastelSoft}
            `;
        }
        
    });
}