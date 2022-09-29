import Axios from './caller.service'

let getAllPosts = () => {
    return Axios.get('/api/posts/')
}

let getPost = (post) => {
    return Axios.get('/api/posts/' + post.id)
}

let createPost = (data) => {
    return Axios.post('/api/posts', data)
}
let deletePost = (post) => {
    return Axios.delete('/api/posts/' + post.id)
}
let likedislikePost = (post) => {
    return Axios.post('/api/posts/' + post.id + '/like')
}

let modifyPost = (post) => {
    return Axios.put('/api/posts/' + post.id)
}

export const postService = {
    getAllPosts,
    getPost,
    createPost,
    likedislikePost,
    deletePost,
    modifyPost
}

