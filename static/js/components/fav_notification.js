const toastContainer = document.getElementById("toastContainer");

function showToast({

    icon = "🎵",

    title = "",

    message = "",

    duration = 2500

}){

    if(!toastContainer) return;

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>

        <div class="toast-message">
            ${message}
        </div>
    `;

    toastContainer.appendChild(toast);

    toast.style.animation =
        "toastIn .35s ease forwards";

    setTimeout(()=>{

        toast.style.animation =
            "toastOut .3s ease forwards";

        toast.addEventListener(
            "animationend",
            ()=>toast.remove(),
            { once:true }
        );

    },duration);

}

window.showToast = showToast;