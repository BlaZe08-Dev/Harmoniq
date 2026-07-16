const closeEqualizerBtn = document.getElementById("closeEqualizer");
const presetChips = document.querySelectorAll(".preset-chip");


if(closeEqualizerBtn){

    closeEqualizerBtn.addEventListener("click",()=>{

        closeEqualizer();
        
    });

}

presetChips.forEach(chip => {

    chip.addEventListener("click", () => {

        presetChips.forEach(c =>
            c.classList.remove("active")
        );

        chip.classList.add("active");

    });

});