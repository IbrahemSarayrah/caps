'use strict';

require('dotenv').config();
const port = process.env.PORT || 3005;
const io = require('socket.io')(port);
const uuid = require('uuid').v4;


const caps = io.of('/caps');


const messagesQueue = {
  orderQueue: {},
};

caps.on('connection', (socket) => {
  console.log('connected to Queue-Server');
  
  ////// pickup
  socket.on('pickup', pickup);

  function pickup(payload) {
    console.log(
      'EVENT', {
        event: 'pickup',
        time: new Date(),
        payload: payload,
      });

    const id = uuid();
    messagesQueue.orderQueue[id] = payload;
    socket.emit('addedOrderInQueue' ,payload);
    caps.emit('forPickup', { id, payload: messagesQueue.orderQueue.id });
  }

  socket.on('getAll', () => {
    console.log('send all order to the driver when connected');
    Object.keys(messagesQueue.orderQueue).forEach(id => {
      socket.emit('forPickup', { id, payload: messagesQueue.orderQueue[id] });
    });
  });

  socket.on('received', id => {
    delete messagesQueue.orderQueue[id];
  });

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