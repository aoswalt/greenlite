const lights = {
  a1r: $(".lighta1 .red"),
  a1y: $(".lighta1 .yellow"),
  a1g: $(".lighta1 .green"),
  a1gl: $(".lighta1 .greenLeft"),
  a2r: $(".lighta2 .red"),
  a2y: $(".lighta2 .yellow"),
  a2g: $(".lighta2 .green"),
  b1r: $(".lightb1 .red"),
  b1y: $(".lightb1 .yellow"),
  b1g: $(".lightb1 .green")
};

//NOTE(adam): object to hold bulb lit status
const lightStatus = {};
for(const k in lights) { lightStatus[k] = {lit: false}; }

//NOTE(adam): mapping of lights to road turn directions
//NOTE(adam): should only be set at setup
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
};

const schedule = {
  emergency: null,
  events: null,
  repeats: null,
  planner: null
};

//NOTE(adam): order used for priority
const scheduleLabels = ["emergency", "events", "repeats", "planner"];

//NOTE(adam): fallback schedule with simple timing
const baseSchedule = {
  priority: "base",
  signals: [{
    startTime: 0,
    endTime: 0,
    repeat: true,
    expireTime: 0,
    list: [
      {
        roadA: {L: 2, S: 2, R: 0 },
        roadB: {L: 0, S: 0, R: 0 }
      },
      {
        roadA: {L: 2, S: 2, R: 0 },
        roadB: {L: 0, S: 0, R: 0 }
      },
      {
        roadA: {L: 0, S: 2, R: 0 },
        roadB: {L: 0, S: 0, R: 0 }
      },
      {
        roadA: {L: 0, S: 1, R: 0 },
        roadB: {L: 0, S: 0, R: 0 }
      },
      {
        roadA: {L: 0, S: 1, R: 0 },
        roadB: {L: 0, S: 0, R: 0 }
      },
      {
        roadA: {L: 0, S: 0, R: 0 },
        roadB: {L: 0, S: 2, R: 0 }
      }
    ]
  }]
};

//NOTE(adam): set lights status based on active signal list
function setLightsStatus(signal) {
  const signalRoads = Object.keys(signal);

  signalRoads.forEach((road) => {
    const mappingDirections = Object.keys(mapping[road]);
    mappingDirections.forEach(dir => {
      const mapDir = mapping[road][dir];
      //NOTE(adam): toggle all off first
      for(let signalNum = 0; signalNum < mapDir.length; ++signalNum) {
        for(let lightNum = 0; lightNum < mapDir[signalNum].length; ++lightNum) {
          mapDir[signalNum][lightNum].lit = false;
        }
      }
    });

    const signalDirections = Object.keys(signal[road]);
    signalDirections.forEach(dir => {
      //NOTE(adam): only operate on existing mappingDirections
      if(mapping[road].hasOwnProperty(dir)) {
        const mapDir = mapping[road][dir];
        const signalNumber = signal[road][dir];
        for(let statusIndex = 0; statusIndex < mapDir[signalNumber].length; ++statusIndex) {
          const status = mapDir[signalNumber][statusIndex];
          status.lit = true;
        }
      }
    });
  });

  //NOTE(adam): set light based on status
  for(const k in lightStatus) { lights[k].toggleClass("lit", lightStatus[k].lit); }
}

//NOTE(adam): "public" access point for setting a schedule
function pushSchedule(data) {
  schedule[data.priority] = data;
}

//NOTE(adam): timing loop
let i = 0;
let activeSignalList = null;
setInterval(() => {
  //NOTE(adam): order is important
  scheduleLabels.forEach(label => {
    if(schedule[label]) {
      //TODO(adam): determine if signal applies now
      activeSignalList = schedule[label].signals[0].list;
    }
  });

  //NOTE(adam): fall back to base schedule if nothing applies
  if(!activeSignalList) {
    activeSignalList = baseSchedule.signals[0].list;
  }

  if(i >= activeSignalList.length) { i = 0; }
  setLightsStatus(activeSignalList[i++]);

  //TODO(adam): determine if schedule(s) expired
}, 1000);


const plannerBlock = {
  priority: "planner",
  signals: [{
    startTOD: 0,
    endTOD: 0,
    startTime: 0,
    endTime: 0,
    repeat: false,
    expireTime: 0,
    list: [
      {
        roadA: {L: 2, S: 0, R: 0 },
        roadB: {L: 0, S: 0, R: 0 }
      },
      {
        roadA: {L: 0, S: 0, R: 0 },
        roadB: {L: 0, S: 1, R: 0 }
      }
    ]
  }]
};

// pushSchedule(plannerBlock);
