const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentRole: { type: String, required: true },
  targetRole: { type: String, required: true },
  roadmapContent: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
