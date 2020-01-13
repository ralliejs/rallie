import React from 'react';
import ReactDOM from 'react-dom'; 
import { createBus } from '@runnan/obvious';
import { Switch, Route, HashRouter } from 'react-router-dom';
import VuePageContainer from './reactModule/vue-page-container';
import ReactPage from './reactModule/react-page';

createBus('global', {
    vueSocket: {
        js: ['/assets/vueModule.js']
    }
});

const globalBus  = window.Bus.global;
globalBus.createSocket('globalSocket', [], () => {
    ReactDOM.render((
        <HashRouter>
            <Switch>
                <Route path='/reactPage' component={ReactPage} />
                <Route path='/vuePage' component={VuePageContainer} />     
            </Switch>        
        </HashRouter>
    ), document.getElementById('reactRoot'));
});

