var Device = require('../models/device'),
  Sensor = require('../models/sensor'),
  SensorData = require('../models/sensorData');

exports.list = function(req, res) {
  Device.find(function(err, devices) {
    if (!err) {
      res.send(devices);
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.create = function(req, res) {
  var bd = req.body;
  var device = new Device({
    name: bd.name,
    description: bd.description
  });
  device.save(function(err, device) {
    if (!err) {
      res.send(device);
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.findById = function(req, res, next) {
};

exports.show = function(req, res) {
  var id = req.params.id;
  Device.findById(id, function(err, device) {
    if (!err) {
      if (device) {
        res.send(device);
      } else {
        res.send(400, {
          error: 'Device not found'
        });
      }
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var bd = req.body, name = bd.name, desc = bd.description, data = {};
  if (name) data.name = name;
  if (desc) data.description = desc;
  Device.findByIdAndUpdate(id, data, function(err, device) {
    if (!err) {
      res.send(device);
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};

function removeSensorAndData(id, res) {
  Sensor.remove({ deviceId: id }, function(err) {
    if (!err) {
      SensorData.remove({ deviceId: id }, function(err) {
        if (!err) {
          res.send('');
        } else {
          res.send(400, {
            error: err
          });
        }
      });
    } else {
      res.send(400, {
        error: err
      });
    }
  });
}

exports.remove = function(req, res) {
  Device.findByIdAndRemove(req.params.id, function(err, device) {
    if (!err) {
      removeSensorAndData(device._id, res);
    } else {
      res.send(400, {
        error: err
      });
    }
  });
};
