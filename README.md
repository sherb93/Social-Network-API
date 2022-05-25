# Social-Network-API

## Description
MongoDB is very popular among many social networks due to its speed and scalability. This is a demonstration of my ability to write Express API routes using a MongoDB document database and Mongoose ODM. 

I used two models (User & Thought) to create a small-scale social network style database. Beside the typical information expected to be stored in a user model, my User model has two properties of note: thoughts and friends. Users can post many thoughts and those are stored in an array. They can also have friends which is an array that references the ObjectIds of other user documents. The Thought model has a property called "reactions" for which I created a subdocument schema.

Mongoose has an incredible amount of useful features and I've only scratched the surface, but thoughout this project I gained experience creating models, declaring virtuals, and using Mongoose query methods.

This is a completely back-end project so I've attached a demo video where I used Insomnia to test all of the routes I created and prove that they work as intended.

## Demo