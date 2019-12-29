import React from 'react';
import { useEffect } from 'react';

function VuePageContainer() {
    const globalBus = window.globalBus;
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

    return <div></div>;
}

export default VuePageContainer;