import { ScriptType, LinkType } from './types'; // eslint-disable-line

export const loadJs = async (scriptDeclare: ScriptType) => {
  const promise: Promise<void> = new Promise(resolve => {
    let scriptAttrs: ScriptType = {
      type: 'text/javascript'
    };
    if (typeof scriptDeclare === 'string') {
      scriptAttrs = {
        ...scriptAttrs,
        src: scriptDeclare
      };
    } else {
      scriptAttrs = { 
        ...scriptAttrs,
        ...scriptDeclare
      };
    }
    const script = document.createElement('script');
    Object.entries(scriptAttrs).forEach(([attr, value]) => {
      script[attr] = value;
    });
    if (script.src) {
      script.onload = script.onerror = () => {
        resolve();
      };
    }
    document.body.appendChild(script);
    if (!script.src) {
      resolve();
    }
  });
  return promise;
};

export const loadCss = (linkDeclare: LinkType) => {
  let linkAttrs: LinkType = {
    rel: 'stylesheet',
    type: 'text/css'
  };
  if (typeof linkDeclare === 'string') {
    linkAttrs = {
      ...linkAttrs,
      href: linkDeclare
    };
  } else {
    linkAttrs = {
      ...linkAttrs,
      ...linkDeclare
    };
  }
  const link = document.createElement('link');
  Object.entries(linkAttrs).forEach(([attr, value]) => {
    link[attr] = value;
  });
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

export default {
  loadJs,
  loadCss,
  fetchJs,
  excuteCode
};
