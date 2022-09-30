// import des modules necessaires
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { accountService } from "@/_services/account.service"


// fonction login
const Login = () => {

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: ""
    };

    useEffect(() => {
    })

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Veuillez entrer une adresse email valide").required("Veuillez entrer votre adresse email"),
        password: Yup.string().required("Veuillez entrer un mot de passe")
    });
    // const { Logon } = useContext(LoginContext)


    const onSubmit = async (data) => {


        try {
            accountService.loginUser(data)
                .then(response => {
                    accountService.saveToken(response.data.accessToken)
                    navigate("/home", { replace: true });
                    // { Logon === 'Logon' }
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
            <main>
                <div className="columns columnsMain">
                    <div className="column"></div>
                    <div className="column is-half">
                        <div className="box">

                            <div className="message has-background-white">
                                <h2 className="message-header has-background-danger">Se connecter</h2>



                                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                    <Form className='formAuth'>
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
                                        <div className="columns">
                                            <div className="column"></div>
                                            <div className="column"><button type='submit' className="button is-danger is-outlined butttonAuth">Connexion</button></div>
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
};

// export de la page login pour utilisation dans le router
export default Login;