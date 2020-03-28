//useState para lidar com os valores de 'submit'
import React,{useState} from 'react';
//usehistory()
import { Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';



export default function Register() {
        //name recebe o estado || setName altera o estado
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[city, setCity] = useState('');
    const[uf, setUf] = useState('');

    //axuilia na navegação entre as pg da aplicação
    const history = useHistory();

    //async pois a func deve aguardar a resposa do envio de dados para a api
    async function handleRegister(e){
        //previne comportamentos padrões, como atuazlilar do pg no 'submit'
        e.preventDefault();        

        const data = {
            name, 
            email, 
            whatsapp,
            city,
            uf
        };

        console.log(data);
       try { //chama api e envia a 'data' no formato JSON 
        //chamada gera um resposta q pode ser mostrada para o usuário
        //await faz a execução aguardar pela resposta
        const response = await api.post('ongs', data);
        //uso da crase para mostrar a variavel ${} ||
        //'data'
        alert(`Seu ID de Acesso: ${response.data.id}`)

        //envia o usr para o '/' após o cadastro da ong
        history.push('/');
        }catch(err){
            alert('Erro no cadastro, Tente novamente!')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section  className="form">
                        <img src={logoImg} alt="Be The Hero"/>
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                        <Link className="formLink" to="/">
                            <FiArrowLeft size="16" color="e02041"/>
                                Voltar
                        </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        //alterando o estedo de name com o valor do input
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            
                        />
                        <input 
                            placeholder="UF" style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}