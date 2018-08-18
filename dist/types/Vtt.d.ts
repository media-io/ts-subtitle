import { Cue } from './Cue';
export declare class Vtt {
    cues: Cue[];
    constructor();
    parse(content: string): boolean;
    dump(): string;
    get_cues(): Cue[];
    set_cues(cues: Cue[]): void;
}
//# sourceMappingURL=Vtt.d.ts.map