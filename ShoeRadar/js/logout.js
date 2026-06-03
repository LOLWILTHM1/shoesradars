document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        alert("Logged out successfully");

        window.location.href = "login.html";
    });