const basePayload = {
  priority: 0,
  repeat: true,
  signals: [
    {
      roadA: {},
      roadB: {L:0, S:0, R:0},
    },
    {
      roadA: {L:0, S:0, R:0},
      roadB: {},
    },
  ]
}

const payload = {
  priority: 5,
  startTime: 0,
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

pushPayload(basePayload)
// pushPayload(payload)
