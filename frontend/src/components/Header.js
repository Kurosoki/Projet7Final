// import des modules necessaires
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './header.css'
import Logo from '@/Images/icon-left-font-monochrome-white.svg'
import LogoUser from '@/Images/User.png'
import LogoConstruct from '@/Images/en-construction.png'
import { accountService } from "@/_services/account.service";

// fonction d'affichage du header
const Header = () => {
    const navigate = useNavigate()
    const [isActive, setisActive] = React.useState(false);
    const flag = useRef(false)

    useEffect(() => {

    }, [])

    const addPost = () => {
        navigate("/addpost", { replace: true })
    }

    const Logout = () => {
        accountService.logout();
        navigate("/auth/login", { replace: true })
    }
    // condition d'affichage si l'user est loggé
    if (accountService.isLogged()) {
        return (

            <header>
                <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/home">
                            <img src={Logo} alt="Groupomania" />
                        </a>
                        <a
                            onClick={() => {
                                setisActive(!isActive);
                            }}
                            role="button"
                            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div
                        id="navbarBasicExample"
                        className={`navbar-menu ${isActive ? "is-active" : ""}`}
                    >
                        <div className="navbar-start">
                            <a className="navbar-item" href="/home">
                                <span className="items">Accueil</span>
                            </a>
                            <div className="navbar-item"><button onClick={addPost} className="btnplace button is-danger ">Ajouter un post</button></div>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-link" href="#">
                                    <img className="is-rounded" src={LogoUser} />
                                </div>
                                <div className="navbar-dropdown is-boxed">
                                    <div className="navbar-item">
                                        <img className="is-rounded" src={LogoConstruct} /><span className="linkpagemenu">Profil</span>
                                    </div>
                                    <hr className="navbar-divider" />
                                    <a className="navbar-item is-active" onClick={Logout} >
                                        Déconnexion
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        );
    } else { //condition si le user n'est pas loggé
        return (
            <header>
                <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/home">
                            <img src={Logo} alt="Groupomania" />
                        </a>
                        <a
                            onClick={() => {
                                setisActive(!isActive);
                            }}
                            role="button"
                            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div
                        id="navbarBasicExample"
                        className={`navbar-menu ${isActive ? "is-active" : ""}`}
                    >
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <Link to="auth/login"><span className="button is-danger is-outlined">Login</span></Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="auth/signup"><span className="button is-danger">Inscription</span></Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    };
};

// export du header pour l'utiliser dans le layout
export default Header