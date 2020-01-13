/*global Bus*/
import React from 'react';
import { useEffect } from 'react';

function VuePageContainer() {
    const globalBus = Bus.global;
    const globalSocket = globalBus.getSocket('globalSocket');
    useEffect(() => {
        globalBus.startApp('vueSocket').then(() => {
            globalSocket.emit('mountVuePage');
        });

        return () => {
            globalBus.startApp('vueSocket').then(() => {
                globalSocket.emit('unmountVuePage');
            });
        };
    }, []);

    return (
        <div id='vueRoot'>
            <div id='_vueRoot'></div>
        </div>
    );
}

export default VuePageContainer;