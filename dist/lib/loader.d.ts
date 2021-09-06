import { ScriptType, LinkType } from './types';
export declare const loadScript: (scriptDeclare: ScriptType) => Promise<void>;
export declare const loadLink: (linkDeclare: LinkType) => void;
export declare const fetchScript: (src: string) => Promise<string>;
export declare const excuteCode: (code: string) => void;
declare const _default: {
    loadScript: (scriptDeclare: ScriptType) => Promise<void>;
    loadLink: (linkDeclare: LinkType) => void;
    fetchScript: (src: string) => Promise<string>;
    excuteCode: (code: string) => void;
};
export default _default;
