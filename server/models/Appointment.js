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
    index: {
        type: Number,
        required: true,
        // unique: true , I need to work around the appointment schema to have the index working correct
        // i should have a day schema that have array of appointments
    }

};

const date = {
    day: {
        type: String,
        default: Date.now,
    },
    slot: {
        type: slot,
        required: true
    }

};

const AppointmentSchema = new Schema({

    day: {
        type: date, // date of appointment 
        required: true

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
    }
}
    , {
        timestamps: true
    });

module.exports = mongoose.model('Appointment', AppointmentSchema);