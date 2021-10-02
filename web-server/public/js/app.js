const form = document.querySelector('#weather-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = document.querySelector('input');
  const resultsDiv = document.querySelector('#results');

  resultsDiv.innerHTML = '<p>Loading...</p>';

  fetch(`http://localhost:3000/weather?address=${input.value}`).then(response => {
    response.json().then(data => {

      if (data.error) {
        return resultsDiv.innerHTML = data.error;
      }

      resultsDiv.innerHTML = `
        <img src=${data.weather_icons} />
        <p>Currently in <b>${data.name}, ${data.region} (${data.country})</b>, it's <b>${data.temperature} C°</b>.</p>
        <p>Feels like <b>${data.feelslike} °C</b>.</p>
        <p>There's <b>${data.precip}%</b> chance of rain.</p>
        `;
    })
  });
})