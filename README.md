# budget_Lovebox

Saw this thing called a Lovebox on Instagram, that allows you to send images to it. So I decided to make a budget version

<br>

<p align="center" style="vertical-align: top; position: relative" >
  
  <img align="top" style="vertical-align:top" src="https://github.com/aziddy/budget_Lovebox/blob/master/images/jif.gif?raw=true" width="600"/>  
  
  <br>
  
<img align="top" style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/budget_Lovebox/master/images/IMG_20190731_200542.jpg" width="400"/>  
  
<img align="top" style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/budget_Lovebox/master/images/IMG_20190731_123142.jpg" width="300" height="368" />


<img align="top" style="vertical-align:top;" src="https://github.com/aziddy/budget_Lovebox/blob/master/images/exploded_cad_jif.gif?raw=true" width="390" height="400" />

<img align="top" style="vertical-align:top;" src="https://github.com/aziddy/budget_Lovebox/blob/master/images/exploded_cad.PNG?raw=true" width="360" height="400" />


<img align="top" style="vertical-align:top;" src="https://raw.githubusercontent.com/aziddy/budget_Lovebox/master/images/IMG_20190731_195147.jpg" width="300" height="320" />

<img align="top" style="vertical-align:top" src="https://raw.githubusercontent.com/aziddy/budget_Lovebox/master/images/IMG_20190713_223224.jpg" width="400" height="320"/>



</p>

<br>
<br>

## The Real One

<p align="center" style="vertical-align: top; position: relative" >
https://en.lovebox.love/
</p>

<p align="center" style="vertical-align: top; position: relative" >
  
  <img align="top" style="vertical-align:top" src="https://github.com/aziddy/budget_Lovebox/blob/master/images/OG.jpg?raw=true" width="600"/>  
  
</p>

<br>



## Component List

* LCD 1.44" Red Serial 128X128 SPI TFT 
* Adafruit Feather HUZZAH with ESP8266 https://www.adafruit.com/product/2821
* Blue LED
* Micro USB Cord
* 3D Printed Parts

<br>
<p align="center" style="vertical-align: top; position: relative" >
  
<img align="top" style="vertical-align:top" src="https://github.com/aziddy/budget_Lovebox/blob/master/images/Components/2821-05.jpg?raw=true" width="300"/>  
<img align="top" style="vertical-align:top" src="https://github.com/aziddy/budget_Lovebox/blob/master/images/Components/s-l1600.jpg?raw=true" width="300"/>  
  
</p>
<br>

## Libraries

* For TFT Display https://github.com/sumotoy/TFT_ILI9163C
* ESP8266 https://learn.adafruit.com/adafruit-io-basics-esp8266-arduino/arduino-io-library

<br>

## Shitty Wiring Diagram
<p align="center" style="vertical-align: top; position: relative" >
  
<img align="top" style="vertical-align:top" src="https://github.com/aziddy/budget_Lovebox/blob/master/images/shitty_wiring.PNG?raw=true" width="500"/>  
  
</p>

<br>

## Construction
* `Soldered` the Feather to the Display. 
* `Hot Glued` the 3D printed peices together
* `Spray Painted` Primer and Semi-Gloss White on the parts

<br>

## ESP8266 Programming Considerations
The biggest thing I had to take into account when programming the budget Lovebox was I how I'm going to get a image onto the *ESP8266*

The *ESP8266* on the *Feather* has a **80Kb** of *RAM* at its disposale. But I'm dealing with a 128x128 image with 8bit RGB color and assuming no alpha byte for each pixel. 

Thats `128 * 128 * 3 = 49152Kb` which is about `61%` of the available *RAM*. And that percentage isnt taking into account any overhead for the HTTP Header Reponse or any other variable. This is a quick side project, I don't want to sit there doing memory optimization

So I decided just to send unicolor images `128 * 128 * 1 = 16384Kb` which is about `20%` of the available *RAM*.
