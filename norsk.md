## Introduksjon

I denne kursoppgaven skal du lage en Census-applikasjon, som lar en admin-bruker registrere deltakeres informasjon manuelt.

Applikasjonen skal hostes på Render-plattformen, og all data må lagres i en MySQL-database via Aiven.io-plattformen.

Det er ikke nødvendig å lage views for noen av endepunktene i denne oppgaven. Frontend er valgfritt, og vil ikke bli testet eller vurdert.

Alle løsninger og endepunkter vil bli testet med Postman.
API-endepunktene må returnere relevante og beskrivende feilmeldinger som JSON-objekter dersom forespurt data ikke kan hentes.
Alle API-endepunkter må returnere et JSON-objekt som respons.

Applikasjonen skal lagre deltakerdata. En admin-bruker må opprettes (se Authentication-seksjonen). Admin-brukeren skal autentisere seg via Basic Authentication.

I praksis betyr dette at i Postman, under Authorization → Auth Type, velger vi Basic Auth og fyller inn brukernavn og passord.
Kun den autentiserte admin-brukeren kan legge til, hente og manipulere (CRUD-operasjoner) deltakerdata.


## JSON-struktur

Definer en JSON-struktur som representerer deltakerdata, arbeidsinformasjon og bosted med følgende felter:

Participant

email: En streng som representerer deltakerens e-postadresse (unik identifikator)
firstname: En streng som representerer fornavn
lastname: En streng som representerer etternavn
dob: En streng som representerer fødselsdato i formatet YYYY-MM-DD
Work

companyname: En streng som representerer navnet på arbeidsgiver
salary: Et tall som representerer årslønn
currency: En streng som representerer valuta (f.eks. "USD")

Home
country: En streng som representerer land
city: En streng som representerer by


Viktig

JSON-strukturen skal bestå av disse objektene nøstet innenfor ett toppnivå JSON-objekt.

Alle felter må være inkludert i POST-forespørselen (fra Postman).

Under implementasjon er det ikke trygt å anta at data alltid er korrekt formatert.
Du må derfor validere i backend at:

Alle felter er inkludert
Dataene er korrekt formatert
dob er en gyldig dato (YYYY-MM-DD)
email har korrekt format

Hvis validering feiler:

Returner en beskrivende feilmelding (JSON)
Ikke lagre ugyldig data i databasen




## Applikasjon og autentisering
Applikasjon
Applikasjonen må være en ExpressJS-applikasjon
Den må bruke en .env-fil for alle relevante konfigurasjoner
Autentisering

Det må opprettes en admin-bruker med følgende credentials:

Brukernavn: admin
Passord: P4ssword

Disse må lagres i databasen.

Alle endepunkter må være beskyttet
Kun autentisert admin-bruker får tilgang
Basic Auth skal brukes

I Postman:

Gå til Authorization
Velg Basic Auth
Fyll inn brukernavn og passord


## Render.com

Opprett en ny applikasjon på Render.com basert på repositoryet ditt.

Del URL-en til den deployede appen:

I README.md på GitHub
I .txt-filen i Moodle-innleveringen



## API-krav
Liste over deltakere

Opprett følgende endepunkter:

POST /participants/add
Legger til en deltaker i databasen

→ All data skal sendes som JSON i request body

GET /participants
Returnerer en liste over alle deltakere som JSON


Detaljer om deltakere
GET /participants/details
Returnerer personlige detaljer for alle deltakere
(fornavn, etternavn, e-post)

GET /participants/details/:email
Returnerer personlige detaljer for én deltaker
(fornavn, etternavn, fødselsdato)

GET /participants/work/:email
Returnerer arbeidsinformasjon
(firmanavn, lønn, valuta)

GET /participants/home/:email
Returnerer bostedsinformasjon
(land, by)


Kun innlogget admin skal ha tilgang til disse


Slette / oppdatere deltaker
DELETE /participants/:email

Sletter deltaker basert på e-post
PUT /participants/:email

Oppdaterer deltaker
→ Samme JSON-format som POST /participants/add

Kun autentisert admin kan slette eller oppdatere