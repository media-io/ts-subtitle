
import { Vtt } from '../Vtt'
import { Cue } from '../Cue'

describe(`DumpVtt`, () => {
  beforeEach(() => {
  })

  it(`dump empty content`, () => {
    const vtt = new Vtt()
    vtt.set_cues([])
    var content = vtt.dump()

    expect(content).toEqual("WEBVTT\n\n")
  })

  it(`dump 1 item`, () => {
    const vtt = new Vtt()
    vtt.set_cues([{
      start: 0.001,
      end: 5,
      content: 'Subtitles: @marlonrock1986 (^^V^^)'
    }])
    const response = vtt.dump()
    const expected = "WEBVTT\n\n1\n00:00:00.001 --> 00:00:05.000\nSubtitles: @marlonrock1986 (^^V^^)\n"
    expect(response).toBe(expected)
  })

  it(`dump 2 item`, () => {
    const vtt = new Vtt()
    vtt.set_cues([{
      start: 0.001,
      end: 5,
      content: 'Subtitles: @marlonrock1986 (^^V^^)'
    },{
      start: 25.801,
      end: 28.7,
      content: 'It\'s another hot, sunny day today\nhere in Southern California.'
    }])

    const expected = `WEBVTT\n
1\n00:00:00.001 --> 00:00:05.000\nSubtitles: @marlonrock1986 (^^V^^)\n
2\n00:00:25.801 --> 00:00:28.700\nIt's another hot, sunny day today\nhere in Southern California.\n`
    const response = vtt.dump()
    expect(response).toEqual(expected)
  })
})
