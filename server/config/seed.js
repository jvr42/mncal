/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      bloque: 4,
      profesor: 'Carlos Torres',
      curso: '5A',
      fecha: 1525057200000      
    },{
      bloque: 4,
      profesor: 'Jesus Villarroel',
      curso: '5A',
      fecha: 1525316400000      
    },{
      bloque: 2,
      profesor: 'Marcela Aracena',
      curso: '8A',
      fecha: 1525316400000      
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating data');
    });
  });
