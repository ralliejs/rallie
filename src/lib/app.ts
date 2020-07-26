type callbackType = (config?: any) => Promise<void>;
type dependenciesType = Array<{[name: string]: any} | string>

export class App {

    private dependenciesReady: boolean = false;

    public name: string;
    public bootstrapted: boolean = false;
    public dependencies: dependenciesType = [];
    public doBootstrap?: callbackType;
    public doActivate?: callbackType;
    public doDestroy?: callbackType;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * indicate the apps to be started before your app is bootstrapted
     * @param dependencies 
     */
    public relyOn(dependencies: dependenciesType) {
        this.dependencies = dependencies;
        return this;
    }

    /**
     * indicate the callback your app will run when it's activated the first time
     * @param {function} callback 
     */
    public bootstrap(callback: callbackType) {
        this.doBootstrap = callback;
        return this;
    }

    /**
     * indicate the callback your app will run when it's activated after the first time
     * @param callback 
     */
    public activate(callback: callbackType) {
        this.doActivate = callback;
        return this;
    }

    /**
     * indicate the callback when your app is destroyed
     * @param callback 
     */
    public destroy(callback: callbackType) {
        this.doDestroy = callback;
        return this;
    }

    public async activateDependenciesApp(activateApp: (name: string, config?: any) => Promise<void>) {
        if (!this.dependenciesReady && this.dependencies.length !== 0) {
            for (const dependence of this.dependencies) {
                if (typeof dependence === 'string') {
                    await activateApp(dependence);
                } else if (typeof dependence === 'object') {
                    for (const dependenceName of Object.keys(dependence)) {
                        const config = dependence[dependenceName];
                        await activateApp(dependenceName, config);
                    }
                }
            }
            this.dependenciesReady = true;
        }
    }
}