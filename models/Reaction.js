const { Schema, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat")

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp => dateFormat(timeStamp)
    },
    username: {
        type: String,
        required: 'Username is Required'
    },

},
    {
        toJSON: {
            getters: true

        },
        id: false
    }
);

module.exports = ReactionSchema;