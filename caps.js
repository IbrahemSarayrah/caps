'use strict';

const events= require('./events');
const faker = require('faker');
require('dotenv').config();

require('./modules/driver/driver.js');
require('./modules/vendor/vendor.js');


setInterval(()=> {
  let order = {
    storeName: process.env.STORENAME,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup',order);
},5000);