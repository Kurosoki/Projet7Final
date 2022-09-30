/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controller");

const GuardAuth = require("../middleware/GuardAuth");
const GuardMulter = require("../middleware/GuardMulterPost");

/* Routage Post */
router.get("/", GuardAuth, postCtrl.getAllPost);
router.get("/:id", GuardAuth, postCtrl.getOnePost);
router.post("/", GuardAuth, GuardMulter, postCtrl.createPost);
router.put("/", GuardAuth, GuardMulter, postCtrl.modifyPost);
router.delete("/:id", GuardAuth, postCtrl.deletePost);
router.post("/like", GuardAuth, postCtrl.likePost);

module.exports = router;
