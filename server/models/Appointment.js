const mongoose = require('mongoose'),
{ Schema } = mongoose;

const AppointmentSchema = new Schema({
    startTime: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);