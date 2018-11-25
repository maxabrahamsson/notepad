const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api', { target: 'http://notepad.ahmet.se:3001/' }));
};
