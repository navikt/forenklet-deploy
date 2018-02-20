# fo-forenklet-deploy

[![CircleCI](https://circleci.com/gh/navikt/fo-forenklet-deploy/tree/master.svg?style=svg)](https://circleci.com/gh/navikt/fo-forenklet-deploy/tree/master)

Oversikt og styring av deploys av FO-applikasjoner via pipeline T6 - Q6 - Q0 - P

## Utvikling

For å kjøre opp lokalt i intelliJ må man ta i bruk en plugin som heter `lombok`.
Det er viktig at man installerer riktig versjon. Man finner denne her på felles-disken
`F:\programvare\idea\plugins`

* Start MainTest.main() i testmappa. 
* Kjør ` npm install && npm start` i `src/frontend` 

Det er lettest å starte backend og frontend helt uavhengig av hverandre når man skal teste lokalt. 

Ved utvikling av frontend er et lettest å bare kjøre opp med mockdata. Dette kan gjøreds ved å
starte opp frontenden med `npm run start-mock` i `src/frontend`. Modkdataen skal til en hver tid være representativ
for reelle data. Heroku starter opp en instans av alle pull-requestene, hvor den bruker mockdata.
Slik at man kan få verifisert frontend-endringer funksjonelt før man merger.
