const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  targetRole: { type: String, required: true },
  action: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
