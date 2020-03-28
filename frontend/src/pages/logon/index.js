import React, {useState} from 'react';

//componente para lincar entre as pg > contribui para a estrutura do SPA
//useHistory > usando o historico do navegador
import { Link, useHistory } from 'react-router-dom';

import './style.css';
//iom portando pacote de icones - fi > feather-icons
import {FiLogIn} from 'react-icons/fi'

//importando as imagens
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';


import api from '../../services/api'

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();


    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('/sessions', {id});

            //gravando no historico do navegador, para uso durante a navegação
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            //link p pg 'profile' com ongId e ongName em cache do navegador
            history.push('/profile')
        }catch(err){
            alert('Falha no login, Tente Novamente!');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e=>setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="formLink" to="/register"><FiLogIn size="16" color="e02041"/> Não tenho cadastro</Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}