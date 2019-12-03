class PageModule {
    constructor(name) {
        console.log(name);
    }

    on(eventName, callback) {
        console.log(eventName);
        console.log(callback);
    }

    off(event) {
        console.log(event);
    }

    get() {

    }

    set() {

    }
}

export default PageModule;
