/* Import des modules necessaires */
const mongoose = require("mongoose");

/* Schema User */
const ModelPost = mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String, allowNull: true },
    likes: { type: Number, required: true },
    usersLiked: { type: ["String <userId>"], required: true },
},
    { timestamps: true });

module.exports = mongoose.model("Post", ModelPost);