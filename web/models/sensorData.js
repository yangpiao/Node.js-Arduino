var mg = require('mongoose'), Schema = mg.Schema;

var DataSchema = new Schema({
  value: { type: Number, required: true },
  uploaded: { type: Date, default: Date.now }
});

module.exports = mg.model('SensorData', DataSchema);
