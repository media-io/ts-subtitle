"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cue {
    constructor() {
        this.start = 0;
        this.end = 0;
        this.content = '';
    }
    append_text(line) {
        if (this.content === '') {
            this.content = line;
        }
        else {
            this.content += '\n';
            this.content += line;
        }
    }
    set_start_time(time) {
        this.start = time;
    }
    set_end_time(time) {
        this.end = time;
    }
}
exports.Cue = Cue;
//# sourceMappingURL=Cue.js.map