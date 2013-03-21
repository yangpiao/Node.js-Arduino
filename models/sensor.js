var mg = require('mongoose'),
  Schema = mg.Schema,
  SensorData = requre('./sensorData');

var SensorSchema = new Schema({
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  data: [SensorSchema], // ?
  created: { type: Date, default: Date.now }
});

module.exports = mg.model('Sensor', SensorSchema);
