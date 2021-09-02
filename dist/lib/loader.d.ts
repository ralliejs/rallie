import { ScriptType, LinkType } from './types';
export declare const loadJs: (scriptDeclare: ScriptType) => Promise<void>;
export declare const loadCss: (linkDeclare: LinkType) => void;
export declare const fetchJs: (src: string) => Promise<string>;
export declare const excuteCode: (code: string) => void;
declare const _default: {
    loadJs: (scriptDeclare: ScriptType) => Promise<void>;
    loadCss: (linkDeclare: LinkType) => void;
    fetchJs: (src: string) => Promise<string>;
    excuteCode: (code: string) => void;
};
export default _default;
