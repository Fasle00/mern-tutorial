# Webbshop projekt

Gabriel Nilsson Högberg, 2024-10-17

## Inledning

Syftet med detta projekt var att göra någonting som liknar en riktig webbshop både när det kommer till utseende och funktionalitet. Vårt arbetssätt var att dela upp oss på de som arbetar på frontend och backend. Eftersom vi var fem stycken blev det två som arbetade på backend och tre på frontend. Backend utvecklarna par programmerade medan frontend utvecklarna jobbade var för sig tills det uppstod problem som behövde lösas tillsammans.

När det kommer till genomförande följde alla först en tutorial om hur man bygger en webbshop enskilt och sedan började vi arbeta i grupp på ett repo. För saker vi inte kan som vi ville ha med, sökte vi upp nya tutorials och diskuterade tillsammans om hur vi implementerar det till vårt projekt.

## Bakgrund

Eftersom jag arbetat med backend på detta projekt kommer jag att förklara delar av backend.
 
### Konfiguration

I config mappen finns vår konfiguration för kommunikation med databasen MongoDB. Detta gör vi med något som kallas för mongoose som skapar en koppling mellan node.js och MongoDB, detta syns i bilden nedanför.

### Modeller

I modeller finns två olika scheman som skapas med hjälp av mongoose och dessa används för att definiera olika “collections” i MongoDB. Det ena schemat är för att definiera produkter och den andra är till för att definiera användare som loggar in på vår webbshop. Inom dessa scheman vi skapar skriver vi in vilka variabler som den specifika saken kommer att behöva som t.ex användare behöver namn, email och profilbild osv. Nedan syns ett exempel på vår userSchema som är till för just användare som sparas när de loggar in med google.

### Routes

Routes används i våran app för att skapa olika URLs som till exempel /cart eller /product/:id. Dessa är också till för att en klient ska kunna skicka olika requests som GET, PUT/PATCH, DELETE och POST. Därefter skickar servern tillbaka en respons med respektive information som klienten frågade efter och visar det på den specifika URLen. Nedan syns ett exempel på en route för att uppdatera en produkt ifall användaren är administratör.

### Google Oauth 2.0, passport och auth.js

Passport är ett autentiserings middleware och kan användas för att logga in med Facebook, Twitter, etc. Däremot är Google Oauth 2.0 är Googles api för autentisering och auktorisering och för att få tillgång till detta måste man registrera sin app på google cloud console där man får ett google client id och en secret. Till sist i auth.js konfigurerar vi passport med Googles egna strategi för att sedan kunna logga in via Google. Med hjälp av passport serialiseras och de serialiseras även användaren som Google skickar.

### Server.js och validation.js

I server.js är där vi skriver in att vår app ska importera alla middlewares, routes och skapa så att man hostar på en lokal port för att kunna testköra. Det finns även en funktion för när det ska vara i produktion och hostat på render.

Till sist inom validation.js finns det endast en massa funktioner som kollar vilken typ av tillgång en användare har till sidan. Detta innebär alltså administratörer, editors och vanliga användare.

## Positiva erfarenheter
- Vad gick bra och varför?

En stor del av backend programmeringen till detta projekt var att lära sig om databasen MongoDB. Det var inte särskilt svårt men eftersom vi använt MySQL tidigare fick vi nu istället förstå hur databaser med NoSQL fungerar och hur man implementerar det i projekt vilket var roligt. För att repetera att detta går bra i framtiden gäller det att fortsätta experimentera med både SQL och NoSQL databaser.

När vi delade upp projektet till frontend och backend kändes det inte lika tufft att göra en webbshop eftersom att alla hade olika delar att göra istället för att göra allt själv. På grund av att vi var två stycken som arbetade på backend valde vi också att parprogrammera och turas om att skriva kod. Detta gjorde även att när vi stötte på problem kunde vi diskutera och lösa dem tillsammans för att ta oss vidare. För att repetera dessa positiva erfarenheter så bör vi dela upp större projekt vi arbetar på i delar och diskutera problem som vi stöter på tillsammans. Däremot är det inget måste att vi ska parprogrammera igen.

## Negativa erfarenheter 
- Vad gick dåligt och varför?

Negativa erfarenheter från detta projekt var i början eftersom vi inte hade särskilt stor koll på hur vi skulle arbeta tillsammans när det kommer till git och github. Det började med att vi inte visste hur man arbetade i samma projekt när det kommer till branches, merges och pull requests. Däremot efter att vi hade en genomgång av git och github blev detta betydligt mycket enklare och kommer nog definitivt kunna undvikas i framtiden. 




## Sammanfattning

För att sammanfatta detta projekt så har jag lärt mig betydligt mycket om MongoDB och vad skillnaden mellan SQL och NoSQL databaser är. Förutom det har jag testat Googles API med hjälp av passport och testat Google Cloud Console. 

De positiva erfarenheterna från projektet är att testa och använda en ny databas, dela upp arbetet i delar så att det inte blir lika mycket att göra själv och att testa parprogrammera genom att koda och diskutera problem som kom upp tillsammans. Det man skulle kunna vidareutveckla med detta projekt är göra så att det går att lägga en beställning som skickas till oss som arbetar på sidan men även implementera något betalningssätt. Dessutom kan själva utseendet på sidan alltid se bättre ut men om man kollar på projektet i helhet så är jag extremt nöjd.
