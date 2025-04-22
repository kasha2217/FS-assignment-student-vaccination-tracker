const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  parentContact: {
    type: String
  },
  vaccinationStatus: {
    type: String,
    enum: ['pending', 'vaccinated'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date
  },
  vaccineType: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student
