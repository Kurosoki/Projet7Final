// import des modules necessaires
import React, { useRef, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import { accountService } from "@/_services/account.service";
import { postService } from "@/_services/post.services"
import reactImageSize from 'react-image-size';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

// fonction de la page addpost
const Addpost = () => {
    const [msg, setMsg] = useState('');
    const [postImg, setPostImg] = useState();
    const [ImagePreview, setImagePreview] = useState();
    const [ImagePreviewName, setImagePreviewName] = useState("");
    const navigate = useNavigate();
    const flag = useRef(false)

    const initialValues = {
        text: ""
    }

    useEffect(() => {
        if (flag.current === false) {

        }

        return () => flag.current = true
    }, [])

    const retour = () => {
        navigate("/home", { replace: true })
    }

    const onSubmit = async (data) => {
        const profil = accountService.tokenDecode(accountService.getToken())
        console.log(data)
        const formData = new FormData();
        formData.append('imageUrl', postImg);
        formData.append('text', data.text);
        formData.append('userId', profil.userId);

        try {
            postService.createPost(formData)
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

    const onImageChange = async (event) => {

        setImagePreviewName(event.target.files[0].name)
        if (event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
        try {
            const { width, height } = await reactImageSize(URL.createObjectURL(event.target.files[0]));
            if (width <= 10000 && height <= 10000) {
                setMsg();
                setPostImg(event.target.files[0]);
            } else {
                setMsg("Veuillez sélectionner une image dont les dimensions n'excédent pas 250x250");
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <>
            <main>
                <div className="columns columnsMain">
                    <div className="column is-one-fifth">
                        <nav className="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li className="is-active">
                                    <a href="#">
                                        <span>Post</span>
                                    </a>
                                </li>
                                <li><a onClick={retour} >
                                    Précédent
                                </a></li>
                            </ul>
                        </nav>

                    </div>
                    <div className="column"></div>
                </div>
                <div className="columns">
                    <div className="column"></div>
                    <div className="column ">
                        <div className="box">
                            <div className="message has-background-white">
                                <h2 className="message-header has-background-danger">Ajouter un Post</h2>

                                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                    <Form className="formAddPost">
                                        {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                                        <div className="field">
                                            <label htmlFor='image' className="label">Image du Post:</label>
                                            <div className="file is-danger fileBtnAddPost">
                                                <label className="file-label">
                                                    <input className="file-input" type="file" name="resume" onChange={onImageChange} />
                                                    <span className="file-cta">
                                                        <span className="file-icon">
                                                            <FontAwesomeIcon icon={faUpload} />
                                                        </span>
                                                        <span className="file-label">
                                                            Choisir un fichier…
                                                        </span>
                                                        <span className="file-labelName">
                                                            {ImagePreviewName}
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <figure className="image is-256x256">
                                                <img className="" key={ImagePreview} src={ImagePreview} alt="aperçu" />
                                            </figure>
                                            <ErrorMessage name="title" component="p" className="notification is-danger is-light p-2 mt-1" />
                                        </div>

                                        <div className="field">
                                            <label htmlFor='text' className="label">Texte:</label>
                                            <div className="controls">
                                                <Field as="textarea" id="text" className="text" rows="6" name="text" placeholder="Quel est le sujet de votre post? "></Field>
                                            </div>
                                            <ErrorMessage name="text" component="p" className="notification is-danger is-light p-2 mt-1" />
                                        </div>

                                        <div className="columns">
                                            <div className="column"></div>
                                            <div className="column"><button type='submit' className="button is-danger is-outlined">Publier mon post</button></div>
                                            <div className="column"></div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="column"></div>
                </div>

            </main>
        </>
    );
}

// export de la page pour appel dans le router
export default Addpost;