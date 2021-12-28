const mongoose = require('mongoose'),
    { Schema } = mongoose;
const _ = require('lodash');



// create ServiceSchema
const ServiceSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },
    durationInMin: {
        type: Number,
        trim: true,
        default: 30
    },

    price: {
        type: Number,
        trim: true,
    },

    availble: {
        type: Boolean,
        default: false
    },

    storeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Store',
	},


}, {
    timestamps: true
})

// ServiceSchema.methods.toJSON = function () {
//     var service = this
//     var serviceObject = service.toObject()

//     return _.pick(serviceObject, ['_id', 'title', 'description', 'price', 'store'])
// }

module.exports = mongoose.model('Service', ServiceSchema);