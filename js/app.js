"use strict";

// console.log(provencie);

function getOption() {
  provencie.forEach((item) => {
    const option = createElement("option", "option", item);
    $("#region").appendChild(option);
  });
}

getOption();

async function selectRegion(select = "Toshkent") {
  const response = await fetch(
    `https://islomapi.uz/api/present/day?region=${select}`
  );

  const week = await fetch(
    `https://islomapi.uz/api/present/week?region=${select}`
  );

  const month = await fetch(
    `https://islomapi.uz/api/monthly?region=${select}&month=${new Date().getMonth() + 1
    }`
  );

  const result = await response.json();
  const weekResult = await week.json();
  const monthResult = await month.json();

  localStorage.setItem("data", JSON.stringify(result));
  localStorage.setItem("week", JSON.stringify(weekResult));
  localStorage.setItem("month", JSON.stringify(monthResult));

  renderData();
}
selectRegion();

$("#region").addEventListener("change", (e) => {
  localStorage.setItem("city", e.target.value);

  $("#week").innerHTML = "";

  $("#month").innerHTML = "";

  $("#provencie").innerHTML = e.target.value;
  const city = localStorage.getItem("city").toLowerCase();

  switch (e.target.value.toLowerCase()) {
    case "qashqadaryo":
      selectRegion("qarshi");
      break;
    case "farg'ona":
      selectRegion("qo'qon");
      break;
    case "sirdaryo":
      selectRegion("guliston");
      break;
    case "xorazm":
      selectRegion("xiva");
      break;
    case "surxondaryo":
      selectRegion("termiz");
      break;
    case "navoiy":
      selectRegion("navoiy");
      break;
    case "samarqand":
      selectRegion("samarqand");
      break;
    case "andijon":
      selectRegion("andijon");
      break;
    case "namangan":
      selectRegion("namangan");
      break;
    case "buxoro":
      selectRegion("buxoro");
      break;
    case "jizzax":
      selectRegion("jizzax");
      break;
    case "toshkent":
      selectRegion("toshkent");
      break;
    case "qoraqalpog'iston":
      selectRegion("nukus");
      break;
    default:
      "Toshkent";
  }
});

function renderData() {
  const result = JSON.parse(localStorage.getItem("data"));
  const week = JSON.parse(localStorage.getItem("week"));
  const month = JSON.parse(localStorage.getItem("month"));

  const {
    times: { asr, hufton, peshin, quyosh, shom_iftor, tong_saharlik },
  } = result;

  $a(".fs-1")[0].textContent = tong_saharlik;
  $a(".fs-1")[1].textContent = quyosh;
  $a(".fs-1")[2].textContent = peshin;
  $a(".fs-1")[3].textContent = asr;
  $a(".fs-1")[4].textContent = shom_iftor;
  $a(".fs-1")[5].textContent = hufton;

  const bugun = new Date().getDay();
  console.log(bugun);
  week.forEach((item, index) => {
    const tr = createElement(
      'tr',
      `${(bugun === index + 1) ? "bg-warning item" : "item"}`,
      `
      <td>${item.region}</td> <td>${item.date.substring(0, 10)}</td> <td>${item.weekday
      }</td>  <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh
      }</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor
      }</td> <td>${item.times.hufton}</td>`
    );

    $("#week").appendChild(tr);
  });



  month.forEach((item, index) => {
    const tr = createElement(
      "tr",
      `${(bugun === index-19 ) ? "bg-warning item" : "item"}`,
      `
    <td>${item.region}</td> <td>${item.date.substring(0, 10)}</td> <td>${item.weekday
      }</td>  <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh
      }</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor
      }</td> <td>${item.times.hufton}</td>`
    );

    $("#month").appendChild(tr);
  });
}

// renderData();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function dayMonth() {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];
  const day = new Date();
  let month = months[day.getMonth()];

  const today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  minute = checkTime(minute);
  second = checkTime(second);
  $(".date").innerHTML =
    day.getDate() +
    " - " +
    month +
    " " +
    day.getFullYear() +
    " yil" +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second;
  setTimeout(dayMonth, 1000);
}

dayMonth();

$(".moon").addEventListener("click", () => {
  $(".body").style.backgroundImage = "url('./images/bg.png')";
  $(".title").style.color = "white";
  $(".mintaqa").style.color = "white";
  $(".mintaqa1").style.color = "white";
  for (let i = 0; i < $a("td").length; i++) {
    $a("td")[i].style.color = "white";
  }
  for (let i = 0; i < $a("th").length; i++) {
    $a("th")[i].style.color = "white";
  }
});

$(".sun").addEventListener("click", () => {
  $(".body").style.backgroundImage = "url('../images/body-bg20.png')";
  $(".title").style.color = "white";
  $(".mintaqa").style.color = "black";
  $(".mintaqa1").style.color = "black";
  for (let i = 0; i < $a("td").length; i++) {
    $a("td")[i].style.color = "black";
  }
  for (let i = 0; i < $a("th").length; i++) {
    $a("th")[i].style.color = "black";
  }
});


$(".btn-warning").addEventListener("click", () => {
  $(".rowWeek").classList.remove("d-none")
  $(".btn-warning").classList.add("d-none")
  $(".btn-success").classList.remove("d-none")
})


$(".btn-success").addEventListener("click", () => {
  $(".rowWeek").classList.add("d-none")
  $(".btn-success").classList.add("d-none")
  $(".btn-warning").classList.remove("d-none")
})

$(".btn-light").addEventListener("click", () => {
  $(".rowMonth").classList.remove("d-none")
  $(".btn-light").classList.add("d-none")
  $(".btn-danger").classList.remove("d-none")
})

$(".btn-danger").addEventListener("click", () => {
  $(".rowMonth").classList.add("d-none")
  $(".btn-light").classList.remove("d-none")
  $(".btn-danger").classList.add("d-none")
})