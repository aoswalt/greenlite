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
      const labelAddress = vertexList.find(v => v.label == label).address

      $http.post(requestAddress,
        JSON.stringify({label:labelAddress, json_text:initData[label]})
      ).then(console.log, console.error)
    })
  )

  nav.runDemo = () => null;

})
