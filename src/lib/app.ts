type callbackType = (config?: any) => void;
type dependenciesType = Array<{[name: string]: any} | string>

export class App {

    public name: string;
    public bootstrapted: boolean;
    public dependencies: dependenciesType;
    public doBootstrap: callbackType;
    public doReactivate?: callbackType;

    constructor(name: string) {
        this.name = name;
        this.bootstrapted = false;
        this.dependencies = [];
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
        this.bootstrapted = true;
        return this;
    }

    /**
     * indicate the callback your app will run when it's activated after the first time
     * @param callback 
     */
    public reactivate(callback: callbackType) {
        this.doReactivate = callback;
        return this;
    }

    public async activateDependenciesApp(activateApp: (name: string, config?: any) => Promise<void>) {
        if (this.dependencies && this.dependencies.length !== 0) {
            for (const dependency of this.dependencies) {
                if (typeof dependency === 'string') {
                    await activateApp(dependency);
                } else if (typeof dependency === 'object') {
                    for (const dependencyName of Object.keys(dependency)) {
                        const config = dependency[dependencyName];
                        await activateApp(dependencyName, config);
                    }
                }
            }
        }
    }
}