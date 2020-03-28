import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {FiPower} from 'react-icons/fi'
import {FiTrash2} from 'react-icons/fi'

import api from '../../services/api';

import './style.css';

export default function Profile(){
        //valor, func p atualizar
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    //recuperndo p ongName de storage do navegador - passado pelo '/'
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    //()=> {}, [] >>>> [] é um array de dependencias. sempre q ele mudar, altera a função ()=>{}
    useEffect( () => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            //array com os incidents recebidos - dinâmico
            setIncidents(response.data)
        })
    }, [ongId]);

    //deletando o caso
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            })

            //tratando a remoção do elemento deletado da pg em 'tempo real'
            //filtra exibindo todos os elementos onde o id eh != do id deletado
            setIncidents(incidents.filter(incident=>incident.id !== id))

        }catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    //fazendo o logout da oong
    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }   



    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo(a), {ongName} </span>

                <Link className="button" to="/incidents/new">
                    Cadastrar Novo Caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident=>(
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency', 
                        currency:'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={()=>handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>                
                ))}   
            </ul>
        </div>
    );
}