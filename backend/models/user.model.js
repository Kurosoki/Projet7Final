/* Import des modules necessaires */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/* Schema User */
const ModelUser = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    presentation: { type: String, required: true, default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    imageUrl: { type: String, required: true, default: "https://img.freepik.com/vecteurs-libre/homme-mafieux-mysterieux-fumant-cigarette_52683-34828.jpg?w=826&t=st=1663251446~exp=1663252046~hmac=4d6cec9ff1bee1bbd63311fbcc1f330e16947f01818453ecc48a2ecd07752248" },
    role: { type: Number, required: true, default: 0 },
},
    { timestamps: true });

/* Verification email unique */
ModelUser.plugin(uniqueValidator);

module.exports = mongoose.model("User", ModelUser);
