import { ref } from 'vue'

/*
 * Ambient sound, synthesised with WebAudio so there is no file to download: a band of soft
 * "air" (filtered brown noise that slowly breathes) under a low, barely-there drone.
 * Off by default, never autoplays, fades in and out. Browsers only allow it after a click.
 */
const playing = ref(false)
let ctx
let master
let fadeTimer

function build() {
  ctx = new (window.AudioContext || window.webkitAudioContext)()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  // brown noise, 4 s loop
  const len = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch)
    let last = 0
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
      data[i] = last * 3.2
    }
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  noise.loop = true
  const air = ctx.createBiquadFilter()
  air.type = 'lowpass'
  air.frequency.value = 520
  air.Q.value = 0.4
  const airGain = ctx.createGain()
  airGain.gain.value = 0.5
  noise.connect(air).connect(airGain).connect(master)

  // slow "breathing" on the air band
  const breath = ctx.createOscillator()
  breath.frequency.value = 0.07
  const breathDepth = ctx.createGain()
  breathDepth.gain.value = 0.22
  breath.connect(breathDepth).connect(airGain.gain)

  // drone: a low fifth, each voice slowly swelling
  ;[
    [110, 0.045, 0.05],
    [164.81, 0.03, 0.037],
    [220.5, 0.012, 0.029],
  ].forEach(([freq, level, rate]) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    const g = ctx.createGain()
    g.gain.value = level
    const lfo = ctx.createOscillator()
    lfo.frequency.value = rate
    const depth = ctx.createGain()
    depth.gain.value = level * 0.8
    lfo.connect(depth).connect(g.gain)
    osc.connect(g).connect(master)
    osc.start()
    lfo.start()
  })

  noise.start()
  breath.start()
}

function fadeTo(value, seconds) {
  const now = ctx.currentTime
  master.gain.cancelScheduledValues(now)
  master.gain.setValueAtTime(master.gain.value, now)
  master.gain.linearRampToValueAtTime(value, now + seconds)
}

async function play() {
  if (!ctx) build()
  clearTimeout(fadeTimer)
  await ctx.resume()
  fadeTo(0.55, 2.5)
  playing.value = true
}

function pause() {
  if (!ctx) return
  fadeTo(0, 1.2)
  playing.value = false
  fadeTimer = setTimeout(() => ctx.suspend(), 1300) // stop using the CPU once silent
}

if (typeof document !== 'undefined') {
  // go quiet when the tab is hidden, come back when it returns
  document.addEventListener('visibilitychange', () => {
    if (!ctx || !playing.value) return
    document.hidden ? ctx.suspend() : ctx.resume()
  })
}

export function useAmbient() {
  return { playing, toggle: () => (playing.value ? pause() : play()) }
}
