## RasPi IoT hub adventure!

This project is an adventure in learning about the IoT Hub on Azure. 

It is based on a basic LED wiring for 3 separate LEDS on pins 17, 22, and 27 -> red, yellow, and green, respectively. 

you'll have to add a config.json file that looks as such: 


```

{
    "IOT_HUB_CONN_STRING":"<your main connection string>",
    "DEVICE_CONN_STRING":"<device connection string>",
    "interval":"<interval for initial lightshow>"   
}

```

+ replace the two connection strings with the appropriate values from your Azure IoT Hub instance

+ replace the interval with how long you want the initial light show to last 


I'm currently having an issue with 
```
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
```
its throwing a NullReferenceException on the client object:  "cannot call close() on undefined".

not sure...  yet!