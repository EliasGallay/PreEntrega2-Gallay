document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");

});
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");
    fetch("./header.html")
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        })
        .catch(error => console.error("Error cargando el header:", error));
});


document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer-container");
    fetch("./footer.html")
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(error => console.error("Error cargando el footer:", error));
});
