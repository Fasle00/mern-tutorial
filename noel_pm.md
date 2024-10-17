Noel Johansson 2024-10-16


# Webbshop projekt post mortem

## Inledning

Innan vi startade vårt gemensamma arbete så gjorde vi alla en tutorial enskilt med syfte att lära oss om react på en grundläggande nivå och att förstå hur Chakra UI kan implementeras i ett projekt. I vårt projekt så har fokuset varit mer riktat mot att vi ska anpassa och använda det vi lärt oss men även förstå oss på lite nya delar. Vi delade upp oss och hade två personer på backend och tre stycken personer på frontend. Jag jobbade på frontend delen av projektet. 

## Bakgrund

### Method
Vi använder oss av olika slags methods för att påverka databasen på olika sätt. POST-metoden skickar data till databasen och DELETE gör tvärtom genom att ta bort data från data från databasen. POST använder vi för att skicka våra “produkter” till databasen och DELETE för att ta bort dem. Vi använder också POST och DELETE på samma sätt när det kommer till att göra en cart och ta bort den. 


### Chakra Ui
Chakra är ett komponentbibliotek för react med flera olika slags komponenter. Vi använde oss av chakras menyer, knappar, ikoner, inputfält och mer.  När vi använder oss av chakras knappar så använder vi onClick för att knappen ska göra något när den blir tryckt. I inputfälten så har vi att value sparas onChange så att det som skrivs i fältet sparas. Våra menyer har olika alternativ där beroende vad man trycker på så kan det hända olika saker till exempel en knapp för att ändra till mörkt/ljust tema och ett item med text som skickar användaren till utcheckningssidan med hjälp av href attributet. 




## Positiva erfarenheter
Att jobba med chakra har funkat väldigt bra för mig och har varit den enklaste delen för mig. Chakras webbsida har på väldigt många av sina komponenter en ganska så bra och kort beskrivning av dem och visar upp hur dem kan användas på olika sätt. 

Vi har varit bra på att dela upp våra uppgifter i gruppen och vi ser till att hjälpa varandra vilket leder till ett bättre projekt men även bättre stämning. 


## Negativa erfarenheter
Att få datan som vi hade att skickas till databasen var svårt i början för jag hade bara gjort det med tableplus som databas förut men sen lärde jag mig att det funkar väldigt liknande till hur jag gjort det förut. 

Att jobba i grupp var lite klurigt för det gäller att personer inte jobbar i samma fil samtidigt för det leder till att vi behöver lägga tid på att fixa det sen. Dock i början så jobbade vi inte i samma repository så det ledde till att vi behövde kopiera kod från de olika repositorerna och sedan samla ihop allt. Det var väldigt krångligt att ta kod från olika ställen och det tog onödig tid att fixa så att allt skulle funka igen.

Felsökning var ett ganska stort problem desto större projektet blev på grund av att det blev svårare att helt veta vars problemet är. Vi på frontend behöver också vara mer noggranna på att köra fler console logs medan vi håller på att ändra saker så vi kan se till att vi inte råkar missa ett fel när det uppstår. 

## Sammanfattning
Jag har lärt mig mycket om hur en webbsida kan byggas upp med hjälp av react och hur man kan använda sig av färdiga komponenter för att bygga en sida. Jag själv känner att sidans utseende kanske inte är på samma nivå som en riktig webbshop brukar ligga på men jag är lite osäker på hur det skulle kunna fixas. På grund av att vi inte har en riktig webbshop så finns det ingen betalningsmetod så därav har vi inte lärt oss något om den delen av att göra en webbshop. 

Det jag behöver jobba mer på är att se till att komma ihåg det jag jobbar/jobbat med och se till att verkligen lära mig det. Som grupp behöver vi se till att jobba organiserat men jag tycker själv att vi redan tagit ett stort steg fram gällande teamwork. 
