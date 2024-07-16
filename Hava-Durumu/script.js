const form = document.querySelector(".top-banner form"),
  input = document.querySelector(".top-banner input"),
  msg = document.querySelector(".top-banner .msg"),
  list = document.querySelector(".ajax-section .cities"),
  apiKey = "ec6810eb6b8c448045d7a476fe5f153d";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;
  const listItems = list.querySelectorAll("ajax-section .city"),
    listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = el
        .querySelector(".city-name span")
        .textContent.toLowerCase();
      return content == inputVal.toLowerCase();
    });
    if (filteredArray.length > 0) {
      msg.textContent = `${
        filteredArray[0].querySelector(".city-name span").textContent
      }`;
      form.requestFullscreen();
      input.focus();
      return;
    }
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&APPID=${apiKey}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const { main, name, sys, weather } = data,
        icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name}, ${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup> C</sup></div>
      <figure>
      <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}" />
      <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Lütfen geçerli bir şehir arayınız.";
    });
  msg.textContent = "";
  form.reset();
  input.focus();
});
