'use strict'

const lights = {
  a1r: $('.lighta1 .red'),
  a1y: $('.lighta1 .yellow'),
  a1g: $('.lighta1 .green'),
  a1gl: $('.lighta1 .greenLeft'),
  a2r: $('.lighta2 .red'),
  a2y: $('.lighta2 .yellow'),
  a2g: $('.lighta2 .green'),
  b1r: $('.lightb1 .red'),
  b1y: $('.lightb1 .yellow'),
  b1g: $('.lightb1 .green')
}

//NOTE(adam): object to hold bulb lit status
const lightStatus = {}
Object.keys(lights).forEach(k => lightStatus[k] = {lit: false} )

const mapping = {
  roadA: {
    L: [
      [{}],
      [{}],
      [lightStatus.a1gl]
    ],
    S: [
      [lightStatus.a1r, lightStatus.a2r],
      [lightStatus.a1y, lightStatus.a2y],
      [lightStatus.a1g, lightStatus.a2g]
    ]
  },
  roadB: {
    S: [
      [lightStatus.b1r],
      [lightStatus.b1y],
      [lightStatus.b1g]
    ]
  }
}

//NOTE(adam): order is priority
const scheduleLabels = ['emergency', 'single', 'repeat', 'day', 'base']

const schedule = {
  base: {}
}

//NOTE(adam): add labels to schedule
scheduleLabels.forEach(l => schedule[l] = null)

const basePayload = {
  label: 'base',
  signals: [{
    repeat: true,
    list: [
      {
        roadA: {L:0, S:0, R:0},
        roadB: {L:0, S:1, R:0},
      },
      {
        roadA: {L:0, S:1, R:0},
        roadB: {L:0, S:0, R:0},
      },
    ]
  }]
}

const payload = {
  label: 'repeat',
  signals: [{
    startTime: 0,
    endTime: 0,
    repeat: true,
    expireTime: 0,
    list: [
      {
        roadA: {L:0, S:2, R:0},
        roadB: {L:0, S:0, R:0}
      },
      {
        roadA: {L:2, S:1, R:0},
        roadB: {L:0, S:2, R:0}
      }
    ]
  }]
}


function setLights(signal) {
  const signalRoads = Object.keys(signal)

  signalRoads.forEach((road) => {
    const mappingDirections = Object.keys(mapping[road])
    mappingDirections.forEach(dir => {
      const mapDir = mapping[road][dir]
      //NOTE(adam): toggle all off first
      for(let signalNum = 0; signalNum < mapDir.length; ++signalNum) {
        for(let lightNum = 0; lightNum < mapDir[signalNum].length; ++lightNum) {
          mapDir[signalNum][lightNum].lit = false
        }
      }
    })

    const signalDirections = Object.keys(signal[road])
    signalDirections.forEach(dir => {
      //NOTE(adam): only operate on existing mappingDirections
      if(mapping[road].hasOwnProperty(dir)) {
        const mapDir = mapping[road][dir]
        const signalNumber = signal[road][dir]
        for(let statusIndex = 0; statusIndex < mapDir[signalNumber].length; ++statusIndex) {
          const status = mapDir[signalNumber][statusIndex]
          status.lit = true
        }
      }
    })
  })

  for(const k in lightStatus) { lights[k].toggleClass('lit', lightStatus[k].lit) }
}

function pushPayload(data) {
  if(scheduleLabels.indexOf(data.label) > -1) {
    schedule[data.label] = data
  } else {
    console.log("invalid payload label", data.label);
  }
}

pushPayload(basePayload)
// pushPayload(payload)

let i = 0
let activeSignalList = null
setInterval(() => {
  //NOTE(adam): order is important
  // scheduleLabels.forEach(label => {
  for(const label of scheduleLabels) {
    if(schedule[label]) {
      //TODO(adam): if signal applies now
      activeSignalList = schedule[label].signals[0].list
      if(i >= activeSignalList.length && !activeSignalList.repeat) {
        i = 0
      }
      break
    }
  }

  //NOTE(adam): fall back to base schedule if nothing applies
  if(!activeSignalList) {
    activeSignalList = schedule.base.signals[0].list
  }

  setLights(activeSignalList[i++])
  if(i >= activeSignalList.length) { i = 0 }
}, 1000)
