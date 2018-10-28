'use strict';
var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var config = require("./config.json");

var connectionString = config.DEVICE_CONN_STRING;
 
var client = clientFromConnectionString(connectionString);
 
var LED = require("./leds");


module.exports = 
{
    connectCallback : function(err) {
      if (err) {
        console.error('Could not connect: ' + err);
      } else {
        console.log('Client connected');
        var msg = new Message('I have arrived!');
        client.sendEvent(msg, function (err) {
          if (err) {
            console.log(err.toString());
          } else {
            console.log('Message sent');
          };
        });

        client.on('message', function (msg) { 
          var msgJson = JSON.parse(msg.data.toString('utf8'));
          
          if(msgJson.led){
            LED.blink(msgJson.led);
          }else{
            console.log(msg.data.toString('utf8'));
          }

          client.complete(msg, function () {
            console.log('completed');
          });
        });    
      }
    },
    client: client
};
 
 
