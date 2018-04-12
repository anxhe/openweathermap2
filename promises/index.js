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
    let average = accum/provinces.length
    const infowindow = new google.maps.InfoWindow({
      content: `<span>Average temp: ${average} </span>`,
      position: andaluciaCoord
    });
    infowindow.open(map, map);
  })
  .catch(err => handleError(err))
