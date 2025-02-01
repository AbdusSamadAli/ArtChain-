const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filePath: { type: String, required: true }, 
  blockchainHash: { type: String, required: true }, 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  createdAt: { type: Date, default: Date.now }
});

artworkSchema.virtual('ownerName', {
  ref: 'User', 
  localField: 'owner', 
  foreignField: '_id', 
  justOne: true 
});

module.exports = mongoose.model('Artwork', artworkSchema);

