var SensorData = require('../models/sensorData'),
  Sensor = require('../models/sensor'),
  Device = require('../models/device');

var _query = function(q, cond) {
  if (!q || !cond) return cond;
};

exports.list = function(req, res) {
  var sid = req.params.sid, q = req.query, cond = { sensorId: sid };
  _query(q, cond);
  SensorData.find(cond, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.findSensor = function(req, res, next) {
  var sid = req.params.sid, cond = { _id: sid };
  Sensor.findOne(cond, function(err, sensor) {
    if (!err) {
      req.sensor = sensor;
      next();
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.create = function(req, res) {
  var sensor = req.sensor, value = req.body.data;
  if (sensor) {
    if (value) {
      (new SensorData({
        value: value,
        deviceId: sensor.deviceId,
        sensorId: sensor._id
      })).save(function(err, data) {
        if (!err) {
          res.send(data);
        } else {
          res.send(400, {
            error: err
          });
        }
      });
    } else {
      res.send(400, {
        error: 'No data'
      });
    }
  } else {
    res.send(400, {
      error: 'Sensor not found'
    });
  }
};

exports.clear = function(req, res) {
  var sid = req.params.sid, q = req.query, cond = { sensorId: sid };
  _query(q, cond);
  SensorData.remove(cond, function(err) {
    if (!err) {
      res.send('');
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};
