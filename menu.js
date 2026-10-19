// Hämta och visa restaurangens meny
async function loadMenu() {
    const container = document.getElementById("menu-container");

    if (!container) return;

    try {
        const response = await fetch("https://aska-api-nfxc.onrender.com/api/menu");

        if (!response.ok) {
            throw new Error("Kunde inte hämta menyn.");
        }

        const menuItems = await response.json();

        container.replaceChildren();

        if (menuItems.length === 0) {
            container.textContent = "Menyn är inte tillgänglig just nu.";
            return;
        }

        // Gruppera maträtterna efter kategori
        const categories = ["Varmrätter", "Förrätter", "Efterrätter"];

        categories.forEach((category) => {
            const items = menuItems.filter((item) => item.category === category);

            if (items.length === 0) return;

            const section = document.createElement("section");
            section.classList.add("menu-category");

            const heading = document.createElement("h2");
            heading.textContent = category;
            section.appendChild(heading);

            items.forEach((item) => {
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
                section.appendChild(article);
            });

            container.appendChild(section);
        });

    } catch (error) {
        console.error(error);
        container.textContent = "Det gick inte att ladda menyn.";
    }
}

loadMenu();