const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    identification: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    students_amount: {
      type: Number,
      required: false,
    },
    course_period: {
      type: Number,
      default: 0,
      required: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Form', schema);
