app.factory('api', $http => {
  // const root = $http.get('http://192.168.0.170').then(res => res.data)
  const root = $http.get('http://10.0.0.21').then(res => res.data)

  return {
    root: root
  }
})
