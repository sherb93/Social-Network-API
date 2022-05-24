const connection = require("../config/connection");
const { User, Thought } = require("../models/index");
const { users, thoughts } = require("./data");



connection.once("open", async () => {
    console.log("connected");
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    // const thoughtsData = Thought.find({});

    Thought.find({})
        .then(thoughtsData => {
            console.log(thoughtsData);
            thoughtsData.forEach(async (thought) => {
                const userData = await User.find({})
                const randomUser = userData[Math.floor(Math.random() * userData.length)].username;
        
                Thought.where({ _id: thought._id }).update({ username: randomUser});
                User.where({ username: randomUser }).update({ $push: { thoughts: thought._id }});
            })
        })
        .catch(err => console.log(err));
    // thoughtsData.forEach(thought => {
    //     const userData = User.find({})
    //     const randomUser = userData[Math.floor(Math.random() * userData.length)].username;

    //     Thought.where({ _id: thought._id }).update({ username: randomUser});
    //     User.where({ username: randomUser }).update({ $push: { thoughts: thought._id }});
    // })

    
    process.exit(0);
})