const router = require("express").Router();
const { User } = require("../../models/index");

router.get("/", async (req, res) => {
    const userData = await User.find({});

    res.status(200).json(userData);
})

module.exports = router;