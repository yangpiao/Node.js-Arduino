var index = require('./routes/index'),
  device = require('./routes/device'),
  sensor = require('./routes/sensor'),
  sensorData = require('./routes/sensorData');
  command = require('./routes/command');

module.exports = function(app) {
  app.get('/', index);
  // devices
  app.get('/devices', device.list);
  app.post('/devices', device.create);
  app.get('/devices/:id', device.show);
  app.put('/devices/:id', device.update);
  app.delete('/devices/:id', device.remove);
  // sensors
  app.get('/sensors', sensor.list);
  app.get('/devices/:deviceId/sensors', sensor.list);
  app.post('/devices/:deviceId/sensors', sensor.findDevice, sensor.create);
  app.get('/devices/:deviceId/sensors/:id', sensor.show);
  app.put('/devices/:deviceId/sensors/:id', sensor.update);
  app.delete('/devices/:deviceId/sensors/:id', sensor.remove);
  // sensor data
  // app.get('/devices/:did/sensors/:sid/data', sensorData.list);
  // app.post('/devices/:did/sensors/:sid/data',
  //   sensorData.findSensor, sensorData.create);
  // app.delete('/devices/:did/sensors/:sid/data', sensorData.clear);
  app.get('/sensors/:sid/data', sensorData.list);
  app.post('/sensors/:sid/data', sensorData.findSensor, sensorData.create);
  app.delete('/sensors/:sid/data', sensorData.clear);
  app.get('/sensors/:sid/poll', sensorData.poll);

  app.post('/commands/send', command.send);
};
