const button = document.getElementById("my-button");
const nav = document.getElementById("mynav");

button.addEventListener("click", () => {
  nav.classList.toggle("show");
});
// погода
const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "a5ddcc91e004b61e64201351b1d369d7",
};

function getWeather() {
  const cityId = document.querySelector("#city").value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function showWeather(data) {
  document.querySelector(".temperature").innerHTML =
    Math.round(data.main.temp) + "&deg;";
  document.querySelector(".disclaimer").textContent =
    data.weather[0]["description"];
  document.querySelector(
    ".weatherIco"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
}

getWeather();

document.querySelector("#city").onchange = getWeather;

// // корзина

document.addEventListener("DOMContentLoaded", () => {
  const cart = document.querySelectorAll(".cart");
  const tray = document.querySelector("#tray");
  const list = document.querySelector(".list");
  const closewindow = document.querySelector(".closewindow");
  const openpopup = document.querySelector(".openpopup");
  const openpopup2 = document.querySelector(".openpopup2");
  const count = document.querySelector(".count");
  const closepopup = document.querySelector(".closepopup");
  const fullPrice = document.querySelector(".fullprice");
  let price = 0;
  let countItems = 0;
  const randomId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const plusFullPrice = (currentPrice) => {
    return (price += currentPrice);
  };

  const countSum = () => {
    document.querySelectorAll(".app-body .list li").forEach((el) => {
      price += parseInt(el.querySelector(".price").textContent);
    });
  };

  const printFullPrice = () => {
    fullPrice.textContent = `${price} UA`;
  };
  const generateCartProduct = (img, title, price, id) => {
    return `
      <div class="cart" data-id="${id}">
        <img src="${img}" alt="" class="img"/>
        <span class="called">${title}</span>
        <div class="content">
          <div class="row">
            <div class="details">
              <span class="price"> ${price} UA </span>
            </div>
          </div>
        </div>
      </div>
    `;
  };
  const initialState = () => {
    if (localStorage.getItem("cart") !== null) {
      list.innerHTML = localStorage.getItem("cart");

      countSum();
      printFullPrice();
    }
  };
  initialState();
  const updateStorage = () => {
    let parent = list;
    let html = parent.innerHTML;
    html = html.trim();
    console.log(html);

    if (html.length) {
      localStorage.setItem("cart", html);
    } else {
      localStorage.removeItem("cart");
    }
  };

  cart.forEach((item) => {
    item.closest(".cart").setAttribute("data-id", randomId());
    item.addEventListener("click", (event) => {
      let parent = item.closest(".cart");
      let id = parent.dataset.id;
      let img = parent.querySelector(".cart img").getAttribute("src");
      let title = parent.querySelector(".called").innerText;
      let price = parent.querySelector(".price").innerText;
      let priceNumber = parseInt(parent.querySelector(".price").textContent);
      const li = document.createElement("li");
      li.innerHTML = generateCartProduct(img, title, price, id);
      list.appendChild(li);
      countItems++;
      count.innerText = countItems;

      plusFullPrice(priceNumber);

      printFullPrice();

      updateStorage();
    });
  });

  tray.addEventListener("click", () => {
    document.querySelector(".app").style.display = "block";
  });
  closewindow.addEventListener("click", () => {
    document.querySelector(".app").style.display = "none";
  });
  openpopup.addEventListener("click", () => {
    document.querySelector(".b-popup").style.display = "block";
  });
  closepopup.addEventListener("click", () => {
    document.querySelector(".b-popup").style.display = "none";
  });
  openpopup2.addEventListener("click", () => {
    list.innerHTML = "";
    countItems = 0;
    count.innerText = countItems;
    price = 0;
    printFullPrice(price);
    updateStorage();
  });
  openpopup.addEventListener("click", () => {
    document.querySelector(".app").style.display = "none";
  });
});
