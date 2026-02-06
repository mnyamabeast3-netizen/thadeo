const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  queuePosition: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Waiting', 'Called', 'In-Consultation', 'Completed'],
    default: 'Waiting'
  },
  arrivalTime: Date,
  calledTime: Date,
  consultationStartTime: Date,
  consultationEndTime: Date,
  estimatedWaitTime: Number,
  actualWaitTime: Number,
  priority: {
    type: String,
    enum: ['Normal', 'High', 'Emergency'],
    default: 'Normal'
  },
  notes: String,
  queueDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

QueueSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Queue', QueueSchema);