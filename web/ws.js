var Sensor = require('./models/sensor'),
  SensorData = require('./models/sensorData'),
  dispatcher = require('./dispatcher');

function save(data) {
  var sid = data.sensorId, cond = { _id: sid }, value = data.data;
  if (!sid || typeof value != 'number') return;
  Sensor.findOne(cond, function(err, sensor) {
    if (!err && sensor) {
      (new SensorData({
        value: value,
        deviceId: sensor.deviceId,
        sensorId: sid
      })).save(function(err, data) {
        if (!err) {
          dispatcher.dispatch(data);
        }
      });
    }
  });
}

module.exports = function(ws) {
  ws.sockets.on('connection', function(sock) {
    sock.on('upload-sensor-data', function(data) {
      // console.log('[message]', data);
      save(data);
    });
  });
};
