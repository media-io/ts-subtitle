"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cue_1 = require("./Cue");
const Timecode_1 = require("./Timecode");
class Vtt {
    constructor() {
        this.cues = [];
    }
    parse(content) {
        if (content == null) {
            console.error('no content provided');
            return false;
        }
        var is_header = true;
        var cue_number = 0;
        var next_line_is_blank = false;
        var next_line_can_be_index = false;
        var next_line_is_time = false;
        var next_line_can_be_text = false;
        let cue = new Cue_1.Cue();
        for (var line of content.split('\n')) {
            // console.log(line)
            if (is_header) {
                if (line !== 'WEBVTT') {
                    console.error('Not a WebVTT content');
                    return false;
                }
                next_line_is_blank = true;
                is_header = false;
                continue;
            }
            if (next_line_is_blank) {
                if (line !== '') {
                    console.error("Line can't be blank here");
                    return false;
                }
                next_line_is_blank = false;
                next_line_can_be_index = true;
                continue;
            }
            if (next_line_can_be_index && !next_line_is_blank && !next_line_is_time && !next_line_can_be_text) {
                if (line !== '') {
                    var new_cue_number = Number(line);
                    if (new_cue_number !== cue_number + 1) {
                        console.error("Cue index don't match");
                        return false;
                    }
                    cue_number = new_cue_number;
                    next_line_can_be_index = false;
                    next_line_is_time = true;
                }
                continue;
            }
            if (next_line_is_time) {
                var times = line.split('-->');
                if (times.length !== 2) {
                    console.error('unable to parse times');
                    return false;
                }
                let timecode = new Timecode_1.Timecode();
                cue.set_start_time(timecode.to_number(times[0]));
                cue.set_end_time(timecode.to_number(times[1]));
                next_line_is_time = false;
                next_line_can_be_text = true;
                continue;
            }
            if (next_line_can_be_text) {
                if (line === '') {
                    this.cues.push(cue);
                    cue = new Cue_1.Cue();
                    next_line_can_be_text = false;
                    next_line_can_be_index = true;
                    continue;
                }
                cue.append_text(line);
            }
        }
        return true;
    }
    dump() {
        var index = 0;
        return 'WEBVTT\n' + this.cues.map((cue) => {
            var timecode = new Timecode_1.Timecode();
            index += 1;
            return '\n' + [
                index,
                `${timecode.to_timecode(cue.start, true)} --> ${timecode.to_timecode(cue.end, true)}`,
                cue.content
            ].join('\n');
        }).join('\n') + '\n';
    }
    get_cues() {
        return this.cues;
    }
    set_cues(cues) {
        this.cues = cues;
    }
}
exports.Vtt = Vtt;
//# sourceMappingURL=Vtt.js.map