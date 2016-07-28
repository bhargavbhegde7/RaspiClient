var gpio = require("gpio");
var io = require('socket.io-client');
//var serverUrl = 'http://159.203.161.191:8090';
var serverUrl = 'http://localhost:8090/';
var conn = io.connect(serverUrl);

var turnLightOn = function(pinNumber){
    gpioPin = gpio.export(pinNumber,{
            ready: function(){
              gpioPin.set();
              setTimeout(function() {
                gpioPin.reset();
              }, 1000 );
            }
    });
  }

conn.emit('register', '{"userID" : "raspberry"}');

conn.on('response',function(msg){
  console.log(msg);

  if(msg.indexOf('green') > -1){
    turnLightOn(18);
  }

  if(msg.indexOf('red') > -1){
  	turnLightOn(16);
  }

});
