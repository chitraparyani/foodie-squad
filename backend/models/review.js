const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true},
  userName: { type: String, required: true},
  restId: { type: String, required: true},
  rating: { type: Number, required: true}
});

module.exports = mongoose.model('Review', reviewSchema);
