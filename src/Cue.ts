
export class Cue {
  start: number = null
  end: number = null
  content: string = ""

  constructor() {}

  append_text(line: string) {
    if(this.content == ""){
      this.content = line
    } else {
      this.content += "\n"
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
