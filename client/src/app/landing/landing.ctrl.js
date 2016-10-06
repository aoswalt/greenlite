app.controller('landingCtrl', function(api, $http) {
  const landing = this

  const fetcherId = setInterval(() => {
    //NOTE(adam): inside interval to deal with loading timing
    let intersections = document.querySelectorAll('.intersection')

    api.root
      .then(root => $http.get(root.vertex)
        .then(res => res.data)
        .then(v_list =>
          intersections.forEach(inter => {
            v_entry = v_list.find(v => v.label == inter.id)
            inter.style.fill = v_entry && v_entry.active ? 'none' : 'red'
          })
        ))
      },
    2000)

  // setTimeout(() => clearInterval(fetcherId), 6000)
})
