import fs from 'fs'
import path from 'path'

import { WebVtt } from '../src/WebVtt'
import { Cue } from '../src/Cue'

describe(`Parse WebVtt`, () => {
  beforeEach(() => {
  })

  it(`empty parsing`, () => {
    const webvtt = new WebVtt()
    const response = webvtt.parse('')
    const cues = webvtt.get_cues()

    expect(response).toBe(false)
    expect(cues).toEqual([])
  })

  it(`parse 1 item`, () => {
    const webvtt = new WebVtt()
    const response = webvtt.parse('WEBVTT\n\n1\n00:00:00.001 --> 00:00:05.000\nSubtitles: @marlonrock1986 (^^V^^)\n')
    const cues = webvtt.get_cues()

    const expected = [{
      start: 0.001,
      end: 5,
      content: 'Subtitles: @marlonrock1986 (^^V^^)'
    }]

    expect(response).toBe(true)
    expect(cues).toEqual(expected)
  })

  it(`parse 2 item`, () => {
    const webvtt = new WebVtt()
    const response = webvtt.parse(`WEBVTT\n
    1\n00:00:00.001 --> 00:00:05.000\nSubtitles: @marlonrock1986 (^^V^^)\n
    2\n00:00:25.801 --> 00:00:28.700\nIt's another hot, sunny day today\nhere in Southern California.\n`)
    const cues = webvtt.get_cues()

    const expected = [{
      start: 0.001,
      end: 5,
      content: 'Subtitles: @marlonrock1986 (^^V^^)'
    },{
      start: 25.801,
      end: 28.7,
      content: 'It\'s another hot, sunny day today\nhere in Southern California.'
    }]

    expect(response).toBe(true)
    expect(cues).toEqual(expected)
  })

  it(`parse file`, () => {
    const filepath = 'samples/La.La.Land.2016.1080p.BluRay.x264-SPARKS.EN.vtt'
    const basename = path.basename(filepath, '.vtt')
    const content = fs.readFileSync(path.join(__dirname, filepath), 'utf8')
    const json_content = fs.readFileSync(path.join(__dirname, 'samples', basename + '.json'), 'utf8')
    const webvtt = new WebVtt()
    webvtt.parse(content)
    const cues = webvtt.get_cues()
    const json_cues = JSON.parse(json_content)
    expect(cues).toEqual(json_cues)
  })
})
