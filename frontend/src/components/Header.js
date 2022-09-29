import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './header.css'
import Logo from '@/Images/icon-left-font.png'
import { accountService } from "@/_services/account.service";

const Header = () => {
    const navigate = useNavigate()

    const addPost = () => {
        navigate("/addpost", { replace: true })
    }

    if (accountService.isLogged()) {
        const token = accountService.tokenDecode(accountService.getToken())
        return (

            <header>
                <div className='logo'>
                    <Link to="/home"> <img src={Logo} alt="groupomania"></img></Link>
                </div>

                <ul>
                    <li onClick={addPost}>Ajouter un post</li>
                </ul>

                <nav>
                    <ul>
                        <li>{token.nom + ' ' + token.prenom}</li>
                        <li onClick={accountService.logout}><Link to="/auth/login">Logout</Link></li>
                    </ul>
                </nav>
            </header>

        );
    } else {
        return (
            <header>
                <div className='logo'>
                    <Link to="/home"> <img src={Logo} alt="groupomania"></img></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="auth/login"> Login</Link></li>
                        <li><Link to="auth/signup"> Inscription</Link></li>
                    </ul>
                </nav>
            </header>
        );
    };
};

export default Header