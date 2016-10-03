app.factory('api', $http => {
  const root = $http.get('http://localhost:8000').then(res => res.data)

  return {
    root: root
  }
})
