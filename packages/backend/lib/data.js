'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// /backend/data.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

// this will be our data base's data structure
const DataSchema = new Schema({
  message: String,
  uid: String
}, { timestamps: true });

const Data = exports.Data = mongoose.model('Data', DataSchema);