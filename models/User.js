const { Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: /^(.+)@(.+)$/ //TEST THIS
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [userSchema]
    }
);

userSchema.virtual("numberOfFriends").get(function() {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;