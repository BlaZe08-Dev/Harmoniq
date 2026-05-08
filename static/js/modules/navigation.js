/* SIDEBAR */
const sidebar = document.getElementById("sidebar");
const trigger = document.getElementById("sidebarTrigger");

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileOverlay = document.getElementById("mobileOverlay");

/* DESKTOP SIDEBAR */
if (window.innerWidth > 768 && trigger && sidebar) {

    trigger.addEventListener("mouseenter", () => {
        sidebar.classList.add("active");
        document.body.classList.add("sidebar-open");
    });

    sidebar.addEventListener("mouseleave", () => {
        sidebar.classList.remove("active");
        document.body.classList.remove("sidebar-open");
    });
}

/* MOBILE SIDEBAR */
if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener("click", () => {

        sidebar.classList.add("active");

        mobileOverlay.classList.add("active");

        document.body.classList.add("sidebar-open");
    });
}

/* CLOSE ON OVERLAY CLICK */
if (mobileOverlay) {

    mobileOverlay.addEventListener("click", () => {

        sidebar.classList.remove("active");

        mobileOverlay.classList.remove("active");

        document.body.classList.remove("sidebar-open");
    });
}

/* NAV */
function closeSidebar() {

    sidebar.classList.remove("active");

    document.body.classList.remove("sidebar-open");

    if (mobileOverlay) {
        mobileOverlay.classList.remove("active");
    }
}

function showHome() {
    document.getElementById("homePage").style.display = "";
    document.getElementById("queuePage").style.display = "none";
    document.getElementById("playlistPage").style.display = "none";
    closeSidebar();
}

function showQueue() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("queuePage").style.display = "block";
    document.getElementById("playlistPage").style.display = "none";
    closeSidebar();
}