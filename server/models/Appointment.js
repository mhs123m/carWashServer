const mongoose = require('mongoose'),
{ Schema } = mongoose;

const AppointmentSchema = new Schema({
    
    index: {
        type: Number,
        
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