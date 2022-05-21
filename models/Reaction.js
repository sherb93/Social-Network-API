const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");
const db = require("../config/connection");

const reactionSchema = new Schema (
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId()
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
            default: new Date(),
            //Use a getter method to format the timestamp on query
        }
    }
);