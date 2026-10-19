let editingItemId = null;
const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch("https://aska-api-nfxc.onrender.com/api/auth/login", {
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
        document.querySelector("#login-form").parentElement.hidden = true;
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
        const response = await fetch("https://aska-api-nfxc.onrender.com/api/menu");

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

            const editButton = document.createElement("button");
            editButton.textContent = "Redigera";

            editButton.addEventListener("click", () => {
                editingItemId = item._id;
                document.querySelector("#add-menu-message").textContent = "";
                document.querySelector("#dish-name").value = item.name;
                document.querySelector("#dish-description").value = item.description;
                document.querySelector("#dish-price").value = item.price;
                document.querySelector("#dish-category").value = item.category;
                document.querySelector('#add-menu-form button[type="submit"]').textContent = "Spara ändringar";
                document.querySelector("#add-menu-form").scrollIntoView({ behavior: "smooth" });
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Radera";

            deleteButton.addEventListener("click", async () => {
                const confirmed = confirm(`Vill du verkligen radera ${item.name}?`);

                if (!confirmed) {
                    return;
                }

                const token = sessionStorage.getItem("adminToken");

                try {
                    const response = await fetch(
                        `https://aska-api-nfxc.onrender.com/api/menu/${item._id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Kunde inte radera maträtten.");
                    }

                    await loadAdminMenu();

                } catch (error) {
                    alert(error.message);
                    console.error(error);
                }
            });

            article.append(heading, description, price, editButton, deleteButton);
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
        const url = editingItemId
            ? `https://aska-api-nfxc.onrender.com/api/menu/${editingItemId}`
            : "https://aska-api-nfxc.onrender.com/api/menu";

        const method = editingItemId ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
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

        addMenuMessage.textContent = editingItemId
            ? "Maträtten har uppdaterats!"
            : "Maträtten har lagts till!";

        editingItemId = null;
        addMenuForm.reset();

        document.querySelector('#add-menu-form button[type="submit"]').textContent = "Lägg till maträtt";

        // Uppdatera listan utan att ladda om sidan
        await loadAdminMenu();

    } catch (error) {
        addMenuMessage.textContent = error.message;
        console.error(error);
    }
});

// Logga ut administratören
document.querySelector("#logout-button").addEventListener("click", () => {
    sessionStorage.removeItem("adminToken");

    document.querySelector("#admin-panel").hidden = true;
    document.querySelector("#login-form").parentElement.hidden = false;

    document.querySelector("#login-form").reset();
    document.querySelector("#login-message").textContent = "";
});