import React from 'react';
import ReactDOM from 'react-dom'; 
import { createBus, getBus } from '@runnan/obvious';
import { Switch, Route, HashRouter } from 'react-router-dom';
import VuePageContainer from './reactPage/vue-page-container';
import ReactPage from './reactPage/react-page';

createBus('global', {
    vueSocket: {
        js: ['/assets/js/vueModule.js']
    }
});

const bus = getBus('global');
bus.createSocket('reactSocket', [], () => {
    ReactDOM.render((
        <HashRouter>
            <Switch>
                <Route path='/reactPage' component={ReactPage} />
                <Route path='/vuePage' component={VuePageContainer} />     
            </Switch>        
        </HashRouter>
    ), document.getElementById('reactRoot'));
});

