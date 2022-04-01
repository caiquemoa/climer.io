const data = new Date()

const hora = data.getHours() // 0-23

const forecastLength = 7

wheatherLocation()

const forecastWeekDay = document.querySelectorAll('.forecastWeekDay')

const forecastIcon = document.querySelectorAll('.forecastIcon')

const maxTemp = document.querySelectorAll('.forecastMaxTemp')

const minTemp = document.querySelectorAll('.forecastMinTemp')

search.addEventListener('keyup', event => {
  if (event.key === 'Enter' && search.value.length > 0) {
    wheatherLocation(search.value)
  }
})

button.addEventListener('click', () => {
  wheatherLocation(search.value)
})

function wheatherLocation(cidade = 'nova york') {
  const key = 'a3028f94c76d40369cf234124223003'

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cidade}&days=${forecastLength}&aqi=yes&alerts=yes&lang=pt`

  fetch(url)
    .then(response => response.json())
    .then(wheather => {
      console.log(wheather)

      const { temp_c, condition, precip_mm, wind_kph, humidity } =
        wheather.forecast.forecastday[0].hour[hora]

      const { forecastday } = wheather.forecast

      cityName.textContent = wheather.location.name

      mainTemp.textContent = `${Math.floor(temp_c)}°`

      conditionIcon.src = condition.icon

      conditionText.textContent = condition.text

      currentPrecipitation.textContent = `${precip_mm}%`

      currentHumidity.textContent = `${humidity}%`

      currentWind.textContent = `${wind_kph} km/h`

      for (let index = 0; index < forecastday.length; index++) {
        let data = new Date(forecastday[index + 1].date)

        forecastWeekDay[index].textContent = diaDaSemana[data.getUTCDay()]

        forecastIcon[index].src = forecastday[index + 1].day.condition.icon

        maxTemp[index].textContent = `${forecastday[index + 1].day.maxtemp_c}°`

        minTemp[index].textContent = `${forecastday[index + 1].day.mintemp_c}°`
      }
    })
    .catch(error => {
      console.log('error', error)
    })
}

setInterval(() => {
  const dia = data.getDate() // 1-31

  const dia_sem = data.getDay() // 0-6 (zero=domingo)

  const mes = data.getMonth() // 0-11 (zero=janeiro)

  const min = data.getMinutes() // 0-59

  dateTime.textContent = `${diaDaSemana[dia_sem]}, ${dia} ${
    mesDoAno[mes % 12]
  }, ${hora}:${min}`
}, 1000)

const diaDaSemana = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sabado'
]

const mesDoAno = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]
