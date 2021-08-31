'use strict';

const faker = require('faker');
require('dotenv').config();
const io = require('socket.io-client');
const host = process.env.HOST;
const connectionToVendor =io.connect(`${host}/caps`);


setInterval(()=> {
  let order = {
    storeName: process.env.STORENAME,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  connectionToVendor.emit('pickup',order);
},5000);

connectionToVendor.on('addedOrderInQueue', ordersQueue);

function ordersQueue(payload){
  console.log(`VENDOR: Order in Queue :`, payload.orderId);

}

connectionToVendor.on('vendorDelivered',delivered);

function delivered(payload){
  console.log(`VENDOR: Thank you for delivering :`, payload.id);

}
