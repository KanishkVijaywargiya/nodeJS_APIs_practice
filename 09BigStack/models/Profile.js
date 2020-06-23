const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    // user denotes here is about linking Person.js with Profile.js
    user: {
        type: Schema.Types.ObjectId,
        ref: 'myPerson'
    },
    username: {
        type: String,
        required: true,
        max: 50
    },
    website: {
        type: String
    },
    country: {
        type: String
    },
    languages: {
        type: [String],
        req: true
    },
    portfolio: {
        type: String
    },
    dob: {
        type: String,
    },
    workrole: [
        {
            role: {
                type: String,
                required: true
            },
            company: {
                type: String
            },
            country: {
                type: String
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            details: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Profile = mongoose.model('myProfile', ProfileSchema);