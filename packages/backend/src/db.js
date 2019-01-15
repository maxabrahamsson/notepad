// @flow
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Data } from './data';

dotenv.config({ path: './credentials.env' });
// connects our back end code with the database
mongoose.connect(
  process.env.MONGOLAB_URI,
  { useNewUrlParser: true },
);
mongoose.connection.once('open', () => console.log('connected to the database'));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

export const db = Data;
