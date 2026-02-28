const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  contact: { type: String },
  description: { type: String },
  status: { type: String, enum: ['lost', 'found'], default: 'lost' },
}, { timestamps: true });

module.exports = mongoose.model('LostItem', LostItemSchema);
