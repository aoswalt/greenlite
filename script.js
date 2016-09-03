'use strict'

let currentTime = Date.now()

//NOTE(adam): object to hold bulb lit status
const lightStatus = {}
Object.keys(lights).forEach(k => lightStatus[k] = {lit: false} )

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

//NOTE(adam): add labels to schedule
scheduleLabels.forEach(l => schedule[l] = null)


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
    console.log("invalid payload label", data.label)
  }
}


let i = 0
setInterval(() => {
  let activeSignalList = null
  //NOTE(adam): order is important
  for(const label of scheduleLabels) {
    let currSchedule = schedule[label];
    if(currSchedule) {
      //TODO(adam): if signal applies now
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
  if(i >= activeSignalList.length) { i = 0 }
  currentTime = Date.now()
}, 1000)
