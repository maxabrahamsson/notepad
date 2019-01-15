'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNote = exports.deleteNote = exports.updateNote = exports.getNotes = undefined;

let getNotes = exports.getNotes = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const { userId } = req.swagger.params;
    _index.dbConnection.find({ uid: userId }, function (err, data) {
      if (err) return res.json({ result: false, error: err });
      return res.json(data);
    });
  });

  return function getNotes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let updateNote = exports.updateNote = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const { id, message } = req.body;
    const { userId } = req.swagger.params;
    console.log(id);
    console.log(message);
    console.log(userId);
    _index.dbConnection.findOneAndUpdate({ _id: id, uid: userId }, { message }, function (err) {
      if (err) return res.json({ result: false, error: err });
      return res.json({ result: true });
    });
  });

  return function updateNote(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let deleteNote = exports.deleteNote = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const noteId = req.swagger.params.noteId.value;
    const { userId } = req.swagger.params;
    _index.dbConnection.findOneAndDelete({ _id: noteId, uid: userId }, function (err) {
      if (err) return res.send(err);
      return res.json({ result: true });
    });
  });

  return function deleteNote(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let addNote = exports.addNote = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const data = new _data.Data();
    const { message } = req.body;
    const { userId } = req.swagger.params;

    if (!message) {
      return res.json({
        result: false,
        error: 'INVALID INPUTS'
      });
    }
    data.message = message;
    data.uid = userId;
    data.save(function (err) {
      if (err) return res.json({ result: false, error: err });
      return res.json({ result: true });
    });
  });

  return function addNote(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

var _index = require('../../index');

var _data = require('../../data');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }