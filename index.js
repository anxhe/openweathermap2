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

function newRequest(URL){
  //New Promise recibe una funcion
  return new Promise((resolve, reject)=> {
    const req = new XMLHttpRequest();
    req.onreadystatechange = (e) => {
      if (req.readyState === 4) {
        if(req.status === 200){
          resolve(JSON.parse(req.responseText))
        } else {
          reject(new Error(`Se produjo un error: ${req.status}`))
        }
      }
    }
    req.open('GET', URL);
    req.send(null);
  })
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

/* Crear un array con el request de cada provincia*/
const requests = ANDALUCIA.map((province) => newRequest(`${BASE}${province}&${APPID}&${UNITS}`));

/* Cuando esten resueltos todos los requests, acumulamos la temperatura de cada provincia y calculamos la media*/
Promise.all(requests)
  .then(provinces => {
    let accum = 0
    provinces.forEach((province) => {
      let temp = province.main.temp;
      let lon = province.coord.lon;
      let lat = province.coord.lat;
      accum += temp
      draw(lat, lon, temp);
    })
    const infowindow = new google.maps.InfoWindow({
      content: `<span>Average temp: ${accum/provinces.length}</span>`,
      position: andaluciaCoord
    });
    infowindow.open(map, map);
  })
  .catch(err => handleError(err))
