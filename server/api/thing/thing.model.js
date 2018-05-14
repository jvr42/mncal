'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ThingSchema = new Schema({
  bloque: Number,
  profesor: String,
  curso: String,
  fecha: Date
});

module.exports = mongoose.model('Thing', ThingSchema);
