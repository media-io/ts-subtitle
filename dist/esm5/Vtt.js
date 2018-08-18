"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cue_1 = require("./Cue");
var Timecode_1 = require("./Timecode");
var Vtt = /** @class */ (function () {
    function Vtt() {
        this.cues = [];
    }
    Vtt.prototype.parse = function (content) {
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
        var cue = new Cue_1.Cue();
        for (var _i = 0, _a = content.split('\n'); _i < _a.length; _i++) {
            var line = _a[_i];
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
                var timecode = new Timecode_1.Timecode();
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
    };
    Vtt.prototype.dump = function () {
        var index = 0;
        return 'WEBVTT\n' + this.cues.map(function (cue) {
            var timecode = new Timecode_1.Timecode();
            index += 1;
            return '\n' + [
                index,
                timecode.to_timecode(cue.start, true) + " --> " + timecode.to_timecode(cue.end, true),
                cue.content
            ].join('\n');
        }).join('\n') + '\n';
    };
    Vtt.prototype.get_cues = function () {
        return this.cues;
    };
    Vtt.prototype.set_cues = function (cues) {
        this.cues = cues;
    };
    return Vtt;
}());
exports.Vtt = Vtt;
//# sourceMappingURL=Vtt.js.map