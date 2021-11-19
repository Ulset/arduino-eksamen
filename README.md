# Arduino eksamen
Kandidatnr: `2013`

## Levering
Jeg har levert en oppgave sammensatt av en .ino fil ment for å flashe til
en ESP32, når flashet vil denne fungere som en liten IoT device. Denne 
IoT devicen vil automatisk sende data opp til en dweet med navn `sanderEksamen`.

Vedlagt finner du også en egen front-end kode ment for å se på dataen som blir levert til
dweet. 

## Oppsett
Bytt WIFI SSID og passord inne i .ino filen, eventuelt kan du endre 'device name' også.
Dette navnet vil være hva som vises i frontend koden.
> Det er ikke mulig å ha mellomrom i device navn!

## Komponenter
### ESP32
Esp32 er en mikrokontroller som er kjent for et lavt strømbruk mens den fortsatt
har WIFI og Bluetooth. Dette gjør den ypperlig til bruk av hjernen bak en IoT device. 
### DHT11
DHT11 er en sjukt billig sensor for både varme og luftfuktighet. Den kan maks gi data
1 gang i sekundet, som er ganske tregt, men fungerer helt fint til et prosjekt som dette.
Om bord på selve sensoren er det også en liten enkel chip som konverterer anolog data til
digital. Adafruit som lager sensoren har også gitt ut rammeverk for å bruke det i koden 
sin, så oppsettet er latterlig enkelt.
### Lysdiode
Ganske selvforklarende, selv etter 12 forelsninger måtte jeg google hvilken av pinnene
som var ground.

## Personlig refleksjon
Koble opp komponentene og få lest data gikk ganske greit. Jeg hadde et lite problem hvor
jeg bare fikk tilbake `NaN` fra rammeverket, men fant fort ut at jeg hadde koblet data 
pinnen til 3 volt. Kodingen var absolutt det værste, jeg har ganske god erfaring med 
REST API gjennom språk som Python og Javascript. Men å gjøre dette i C++ var absolutt 
__mye__ vanskeligere. Jeg mistet helt tellingen på hvor mange timer jeg brukte på å 
få serialisert dataen min så jeg kunne få sendt det over. Men når alt funket til slutt 
er jeg rimelig stolt over levereransen min. <br>
Jeg syntes kanskje jeg skulle fått til å bruke mer av den rent tekniske kompetansen jeg
opparbeidet meg over forelesningene, denne leveransen er kanskje litt mer på kodebiten 
av mikrokontrollere.

## Dependencies
* [ArduinoJson](https://arduinojson.org/)
* [DHT by Adafruit](https://github.com/adafruit/DHT-sensor-library)
