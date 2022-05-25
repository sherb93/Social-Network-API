const router = require("express").Router();
const { User } = require("../../models/index");

router.route("/")
    .get(async (req, res) => {
        try {
            // Find all users and populate their respective thoughts
            const usersData = await User.find({}).populate("thoughts");

            // If there are no users send an appropriate response
            if (!usersData) {
                return res.status(404).json({ message: "This user does not exist!"})
            }

            res.status(200).json(usersData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    })
    .post(async (req, res) => {
        try {
            // Destructure body for easier creation
            const { username, email } = req.body;

            // Create new User document
            const newUser = await User.create({
                username,
                email
            });

            res.status(200).json(newUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })

router.route("/:id")
    .get(async (req, res) => {
        try {
            // Find one user by url parameters and populate user and thoughts data
            const userData = await User.findOne({ _id: req.params.id}).populate("thoughts");

            // If no user data send appropriate response
            if (!userData) {
                return res.status(404).send({ message: "This user does not exist!"})
            }

            res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id }, // Finds User with an _id that matches the url parameter
                { $set: req.body }, // If a document has a property named the same as the key in req.body it replaces it in the document
                { new: true } // Returns the updated document, not the old version
            );

            if (!updatedUser) {
                return res.status(404).json("Invalid user ID. Cannot update.")
            }

            res.status(200).json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            // Delete user
            const userData = await User.findOneAndDelete({ _id: req.params.id });

            if (!userData) {
                return res.status(404).json("Cannot delete user. User Id invalid.")
            }
            
            res.status(200).json("User deleted successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    })

router.route("/:userId/friends/:friendId")
    .post(async (req, res) => {
        try{
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }}, // Adds friendId to the array of friends
            { new: true }
        )

        if (!userData) {
            return res.status(404).json({ message: "Invalid User ID or Friend ID" });
        }

        res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try{
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }}, // Removes friendId from the array of friends
            { new: true }
        )

        if (!userData) {
            return res.status(404).json({ message: "Invalid User ID or Friend ID" });
        }

        res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    })

module.exports = router;