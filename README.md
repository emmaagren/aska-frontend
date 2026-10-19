# Restaurang ASKA – Frontend

Frontend utvecklad som en del av projektuppgiften i kursen Backend-baserad webbutveckling vid Mittuniversitetet.

## Beskrivning

Restaurang ASKA är en fiktiv restaurangwebbplats med information om restaurangen, meny, bildgalleri och kontaktuppgifter.

Webbplatsen är kopplad till ett separat REST API som hanterar restaurangens meny. Maträtterna hämtas från en MongoDB-databas och visas dynamiskt på menysidan.

Webbplatsen innehåller även en administrationssida där en administratör kan logga in och lägga till, redigera och radera maträtter.

## Tekniker

- HTML5
- CSS3
- JavaScript
- Fetch API
- REST API
- JSON Web Token (JWT) för autentisering via backend
- Git och GitHub

## Installation

1. Klona projektet från GitHub.
2. Öppna projektmappen i Visual Studio Code.
3. Starta webbplatsen med exempelvis Live Server.
4. Kontrollera att API-adresserna i `menu.js` och `admin.js` pekar mot rätt backend.

För att den dynamiska menyn och administrationssidan ska fungera behöver backend-API:et vara igång.

## Funktioner

### Publik webbplats

Webbplatsen innehåller följande sidor:

- **Startsida** – presentation av restaurangen.
- **Om oss** – information om restaurangen.
- **Meny** – visar maträtter som hämtas från backend-API:et.
- **Galleri** – visar bilder från restaurangen.
- **Kontakt** – kontaktinformation och ett formulär för bokningsförfrågningar.

Bokningsformuläret är en del av webbplatsens gränssnitt och är inte kopplat till någon bokningstjänst.

### Dynamisk meny

Maträtterna hämtas från REST API:et med JavaScript och Fetch API.

Menyn uppdateras utifrån innehållet i databasen utan att HTML-koden behöver ändras.

### Administration

Administrationssidan nås via `admin.html`.

En administratör kan:

- Logga in med användarnamn och lösenord.
- Visa befintliga maträtter.
- Lägga till nya maträtter.
- Redigera maträtter.
- Radera maträtter.
- Logga ut.

Vid inloggning returnerar backend-API:et en JWT-token som används vid skyddade API-anrop.

## Responsiv design

Webbplatsen är anpassad för olika skärmstorlekar med CSS och media queries.

Navigation, bilder, meny och administrationspanel anpassas för både större och mindre skärmar.

## Testning

Webbplatsens funktioner kan testas lokalt tillsammans med backend-API:et.

Den publika menyn ska visa maträtter från databasen och administrationspanelen ska kunna användas för att hantera menyinnehållet.

## Publicering

Frontend och backend publiceras separat.

Länkar till den publicerade webbplatsen och backend-API:et läggs till när publiceringen är klar.

## Kurs

Backend-baserad webbutveckling – Projektuppgift.

## Skapad av

Emma Ågren, student vid Mittuniversitetet.