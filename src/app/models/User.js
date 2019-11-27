const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      default: 0,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', schema);