const mongoose = require('mongoose'),
{ Schema } = mongoose;
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// create UserSchema
const UserSchema = new Schema({
    fullname: {
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

UserSchema.methods.toJSON = function () {
    var user = this
    var userObject = user.toObject()

    return _.pick(userObject, ['_id', 'fullname', 'email', 'phone' ])
}

UserSchema.methods.generateAuthToken = function () {
    var user = this
    var access = 'auth'
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET || 'lacorbi86').toString()

    user.tokens.push({ access, token })

    return user.save().then(() => {
        return token
    })
}


UserSchema.methods.removeToken = function (token) {
    var user = this

    return user.update({
        $pull: {
            tokens: { token }
        }
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this
    var decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'lacorbi86')
    } catch (e) {
		console.log(e)
        return Promise.reject()
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this

    return User.findOne({ email }).then((user) => {
        
        if (!user) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                } else {
                    reject(err)
                }
            })
        })
    })
}

/** Defines a pre hook for the document. */
UserSchema.pre('save', function (next) {
    var user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('User', UserSchema);