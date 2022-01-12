const mongoose = require('mongoose'),
    { Schema } = mongoose;

const slot = {
    duration: {
        type: Number,
        default: 30,
        immutable: true
    },
    available: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Done', 'Cancelled'],
        default: 'Pending'
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },

};

const date = {
    day: {
        type: Date,
        required: true
    },
    slot: [{
        type: slot,
        required: true
    }]

};

const AppointmentSchema = new Schema({

    day: [{
        type: date, // date of appointment 
        required: true

    }],
    timestamps: true
});

module.exports = mongoose.model('Appointment', AppointmentSchema);