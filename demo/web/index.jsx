import React from 'react';
import ReactDOM from 'react-dom'; 
import { Bus } from '@runnan/obvious';
import { Switch, Route, HashRouter } from 'react-router-dom';
import VuePageContainer from './reactModule/vue-page-container';
import ReactPage from './reactModule/react-page';

window.globalBus = new Bus({
    vueSocket: {
        js: ['/assets/vueModule.js']
    }
});

const { globalBus } = window;
globalBus.createSocket('globalSocket', [], (socket) => {
    window.globalSocket = socket;
    ReactDOM.render((
        <HashRouter>
            <Switch>
                <Route path='/reactPage' component={ReactPage} />
                <Route path='/vuePage' component={VuePageContainer} />     
            </Switch>        
        </HashRouter>
    ), document.getElementById('reactRoot'));
});

