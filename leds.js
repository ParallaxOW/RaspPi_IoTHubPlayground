const Gpio = require('onoff').Gpio;

const { sleep, msleep, nsleep } = require("sleep");
const { client } = require("./messageProcessor");

var green, yellow, red;

var blinkInterval;

function ledSetup(){
    console.log("hello there! i'll set up the game.  :)  ")
    //set up led pins
    msleep(500);
    console.log("setting up green...");
    red = new Gpio(17, 'out'); 
    msleep(500);
    console.log("setting up yellow...");
    yellow = new Gpio(27, 'out');
    msleep(500);
    console.log("setting up red...");
    green = new Gpio(22, 'out');

    
}

function startLightShow(){
    msleep(500);
    console.log("starting blink sequence...");
    blinkInterval = setInterval(blinkLEDs, 300);

    //blink for 5 seconds and then clean up and exit.
    setTimeout(
        function() {
            endBlink(false);
        }, 
        5000);
}

function blinkLED(LED) { 
  if (LED.readSync() === 0) { 
    LED.writeSync(1); 
  } else {
    LED.writeSync(0); 
  }
}

function endBlink(exit)
{
    clearInterval(blinkInterval);
    
    if(exit){
        console.log("gotta go!");
        process.exit(0);
    }
}

function blink(name){
    switch(name){
        case "red":
            blinkLED(red);
            break;
        case "yellow":
            blinkLED(yellow);
            break;
        case "green":
            blinkLED(green);
            break;
        case "lightshow":
            startLightShow();
            break;
        default: 
            console.log("Invalid led name: " + name);
            break;
    }
}


function clearLED(LED){
    if(LED.readSync() === 1)
        LED.writeSync(0); // if its on, turn LED off

    LED.unexport();
}

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
    console.log("closing AMQP client...")
    client.close(
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log(result);
                console.log("client disconnected!");
            }
        }
    );
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

module.exports = {
    ledSetup: ledSetup,
    blinkLED: blinkLED,
    clearLED: clearLED,
    blinkLEDs: blinkLEDs,
    blinkInterval: blinkInterval,
    endBlink: endBlink,
    green: green, 
    yellow: yellow, 
    red: red,
    exitHandler: exitHandler,
    startLightShow: startLightShow,
    blink: blink
};

