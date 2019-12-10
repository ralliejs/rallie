import React from 'react';
import { useEffect } from 'react';

function VuePageContainer() {
    useEffect(() => {
        window.globalBus.startApp('vueSocket').then(() => {
            window.globalSocket.emit('mountVuePage');
        });

        return () => {
            window.globalBus.startApp('vueSocket').then(() => {
                window.globalSocket.emit('unmountVuePage');
            });
        };
    }, []);

    return <div></div>;
}

export default VuePageContainer;