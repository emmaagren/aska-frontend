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
        document.querySelector("#admin-panel").hidden = false;
        loadAdminMenu();
        loginForm.reset();

    } catch (error) {
        loginMessage.textContent = "Kunde inte ansluta till servern.";
        console.error(error);
    }
});

async function loadAdminMenu() {
    const menuList = document.querySelector("#admin-menu-list");

    try {
        const response = await fetch("http://localhost:3000/api/menu");

        if (!response.ok) {
            throw new Error("Kunde inte hämta menyn.");
        }

        const menuItems = await response.json();

        menuList.replaceChildren();

        menuItems.forEach((item) => {
            const article = document.createElement("article");

            const heading = document.createElement("h3");
            heading.textContent = item.name;

            const description = document.createElement("p");
            description.textContent = item.description;

            const price = document.createElement("p");
            price.textContent = `${item.price} kr`;

            article.append(heading, description, price);
            menuList.appendChild(article);
        });

    } catch (error) {
        menuList.textContent = "Kunde inte ladda maträtterna.";
        console.error(error);
    }
}

const addMenuForm = document.querySelector("#add-menu-form");
const addMenuMessage = document.querySelector("#add-menu-message");

addMenuForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
        addMenuMessage.textContent = "Du måste logga in först.";
        return;
    }

    const menuItem = {
        name: document.querySelector("#dish-name").value.trim(),
        description: document.querySelector("#dish-description").value.trim(),
        price: Number(document.querySelector("#dish-price").value),
        category: document.querySelector("#dish-category").value
    };

    try {
        const response = await fetch("http://localhost:3000/api/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(menuItem)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Kunde inte lägga till maträtten.");
        }

        addMenuMessage.textContent = "Maträtten har lagts till!";
        addMenuForm.reset();

        // Uppdatera listan utan att ladda om sidan
        await loadAdminMenu();

    } catch (error) {
        addMenuMessage.textContent = error.message;
        console.error(error);
    }
});