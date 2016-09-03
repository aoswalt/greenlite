const lights = {
  a1r: $('.lighta1 .red'),
  a1y: $('.lighta1 .yellow'),
  a1g: $('.lighta1 .green'),
  a1gl: $('.lighta1 .greenLeft'),
  a2r: $('.lighta2 .red'),
  a2y: $('.lighta2 .yellow'),
  a2g: $('.lighta2 .green'),
  b1r: $('.lightb1 .red'),
  b1y: $('.lightb1 .yellow'),
  b1g: $('.lightb1 .green'),
}

const mappingLabels = {
  roadA: {
    L: [
      [''],
      [''],
      ['a1gl']
    ],
    S: [
      ['a1r', 'a2r'],
      ['a1y', 'a2y'],
      ['a1g', 'a2g']
    ]
  },
  roadB: {
    S: [
      ['b1r'],
      ['b1y'],
      ['b1g']
    ]
  }
}


// const mapping = {
//   roadA: {
//     L: [
//       [{}],
//       [{}],
//       [lightStatus.a1gl]
//     ],
//     S: [
//       [lightStatus.a1r, lightStatus.a2r],
//       [lightStatus.a1y, lightStatus.a2y],
//       [lightStatus.a1g, lightStatus.a2g]
//     ]
//   },
//   roadB: {
//     S: [
//       [lightStatus.b1r],
//       [lightStatus.b1y],
//       [lightStatus.b1g]
//     ]
//   }
// }
