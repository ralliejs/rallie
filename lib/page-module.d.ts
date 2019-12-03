declare class PageModule {
    constructor(name: any);
    on(eventName: any, callback: any): void;
    off(event: any): void;
    get(): void;
    set(): void;
}
export default PageModule;
