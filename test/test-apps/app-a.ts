const code = `\
const bus = window.__Bus__.testBus;

/**
 * app-a indicate both bootstrap and activate lifecycles
 * when it's activate at the first time, it should activate the lib react, and run the bootstrap callback
 * when it's activate after the first time, it should run the activate callback
 */
bus.createApp('app-a')
    .relyOn([
        'react'
    ])
    .bootstrap(() => {
        console.log('bootstraped');
    })
    .activate(() => {
        console.log('reactivated');
    })
    .destroy(() => {
        console.log('destroy');
    });
`;

export default code;