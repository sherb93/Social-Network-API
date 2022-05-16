const { Schema, model } = require("mongoose");
const db = require("../config/connection");

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
        thoughts: [thoughtSchema],
        friends: [userSchema]
    }
);

userSchema.virtual("numberOfFriends").get(function() {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;