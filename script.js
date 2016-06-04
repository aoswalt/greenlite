"use strict";

const lights = {
  a1r: $(".lighta1 .red"),
  a1y: $(".lighta1 .yellow"),
  a1g: $(".lighta1 .green"),
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

const mapping = {
  roadA: {
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
