// Hämta och visa restaurangens meny
async function loadMenu() {
    const container = document.getElementById("menu-container");

    if (!container) return;

    try {
        const response = await fetch("http://localhost:3000/api/menu");

        if (!response.ok) {
            throw new Error("Kunde inte hämta menyn.");
        }

        const menuItems = await response.json();

        container.replaceChildren();

        if (menuItems.length === 0) {
            container.textContent = "Menyn är inte tillgänglig just nu.";
            return;
        }

        menuItems.forEach((item) => {
            const article = document.createElement("article");
            article.classList.add("menu-item");

            const name = document.createElement("h3");
            name.textContent = item.name;

            const description = document.createElement("p");
            description.textContent = item.description;

            const price = document.createElement("p");
            price.classList.add("menu-price");
            price.textContent = `${item.price} kr`;

            article.append(name, description, price);
            container.appendChild(article);
        });

    } catch (error) {
        console.error(error);
        container.textContent = "Det gick inte att ladda menyn.";
    }
}

loadMenu();