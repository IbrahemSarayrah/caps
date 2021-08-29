'use strict';

const events = require('../../events.js');

require('../vendor/vendor.js');

events.on('in-transit',inTransit);

function inTransit(payload){
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderId}`);
    console.log( 
      'EVENT',{
        event:'in-transit',
        time: new Date(),
        payload:payload,
      },
    );
  },1000);

  setTimeout(()=>{
    events.emit('delivered', payload);
  },3000);
}
