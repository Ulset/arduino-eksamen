const sensor_output = document.getElementById("sensor_container")

const get_sensor_data = () => {
  let userFeedbackDiv = document.getElementById("userFeedback")
  userFeedbackDiv.innerHTML = "Henter data..."
  userFeedbackDiv.classList.remove("badge-success")
  userFeedbackDiv.classList.add("badge-warning")
  return fetch("https://dweet.io/get/latest/dweet/for/sanderEksamen").then(r => r.json()).then(d => {
    const {this: status, with: contentArray} = d;
    if(status !== "succeeded") {
      console.log("Feil ved henting av data, status:", status)
      console.log(d)
      return []
    }
    const data = JSON.parse(contentArray[0].content.content)
    const devices = Object.keys(data)
    const dateTime = new Date(contentArray[0]["created"])
    userFeedbackDiv.innerHTML = "Data fra: "+dateTime.toLocaleString()
    userFeedbackDiv.classList.add("badge-success")
    userFeedbackDiv.classList.remove("badge-warning")
    return devices.map(deviceName => {
      return {
        name: deviceName,
        temp: data[deviceName].temp,
        humidity: parseInt(data[deviceName].humidity)
      }
    })
  })
}

const display_sensor_data = async () => {
  const sensor_data = await get_sensor_data()
  const sensor_divs = sensor_data.map(sEl => {
    let div = document.createElement("div")
    div.className = "sensor card"
    div.innerHTML = `
      <div class="card-body">
          <h5 class="card-title">${sEl.name}</h5>
          <p class="info_text" style="margin: 0">
              <span class="badge badge-pill badge-primary">${sEl.temp} °C</span>
              <span class="badge badge-pill badge-secondary">${sEl.humidity}% fuktighet</span>
          </p>
      </div>
    `
    return div
  })

  const no_data_alert = document.getElementById("no_data_alert")
  no_data_alert.style.display = sensor_divs.length > 0 ? "none" : "block"

  sensor_output.innerHTML = "";
  sensor_divs.forEach(d => sensor_output.appendChild(d))
}

display_sensor_data().then(() => setInterval(display_sensor_data, 12000))
