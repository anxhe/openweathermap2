BASE = "https://api.openweathermap.org/data/2.5/"

PROVINCIAS = {
  almeria: "weather?q=Almería,es",
  granada: "weather?q=Granada,es",
  huelva: "weather?q=Huelva,es",
  cadiz: "weather?q=Cadiz,es",
  jaen: "weather?q=Jaen,es",
  sevilla: "weather?q=Sevilla,es",
  cordoba: "weather?q=Cordoba,es",
  malaga: "weather?q=Málaga,es"
}

APPID = "appid=a3a348e0caa4a617475b716bb95e9b8f"
UNITS = "units=metric"

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
					//Hubo un error
					reject(newError(`Se produjo un error: ${req.status}`))
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

//falta iterar por cada ciudad y generar la media.
newRequest(`${BASE}${PROVINCIAS.malaga}&${APPID}&${UNITS}`)
  .then((response)=> {
    let temp = response.main.temp;
    console.log(temp)
  })
  .catch((err)=> handleError(err))
