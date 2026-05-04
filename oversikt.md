Steg 1 – Sett opp GitHub (gjør dette nå)

Mål: Versjonskontroll fra start

Lag nytt repo på GitHub
I prosjektmappen:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repo-url>
git push -u origin main

👉 Dette er viktig før du begynner å bygge videre

⚙️ Steg 2 – Rydd prosjektet (viktig)

Du trenger egentlig ikke views/jade.

Du kan:

enten la det være (enkelt)
eller rydde bort:
views/
public/
view engine i app.js

👉 Ikke overtenk dette. Backend er fokus.

🧠 Steg 3 – Planlegg database-struktur (VIKTIG)

IKKE kode enda.

Tenk:

Du trenger:

1. Participant
email (PK)
firstname
lastname
dob
2. Work
companyname
salary
currency
3. Home
country
city

👉 Spør deg selv:

Skal dette være 3 tabeller?
Eller én tabell?

💡 Hint:
Du fikk "nested JSON" → det betyr ikke nødvendigvis samme DB-struktur

👉 Tenk relasjoner (akkurat som Todo ↔ Category)

🧱 Steg 4 – Lag models (Sequelize)

Når du har bestemt struktur:

Lag:

models/
  Participant.js
  Work.js
  Home.js

👉 Bruk samme mønster som:

Todo.js
Category.js

💡 Hint:

Participant.hasOne(Work)
Participant.hasOne(Home)
🔐 Steg 5 – Admin user + Basic Auth

Dette er annerledes enn forrige prosjekt (viktig forskjell ⚠️)

Du skal IKKE bruke JWT nå.

👉 Du skal bruke:
Basic Auth

Hva du må gjøre:
Lag en Admin model
Lag middleware:
Leser Authorization header
Dekoder base64
Sjekker username + password

💡 Hint:

Authorization: Basic base64(username:password)

👉 Dette er en av de viktigste delene i oppgaven

🧪 Steg 6 – Test Basic Auth i Postman

Før du lager endpoints:

👉 Lag én test-route:

GET /test

→ Krever auth
→ Returnerer "ok"

Hvis dette funker → du er golden

🧾 Steg 7 – Validation (SUPER viktig)

Lag en funksjon som sjekker:

manglende felter
email format
dato format

👉 Dette bør være egen fil:

utils/validation.js

💡 Hint:
Dette vil bli brukt i POST og PUT

🔁 Steg 8 – Lag første endpoint

Start med:

POST /participants/add

👉 Fokus:

Validate input
Lagre i DB
Return JSON

💡 Ikke gjør alt på en gang. Kun dette.

📚 Steg 9 – GET endpoints

Ta én og én:

GET /participants
GET /participants/details
GET /participants/details/:email

👉 Ikke hopp frem og tilbake

🔄 Steg 10 – PUT og DELETE

Til slutt:

PUT /participants/:email
DELETE /participants/:email
☁️ Steg 11 – Deploy (helt til slutt)
Render
Aiven MySQL