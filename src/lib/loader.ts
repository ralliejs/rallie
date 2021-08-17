export const loadJs = async (src: string) => {
    const promise: Promise<void> = new Promise(resolve => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = () => {
            resolve();
        };
        document.body.appendChild(script);
    });
    return promise;
};

export const loadCss = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
};

export const fetchJs = async (src: string) => {
    try {
        const res = await fetch(src);
        const code = await res.text();
        return code;
    } catch (err) {
        return '';
    }
    
};

export const excuteCode = (code: string) => {
    const fn = new Function(code);
    fn();
};