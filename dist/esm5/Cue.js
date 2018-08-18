"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cue = /** @class */ (function () {
    function Cue() {
        this.start = 0;
        this.end = 0;
        this.content = '';
    }
    Cue.prototype.append_text = function (line) {
        if (this.content === '') {
            this.content = line;
        }
        else {
            this.content += '\n';
            this.content += line;
        }
    };
    Cue.prototype.set_start_time = function (time) {
        this.start = time;
    };
    Cue.prototype.set_end_time = function (time) {
        this.end = time;
    };
    return Cue;
}());
exports.Cue = Cue;
//# sourceMappingURL=Cue.js.map