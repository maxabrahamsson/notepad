// /backend/data.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    message: String,
    uid: String,
  },
  { timestamps: true },
);

export const Data = mongoose.model('Data', DataSchema);
