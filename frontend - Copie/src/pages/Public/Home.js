import React, { useEffect, useRef, useState } from 'react';
import { postService } from '@/_services/post.services';
import { accountService } from '@/_services/account.service';
import { useNavigate, NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";

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

    // const modifyPost = () => {
    //     navigate("/modifypost", { replace: true })
    // }

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

    const retour = () => {
        navigate("/home", { replace: true })
    }

    const onSubmitDelete = async (data) => {
        const profil = accountService.tokenDecode(accountService.getToken())
        const formData = new FormData();
        formData.append('imageUrl', postImg);
        formData.append('text', data.text);
        formData.append('userId', profil.userId);

        try {
            postService.deletePost(formData)
                .then(response => {
                    navigate("/home", { replace: true });
                })
                .catch(error => {
                    setMsg(error);
                })

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };



    // console.log(profil)
    // console.log(allpost)
    // console.log(alluser)
    return (
        <>

            <section className="tousLesMessages mt-5">

                {allpost.map((post, index) => {
                    console.log(allpost)
                    return (
                        <div key={index} className="card mb-5">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <img className="userImg is-rounded" src={'./images/' + post.user.imageUrl} alt='pp' />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="">
                                            <NavLink to={'../profile/' + post.userId}
                                                className={post.user.isAdmin == 1 ? ("title is-size-6 has-text-danger-dark mb-1") : ("title is-size-6 has-text-info-dark mb-5")}>
                                                {post.user.prenom} {post.user.nom}</NavLink><span className="has-text-grey has-text-weight-light ml-1">{post.user.email}</span>
                                        </p>
                                        <p className="is-size-7 has-text-grey">{LastSeen(post.createdAt)}</p>
                                        {/* {isAdmin == 1 ? (<button type='button' className="button is-pulled-right is-danger is-outlined" onClick={(onSubmitDelete) => { onSubmitDelete(post.id) }}>Supprimer</button>) : post.userId == user.userId ? (<button type='button' className="button is-pulled-right is-danger is-outlined" onClick={() => { onSubmitDelete(post.id) }}>Supprimer</button>) : ('')} */}
                                    </div>
                                </div>
                                <div className="content">
                                    {post.imageUrl
                                        ? <div className="content">
                                            <img src={'../images/imagepost/' + post.imageUrl} alt='pp' />
                                            <p>{post.postMsg}</p>
                                        </div>
                                        : <div className="content">
                                            <p>{post.postMsg}</p>
                                        </div>}
                                    {/* <button className={`like-button ${isClicked && 'liked'}`} onClick={funkylike}>
                        <span className="likes-counter">{`Like | ${post.likes}`}</span>
                    </button> */}
                                    {/* <LikeButton post={post} /> */}

                                </div>
                            </div>
                        </div>
                    )
                })

                }
            </section>
        </>
    );
}


export default Home;