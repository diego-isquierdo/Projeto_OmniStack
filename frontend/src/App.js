import React, {useState} from 'react';

import './global.css';

//importando a todo o diretório 'logon' - React sempre procura pelo index
//import Logon from './pages/logon'; >> importado via 'Routes

import Routes from './routes';



function App(){
  return (
    <Routes/>
  );
}


export default App;

/*
TESTES COM MANIPULAÇÃO DO ESTADO DOS ELEMENTOS

//Havendo mais de uma informação, os elementos devem ser encapsulados - uma <div> p exemplo
function App(){

  //setState retorna um Array de 2 posições > [valor, Function()] > a Fonction 
  //retornada serve para altera o valor
  const [counter, setCounter] = useState(0); //paenas inicilaizando com '0'
  
  function increment(){
    setCounter(counter +1);
  }

  return(
    <di>
      <Header>Contador: {counter}</Header>
      <button onClick={increment}>Incrementar</button>
    </di>
  );
}
*/

//JSX > Js + XML
/*
function App() {
  return (
    //utilizando o conteudo importado do arquivo Header.js
    //Enviando title como parâmettro para a função Header como atributo
    //<Header title="Semana Omnistack"/>
    
    //passando o prâmetro com filho 
    <Header>
      Semana Omnistack - Child
    </Header>
  );
}
*/

//export default App;
