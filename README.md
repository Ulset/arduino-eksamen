# Arduino eksamen

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

## Dependencies
* [ArduinoJson](https://arduinojson.org/)
* [DHT by Adafruit](https://github.com/adafruit/DHT-sensor-library)
