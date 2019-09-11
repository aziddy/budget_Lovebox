#include <SPI.h>
#include <Adafruit_GFX.h>
#include <TFT_ILI9163C.h>

// Wireless Stuff
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <FS.h>   // Include the SPIFFS library


#ifndef STASSID
#define STASSID "BELL726"
#define STAPSK  "222"
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

const char* host = "198.50.245.94";
const uint16_t port = 6924;

ESP8266WiFiMulti WiFiMulti;

// Color definitions
#define	BLACK   0x0000
#define	BLUE    0x001F
#define	RED     0xF800
#define	GREEN   0x07E0
#define CYAN    0x07FF
#define MAGENTA 0xF81F
#define YELLOW  0xFFE0  
#define WHITE   0xFFFF


#define __CS 16
#define __DC 2




static const String filename = "image";


WiFiClient client;

TFT_ILI9163C tft = TFT_ILI9163C(__CS, __DC);

void setup() {
  Serial.begin(115200);

  pinMode(13, OUTPUT);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  tft.begin();
  tft.setRotation(2);
  tft.fillScreen(0xF81F);

  // Wait to Connect to Wifi
  while (WiFi.status()!= WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());


  Serial.print("connecting to ");
  Serial.print(host);
  Serial.print(':');
  Serial.println(port);

  // Use WiFiClient class to create TCP connections

  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    delay(5000);
    return;
 }
   tft.fillScreen(WHITE);
}

void loop(void) {
  delay(200);
  networking();
  delay(200);
}

/*
void drawByPixelTest(){

  for(int x = 0; x < 128; x+=2){
    for(int y = 0; y < 128; y+=1){
      tft.drawPixel(x, y, RED);
    }
  }
}
*/

void networking(){

  if(client && !client.connected()){
    Serial.println("Client Closed");
  }
  

  char buff[128];

  int pixelCounter = 0;

  int xx = 0;
  int yy = 0;

  boolean firstPacket = true;
  
  
	/*	
		For whatever reason this code doesn't work on celluar, because the packets get split up.
		so next thing to do is make a multi receive setup. Where I specify the start and end
		of a transimission
	*/

  while (client.available()>0) {

    if(firstPacket){
      digitalWrite(13, HIGH);   
      tft.fillScreen(WHITE);
      firstPacket = false;
    }
    
    size_t size = client.available();

	
	
	//  .readBytes ({0}, {1})
	// {0} buffer to write to    {1} length of bytes to read
	
	int c = client.readBytes(buff, ((size > sizeof(buff)) ? sizeof(buff) : size));
	
	/*                                             ^ da faq is this expression ?
	  
	  Inline C logic
	
	  (condition) ? {code for YES} : {code for NO}
	  
	*/
      

      for(int i = 0; i < sizeof(buff); i++){
      	if(buff[i] == '1'){
          tft.drawPixel(i, pixelCounter, RED);
        }
      }
      pixelCounter++;

    delay(1);
  }
  digitalWrite(13, LOW);  
}



