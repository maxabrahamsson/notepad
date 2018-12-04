'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateJWT = exports.dbConnection = undefined;

let validateJWT = exports.validateJWT = (() => {
  var _ref = _asyncToGenerator(function* (jwt) {
    const decodedToken = yield _firebaseAdmin2.default.auth().verifyIdToken(jwt);
    return {
      uuid: decodedToken.uid,
      name: decodedToken.email
    };
  });

  return function validateJWT(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _swaggerExpressMw = require('swagger-express-mw');

var _swaggerExpressMw2 = _interopRequireDefault(_swaggerExpressMw);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const API_PORT = 3001;
const app = (0, _express2.default)();
_dotenv2.default.config({ path: './credentials.env' });

_firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.cert(process.env),
  databaseURL: 'https://notepad-d8d76.firebaseio.com'
});
const dbConnection = exports.dbConnection = _db.db;


const swaggerConfig = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    Bearer: (() => {
      var _ref2 = _asyncToGenerator(function* (req, authOrSecDef, scopesOrApiKey, cb) {
        if (!scopesOrApiKey) {
          cb(new Error('Missing Bearer token'));
          return;
        }

        const matches = scopesOrApiKey.match(/^Bearer (.+)$/i);
        if (!matches) {
          cb(new Error('Bad Bearer token'));
          return;
        }

        const jwt = matches[1];
        try {
          const userPayload = yield validateJWT(jwt);
          req.swagger.params.userId = userPayload.uuid;
          cb(null);
        } catch (err) {
          cb(err);
        }
      });

      return function Bearer(_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    })()
  },
  validateResponse: true
};

// Allow all CORS requests
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));
_swaggerExpressMw2.default.create(swaggerConfig, (err, swaggerExpress) => {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);
  swaggerExpress.runner.on('responseValidationError', (validationResponse, request, response) => {
    response.json(validationResponse.errors);
  });

  app.get('/', (req, res) => {
    res.sendFile(`${_dirname}/swagger/swagger.yaml`);
  });

  app.listen(API_PORT);
  console.log(`Listening on port ${API_PORT}`);
});