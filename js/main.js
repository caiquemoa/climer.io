const dateTime = document.getElementById('dateTime')

const search = document.getElementById('search')

const button = document.getElementById('button')

const data = new Date()

const dia = data.getDate() // 1-31

const dia_sem = data.getDay() // 0-6 (zero=domingo)

const mes = data.getMonth() // 0-11 (zero=janeiro)

const hora = data.getHours() // 0-23

const min = data.getMinutes() // 0-59

const key = 'a3028f94c76d40369cf234124223003'
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
        wheather.forecast.forecastday[0].hour[hora]
      console.log(hora)

      const { forecastday } = wheather.forecast

      cityName.textContent = wheather.location.name

      mainTemp.textContent = Math.floor(temp_c) + '°'
      conditionIcon.src = condition.icon

      conditionText.textContent = condition.text

      currentPrecipitation.textContent = precip_mm + '%'

      currentHumidity.textContent = humidity + '%'

      currentWind.textContent = wind_kph + ' km/h'
      for (let index = 0; index < forecastday.length; index++) {
        let day = new Date(forecastday[index + 1].date)
        console.log(forecastday[index].date)
        forecastWeekDay[index].textContent = diaDaSemana[day.getUTCDay()]
        forecastIcon[index].src = forecastday[index + 1].day.condition.icon
        maxTemp[index].textContent = forecastday[index + 1].day.maxtemp_c + '°'
        minTemp[index].textContent = forecastday[index + 1].day.mintemp_c + '°'
      }
    })
    .catch(error => {
      console.log('error', error)
    })
}

setInterval(() => {
  const str_data = diaDaSemana[dia_sem] + ', ' + dia + ' ' + mesDoAno[mes % 12]
  const str_hora = hora + ':' + min
  dateTime.textContent = str_data + ' ' + str_hora
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
