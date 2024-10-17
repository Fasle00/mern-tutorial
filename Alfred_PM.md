# Alfreds PM för webshop

Alfred Engberg - 16 Oktober 2024

## Inledning

Här beskriver du kortfattat arbetets syfte/mål, arbetssätt, genomförande.

Syftet med projektet är att skapa en webshop. Det har varit ett gruppprojekt där 3 personer har jobbat på frontend delen och 2 på backend. Vi har delet upp vad vi ska göra och sen jobbade alla var för sig med den delen som dom fick tilldelade. Jag jobbade först med product page, det vill säga den sida när man klickar på en produkt. Jag använde oss utav react och Chakra ui för att göra frontend.
 
## Bakgrund

### Chakra UI

Vi använde oss av Chakra UI som är ett bibliotek av assets som vi använde för att skapa frontend. Chakra UI är byggt på react. 

### Github

Github är ett ställe där flera personer kan sammarbete på samma projekt.

## Positiva erfarenheter

Det bästa med projektet är att vi faktiskt gjorde det vi skulle innan vår deadline, och har nu en fungerande sida. Det var också väldigt roligt att känna att man lärde sig saker, att det har blivit lättare att jobba med react och Chakra UI. Det har också varit väldigt roligt att jobba i grupp tycker jag, att man har sin roll och sen följer man den. Sen för att upprepa framgångarna så tror jag att jag ska helt enkelt fortsätta att jobba medreact och Chakra. 

## Negativa erfarenheter

React var helt nytt för mig när jag började jobba med projektet så det var ganska svårt i början. Sen så tycker jag att planeringen fanns knappt, vi hade nästan ingen tanke på vad som skulle finnas på sidan, vi hade knapt någon plan på hur objekten skulle se ut i databasen som ledde till att vi behövde gå tillbaka och ändra väldigt ofta, på flera sidor, för att få allt att fungera. Så att om vi hade haft en mer konkret plan skulle det inte varit så dåligt. Så för att undvika dessa problem så är det bara att skapa en ordentlig planering som innehåller allt nödvändigt, och lite till.

## Sammanfattning

Det första vi gjorde var att följa en tutorial för att få en grund att jobba vidare ifrån. Det var inte speciellt svårt att följa den. Efter vi hade gjort det så valde vi vad vi ville jobba med, frontend eller backend. Jag valde frontend. Det första vi gjorde då var en figma skiss för att få en idé om hur sidan skulle se ut. Sen började jag med att jobba på en sida där man kan se produktens bild, beskrivning, färg, antal, pris samt en knapp där man skulle kunna lägga till i sin kundvagn. Backend jobbade på ett inloggningssystem samtidigt. Jag hade ganska mycket problem med att få bilden att updatera, men allt som krävdes var en hook för att uppdatera bilden. Sen efter det så lade jag till profilbilden från google kontot i navbaren. Sen så började jag att jobba med adminpage. Jag gjorde så att man kan uppdatera användares rättigheter på sidan. Man kan byta mellan "user", "editor" och "admin". Det är bara admin som kan komma åt admin sidan. Sen gjorde jag så att man kan redigera och ta bort produkter i adminpage. Jag lade till för att ta bort produkter så kommer det en popup innan den försvinner så man inte råkar ta bort en produkt. Sen så kom vi på att mobilanpassningen hade glömts bort lite... så vi mobilanpassade sidan. Jag ändrade navbar så att när sidan blir liten hamnar knapparna i hamburgermenyn. Sen fixade jag loginpage, den fungerade inte på mobil och hade inloggningsalternativ som vi inte hade lagt till så att dom fungerar. Jag tog bort allt det och gjorde den responsiv. När jag blev klar med det så gjorde vi ett användartest, det var mycket som inte fungerade. Bland annat så upptäckte vi att lightmode var helt trasigt,  mobilanpassningen var lite si sådär på ställen och att medelandena som användaren fick inte var tillräkligt beskrivande. Det jag började att jobba med då var att se till att skicka bättre medelanden med hjälp av det medelande som backend skickar. Sen fixade jag så att cart slutade att vara mysko, att den inte krashade och att den räknar ut den totala kostnaden av alla produkter i kundvagnen. 

För att utvecka sidan vidare skulle jag nog säga att det som borde göras är att göra så att produkter kan ha olika storlekar, så t.ex en sko kan ha storleken 41. Just nu går det inte. Sen också olika färger på produkterna och att det ska finnas ett lager som räknas på. Så att det står att det är slut i lager på en produkt om det är slut. Jag skulle också vilja se att man kan ändra på sin beställning i sin varukorg, t.ex. om man råkar lägga till 3 styckna men man ville bara ha 2 så skulle man kunna ändra det.

Överlag är jag nöjd med det vi har gjort men vissa delar skulle jag inte klaga om vi fick tid att förbättra sidan heller.
