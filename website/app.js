/** Global Variables */
const output = document.querySelector('#output');
const apiKey = 'a5cb6b94184ba96f3ff1b4c1c232a94e';

let newDate = () => {
    let d = new Date();
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${month} ${date}, ${year}`
}


const postZip = async (url = '', data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
      updateUI();
    } catch(error) {
        console.log("error", error)
    }
}

let unitChoosed;

document.getElementById('generate').addEventListener('click', (evt) => {
    let feelings = document.getElementById('feelings').value;
    let Zip = document.getElementById('zip').value;
    let date = newDate();

    let unitsElement = document.getElementsByName('units');
    for(i = 0; i < unitsElement.length; i++) {
      if(unitsElement[i].checked){
        unitChoosed = unitsElement[i].value;
      }
    }
    if (unitChoosed === undefined) {
      alert('plese choose unit');
      return ;
    }
    let dataSend = {
      number: Zip,
      dt: date,
      feelings:feelings,
      key: apiKey,
      unit:unitChoosed
    }

    postZip('/add', dataSend);
    });


const updateUI = async (url = '') => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.getElementById('location').innerHTML = allData.location;
        document.getElementById('date').innerHTML = allData.dt;
        document.getElementById('temp').innerHTML = tempUnit(allData.temp);
        document.getElementById('icon').innerHTML = `<img src=\"https://openweathermap.org/img/wn/${allData.icon}@2x.png\">`
        document.getElementById('description').innerHTML = allData.description;
        document.getElementById('feels-like').innerHTML = `feels like ${tempUnit(allData.feelsLike)}`;
        document.getElementById('maxMin').innerHTML = `max ${tempUnit(allData.max)} | min ${tempUnit(allData.min)}`;
        document.getElementById('content').innerHTML = `Your feeling: ${allData.feelings}`;
    } catch(error) {
        console.log("error", error);
    }

    output.style.visibility = 'visible';
  }

function tempUnit(tempValue) {
  if(unitChoosed === "metric") {
    return `${tempValue}°C `
  } else {
    return `${tempValue}°F `
  }
}
function resetInput() {
    window.location.reload();
}
