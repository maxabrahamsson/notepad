// @flow

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import SwaggerExpress from 'swagger-express-mw';
import { db } from './db';

const API_PORT = 3001;
const app = express();
dotenv.config({ path: './credentials.env' });

admin.initializeApp({
  credential: admin.credential.cert(process.env),
  databaseURL: 'https://notepad-d8d76.firebaseio.com',
});
export const dbConnection = db;
export async function validateJWT(jwt: any) {
  const decodedToken = await admin.auth().verifyIdToken(jwt);
  return {
    uuid: decodedToken.uid,
    name: decodedToken.email,
  };
}

const swaggerConfig = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    Bearer: async (req, authOrSecDef, scopesOrApiKey, cb) => {
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
        const userPayload = await validateJWT(jwt);
        req.swagger.params.userId = userPayload.uuid;
        cb(null);
      } catch (err) {
        cb(err);
      }
    },
  },
  validateResponse: true,
};

// Allow all CORS requests
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
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
