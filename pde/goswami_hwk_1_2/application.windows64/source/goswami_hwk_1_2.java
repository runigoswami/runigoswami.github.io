import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class goswami_hwk_1_2 extends PApplet {

/* Runi Goswami 
 Homework 1: Sail Away - A simple scene of a sailboat with some user interactivity & changing states
 
 Simple Harmonic Motion of Calm Ocean & Albatross adapted from http://processing.org/learning/basics/sinewave.html
 
 Default Scene: 
 A sailboat is on calm seas with gentle rolling waves. The boat can be clicked and dragged across the screen. Clicking the hull again returns boat to original position.
 Three buttons appear in the control cloud at the top left of the screen. The text of each button changes slightly when the button is moused over. Clicking each button
 or combinations of buttons changes the state of the scene and the button text of the "clicked" button(s). 
 
 Rainy Scene:
 When only the rain button is pressed, randomly placed and sized rain drops appear in the sky and fall down.
 Cloud color, sea color, and sea level also change. 
 
 Windy Scene: 
 When only the wind button is pressed, lots of randomly placed and sized waves appear in the sea and then disappear.
 
 Albatross Scene:
 When only the albatross button is pressed, an albatross of set size flies in periodic motion across the sky. 
 Sea color and background color change to allude to Coleridge's poem.
 In the future, I would like to add a "kill albatross" feature in which the user tries to kill the albatross by aiming arrows.  
 
 Storm Scene:
 When both rain and wind buttons are pressed, a storm occurs. Sea color changes, angular velocity & period of waves change. Random flashes of lightning appear in the sky.
 
 * Easter Egg *
 Nessie:
 Clicking both wind & albatross allows one to see the Loch Ness Monster. 
 */

float x1, y1, x2, x3, x4, y3, y4, boatOffset; //Boat position variables
PFont font; 
boolean rainButton = false, windButton = false, albatrossButton = false, boatOn = false; //Buttons
int state, r=0, w=0, a=0; //State variables

//Color Variables
int sky = color(212, 239, 233);
int sea = color(69, 173, 189);
int dkSea = color(75, 103, 108);
int ltSea = color(168, 195, 198);
int boat = color(160, 90, 44);
int raindrop = color(172, 200, 194);
int announcement = color(75, 103, 108);
int nessie = color(142, 178, 160);

//Albatross size,position, speed
float aSz=20; 
float ax = 101, ay;
float a_vx = 2;
float[] a_Elevation; //Using an array to store elevation values for the albatross

//Nessie Variables
int nesSz = 50;
float nesY = 380;
float nesBob = 0.2f;

//Sea Variables
int wv_width; // Width of entire wave
float theta = 0.0f;  // Start angle at 0
float angVel = 0.04f; //Angular velocity starts at 0.4
float amplitude = 15.0f;  // Height of wave
float period = 300.0f;  // How many pixels before the wave repeats
float dx;  // Value for incrementing X, a function of period and xspacing
float[] yvalues;  // Using an array to store height values for the wave

//Rain Drops
Drop[] drops = new Drop[500]; //Creates an array of 100 Drop objects
int totalDrops = 0; //keeps track of displayed drops

//Text displays
String strR, strW,strA; //String variables corresponding to each button 
//textFont(font, 18); //Sets font & font size

public void setup() {
  size(797, 566);
  frameRate(50);
  smooth();
  noStroke();
  font = loadFont("Helvetica-18.vlw");
}

public void draw() {
  //Initializes position of boat
  x1 = width/3;
  y1 = 3*(height/5);

  //State Definitions
  if (rainButton) r=1;
  else r=0;
  if (windButton) w=1;
  else w=0;
  if (albatrossButton) a=1;
  else a=0;
  state = 1*r + 2*w + 4*a;
  
 //Mouseover Definitions
  boolean mouseRain = false;
  if (mouseX>width/100 && mouseX<44 && mouseY<16 && mouseY>2) {
    mouseRain = true;
  }
  boolean mouseWind = false;
  if (mouseX>39 && mouseX<88 && mouseY>25 && mouseY<41) {
    mouseWind = true;
  }
  boolean mouseAlbatross = false;
  if (mouseX>14 && mouseX<104 && mouseY>46 && mouseY<61) {
    mouseAlbatross = true;
  }

  switch(state) {
  case 0: //No buttons
    baseScene();
    //Default 3 gentle waves & calm seas
    angVel = 0.04f; 
    period = 300;
    fill(sea);
    sea();
    wave(x1-.19f*width, y1+.11f*height, .04f*width);
    wave(x1 +.04f*width, y1 +.19f*height, .06f*width);
    wave(x1+.38f*width, y1+.13f*height, .02f*width);
    
    strR = (mouseRain)? "Rain!": "Rain?";
    strW = (mouseWind)? "Wind!": "Wind?";
    strA = (mouseAlbatross) ? "Albatross!":"Albatross?";
    text(strR, .01f*width, .03f*height);
    text(strW, .05f*width, .07f*height);
    text(strA, .01f*width, .11f*height);
    break;

  case 1: //Rain Only
    baseScene();
    //Cloud Background for GUI Buttons
    fill(200);
    cloud();
    //Dark Ocean, water level higher in rain
    angVel = 0.15f; 
    period = 200.0f;
    rain();
    fill(dkSea);
    sea();
    break;

  case 2: //Wind Only
    fill(212, 239, 233);
    rect(0, 0, width, 2*(height/3));
    fill(255);
    cloud();
    //Slightly translucent ocean
    fill(sea, 10);
    rect(0, 2*(height/3), width, height/3);
    //Crazy Waves
    wave(random(0, width), random(2*(height/3), height), random(width/40, width/10));
    break;

  case 3: //Rain + Wind = Storm
    baseScene();
    //Storm Cloud
    fill(150);
    cloud(); 
    //Rain
    rain();
    //Dark Ocean with fast waves
    angVel = 0.15f; 
    period = 200.0f;
    fill(dkSea);
    sea();
    //Crazy Waves
    wave(random(0, width), random(2*(height/3), height), random(width/40, width/10));
    //Lightning
    lightning(random(0, width), 0, random(5, 30));
    break;

  case 4: //Only albatross
    baseScene();
    fill(ltSea);
    sea();
    albatross();
    break;

  case 5: //Rain and albatross
    baseScene();
    rain();
    albatross();
    fill(ltSea);
    sea();
    break;

  case 6: //Wind + albatross, Nessie 
    baseScene();
    albatross();
    nessie(); //Easter Egg Loch Ness Monster
    fill(ltSea);
    sea();
    wave(random(0, width), random(2*(height/3), height), random(width/40, width/10));
    break;

  case 7: //Rain + Wind + Albatross, Cthulhu
    baseScene();
    //Storm Cloud
    fill(150);
    cloud(); 
    //Rain
    rain();
    //Dark Ocean
    angVel = 0.15f; 
    period = 200.0f;
    fill(dkSea);
    sea();
    //Crazy Waves
    wave(random(0, width), random(2*(height/3), height), random(width/40, width/10));
    //Lightning
    lightning(random(0, width), 0, random(5, 30));
    //Creatures
    albatross();
    break;
  }

  //Boat
  if (boatOn) {
    x1 = mouseX - boatOffset;
  }
  boat(x1, y1);

  //Rain Button Text Changes based on State Changes

  if (!mouseRain && (state==0||state==2||state==4||state==6)) {
    fill(sea);
    text("Rain?", .01f*width, .03f*height);
  }
  else if (mouseRain && !rainButton) {
    fill(70, 136, 188);
    text("Rain!", .01f*width, .03f*height);
  }
  else if (rainButton && (state==3||state==7)) {
    fill(255);
    text("STORM!", .01f*width, .03f*height);
  }
  else if (rainButton && (state==1||state==5)) {
    fill(sea);
    rect(.01f*width, 1.7f, 50, 16);
    fill(255);
    text("RAIN!", .01f*width, .03f*height);
  }

  //Wind Button Text Changes
  if (!mouseWind && (state==0||state==1||state==4||state==5)) {
    fill(sea);
    text("Wind?", .05f*width, .07f*height);
  }
  else if (mouseWind && !windButton) {
    fill(70, 136, 188);
    text("Wind!", .05f*width, .07f*height);
  }
  else if (windButton && (state==3||state==7)) {
    fill(255);
    text("STORM!", .05f*width, .07f*height);
  } 
  else if (windButton && (state==2||state==6)) {
    fill(sea);
    rect(.05f*width, 25, 55, 16);
    fill(255);
    text("WIND!", .05f*width, .07f*height);
  }

  //Albatross Button Text Changes
  if (!mouseAlbatross && (state==0||state==1||state==2||state==3)) {
    fill(sea);
    text("Albatross?", .01f*width, .11f*height);
  }
  else if (albatrossButton && (state==7)) {
    fill(255);
    text("STORM!", .01f*width, .11f*height);
  } 
  else if (albatrossButton && (state==4||state==5||state==6)) {
    fill(sea);
    rect(.01f*width, .08f*height, 110, 18);
    fill(255);
    text("ALBATROSS", .01f*width, .11f*height);
  }
  else if (mouseAlbatross && !albatrossButton) {
    fill(70, 136, 188);
    text("Albatross!", .01f*width, .11f*height);
  }
}

//Default Scene Function
public void baseScene() {
  fill(sky);
  rect(0, 0, width, height);
  //Cloud Background for GUI Buttons
  fill(255);
  cloud();
}

//Function Definitions: Defines wave, cloud, rain, lightning, boat, albatross, and nessie functions 
//Class Defintions: Defines Drop class and drop class functions i.e. move & display

public void wave(float wx, float wy, float warc) {
  fill(245);
  beginShape();
  vertex(wx, wy);
  bezierVertex(wx+0.5f*warc, wy+warc, wx+warc, wy, wx+warc, wy);
  bezierVertex(wx+warc, wy+warc, wx+2*warc, wy, wx+1.7f*warc, wy);
  bezierVertex(wx+2.5f*warc, wy+warc, wx+3.2f*warc, wy, wx+3*warc, wy);
  bezierVertex(wx+3.5f*warc, wy+2*warc, wx+1.5f*warc, wy+0.5f*warc, wx+1.7f*warc, wy+0.5f*warc); 
  bezierVertex(wx+1.2f*warc, wy+2*warc, wx+warc, wy+0.4f*warc, wx+warc, wy+0.5f*warc);
  bezierVertex(wx, wy+1.5f*warc, wx, wy+0.4f*warc, wx, wy); 
  endShape(CLOSE);
}

public void cloud() {
  ellipse(0, 0, width/4, width/4);
  ellipse(width/8, 0, width/8, width/8);
  ellipse(width/8, width/16, width/16, width/16);
  ellipse(width/16, width/12, width/10, width/10);
}

public void boat(float boatX, float boatY) {
  fill(boat);
  //Links vertices of boat hull to first corner & to screen dimensions
  x2 = boatX+0.37f*width;
  x3 = boatX+0.31f*width;
  y3 = boatY+0.12f*height;
  x4 = boatX+0.09f*width;
  y4 = boatY+0.14f*height;
  quad(boatX, boatY, x2, boatY, x3, y3, x4, y4);
  //Mast
  rect((boatX+x2)/2, height/4, 10, 2*(height/5));
  //Sails, linked to hull vertices
  fill(245);
  beginShape();
  vertex(x2-0.15f*width, height/4);
  bezierVertex(x2, boatY-.08f*height, x2-.03f*width, boatY, x2-.03f*width, boatY-.04f*height);
  bezierVertex(x2-.075f*width, boatY-.11f*height, x2-0.15f*width, boatY-.04f*height, x2-0.15f*width, boatY-.04f*height);
  bezierVertex(x2-.122f*width, boatY-.24f*height, x2-0.16f*width, height/4, x2-0.15f*width, height/4);
  endShape(CLOSE);
  beginShape();
  vertex(boatX+.16f*width, boatY-.25f*height);
  bezierVertex(boatX+.13f*width, boatY-.145f*height, boatX+.16f*width, boatY-.04f*height, boatX+.16f*width, boatY-.04f*height);
  bezierVertex(boatX+.12f*width, boatY-.08f*height, boatX+.08f*width, boatY-.04f*height, boatX+.08f*width, boatY-.04f*height);
  bezierVertex(boatX+.08f*width, boatY-.16f*height, boatX+.16f*width, boatY-.25f*height, boatX+.16f*width, boatY-.25f*height);
  endShape(CLOSE);
}

public void lightning (float boltX, float boltY, float boltSz) {
  fill(announcement);
  text("Thunderbolts & Lightning! Very, very, frightening!", width/3, height/8);
  fill(249, 219, 136);
  beginShape();
  vertex(boltX, boltY);
  vertex(boltX+2*boltSz, boltY);
  vertex(boltX, boltY+5*boltSz);
  vertex(boltX-0.5f*boltSz, boltY+4*boltSz);
  vertex(boltX-3*boltSz, boltY+12*boltSz);
  vertex(boltX-1.5f*boltSz, boltY+2*boltSz);
  vertex(boltX-boltSz, boltY+3*boltSz);
  vertex(boltX, boltY);
  endShape(CLOSE);
}

public void nessie() {
  fill(announcement);
  text("It's the Loch Ness Monster!", 2*(width/5), height/8);
  fill(nessie);
  ellipse(5*(width/6), nesY+0.2f*nesSz, 2.5f*nesSz, nesSz);
  ellipse(5*(width/6)+2.2f*nesSz, nesY-nesSz, 0.5f*nesSz, 0.5f*nesSz);
  beginShape();
  vertex(5*(width/6)+2.2f*nesSz, nesY-1.25f*nesSz);
  vertex(5*(width/6)+2.2f*nesSz, nesY-0.75f*nesSz);
  bezierVertex(5*(width/6)+2.5f*nesSz, nesY-nesSz, 5*(width/6)+0.5f*nesSz, nesY-1.5f*nesSz, 5*(width/6)+1.5f*nesSz, nesY+0.55f*nesSz);
  bezierVertex(5*(width/6), nesY-0.5f*nesSz, 5*(width/6)+0.5f*nesSz, nesY-1.5f*nesSz, 5*(width/6)+2.2f*nesSz, nesY-1.25f*nesSz);
  endShape(CLOSE);
  if (nesY>400||nesY<375) {
    nesBob*=-1;
  }
  nesY+=nesBob;
}


public void albatross() {
  if (ax != constrain(ax, 100, width-100)) { //Constrain albatross flight & direction
    a_vx = -a_vx;
  }
  fill(255);
  beginShape();
  vertex(ax, ay);
  bezierVertex(ax+aSz, ay-aSz, ax+2*aSz, ay-aSz, ax+5*aSz, ay+aSz);
  bezierVertex(ax+aSz, ay, ax+2*aSz, ay, ax, ay+0.5f*aSz);
  bezierVertex(ax+1.5f*aSz, ay, ax+0.5f*aSz, ay+0.5f*aSz, ax+1.5f*aSz, ay+1.5f*aSz);
  bezierVertex(ax+0.5f*aSz, ay+0.5f*aSz, ax+0.5f*aSz, ay+0.5f*aSz, ax, ay+aSz);
  bezierVertex(ax-aSz, ay+1.5f*aSz, ax-2*aSz, ay+1.5f*aSz, ax-2.5f*aSz, ay+aSz);
  bezierVertex(ax-aSz, ay+aSz, ax-1.5f*aSz, ay+aSz, ax-aSz, ay+0.5f*aSz);
  bezierVertex(ax-2*aSz, ay, ax-aSz, ay, ax-5*aSz, ay+aSz);
  bezierVertex(ax-2*aSz, ay-aSz, ax-aSz, ay-aSz, ax, ay);
  endShape(CLOSE);
  ax+=a_vx;
  ay = 150 + amplitude/2*sin(2*theta);
  println();
}

//Rain
public void rain() {
  if (totalDrops < drops.length) {
    drops[totalDrops] = new Drop(); //Initialize one rain drop
    totalDrops++; // increment total rain drops
  }
  for (int i=0;i<totalDrops;i++) {
    drops[i].move();
    drops[i].display();
  }
}

class Drop {
  float rainFall, dropX, dropY, dropSize;
  Drop() {
    dropSize = random(5, 20);
    dropX = random(width);
    dropY = (-dropSize)/2;
    rainFall = random(1, 5);
  }
  public void display() {
    fill(raindrop);
    ellipse(dropX, dropY, dropSize, dropSize);
    triangle(dropX, dropY-(sqrt(2)*dropSize), dropX+(dropSize/2), dropY, dropX-(dropSize/2), dropY);
  }
  public void move() { // When a drop hits the sea floor, send it back up to the sky to reuse
    dropY+=rainFall;
    if (dropY >height) {
      dropY = -dropSize/2;
    }
  }
}

//Rolling Waves in the Sea, Periodic motion adapted from Processing tutorial online (see intro comments at top)
public void calcWave() {
  // Increment theta where theta is angular velocity
  theta += angVel;
  // For every x value, calculate a y value with sine function
  float x = theta;
  for (int i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x-=dx;
  }
}
public void drawWave() {
  for (int x = 0; x < yvalues.length; x++) {
    rect(x, 2*(height/3)+yvalues[x], 1, height);
  }
}
public void sea() {
  wv_width = width;
  dx = (TWO_PI / period);
  yvalues = new float[wv_width];
  calcWave();
  drawWave();
}

//Rain, Wind, Albatross, & Boat Sailing Buttons; When rain button is turned off, drop array is cleared
public void mousePressed() {
  if (mouseX>width/100 && mouseX<50 && mouseY<16 && mouseY>2) {
    rainButton = !rainButton;
    if(rainButton == false) totalDrops = 0;
  }
  if (mouseX>39&&mouseX<95&&mouseY>25&&mouseY<41) {
    windButton = !windButton;
  }
  if (mouseX>16 && mouseX<106 && mouseY>46 && mouseY<61) {
    albatrossButton = !albatrossButton;
  }
  if (mouseX<x3&&mouseX>x4&&mouseY<y3&&mouseY>y1) {
    boatOn = !boatOn;
    boatOffset = mouseX-x1;
  }
  
}

  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "goswami_hwk_1_2" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
