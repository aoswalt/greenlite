"use strict";

const lights = {
  as1: $(".light1 .red"),
  as2: $(".light1 .yellow"),
  as3: $(".light1 .green"),
  bs1: $(".light2 .red"),
  bs2: $(".light2 .yellow"),
  bs3: $(".light2 .green")
};

//NOTE(adam): object to hold bulb lit status
const lightStatus = {};
for(const k in lights) { lightStatus[k] = {lit: false}; }

const mapping = {
  roadA: {
    S: [
      [lightStatus.as1],
      [lightStatus.as2],
      [lightStatus.as3]
    ]
  },
  roadB: {
    S: [
      [lightStatus.bs1],
      [lightStatus.bs2],
      [lightStatus.bs3]
    ]
  }
};

const signal = {
  roadA: {
    L: 0,
    S: 2,
    R: 0
  },
  roadB: {
    L: 0,
    S: 0,
    R: 0
  }
};


function setLights(signal) {
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

  for(const k in lightStatus) { lights[k].toggleClass("lit", lightStatus[k].lit); }

}

setLights(signal);
// mapping.roadA.S[1][0].toggleClass("lit", true);
