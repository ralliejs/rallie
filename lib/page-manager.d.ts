declare class PageManager {
    static modules: any[];
    constructor();
    static createModule(name: any): void;
    static loadModule(): void;
}
export default PageManager;
