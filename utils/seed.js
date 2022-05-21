const connection = require("../config/connection");
const { User, Thought } = require("../models/index");
const { users, thoughts } = require("./data");



connection.once("open", async () => {
    console.log("connected");
    await User.deleteMany({});
    await Thought.deleteMany({});

    // for (i = 0; i < 10; i++) {
    //     const name = getName();
    //     const randomNum = Math.floor(Math.random() * 900);
    //     const username = `${name}${randomNum}`;

    //     users.push({
    //         username,

    //     })
    // }
    console.log(`USERS: ${users}`);
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    const thoughtsData = Thought.findOne({ thoughtText: "I don't really like this platform, it's too archaic. No UI? Really?" });
    console.log(thoughtsData);
    process.exit(0);
})