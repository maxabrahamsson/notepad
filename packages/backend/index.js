const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

const Data = require('./data');

const API_PORT = 3001;
const app = express();
const router = express.Router();
dotenv.config({ path: './credentials.env' });

// this is our MongoDB database
const dbRoute = process.env.MONGOLAB_URI;

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true },
);
admin.initializeApp({
  credential: admin.credential.cert(process.env),
  databaseURL: 'https://notepad-d8d76.firebaseio.com',
});

async function validateJWT(jwt) {
  const decodedToken = await admin.auth().verifyIdToken(jwt);
  return {
    uuid: decodedToken.uid,
    name: decodedToken.email,
  };
}

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Allow all CORS requests
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.post('/getData', async (req, res) => {
  const { jwt } = req.body;
  const decoded = await validateJWT(jwt);
  Data.find({ uid: decoded.uuid }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', async (req, res) => {
  const { id, update, jwt } = req.body;
  const decoded = await validateJWT(jwt);
  Data.findOneAndUpdate({ _id: id, uid: decoded.uuid }, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', async (req, res) => {
  const { _id, jwt } = req.body;
  const decoded = await validateJWT(jwt);
  Data.findOneAndDelete({ _id, uid: decoded.uuid }, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', async (req, res) => {
  const data = new Data();
  const { message, jwt } = req.body;
  const decoded = await validateJWT(jwt);

  if (!message || !jwt) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.uid = decoded.uuid;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
