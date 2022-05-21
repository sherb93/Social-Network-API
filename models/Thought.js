const { Schema, model } = require("mongoose");

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            // get: 
        }
    },
    {
        toJSON: {
            getters: true,
          },
    }
);

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: new Date(),
            //User a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
          }
    }
);

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;