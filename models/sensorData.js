var mg = require('mongoose'), Schema = mg.Schema;

var DataSchema = new Schema({
  value: Number,
  uploaded: { type: Date, default: Date.now }
});

module.exports = mg.model('SensorData', DataSchema);
