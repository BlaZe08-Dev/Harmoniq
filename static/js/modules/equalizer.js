const closeEqualizerBtn =
    document.getElementById("closeEqualizer");
console.log(closeEqualizerBtn);

if(closeEqualizerBtn){

    closeEqualizerBtn.addEventListener("click",()=>{
        console.log("Back clicked");
        
        closeEqualizer();
    });

}