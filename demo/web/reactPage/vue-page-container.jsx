import React from 'react';
import { useEffect } from 'react';
import { getBus } from '@runnan/obvious';

function VuePageContainer() {
    const bus = getBus('global');
    const reactSocket = bus.getSocket('reactSocket');
    useEffect(() => {
        bus.DEPRECATED_startApp('vueSocket').then(() => {
            reactSocket.emit('mountVuePage');
        });

        return () => {
            reactSocket.emit('unmountVuePage');
        };
    }, []);

    return (
        <div id='vueRoot'>
            <div id='_vueRoot'></div>
        </div>
    );
}

export default VuePageContainer;