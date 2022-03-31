const dateTime = document.getElementById('dateTime')

const search = document.getElementById('search')

const button = document.getElementById('button')

const key = 'a3028f94c76d40369cf234124223003'
console.log(search.value)
wheatherLocation('pirapora')

const forecastWeekDay = document.querySelectorAll('.forecastWeekDay')
const forecastIcon = document.querySelectorAll('.forecastIcon')
const maxTemp = document.querySelectorAll('.forecastMaxTemp')
const minTemp = document.querySelectorAll('.forecastMinTemp')

button.addEventListener('click', () => {
  wheatherLocation(search.value)
})

function wheatherLocation(cidade) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cidade}&days=7&aqi=yes&alerts=yes`

  fetch(url)
    .then(response => response.json())
    .then(wheather => {
      console.log(wheather)
      const { temp_c, condition, precip_mm, wind_kph, humidity } =
        wheather.current

      const { forecastday } = wheather.forecast

      cityName.textContent = wheather.location.name

      mainTemp.textContent = Math.floor(temp_c) + '°'
      conditionIcon.src = condition.icon

      conditionText.textContent = condition.text

      currentPrecipitation.textContent = precip_mm + '%'

      currentHumidity.textContent = humidity + '%'

      currentWind.textContent = wind_kph + ' km/h'
      forecastday.shift()
      for (let index = 0; index < forecastday.length; index++) {
        let day = new Date(forecastday[index].date)
        forecastWeekDay[index].textContent = diaDaSemana[day.getUTCDay()]
        forecastIcon[index].src = forecastday[index].day.condition.icon
        maxTemp[index].textContent = forecastday[index].day.maxtemp_c + '°'
        minTemp[index].textContent = forecastday[index].day.mintemp_c + '°'
      }
    })
    .catch(error => {
      console.log('error', error)
    })
}
setInterval(() => {
  let data = new Date()

  let dia = data.getDate() // 1-31
  let dia_sem = data.getDay() // 0-6 (zero=domingo)
  let mes = data.getMonth() // 0-11 (zero=janeiro)

  let hora = data.getHours() // 0-23
  let min = data.getMinutes() // 0-59

  let str_data = diaDaSemana[dia_sem] + ', ' + dia + ' ' + mesDoAno[mes % 12]
  let str_hora = hora + ':' + min
  dateTime.textContent = str_data + ' ' + str_hora
}, 10000)

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
