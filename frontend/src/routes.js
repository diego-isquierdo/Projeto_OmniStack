import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/logon';
import Register from './pages/Register';

//exact > a verredura por rotas, apenas entra se a solicitação for exatamente a mencionada
export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    );
}