'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const host = process.env.HOST;
const connectionToDriver = io.connect(`${host}/caps`);


connectionToDriver.emit('getAll');

connectionToDriver.on('forPickup',forPickup);

function forPickup(payload){

  console.log(`DRIVER: will get the order :`, payload.id);
  connectionToDriver.emit('received', payload.id);

  // setTimeout(()=>{
  //   console.log(`DRIVER: picked up ${payload.orderId}`);
    
  //   connectionToDriver.emit('in-transit',payload);
  // },1500);

  setTimeout(()=>{
    console.log(`DRIVER: picked up the order`);
    
    connectionToDriver.emit('in-transit',payload);
  },1500);

  setTimeout(()=>{
    console.log(`DRIVER: delivered :` , payload.id);
    connectionToDriver.emit('delivered', payload);
  },3000);
}
