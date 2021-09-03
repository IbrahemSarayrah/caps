'use strict';

const faker=require('faker');
require('dotenv').config();

const port = 3010;
const ioServer = require('socket.io')(port);

const caps = ioServer.of('/caps');
const io = require('socket.io-client');
const host = process.env.HOST;
const hubConnection = io.connect(`${host}/caps`);

let payload={
  storeName: process.env.STORENAME,
  orderId: faker.datatype.uuid(),
  customerName: faker.name.findName(),
  address: faker.address.streetAddress(),
};

describe('test hubjs ', () => {
    

  test('test pickup  ',  async() => {
    
    await expect(hubConnection.emit('pickup',payload)).toBeTruthy();
  });

  test('test addedOrderInQueue ',  async() => {
    
    await expect(caps.emit('addedOrderInQueue',payload)).toBeTruthy();
  });

  test('test forPickup  ',  async() => {
    
    await expect(caps.emit('forPickup',payload)).toBeTruthy();
  });

  test('test getAll  ',  async() => {
    
    await expect(caps.emit('forPickup',payload)).toBeTruthy();
  });

  test('test in-transit',  async() => {
    
    await expect(hubConnection.emit('in-transit',payload)).toBeTruthy();
  });

  test('test delivered ',  async() => {
    
    await expect(hubConnection.emit('delivered',payload)).toBeTruthy();
  });

  test('test vendorDelivered ',  async() => {
    
    await expect(caps.emit('vendorDelivered',payload)).toBeTruthy();
  });

});
