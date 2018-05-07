# FO: Forenklet deploy

[![CircleCI](https://circleci.com/gh/navikt/fo-forenklet-deploy/tree/master.svg?style=svg)](https://circleci.com/gh/navikt/fo-forenklet-deploy/tree/master)

En applikasjon som viser oversikt over deploy av et team sine applikasjoner, per miljø.
Applikasjonen henter ut data fra ulike baksystemet og presenterer endringene mellom ulike
miljøer ved å preentere git-commits mellom ulike versjoner. 

## Utvikling

Applikasjonen er satt opp for å kunne kjøre opp både med direkte tilkobling mot
eksterne tjenester, eller ved å bruke mockdata. 

Backenden er satt opp med 2 main metoder. I `src/main/kotlin` finner man en Main klasse under 
`no.nav.fo.forenkletdeploy.Main`. Denne starter opp applikasjonen med "prod-oppsett". Denne vil default
sette opp proxy-instillinger slik at ting vil fungere både i produksjon og ved utvikling lokalt. Den vil og
prøve å hente data fra reelle baksystemer. Proxy-instillinger kan disables ved å sette systemvariabelen
`webproxy.enabled` til `false`.

Om man ønsker å kjøre opp backenden med Mock-data kan man starte Main-metoden man finner under `src/test/kotlin`.
Denne starter opp appen uten proxy-instillinger og med alle baksystemer mocket ut.


For å starte opp frontenden lokalt kjør `npm install && npm start` i `src/frontend`. Frontenden kommer også med egne
mockdata, slik at man kan utvikler på den uten å trenge å starte opp backeden. For å utvikle med mockdata kan man starte
opp frontenden med `npm run start-mock` i `src/frontend`. 

Det er lettest å starte backend og frontend helt uavhengig av hverandre når man skal teste lokalt. 

Mockdataen skal til en hver tid være representativ
for reelle data. Heroku starter opp en instans av alle pull-requestene, hvor den bruker mockdata.
Slik at man kan få verifisert frontend-endringer funksjonelt før man merger.
