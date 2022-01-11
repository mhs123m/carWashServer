const mongoose = require('mongoose'),
{ Schema } = mongoose;

const date = {
    year:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    day:{
        type:Number,
        required:true
    },
    hour:{
        type:Number,
        required:true
    },
    minutes:{
        type:Number,
        required:true
    },
    index: {
        type: Number,
        require: true,
        unique: true
    }
};

const AppointmentSchema = new Schema({
    
    date: {
        type: date,
        required: true
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