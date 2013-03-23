var mg = require('mongoose'), Schema = mg.Schema;

var SensorSchema = new Schema({
  deviceId: { type: Schema.ObjectId, required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  registered: { type: Date, default: Date.now }
});

module.exports = mg.model('Sensor', SensorSchema);
