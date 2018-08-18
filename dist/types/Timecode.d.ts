export declare class Timecode {
    private framerate;
    constructor(framerate?: number);
    to_number(timecode: string): number | any;
    to_timecode(time: number, use_miliseconds?: boolean): string;
}
//# sourceMappingURL=Timecode.d.ts.map