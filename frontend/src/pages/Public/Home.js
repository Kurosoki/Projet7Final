import React, { useEffect, useRef, useState } from 'react';
import { postService } from '@/_services/post.services';
import { accountService } from '@/_services/account.service';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from '@/_services/caller.service';

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';
timeago.register('fr', fr);

const Home = () => {

    const [allpost, setAllpost] = useState([]);
    const [profil, setProfil] = useState([]);
    const [alluser, setAlluser] = useState([]);
    const [msg, setMsg] = useState('');
    const [postImg, setPostImg] = useState();
    const [isAdmin, setAdmin] = useState('');
    const navigate = useNavigate();
    const flag = useRef(false)


    useEffect(() => {
        if (flag.current === false) {
            FunctionProfil();
            FunctionAllPosts();
            FunctionAllUser();
        }

        return () => flag.current = true
    }, [])

    const FunctionProfil = async () => {
        const GetProfil = await accountService.tokenDecode(accountService.getToken());
        setProfil(GetProfil);
    }

    const FunctionAllPosts = async () => {
        let GetallPosts = await postService.getAllPosts();
        setAllpost(GetallPosts.data);
    }

    const FunctionAllUser = async () => {
        const GetAlluser = await accountService.getAllUsers();
        setAlluser(GetAlluser.data);
    }

    const LastSeen = (date) => {
        return (<TimeAgo datetime={date} locale='fr' />);
    }

    let deletePost = (post) => {
        return Axios.delete('/api/posts/' + post.id)


    }


    //console.log(profil)
    // console.log(allpost)
    // console.log(alluser)

    return (
        <section className="tousLesuser">

            {allpost.map((post, index) => {
                // console.log(post)
                return (
                    <div key={index} className="card mb-5">
                        <img src={post.user.imageUrl} alt='pp' height={150} width={150} />
                        <p className="is-size-7 has-text-grey">Prénom : {post.user.prenom} Nom: {post.user.nom}</p>
                        <span>Email: {post.user.email}</span>

                        <div className="content">
                            {post.post.imageUrl
                                ? <div className="content">
                                    <img src={"http://localhost:3000/images/postImg/" + post.post.imageUrl} height={400} width={480} alt='image du post' />
                                    <p>{post.post.text}</p>
                                </div>
                                : <div className="content">
                                    <p>{post.post.text}</p>
                                </div>}
                            <p className="is-size-7 has-text-grey">{LastSeen(post.post.iat)}</p>
                            <p className="is-size-6 "><Link to={`modifypost/${post.post._id}`}>Modifier</Link></p>
                            {isAdmin == 1 ? (<button type='button' className="button is-pulled-right is-danger is-outlined" onClick={() => { deletePost(post.post._id) }}>Supprimer</button>) : post.userId == post.user.userId ? (<button type='button' className="button is-pulled-right is-danger is-outlined" onClick={() => { deletePost(post.post._id) }}>Supprimer</button>) : ('')}

                        </div>
                    </div>



                )
            })


            }
        </section>

    )
}



export default Home;