const fs = require('fs');
const path = require('path');
const { sleep, msleep, nsleep } = require("sleep");
const messProc = require("./messageProcessor");
const config = require("./config.json");

//pull in functions 
const { ledSetup, startLightShow, endBlink, exitHandler } = require("./leds");

//setup LEDS 
ledSetup();

//start light show.  TESTING LEDS only.
startLightShow();

messProc.client.open(messProc.connectCallback);

//do something when app is closing
process.on('exit', exitHandler.bind(null,true));

//catches ctrl+c event, and pitches into endBlink to start the end process.
process.on('SIGINT', endBlink.bind(null, true));
