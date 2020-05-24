import React from 'react';
import ReactDOM from 'react-dom'; 
import { createBus, getBus } from '@runnan/obvious';
import { Switch, Route, HashRouter } from 'react-router-dom';
import VuePageContainer from './reactModule/vue-page-container';
import ReactPage from './reactModule/react-page';

createBus('global', {
    vueSocket: {
        js: ['/assets/vueModule.js']
    }
});
console.log(window._Bus_);

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

