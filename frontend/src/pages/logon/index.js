import React from 'react';

//componente para lincar entre as pg > contribui para a estrutura do SPA
import { Link } from 'react-router-dom';

import './style.css';
//iom portando pacote de icones - fi > feather-icons
import {FiLogIn} from 'react-icons/fi'

//importando as imagens
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';



export default function Logon(){
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form action="">
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID"/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="formLink" to="/register"><FiLogIn size="16" color="e02041"/> Não tenho cadastro</Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}