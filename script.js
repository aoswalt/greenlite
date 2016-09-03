'use strict'

let currentTime = Date.now()

//NOTE(adam): object to hold bulb lit status
const lightStatus = {}
Object.keys(lights).forEach(k => lightStatus[k] = {lit: false})

//NOTE(adam): generate mapping from mapping labels
const mapping = {}
Object.keys(mappingLabels).forEach(road => {
  mapping[road] = {}
  Object.keys(mappingLabels[road]).forEach(direction => {
    mapping[road][direction] = mappingLabels[road][direction].map(lightMapLabelList =>
      lightMapLabelList.map(label =>
        label ? lightStatus[label] : {}
      )
    )
  })
})

//NOTE(adam): order is priority
const scheduleLabels = ['emergency', 'single', 'repeat', 'day', 'base']
const schedule = {}
scheduleLabels.forEach(l => schedule[l] = null) //NOTE(adam): add labels to schedule


function setLights(signal) {
  const signalRoads = Object.keys(signal)

  signalRoads.forEach(road => {
    const mappingDirections = Object.keys(mapping[road])
    mappingDirections.forEach(dir => {
      const mapDir = mapping[road][dir]
      //NOTE(adam): toggle all off first
      mapDir.forEach(dir => dir.forEach(light => light.lit = false))
    })

    const signalDirections = Object.keys(signal[road])
    signalDirections.forEach(dir => {
      //NOTE(adam): only operate on existing mappingDirections
      if(mapping[road].hasOwnProperty(dir)) {
        const mapDir = mapping[road][dir]
        const signalNumber = signal[road][dir]
        mapDir[signalNumber].forEach(light => light.lit = true)
      }
    })
  })

  Object.keys(lightStatus).forEach(k => lights[k].toggleClass('lit', lightStatus[k].lit) )
}

function pushPayload(data) {
  if(scheduleLabels.indexOf(data.label) > -1) {
    schedule[data.label] = data
  } else {
    console.error("invalid payload label", data.label)
  }
}


let i = 0
setInterval(() => {
  let activeSignalList = null
  //NOTE(adam): order is important
  //NOTE(adam): cannot break a forEach
  for(const label of scheduleLabels) {
    const currSchedule = schedule[label];
    if(currSchedule) {
      //NOTE(adam): cannot break a forEach
      for(const signal of currSchedule.signals) {
        if(signal.startTime && currentTime < signal.startTime) { continue }
        if(signal.endTime && signal.endTime < currentTime) { continue }

        activeSignalList = signal.list;
        break
      }
      if(activeSignalList) { break }
    }
  }

  //NOTE(adam): fall back to base schedule if nothing applies
  if(!activeSignalList) {
    activeSignalList = schedule.base.signals[0].list
  }

  i %= activeSignalList.length;
  setLights(activeSignalList[i++])
  currentTime = Date.now()
}, 1000)
