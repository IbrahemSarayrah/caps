'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const host = process.env.HOST;
const connectionToDriver = io.connect(`${host}/caps`);

connectionToDriver.on('forPickup',forPickup);

function forPickup(payload){
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderId}`);
    connectionToDriver.emit('in-transit',payload);
  },1500);

  setTimeout(()=>{
    console.log(`DRIVER: delivered ${payload.orderId}`);
    connectionToDriver.emit('delivered', payload);
  },3000);
}
