const { timeStamp } = require('console');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions'); 

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Can't be blank",
        minlength: 1,
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
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true

        },
        id: false
    }
);

ThoughtSchema.virtual("reactionCount").get(()=>{
    return this.reactions.length;
});

const Thought = model("Thought",ThoughtSchema);

module.exports = Thought;