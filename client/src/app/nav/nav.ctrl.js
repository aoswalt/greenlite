app.controller('navCtrl', function(api, $http) {
  const nav = this

  const initData = $http.get('init.json').then(res => res.data)
  const demoData = $http.get('demo.json').then(res => res.data)

  let vertexList = []
  api.root.then(root => $http.get(root.vertex).then(res => vertexList = res.data))

  let requestAddress = ''
  api.root.then(root => requestAddress = root.event_request)

  nav.initialize = () => initData.then(data =>
    Object.keys(data).forEach(label => {
      const labelAddress = vertexList.find(v => {
        return v.label == label
      }).url
      console.log("labelAddress", labelAddress)

      $http.post(requestAddress, {vertex_target:labelAddress, json_text:JSON.stringify(data[label])})
        .then(console.log, console.error)
    })
  )

  nav.runDemo = () => demoData.then(data =>
    Object.keys(data).forEach(label => {
      const labelAddress = vertexList.find(v => {
        return v.label == label
      }).url
      console.log("labelAddress", labelAddress)

      const interData = data[label]
      interData.expire_time = parseInt(Date.now() / 1000) + 15
      $http.post(requestAddress, {vertex_target:labelAddress, json_text:JSON.stringify(interData)})
        .then(console.log, console.error)
    })
  )

})
