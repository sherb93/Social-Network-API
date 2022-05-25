const router = require("express").Router();
const { User, Thought } = require("../../models");

router.route("/")
    .get(async (req, res) => {
        try {
            // Finds all thoughts in the collection
            const thoughtsData = await Thought.find({});

            // If no thoughts exist then send a response
            if (!thoughtsData) {
                return res.status(404).json({ message: "No thoughts exist!"})
            }

            // Sends the thoughts to the client
            res.status(200).json(thoughtsData);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            // Destructure the keys for better readability
            const { thoughtText, username } = req.body

            // Creates a new document with the Thoughts model
            const newThought = await Thought.create({
                thoughtText,
                username
            });

            // Updates the user profile for whoever made the thought
            const targetUser = await User.findOneAndUpdate(
                { username: username }, // Finds user by identical username
                { $addToSet: { thoughts: newThought._id }}, // Adds a value to an array unless the value is already present
                { new: true }
            )
            .populate("thoughts"); // Include new thoughts in response

            if (!targetUser) {
                return res.status(404).json("Sorry, that user does not exist.")
            };

            res.status(200).json(targetUser);
        } catch (err) {
            res.status(500).json(err);
        }
    });

module.exports = router;