app.controller('landingCtrl', function() {
  const landing = this

  landing.title = 'GreenLite Landing'

  setTimeout(() => document.querySelectorAll('#inter1')[0].style.fill = 'red', 2000)

})
