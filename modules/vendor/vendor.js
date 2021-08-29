'use strict';

const events = require('../../events.js');


events.on('pickup', pickup);

function pickup(payload){
  console.log(
    'EVENT',{
      event:'pickup',
      time: new Date(),
      payload:payload,
    });
  events.emit('in-transit',payload);
}

events.on('delivered',delivered);

function delivered(payload){
  console.log(`DRIVER: delivered up ${payload.orderId}`);
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  console.log(
    'EVENT',{
      event:'delivered',
      time: new Date(),
      payload:payload,
    },
  );
}