const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent = data.error || "Inloggningen misslyckades.";
            return;
        }

        sessionStorage.setItem("adminToken", data.token);
        loginMessage.textContent = "Du är inloggad!";
        loginForm.reset();

    } catch (error) {
        loginMessage.textContent = "Kunde inte ansluta till servern.";
        console.error(error);
    }
});