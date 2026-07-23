/*
 * Harmoniq
 * Bootstrap Module
 * Initializes the application after all modules are loaded.
 */

window.addEventListener("load", () => {

    loadRecommendations();

    renderPlaylists();

    renderRecentlyPlayed();

    animateEqualizer();

    // LOADER
    setTimeout(() => {

        const loader =
            document.getElementById("loader");

        if (loader) {

            loader.classList.add("hide");
        }

    }, 1800);
});