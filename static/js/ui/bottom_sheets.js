const bottomSheetOverlay =
    document.getElementById("bottomSheetOverlay");

const bottomSheetTitle =
    document.getElementById("bottomSheetTitle");

const bottomSheetContent =
    document.getElementById("bottomSheetContent");

function openBottomSheet({

    title = "",

    content = ""

}){

    bottomSheetTitle.textContent = title;

    if(typeof content === "string"){

        bottomSheetContent.innerHTML = content;

    }else{

        bottomSheetContent.innerHTML = "";

        bottomSheetContent.appendChild(content);

    }

    bottomSheetOverlay.classList.remove("hidden");

}

function closeBottomSheet(){

    const sheet =
        document.getElementById("bottomSheet");

    sheet.style.transform =
        "translateY(100%)";

    bottomSheetOverlay.style.opacity = "0";

    setTimeout(()=>{

        bottomSheetOverlay.classList.add("hidden");

        sheet.style.transform = "";

        bottomSheetOverlay.style.opacity = "";

    },350);

}

window.openBottomSheet = openBottomSheet;

window.closeBottomSheet = closeBottomSheet;

bottomSheetOverlay.addEventListener("click",(e)=>{

    if(e.target === bottomSheetOverlay){

        closeBottomSheet();

    }

});
