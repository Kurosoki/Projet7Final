import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import { accountService } from "@/_services/account.service";
import { postService } from "@/_services/post.services"
import reactImageSize from 'react-image-size';

const Addpost = () => {
    const [msg, setMsg] = useState('');
    const [postImg, setPostImg] = useState();
    const navigate = useNavigate();

    const initialValues = {
        title: "",
        text: ""
    }

    const retour = () => {
        navigate("/home", { replace: true })
    }
    const onSubmit = async (data) => {
        const profil = accountService.tokenDecode(accountService.getToken())
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

            <button onClick={retour}>Précédent</button>
            <div className="message is-dark">
                <h2 className="message-header has-background-link">Ajouter un post</h2>
                <div className="message-body">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                            <div className="field">
                                <label htmlFor='image' className="label">Post Image:</label>
                                <div className="controls">
                                    <input name='postImg' type="file" onChange={onImageChange} />
                                </div>
                                <ErrorMessage name="title" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <div className="field">
                                <label htmlFor='text' className="label">Texte:</label>
                                <div className="controls">
                                    <Field name="text" type="text" placeholder="text" autoComplete="off" className="input"></Field>
                                </div>
                                <ErrorMessage name="text" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <button type='submit' className="button is-link is-outlined mt-2">Envoyer</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default Addpost;