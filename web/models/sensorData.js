var mg = require('mongoose'), Schema = mg.Schema;

var DataSchema = new Schema({
  value: { type: Number, required: true },
  uploaded: { type: Date, default: Date.now },
  deviceId: { type: Schema.ObjectId, required: true },
  sensorId: { type: Schema.ObjectId, required: true }
});

module.exports = mg.model('SensorData', DataSchema);
