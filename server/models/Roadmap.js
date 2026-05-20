const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, required: true },
  readinessScore: { type: Number, required: true },
  currentSkills: [{ type: String }],
  missingSkills: [{ type: String }],
  weeks: [{
    week: { type: Number },
    focus: { type: String },
    tasks: [{ type: String }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
