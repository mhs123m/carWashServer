const mongoose = require('mongoose'),
{ Schema } = mongoose;
const geocoder = require('../utils/geocoder')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// create StoreSchema
const StoreSchema = new Schema ({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 9,
        unique: true
    },
    logo: {
        type: String,
        required: false,


    }, 

    geometry: {
        type: {
          type: String, 
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    password: {
        type: String,
        require: true,
        minlength: 6
    },

    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

StoreSchema.methods.toJSON = function () {
    var store = this
    var storeObject = store.toObject()

    return _.pick(storeObject, ['_id', 'name', 'email', 'phone', 'logo', 'geometry' ])
}

StoreSchema.methods.generateAuthToken = function () {
    var store = this
    var access = 'auth'
    var token = jwt.sign({ _id: store._id.toHexString(), access }, process.env.JWT_SECRET || 'lacorbi86')

    store.tokens.push({ access, token })

    return store.save().then(() => {
        return token
    })
}


StoreSchema.methods.removeToken = function (token) {
    var store = this

    return store.update({
        $pull: {
            tokens: { token }
        }
    })
}

StoreSchema.statics.findByToken = function (token) {
    var store = this
    var decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'lacorbi86')
    } catch (e) {
		console.log(e)
        return Promise.reject()
    }

    return store.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

StoreSchema.statics.findByCredentials = function (email, password) {
    var Store = this

    return Store.findOne({ email }).then((store) => {
        
        if (!store) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, store.password, (err, res) => {
                if (res) {
                    resolve(store)
                } else {
                    reject(err)
                }
            })
        })
    })
}

/** Defines a pre hook for the document. */
StoreSchema.pre('save', function (next) {
    var store = this

    if (store.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(store.password, salt, (err, hash) => {
                store.password = hash
                next()
            })
        })
    } else {
        next()
    }


})

// StoreSchema.pre('save', async function (next) {

// const loc = await geocoder.geocode(this.address);
// this.location = {
//     type: 'Point',
//     coordinates : [loc[0].longitude,loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress
// };
// // do not save address in db
// this.address = undefined;
// next()

// });

module.exports = mongoose.model('Store', StoreSchema);