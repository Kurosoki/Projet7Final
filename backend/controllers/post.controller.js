/* Import des modules necessaires */
const Post = require("../models/post.model");
const Users = require("../models/user.model");
const fs = require("fs");

/* Controleur creation post */
exports.createPost = async (req, res, next) => {
    try {
        const userId = req.body.userId;

        const post = req.file ?
            {
                ...req.body,
                userId: userId,
                imageUrl: req.file.filename,
                likes: 0,
                usersLiked: [],
            } : {
                ...req.body,
                userId: userId,
                likes: 0,
                usersLiked: [],
            };
        await Post.create(post);
        res.json({ msg: "Publication réussie" });
    } catch (error) {
        res.json({ msg: error.msg });
    }
};

/* Controleur recuperation all posts */
exports.getAllPost = (req, res, next) => {

    Post.find()
        .then(async (posts) => {
            let postArray = [];

            for (let i = 0; i < posts.length; i++) {

                const GetUser = await Users.findOne({ _id: posts[i].userId })

                postArray.push({
                    post: posts[i],
                    user: GetUser
                })
            }
            res.status(200).json(postArray);

        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

/* Controleur recuperation 1 post */
exports.getOnePost = async (req, res, next) => {

    const GetPost = await Post.findOne({ id: req.body.id })
    const GetUser = await Users.findOne({ _id: GetPost.userId })

    let PostCompiled = {
        post: GetPost,
        user: GetUser,
    }

    res.send(PostCompiled);
};

/* Controleur suppression post */
exports.deletePost = (req, res, next) => {
    // Recup post avec id
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            // Empêcher n'importe qu'elle utilisateur de delete une post
            if (!post) {
                res.status(404).json({
                    error: new Error('No such Post!')
                });
            }
            console.log(post)
            if (post.imageUrl) {
                const filename = post.imageUrl;
                fs.unlink(`images/postImg/${filename}`, () => {

                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Post supprimé !" }))
                        .catch((error) => res.status(400).json({ error }));
                });
            } else {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Post supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
            }

        })
        .catch((error) => res.status(500).json({ error }));
};


/* Controleur modification post */
exports.modifyPost = (req, res, next) => {
    // Recup post avec id

    Post.findOne().where({ _id: req.body.id })

        .then((post) => {
            // Enregistrement ancienne imgUrl (si nouvelle image dans modif)
            const oldUrl = post.imageUrl;

            const postObject = req.file ? {
                ...req.body,
                imageUrl: `${req.file.filename}`
            } : { ...req.body, imageUrl: oldUrl };

            if (req.file) {
                console.log(oldUrl)
                let splitUrl = oldUrl;

                fs.unlink(`./images/postImg/${splitUrl}`, () => {
                    Post.updateOne({ _id: req.body.id }, { ...postObject, _id: req.body.id })
                        .then(() => res.status(200).json({ message: 'Post modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                Post.updateOne({ _id: req.body.id }, { ...postObject, _id: req.body.id })
                    .then(() => res.status(200).json({ message: 'Post modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

/* Controleur like */
exports.likePost = (req, res, next) => {

    Post.findOne().where({ _id: req.body.id })
        .then(post => {
            /*condition dislike like d'un post */
            if (!post.usersLiked.includes(req.body.userId) && req.body.likes === 1) {

                Post.updateOne({ _id: req.body.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'post unliked !' }))
                    .catch(error => res.status(400).json({ error }));
            }
            if (post.usersLiked.includes(req.body.userId) && req.body.likes === -1) {
                Post.updateOne({ _id: req.body.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'post unliked !' }))
                    .catch(error => res.status(400).json({ error }));


            }


        })
        .catch(error => res.status(500).json({ error }));

};


