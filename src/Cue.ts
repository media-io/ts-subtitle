
export class Cue {
  start: number = 0
  end: number = 0
  content: string = ''

  constructor() {}

  append_text(line: string) {
    if (this.content === ''){
      this.content = line
    } else {
      this.content += '\n'
      this.content += line
    }
  }

  set_start_time(time: number) {
    this.start = time
  }

  set_end_time(time: number) {
    this.end = time
  }
}
