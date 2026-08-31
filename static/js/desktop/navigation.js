/* DESKTOP SIDEBAR — hover to open/close */
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
