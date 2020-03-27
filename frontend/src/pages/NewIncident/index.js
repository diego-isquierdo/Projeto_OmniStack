import React from 'react';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './style.css'

export default function newIncident(){
    return (
        <div className="new-incident-container">
            <div className="content">
                <section  className="form">
                        <Link className="formLink" to="/profile">
                            <img src={logoImg} alt="Be The Hero"/>
                        </Link>
                        <h1>Cadastrar Novo Caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói ára resolver isso!.</p>

                        <Link className="formLink" to="/profile">
                            <FiArrowLeft size="16" color="e02041"/>
                                Voltar para Home
                        </Link>
                </section>

                <form>
                    <input placeholder="Título do Caso"/>
                    <textarea type="email" placeholder="Descrição"/>

                    <input type="text" placeholder="Valor em Reais"/>
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}