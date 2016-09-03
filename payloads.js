const basePayload = {
  label: 'base',
  signals: [{
    repeat: true,
    list: [
      {
        roadA: {},
        roadB: {L:0, S:0, R:0},
      },
      {
        roadA: {L:0, S:0, R:0},
        roadB: {},
      },
    ]
  }]
}

const payload = {
  label: 'repeat',
  signals: [{
    startTime: 0,
    endTime: Date.now() + 6000,
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

pushPayload(basePayload)
// pushPayload(payload)
