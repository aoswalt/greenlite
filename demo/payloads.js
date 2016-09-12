const entry = {
  priority: 5,
  startTime: Date.now(),
  endTime: Date.now() + 6000,
  repeat: true,
  expireTime: 0,
  signals: [
    {
      roadA: {L:0, S:2, R:0},
      roadB: {L:0, S:0, R:0}
    },
    {
      roadA: {L:2, S:1, R:0},
      roadB: {L:0, S:2, R:0}
    }
  ]
}

// addScheduleEntry(entry)

updateEntryEnd = () => {
  entry.endTime = Date.now() + 6000
  return entry
}
