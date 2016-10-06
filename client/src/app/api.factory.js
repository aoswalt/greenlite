app.factory('api', $http => {
  const root = $http.get('http://192.168.0.170').then(res => res.data)

  return {
    root: root
  }
})
