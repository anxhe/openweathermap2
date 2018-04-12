function newRequest(URL , callback ){

  const req = new XMLHttpRequest();

  req.onreadystatechange = (e) => {
    if (req.readyState === 4) {
      if(req.status === 200){
        callback(null, JSON.parse(req.responseText))
      }else {
        callback(newError(`Se produjo un error al realizar el request ${this.status}`))
      }
    }
  }
  req.open('GET', URL);
  req.send(null);
}

const provinces = [];
/* Crear un array con el request de cada provincia*/

ANDALUCIA.map((province) => newRequest(`${BASE}${province}&${APPID}&${UNITS}`, (err, result )=>{
  if(err) return handleError(err)
  if(result) {
    provinces.push(result);
    if(ANDALUCIA.length === provinces.length) {
      let a = 0;
      provinces.forEach((province) => {
          let temp = province.main.temp;
          let lon = province.coord.lon;
          let lat = province.coord.lat;
          a += temp
          draw(lat, lon, temp);
      });
      let average = a / ANDALUCIA.length
      console.log(`Average ${average}`)
      const infowindow = new google.maps.InfoWindow({
        content: `<span>Average temp: ${average}</span>`,
        position: andaluciaCoord
      });
      infowindow.open(map, map);
    }
  };
}));
