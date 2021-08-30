'use strict';

require('dotenv').config();
const port = process.env.PORT || 3005;
const io = require('socket.io')(port);

const caps = io.of('/caps');

caps.on('connection', (socket) => {

  ///// pickup
  socket.on('pickup', pickup);

  function pickup(payload) {
    console.log(
      'EVENT', {
        event: 'pickup',
        time: new Date(),
        payload: payload,
      });
    caps.emit('forPickup', payload);
  }

  ///// in-transit
  socket.on('in-transit', inTransit);

  function inTransit(payload) {
    console.log(
      'EVENT', {
        event: 'in-transit',
        time: new Date(),
        payload: payload,
      });
  }

  ///// delivered
  socket.on('delivered', delivered);

  function delivered(payload) {
    console.log(
      'EVENT', {
        event: 'delivered',
        time: new Date(),
        payload: payload,
      },
    );
    caps.emit('vendorDelivered',payload);
  }

});
