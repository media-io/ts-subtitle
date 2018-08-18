"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timecode = /** @class */ (function () {
    function Timecode(framerate) {
        if (framerate === void 0) { framerate = 25.0; }
        this.framerate = framerate;
    }
    Timecode.prototype.to_number = function (timecode) {
        var timecode = timecode.trim();
        var format = timecode.split('.');
        if (format.length === 2) {
            var time = format[0].split(':');
            var milli = Number(format[1]);
            if (time.length !== 3) {
                console.error('unsupported timecode format for ' + timecode);
            }
            var hours = Number(time[0]);
            var minutes = Number(time[1]);
            var seconds = Number(time[2]);
            return seconds + minutes * 60 + hours * 3600 + 0.001 * milli;
        }
        if (format.length === 1) {
            var time = timecode.split(':');
            if (time.length !== 4) {
                console.error('unsupported timecode format for ' + timecode);
            }
            var hours = Number(time[0]);
            var minutes = Number(time[1]);
            var seconds = Number(time[2]);
            var frames = Number(time[3]);
            return seconds + minutes * 60 + hours * 3600 + frames / this.framerate;
        }
        console.error('unsupported timecode format for ' + timecode);
        return null;
    };
    Timecode.prototype.to_timecode = function (time, use_miliseconds) {
        if (use_miliseconds === void 0) { use_miliseconds = false; }
        var hours = Math.trunc(time / 3600);
        var minutes = Math.trunc((time / 60) - (hours * 60));
        var seconds = Math.trunc(time - minutes * 60 - (hours * 3600));
        var milli = Math.round(1000.0 * (time - seconds - (minutes * 60) - (hours * 3600)));
        var frames = milli * this.framerate / 1000.0;
        var h = String(hours).padStart(2, '0');
        var m = String(minutes).padStart(2, '0');
        var s = String(seconds).padStart(2, '0');
        var mi = String(milli).padStart(3, '0');
        var f = String(frames).padStart(2, '0');
        if (use_miliseconds) {
            return h + ":" + m + ":" + s + "." + mi;
        }
        else {
            return h + ":" + m + ":" + s + ":" + f;
        }
    };
    return Timecode;
}());
exports.Timecode = Timecode;
//# sourceMappingURL=Timecode.js.map