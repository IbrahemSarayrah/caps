'use strict';

const events=require('../events');
const faker=require('faker');
require('../caps');
require('../modules/driver/driver');
require('../modules/vendor/vendor');
require('dotenv').config();

describe('test caps ', () => {

  let payload={
    storeName: process.env.STORENAME,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  let consoleSpy = jest.spyOn(console, 'log');


  test('test pickup  ',  async() => {
    events.emit('pickup', payload);
    
    await expect(consoleSpy).toHaveBeenCalled();
  });

  test('test in-transit  ',async() => {
    events.emit('in-transit', payload);

    await expect(consoleSpy).toHaveBeenCalled();
  });

  test('test delivered  ',async () => {
    events.emit('delivered', payload);
    
    await  expect(consoleSpy).toHaveBeenCalled();
  });
});

