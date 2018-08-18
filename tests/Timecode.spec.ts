
import { Timecode } from '../src/Timecode'

describe(`Timecode`, () => {
  tc: Timecode

  beforeEach(() => {
    this.tc = new Timecode()
  })

  it(`parse timecodes`, () => {
    expect(this.tc.to_number('00:00:00.000')).toBe(0.0)
    expect(this.tc.to_number('00:00:00.001')).toBe(0.001)
    expect(this.tc.to_number('00:00:01.000')).toBe(1.0)
    expect(this.tc.to_number('00:01:00.000')).toBe(60.0)
    expect(this.tc.to_number('01:00:00.000')).toBe(3600.0)

    expect(this.tc.to_number('00:00:00:00')).toBe(0.0)
    expect(this.tc.to_number('00:00:00:01')).toBe(0.04)
    expect(this.tc.to_number('00:00:00:24')).toBe(0.96)
    expect(this.tc.to_number('00:00:01:00')).toBe(1.0)
    expect(this.tc.to_number('00:01:00:00')).toBe(60.0)
    expect(this.tc.to_number('01:00:00:00')).toBe(3600.0)
  })

  it(`parse timecodes with framerate 50 fps`, () => {
    var tc = new Timecode(50.0)
    expect(tc.to_number('00:00:00.000')).toBe(0.0)
    expect(tc.to_number('00:00:00.001')).toBe(0.001)
    expect(tc.to_number('00:00:01.000')).toBe(1.0)
    expect(tc.to_number('00:01:00.000')).toBe(60.0)
    expect(tc.to_number('01:00:00.000')).toBe(3600.0)

    expect(tc.to_number('00:00:00:00')).toBe(0.0)
    expect(tc.to_number('00:00:00:01')).toBe(0.02)
    expect(tc.to_number('00:00:00:49')).toBe(0.98)
    expect(tc.to_number('00:00:01:00')).toBe(1.0)
    expect(tc.to_number('00:01:00:00')).toBe(60.0)
    expect(tc.to_number('01:00:00:00')).toBe(3600.0)
  })

  it(`dump timecodes`, () => {
    expect(this.tc.to_timecode(0.0, true)).toBe('00:00:00.000')
    expect(this.tc.to_timecode(0.001, true)).toBe('00:00:00.001')
    expect(this.tc.to_timecode(1.0, true)).toBe('00:00:01.000')
    expect(this.tc.to_timecode(60.0, true)).toBe('00:01:00.000')
    expect(this.tc.to_timecode(3600.0, true)).toBe('01:00:00.000')

    expect(this.tc.to_timecode(0.0)).toBe('00:00:00:00')
    expect(this.tc.to_timecode(0.04)).toBe('00:00:00:01')
    expect(this.tc.to_timecode(0.96)).toBe('00:00:00:24')
    expect(this.tc.to_timecode(1.0)).toBe('00:00:01:00')
    expect(this.tc.to_timecode(60.0)).toBe('00:01:00:00')
    expect(this.tc.to_timecode(3600.0)).toBe('01:00:00:00')
  })

  it(`dump timecodes with framerate 50 fps`, () => {
    var tc = new Timecode(50.0)
    expect(tc.to_timecode(0.0, true)).toBe('00:00:00.000')
    expect(tc.to_timecode(0.001, true)).toBe('00:00:00.001')
    expect(tc.to_timecode(1.0, true)).toBe('00:00:01.000')
    expect(tc.to_timecode(60.0, true)).toBe('00:01:00.000')
    expect(tc.to_timecode(3600.0, true)).toBe('01:00:00.000')

    expect(tc.to_timecode(0.0)).toBe('00:00:00:00')
    expect(tc.to_timecode(0.02)).toBe('00:00:00:01')
    expect(tc.to_timecode(0.98)).toBe('00:00:00:49')
    expect(tc.to_timecode(1.0)).toBe('00:00:01:00')
    expect(tc.to_timecode(60.0)).toBe('00:01:00:00')
    expect(tc.to_timecode(3600.0)).toBe('01:00:00:00')
  })

})
