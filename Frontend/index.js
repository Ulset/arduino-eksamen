const sensor_output = document.getElementById("sensor_container")
const userFeedbackDiv = document.getElementById("userFeedback")

const get_sensor_data = () => {
  userFeedbackDiv.innerHTML = "Henter data..."
  userFeedbackDiv.className = "badge badge-pill badge-warning"
  return fetch("https://dweet.io/get/latest/dweet/for/sanderEksamen").then(r => r.json()).then(d => {
    const {this: status, with: contentArray} = d;
    if(status !== "succeeded") {
      console.log(d)
      const {because} = d
      if(because === "we couldn't find this") {
        document.getElementById("no_data_alert").style.display = "block"
      } else if (because.startsWith("Rate limit exceeded")) {
        document.getElementById("timeout_alert").style.display = "block"
      }
      userFeedbackDiv.innerHTML = "Klarte ikke hente data fra Dweet."
      userFeedbackDiv.className = "badge badge-pill badge-danger"
      return []
    } else if (status === "succeeded") {
      document.querySelectorAll(".alert-danger").forEach(el => el.style.display = "none")
    }

    const data = JSON.parse(contentArray[0].content.content)
    const devices = Object.keys(data)
    const dateTime = new Date(contentArray[0]["created"])
    userFeedbackDiv.innerHTML = "Siste device poll: "+dateTime.toLocaleString()
    userFeedbackDiv.className = "badge badge-pill badge-success"
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
   if(sensor_data.length > 0) {
     sensor_output.innerHTML = "";
     sensor_divs.forEach(d => sensor_output.appendChild(d))
   } else {
     document.getElementById("no_data_alert").style.display = "block"
   }
}

display_sensor_data().then(() => setInterval(display_sensor_data, 12000))
