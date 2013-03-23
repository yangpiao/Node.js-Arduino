var mg = require('mongoose'),
  Schema = mg.Schema;

var DeviceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  registered: { type: Date, default: Date.now }
});

module.exports = mg.model('Device', DeviceSchema);
