<!-- // to use import statement use 'module' -->
# Dokumentation
## Express + React

För frontend och backend kommunikation så skicka vi JSON data till react och react tar sedan hand om det. Det behövs en knapp på login page där det behövs en funktion för att öppna google authentication (onClick). Till sist i app.jsx behövs en funktion som håller koll på om det finns en användare eller inte och isåfall beroende på det justerars routes.

## Auth
### Google
På grund av kod struktur så bytte vi tillbaka till commonjs. Detta var för att import inte fungerade med passport och google auth. Detta påverkade inte frontend med deras imports.

Vi började med att gå in på google cloud console och registrera våran app för att skapa credentials (google_client_id och google_secret) och fylla i information om namn på app, vilken information som vi ska ta från google kontot och vilka av oss som ska testa detta.

Därefter har vi lagt till en auth.js fil där vi konfigurerar google client id och secret och lägger till det i passport. Vi gjorde även en auth.route.js fil som hanterar all kommunikation direkt med google och tar hand om datan som skickas från google.

Till sist lade vi till i server.js att appen skulle använda cors, passport och cookie-session.
