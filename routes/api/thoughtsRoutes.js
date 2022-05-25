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

router.route("/:id")
    .get(async (req, res) => {
        try {
            // Find one thought by url parameters
            const thoughtData = await Thought.findOne({ _id: req.params.id});

            // If no thought data send appropriate response
            if (!thoughtData) {
                return res.status(404).send({ message: "This thought does not exist!"})
            }

            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.id }, // Finds Thought with an _id that matches the url parameter
                { $set: req.body }, // If a document has a property named the same as the key in req.body it replaces it in the document
                { new: true } // Returns the updated document, not the old version
            );

            if (!updatedThought) {
                return res.status(404).json("Invalid thought ID. Cannot update.")
            }

            res.status(200).json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            // Finds thought by id using url params and deletes it
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });

            if (!deletedThought) {
                return res.status(404).json("Cannot delete thought. Thought Id invalid.")
            }

            res.status(200).json("Thought deleted successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.route("/:thoughtId/reactions")
    .post(async (req, res) => {
        try {
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { new: true }
            );

            if (!thoughtReaction){
                return res.status(404).json({ message: "Invalid thought ID" });
            }

            res.status(200).json(thoughtReaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body }},
                { new: true }
            );

            if (!thoughtReaction){
                return res.status(404).json({ message: "Invalid thought ID" });
            }

            res.status(200).json(thoughtReaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })

module.exports = router;