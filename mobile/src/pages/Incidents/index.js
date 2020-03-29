import React, {useState, useEffect} from 'react';
//Feather > importa o icone desejado na própria tag
import { Feather } from '@expo/vector-icons';
//TouchableOpacity > 'tufo'vira botão ou algo clicável > FlatList - listagem
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';

import style from './style';

export default function Incidents(){
    //renderização dos incidentes na tela
    const [incidents, setIncidents] = useState([]);
    //tratando da navegação entra as paginas
    const navigation = useNavigation();
    //mostrando o numero de casos
    const [totalIncidents, setTotalIncidents] = useState(0);
    //carregando os dados para evitar novos downloads
    const [loading, setLoading]     = useState(false);



    //controle da pg, iniciando na pg 1
    const [page, setPage] = useState(1);

    function navigationToDetail(incident){
        //incluindo o incident na navegação p a pg de detail
        navigation.navigate('Detail', incident);
    }

    async function loadIncidents(){
        //evitar que a requisição seja feita novamente caso o usr fique precionando a tela no final
        if(loading){
            return;
        }

        if(total > 0 && incident.lenght === total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        //renderizando os incidentes
        //setIncidents(response.data);

        //ao inves de trocar os incidents, anexar os novos à tela
        setIncidents([...incidents, ...response.data]);
        //renderizando o num de incidentes \\ X-total-Count > informação setada no header no backend
        setTotalIncidents(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(()=> {
        loadIncidents();
    }, []);




    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{totalIncidents} casos</Text>
                </Text>
            </View>
            <Text style={style.title}>Bem Vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia!</Text>


            <FlatList
                style={style.incidentList}
                //dispara func quando o usr chegar ao final da lista
                onEndReached = {loadIncidents}
                //quando o usuario estiver a 20% do final da pg, nova pg será carregada
                onEndReachedThreshold={0.2}
                data={incidents}
                //remove a barra de rolagem da tela
                showsVerticalScrollIndicator={false}
                /**key eh um 'marcador' que diferencia cada tag gerada */
                keyExtractor={incident => String(incident.id)}
                /** renderização das {[]} listas de casos - função q retorna um jsx ()=>()*/
                //alterando o nome da variavel item >> 'item' eh o objeto q contem todo o caso
                renderItem={({ item: incident })=>(
                        <View style={style.incident}>
                            <Text style={style.incidentProperty}>ONG:</Text>
                            <Text style={style.incidentProperty}>{incident.name}</Text>

                            <Text style={style.incidentProperty}>CASO:</Text>
                            <Text style={style.incidentProperty}>{incident.title}</Text>

                            <Text style={style.incidentProperty}>VALOR:</Text>
                            <Text style={style.incidentProperty}>
                                {Intl.NumberFormat('pt-BR', {
                                        style: 'currency', 
                                        currency: 'BRL'
                                    }).format(incident.value)}
                            </Text>

                            <TouchableOpacity 
                                style={style.detailsButton} 
                                //sempre q for preciso passar parametros p uma função,
                                //eh necessário passar por meio de outra função 
                                onPress={() => navigationToDetail(incident)}
                            >
                                <Text style={style.datailsButtonText}>Ver mais detalhes..</Text>
                                <Feather name="arrow-right" size={16} color="#E02041"/>
                            </TouchableOpacity>
                        </View>
                    )}
            />
        </View>
    );
}