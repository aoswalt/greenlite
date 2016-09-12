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

const schedule = []

/**
 * Add a new entry to the schedule
 * @param {object} entry - The new schedule entry to add
 */
function addScheduleEntry(entry) { setScheduleEntry(entry, false) }

/**
 * Set a new schedule entry, overwriting if same priority exists
 * @param {object} entry - The schedule entry to add
 * @param {boolean} allowOverwrite - Allow overwriting existing priorities
 */
function setScheduleEntry(entry, allowOverwrite=true) {
  if(!entry.hasOwnProperty('priority')) {
    console.error("No priority for schedule", entry)
    return
  }

  let existing = null
  if(existing = schedule.find(e => e.priority === entry.priority)) {
    if(allowOverwrite) {
      console.warn("Overwriting priority", existing.priority)
      schedule.splice(schedule.indexOf(existing))
    } else {
      console.error("Entry already exists for priority ", existing.priority)
      return
    }
  }

  schedule.push(entry)
  sortSchedule()
}

/**
 * Sort schedule to have higher priority entries first
 */
function sortSchedule() {
  schedule.sort((a, b) => b.priority - a.priority)
}

/**
 * Set lights from signal
 * @param {object} signal - The signal to control the lights
 */
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

  Object.keys(lightStatus).forEach(k => lights[k].toggleClass('lit', lightStatus[k].lit))
}


let i = 0
setInterval(() => {
  let entrySignals = disabledPattern.signals
  for(const entry of schedule) {
    if(entry.startTime && currentTime < entry.startTime) { continue }
    if(entry.endTime && entry.endTime < currentTime) { continue }

    entrySignals = entry.signals
    break
  }

  //TODO(adam): add fallback signal pattern

  //TODO(adam): add time-based signal indexing
  i %= entrySignals.length
  setLights(entrySignals[i++])
  currentTime = Date.now()
}, 1000)
