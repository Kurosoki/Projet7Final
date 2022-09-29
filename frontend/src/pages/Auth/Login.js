import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import './form.css'
import * as Yup from "yup";
import { accountService } from "@/_services/account.service"



const Login = () => {

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: ""
    };


    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Veuillez entrer une adresse email valide").required("Veuillez entrer votre adresse email"),
        password: Yup.string().required("Veuillez entrer un mot de passe")
    });



    const onSubmit = async (data) => {


        try {
            accountService.loginUser(data)
                .then(response => {
                    accountService.saveToken(response.data.accessToken)
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

    return (
        <>
            <div className="message is-dark">
                <h2 className="message-header has-background-link">Se connecter</h2>
                <div className="message-body">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form>
                            {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                            <div className="field">
                                <label htmlFor='email' className="label">Email:</label>
                                <div className="controls">
                                    <Field name="email" type="text" placeholder="Email" autoComplete="off" className="input"></Field>
                                </div>
                                <ErrorMessage name="email" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <div className="field">
                                <label htmlFor='password' className="label">Mot de passe:</label>
                                <div className="controls">
                                    <Field name="password" type="password" placeholder="******" autoComplete="off" className="input"></Field>
                                </div>
                                <ErrorMessage name="password" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <button type='submit' className="button is-link is-outlined mt-2">Connexion</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Login;