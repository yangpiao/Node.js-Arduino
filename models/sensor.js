var mg = require('mongoose'),
  Schema = mg.Schema,
  SensorData = requre('./sensorData');

var SensorSchema = new Schema({
  deviceId: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  data: [ SensorSchema ],
  registered: { type: Date, default: Date.now }
});

module.exports = mg.model('Sensor', SensorSchema);
