var Sensor = require('../models/sensor'),
  Device = require('../models/device');

exports.list = function(req, res) {
  var deviceId = req.params.deviceId || req.query.device || null;
  if (deviceId) {
    Sensor.find({ deviceId: deviceId }, function(err, sensors) {
      if (!err) {
        res.send(sensors);
      } else {
        res.send(400, {
          error: err
        });
      }
    });
  } else {
    Sensor.find(function(err, sensors) {
      if (!err) {
        res.send(sensors);
      } else {
        res.send(400, {
          error: err
        });
      }
    });
  }
};

exports.findDevice = function(req, res, next) {
  var id = req.params.deviceId;
  Device.findById(id, function(err, device) {
    if (!err) {
      req.device = device;
      next();
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.show = function(req, res) {
  var id = req.params.id,
    deviceId = req.params.deviceId,
    cond = { _id: id, deviceId: deviceId };
  Sensor.findOne(cond, function(err, sensor) {
    if (!err) {
      if (sensor) {
        res.send(sensor);
      } else {
        res.send(400, {
          error: 'Sensor not found'
        });
      }
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.create = function(req, res) {
  var device = req.device, bd = req.body;
  if (device) {
    (new Sensor({
      deviceId: device._id,
      name: bd.name,
      description: bd.description
    })).save(function(err, sensor) {
      if (!err) {
        res.send(sensor);
      } else {
        res.send(400, {
          error: err
        });
      }
    });
  } else {
    res.send(400, {
      error: 'Device not found'
    });
  }
};

exports.update = function(req, res) {
  var id = req.params.id,
    deviceId = req.params.deviceId,
    cond = { _id: id, deviceId: deviceId },
    bd = req.body,
    name = bd.name,
    description = bd.description,
    data = {};
  if (name) data.name = name;
  if (description) data.description = description;

  Sensor.findOneAndUpdate(cond, data, function(err, sensor) {
    if (!err) {
      if (sensor) {
        res.send(sensor);
      } else {
        res.send(400, {
          error: 'Sensor not found'
        });
      }
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.remove = function(req, res) {
  var id = req.params.id,
    deviceId = req.params.deviceId,
    cond = { _id: id, deviceId: deviceId };
  Sensor.findOneAndRemove(cond, function(err, sensor) {
    if (!err) {
      if (sensor) {
        res.send(sensor);
      } else {
        res.send(400, {
          error: 'Sensor not found'
        });
      }
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};
