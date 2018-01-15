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

function newRequest(URL){
	//New Promise recibe una funcion
  return new Promise((resolve, reject)=> {
		const req = new XMLHttpRequest();
		req.onreadystatechange  = (aEvt) => {
			const DONE = 4
			const OK = 200
			if (req.readyState === DONE) {
				if(req.status === OK){
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
	console.log(`Request failed: ${err}`)
}

/*Crear un array con el request de cada provincia*/
const requests = ANDALUCIA.map((province) => newRequest(`${BASE}${province}&${APPID}&${UNITS}`));

/*Cuando esten resueltos todos los requests, acumulamos la temperatura de cada provincia y calculamos la media*/

Promise.all(requests)
  .then(provinces => {
    let average = 0
    provinces.forEach((province) => {
      average += province.main.temp
    })
    console.log(average/provinces.length);
  })
  .catch(err => handleError(err))
