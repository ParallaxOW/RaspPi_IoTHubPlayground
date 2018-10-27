const fs = require('fs');
const path = require('path');
const { sleep, msleep, nsleep } = require("sleep");

const Client = require('azure-iot-device').Client;
const ConnectionString = require('azure-iot-device').ConnectionString;
const Message = require('azure-iot-device').Message;
const Protocol = require('azure-iot-device-mqtt').Mqtt;

const bi = require('az-iot-bi');

const Gpio = require('onoff').Gpio;

console.log("hello there! i'll set up the game.  :)  ")
//set up led pins
msleep(500);
console.log("setting up green...");
var green = new Gpio(17, 'out'); 
msleep(500);
console.log("setting up yellow...");
var yellow = new Gpio(27, 'out');
msleep(500);
console.log("setting up red...");
var red = new Gpio(22, 'out');

function blinkLED(LED) { 
  if (LED.readSync() === 0) { 
    LED.writeSync(1); 
  } else {
    LED.writeSync(0); 
  }
}

function clearLED(LED){
    if(LED.readSync() === 1)
        LED.writeSync(0); // if its on, turn LED off

    LED.unexport();
}

msleep(500);
console.log("starting blink sequence...");
var blinkInterval = setInterval(blinkLEDs, 300);

async function blinkLEDs(){
  blinkLED(green);
  await new Promise(done => setTimeout(done, 100)).catch();
  blinkLED(yellow);
  await new Promise(done => setTimeout(done, 100)).catch();
  blinkLED(red);
  await new Promise(done => setTimeout(done, 100)).catch();
}


//exit handler.  clean up GPIO so we don't get a 
//error on next run for the pins being blocked.
function exitHandler() {
    console.log('cleaning up...');
    clearInterval(blinkInterval);
    msleep(500);
    console.log("deallocating red...")
    clearLED(red);
    msleep(500);
    console.log("deallocating yellow...")
    clearLED(yellow);
    msleep(500);
    console.log("deallocating green...")
    clearLED(green)  
    msleep(500);
    console.log("I'M OUT! SEE YA!");
}

setTimeout(endBlink, 15000);

function endBlink()
{
    clearInterval(blinkInterval);
    console.log("gotta go!");
    process.exit(0);
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,null));

//catches ctrl+c event, and pitches into endBlink to start the end process.
process.on('SIGINT', endBlink.bind(null, null));
