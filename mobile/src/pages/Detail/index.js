import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';

//useRoute - pegar informações vindas na navegação
import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';
import style from './style';


//importando tudo do mail-composer
import * as MailComposer from 'expo-mail-composer';




export default function Detail(){
    //tratando da navegação
    const navigation = useNavigation();
    
    //
    const route = useRoute();
    //incident - nome do paramtero usado ao enviar a informação
    const incident = route.params.incident;

    console.log(route.params.incident);
    //email
    const mensage = `Olá ${incident.name}, estou entrando em contado, pois gotaria de ajudar no caso "${incident.title}", com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    //envio de email
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do Caso: ${incident.title}`,
            recipients: [incident.email],
            body: MessageChannel,
        });
    }

    //envio de whatsApp
    function sendWhatsApp(){
        Linking.openURL(`whatsapp.com/send?phone=${incident.whatsapp}&text=${message}`);
    }





    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>
            <View style={style.incident}>
                <Text style={[style.incidentProperty, {marginTop:0}]}>ONG:</Text>
                <Text style={style.incidentProperty}>
                    {incident.name} de {incident.city}/{incident.uf}
                </Text>

                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>Cadelinha</Text>

                <Text style={style.incidentProperty}>VALOR:</Text>
                <Text style={style.incidentValue}>R$ 120,00</Text>
            </View>


            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o Dia!</Text>
                <Text style={style.heroTitle}>Seja o Herói desse Caso.</Text>

                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsApp}>
                        <Text style={style.actionText}>
                            <Feather style={style.icon} name="message-circle" size={20} colo="#E82041"/>
                            WhatsApp
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>
                            <Feather style={style.icon} name="mail" size={20} colo="#E82041"/>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}