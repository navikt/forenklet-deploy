# fo-forenklet-deploy

[![CircleCI](https://circleci.com/gh/navikt/fo-forenklet-deploy/tree/master.svg?style=svg)](https://circleci.com/gh/navikt/fo-forenklet-deploy/tree/master)

Oversikt og styring av deploys av FO-applikasjoner via pipeline T6 - Q6 - Q0 - P

## Utvikling

* Start MainTest.main() i testmappa. 
* Kjør ` npm install && npm start` i `src/frontend` 

Det er lettest å starte backend og frontend helt uavhengig av hverandre når man skal teste lokalt. 

Ved utvikling av frontend er et lettest å bare kjøre opp med mockdata Dette kan gjøred med å starte opp frontenden med `npm run start-mock`. Modkdataen skal til en hver tid være representativ for reelle data. Og heroku
