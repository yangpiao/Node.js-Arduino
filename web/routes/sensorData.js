var SensorData = require('../models/sensorData'),
  Sensor = require('../models/sensor'),
  Device = require('../models/device'),
  dispatcher = require('../dispatcher');

var _query = function(q, cond) {
  if (!q || !cond) return cond;
  var from = q.from, to = q.to; // time in (from, to]
  var limit = q.n;
  // start time
  if (from) {
    cond.uploaded = {};
    cond.uploaded['$gt'] = new Date(parseInt(from, 10));
  }
  // end time
  cond.uploaded = cond.uploaded || {};
  cond.uploaded['$lte'] = to ? new Date(parseInt(to, 10)) : new Date();
  // console.log(cond);
  return cond;
};

exports.list = function(req, res) {
  var sid = req.params.sid, q = req.query, cond = { sensorId: sid };
  _query(q, cond);
  // limit
  var limit = q.n;
  if (limit) {
    limit = parseInt(limit, 10) || 1000;
  } else if (!q.from) {
    limit = 1000;
  }
  // SensorData.find(cond, function(err, data) {
  // SensorData.find(cond).sort({ uploaded: -1 }).limit(limit)
  // .sort({ uploaded: 1 })
  SensorData.find(cond).sort({ uploaded: -1 }).limit(limit)
  .exec(function(err, data) {
    if (!err) {
      data.reverse();
      res.send(data);
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.poll = function(req, res) {
  var sid = req.params.sid, ts = req.query.ts;
  ts = parseInt(ts, 10);
  if (!ts) {
    res.send(400, '');
    return;
  }
  var cond = {
    sensorId: sid,
    uploaded: { '$gt': new Date(ts) }
  };
  SensorData.find(cond).sort({ uploaded: -1 }).limit(1000)
  .exec(function(err, data) {
    if (!err) {
      if (data.length) {
        res.send(data);
      } else {
        dispatcher.hold(sid, res);
      }
    } else {
      res.send(400, '');
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
  // _query(q, cond);
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
