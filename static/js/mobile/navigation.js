/* MOBILE SIDEBAR — tap to open */
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        mobileOverlay.classList.add("active");
        document.body.classList.add("sidebar-open");
    });
}
