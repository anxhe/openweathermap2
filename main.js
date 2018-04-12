const BASE = "https://api.openweathermap.org/data/2.5/weather?q="

const ANDALUCIA = [
  "Almería,es",
  "Granada,es",
  "Huelva,es",
  "Cádiz,es",
  "Jaén,es",
  "Sevilla,es",
  "Cordoba,es",
  "Málaga,es"
]

const APPID = "appid=a3a348e0caa4a617475b716bb95e9b8f"
const UNITS = "units=metric"
const andaluciaCoord = {lat: 37.4, lng: -4.48}

window.onload = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: andaluciaCoord
  });
}

/* Funcion para tratar el error */
function handleError(err){
  console.error(`Request failed: ${err}`)
}

/* Function para dibujar */
function draw(lat, lng, temp){
  const marker = new google.maps.Marker({
    position: {lat, lng},
    map: map,
  });
  const infowindow = new google.maps.InfoWindow({
    content: `<span>Temperatura: ${temp}</span>`
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
