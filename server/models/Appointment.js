const mongoose = require('mongoose'),
{ Schema } = mongoose;

const AppointmentSchema = new Schema({
    _id: {
        type: Number,
        unique: true
    },
    index: {
        type: Number,
        unique: true
    },
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
        enum: ['Pending', 'Done', 'Cancelled']
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
});

module.exports = mongoose.model('Appointment', AppointmentSchema);