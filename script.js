"use strict";
const mapping = {
  roadA: {
    S: [
      [$(".red")],
      [$(".yellow")],
      [$(".green")]
    ]
  }
};

const signal = {
  roadA: {
    L: 0,
    S: 1,
    R: 0
  }
};


function setLights(signal) {
  Object.keys(signal).forEach((road) => {
    Object.keys(mapping[road]).forEach(dir => {
      //NOTE(adam): toggle all off first
      for(let i = 0; i < 3; ++i) {
        mapping[road][dir][i].forEach(l => l.toggleClass("lit", false));
      }
    });

    Object.keys(signal[road]).forEach(dir => {
      //NOTE(adam): only operate on existing directions
      if(mapping[road].hasOwnProperty(dir)) {
        mapping[road][dir][signal[road][dir]].forEach(l => l.toggleClass("lit", true));
      }
    });
  });
}

setLights(signal);
// mapping.roadA.S[1][0].toggleClass("lit", true);
