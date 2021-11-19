#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

WiFiMulti wifiMulti;

//SETUP HERE
char * wifiSSID = "TP-Link_93F0";
char * wifiPassword = "91442871";

// Change name here to simulate multiple ESP32 on the frontend
char * deviceName = "Device1"; // Dont use space in the name, or the request will not work.

//INTERNAL SETUP, CHANGING MAY CAUSE PROBLEMS
String dweetName = "sanderEksamen";
int wifiLedPin = 5;

//TODO
//  - [DONE] Implementere et Json library, fetch current dweet state -> legg på info -> legg tilbake
//    Ergo, mulighet for flere IoT devices på samme dweet.

void setup() {
    pinMode(wifiLedPin, OUTPUT);
    Serial.begin(9600);

    dht.begin();

    for(uint8_t t = 4; t > 0; t--) {
        Serial.printf("[SETUP] WAIT %d...\n", t);
        Serial.flush();
        delay(1000);
    }

    wifiMulti.addAP(wifiSSID, wifiPassword);
}

void loop() {
    if((wifiMulti.run() == WL_CONNECTED)) {
        digitalWrite(wifiLedPin, HIGH);
        float temp = dht.readTemperature();
        float humidity = dht.readHumidity();

        HTTPClient http;

        Serial.print("[HTTP] begin GET...\n");
        DynamicJsonDocument doc(500);
        String urlGetDweet = "https://dweet.io/get/latest/dweet/for/"+dweetName;
        http.begin(urlGetDweet);
        int statusCodeGet = http.GET();
        if(statusCodeGet < 0){
            displayError();
            return;
        }
        String body = http.getString();
        DeserializationError err = deserializeJson(doc, body);
        http.end();
        if (err) {
            Serial.print(F("deserializeJson() returned "));
            Serial.println(err.f_str());
            return;
        }

        JsonArray contentArray = doc["with"].as<JsonArray>();
        JsonObject data = contentArray[0]["content"].as<JsonObject>();
        DynamicJsonDocument content(500);
        deserializeJson(content, data["content"]);
        if(!content.is<JsonObject>()){
            DynamicJsonDocument newDoc(500);
            content = newDoc.to<JsonObject>();
        }
        content[deviceName]["temp"] = (String)temp;
        content[deviceName]["humidity"] = (String)humidity;


        String payload;
        serializeJson(content, payload);
        String url = "http://dweet.io/dweet/for/"+dweetName+"?content=";
        String fullUrlPath = url+payload;


        HTTPClient httpPost;
        httpPost.begin(fullUrlPath);
        int httpCode = httpPost.POST("");

        httpPost.end();
        delay(10000);
    } else {
        Serial.println("Ingen nettverkskobling, venter");
        delay(1000);
    }
}

void displayError(){
    //TODO Lys eller noe som viser hvis noe går galt.
}
