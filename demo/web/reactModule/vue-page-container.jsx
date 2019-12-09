import React from 'react';
import { useEffect } from 'react';

function VuePageContainer() {
    useEffect(() => {
        window.globalBus.loadSocket('vueSocket').then(() => {
            console.log('global emit moutVuePage');
            window.globalSocket.emit('mountVuePage');
        });

        return () => {
            window.globalBus.loadSocket('vueSocket').then(() => {
                window.globalSocket.emit('unmountVuePage');
            });
        };
    }, []);

    return <div id='vuePage'></div>;
}

export default VuePageContainer;