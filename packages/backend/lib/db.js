'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ path: './credentials.env' });
// connects our back end code with the database

_mongoose2.default.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });
_mongoose2.default.connection.once('open', () => console.log('connected to the database'));
_mongoose2.default.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const db = exports.db = _data.Data;