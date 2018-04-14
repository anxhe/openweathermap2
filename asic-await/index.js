async function newRequest(req) {
  try {
    let res = await fetch(req);
    let resJSON = await res.json();
    return resJSON
  } catch(Error) {
    console.log(Error);
  }

}

/* Crear un array con el request de cada provincia*/
const requests = ANDALUCIA.map((province) => newRequest(`${BASE}${province}&${APPID}&${UNITS}`));

Promise.all(requests)
  .then(provinces=> {
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
