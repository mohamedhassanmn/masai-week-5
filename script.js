var response_data = null;
var search = "off"
var sort_h_l = "off"
var sort_l_h = "off"
var sort_m_h_l = "off"
var sort_m_l_h = "off"
var needed = null

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/cars_mileage.json")
xhr.send();
xhr.onload = function() {
  if (xhr.status == 200) {
    var result = xhr.response
    result = JSON.parse(result)
    set_data(result)
  } else {
    var error = "ERROR CODE:" + xhr.status
    set_data(error)
  }
}

function cards(array) {
  document.getElementById("details").innerHTML = ""
  var card_con = document.createElement("div")
  card_con.setAttribute("class", "cards_container")
  card_con.setAttribute("id", "grid_contain")
  document.getElementById("details").appendChild(card_con)

  for (var j = 0; j < array.length; j++) {
    var card = document.createElement("div")
    card.setAttribute("class", "cards")
    card.setAttribute("id", "grid")
    document.getElementById("grid_contain").appendChild(card)

    var img = document.createElement("div")
    img.setAttribute("class", "img_size")
    img.textContent = array[j].car_make
    document.querySelectorAll(".cards")[j].appendChild(img)

    var container = document.createElement("div")
    container.setAttribute("class", "data_cont")
    container.setAttribute("id", "data_container")
    container.style.backgroundColor = "white"
    document.querySelectorAll(".cards")[j].appendChild(container)

    var data1 = document.createElement("h3")
    data1.textContent = "Car Model:" + array[j].car_model
    document.querySelectorAll(".data_cont")[j].appendChild(data1)

    var data2 = document.createElement("h3")
    data2.textContent = "Year:" + array[j].year
    document.querySelectorAll(".data_cont")[j].appendChild(data2)

    var data3 = document.createElement("h3")
    data3.textContent = "Mileage:" + array[j].mileage
    document.querySelectorAll(".data_cont")[j].appendChild(data3)
  }
}

function set_data(arr) {
  response_data = arr;
  return response_data
}

function source() {
  var detail
  if (search == "on") {
    detail = search_data(response_data)
    if (sort_l_h == "on") {
      sort_data_ascending(detail)
    } else if (sort_h_l == "on") {
      sort_data_descending(detail)
    }
    if (sort_m_l_h == "on") {
      sort_data_m_ascending(detail)
    } else if (sort_m_h_l == "on") {
      sort_data_m_descending(detail)
    }
  }

}
// function for search
function search_data(arr) {
  var input = document.getElementById("get").value;
  var input_search = ""
  for (var i = 0; i < input.length; i++) {
    if (i == 0) {
      input_search += input[i].toUpperCase()
    } else {
      input_search += input[i]
    }
  }
  if (input_search == "") {
    cards(arr)
    return arr
  } else {
    var display = []
    for (var i = 0, j = 0; i < arr.length; i++) {
      if (input_search == arr[i].car_make) {
        display[j] = {
          car_make: arr[i].car_make,
          car_model: arr[i].car_model,
          year: arr[i].year,
          mileage: arr[i].mileage
        }
        j++
      }
    }
    search == "off"
    cards(display)
    return display
  }
}
// function for sort_asending
function sort_data_ascending(array) {
  var arr = array
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length - 1; j++) {
      if (arr[i].year > arr[j].year) {
        var min = arr[j]
        var replace = arr[i]
        arr[i] = min
        arr[j] = replace
      }
    }
  }
  cards(arr)
  sort_l_h == "off"
  sort_m_l_h == "off"
}

function sort_data_m_ascending(array) {
  var arr = array
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length - 1; j++) {
      if (arr[i].mileage > arr[j].mileage) {
        var min = arr[j]
        var replace = arr[i]
        arr[i] = min
        arr[j] = replace
      }
    }
  }
  cards(arr)
  sort_m_l_h == "off"
}
// function for sort_descending
function sort_data_descending(array) {
  var arr = array
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length - 1; j++) {
      if (arr[i].year < arr[j].year) {
        var min = arr[j]
        var replace = arr[i]
        arr[i] = min
        arr[j] = replace
      }
    }
  }
  cards(arr)
  sort_h_l == "off"
  sort_m_h_l == "off"
}

function sort_data_m_descending(array) {
  var arr = array
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length - 1; j++) {
      if (arr[i].mileage < arr[j].mileage) {
        var min = arr[j]
        var replace = arr[i]
        arr[i] = min
        arr[j] = replace
      }
    }
  }
  cards(arr)
  sort_h_l == "off"
  sort_m_h_l == "off"
}
//excecute when search btn is pressed
document.getElementById("search_i").addEventListener("click", function() {
  document.getElementById("details").innerHTML = ""
  search = "on"
  source();
})
//excecutes when sort btn is pressed
document.getElementById("y_high_to_low").addEventListener("click", function() {
  document.getElementById("details").innerHTML = ""
  sort_h_l = "on";
  source()
})
document.getElementById("y_low_to_high").addEventListener("click", function() {
  document.getElementById("details").innerHTML = ""
  sort_l_h = "on";
  source()
})
document.getElementById("m_high_to_low").addEventListener("click", function() {
  document.getElementById("details").innerHTML = ""
  sort_m_h_l = "on";
  source()
})
document.getElementById("m_low_to_high").addEventListener("click", function() {
  document.getElementById("details").innerHTML = ""
  sort_m_l_h = "on";
  source()
})
