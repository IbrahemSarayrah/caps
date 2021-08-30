'use strict';

const faker=require('faker');
require('dotenv').config();

const port = 3005;
const ioServer = require('socket.io')(port);

const caps = ioServer.of('/caps');
const io = require('socket.io-client');
const host = process.env.HOST;
const capsConnection = io.connect(`${host}/caps`);

describe('test caps ', () => {

  let payload={
    storeName: process.env.STORENAME,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };


  test('test pickup  ',  async() => {
    
    await expect(capsConnection.emit('pickup',payload)).toBeTruthy();
  });

  test('test forPickup  ',  async() => {
    
    await expect(caps.emit('forPickup',payload)).toBe(true);
  });

  test('test in-transit',  async() => {
    
    await expect(capsConnection.emit('in-transit',payload)).toBeTruthy();
  });

  test('test delivered ',  async() => {
    
    await expect(capsConnection.emit('delivered',payload)).toBeTruthy();
  });

  test('test vendorDelivered ',  async() => {
    
    await expect(caps.emit('vendorDelivered',payload)).toBe(true);
  });

});
