class Watch {
  constructor(country, hour, minutes, seconds) {
    this.country = country;
    this.hour = hour;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  get Country() {
    return this.country;
  }

  set Country(value) {
    const regEx = /^[a-zA-Z]+$/;
    if (regEx.test(value) && value.length > 1) {
      return (this.country = value);
    } else {
      alert(
        "Invalid Country input! Country names doesn't contain numbers and must contain more then 1 letter!"
      );
      return (this.country = "invalid");
    }
  }

  get Hour() {
    return this.hour;
  }

  set Hour(value) {
    if (value < 0 || value > 24) {
      alert("Invalid Hours input! hours must be a number between 0 to 24 !");
      return (this.hour = "invalid");
    } else {
      return (this.hour = value);
    }
  }

  get Minutes() {
    return this.minutes;
  }

  set Minutes(value) {
    if (value < 0 || value > 59) {
      alert("Invalid Minutes input! minutes must be a number between 0 to 59!");
      return (this.minutes = "invalid");
    } else {
      return (this.minutes = value);
    }
  }

  get Seconds() {
    return this.seconds;
  }

  set Seconds(value) {
    if (value < 0 || value > 59) {
      alert("Invalid seconds input! seconds must be a number between 0 to 59!");
      return (this.seconds = "invalid");
    } else {
      return (this.seconds = value);
    }
  }

  convertToSeconds() {
    const secondsInHour = 3600;
    const secondsInMinute = 60;
    const totalInSeconds =
      this.hour * secondsInHour + this.minutes * secondsInMinute + this.seconds;

    return totalInSeconds;
  }

  show() {
    let timeStr = `<strong>Country:</strong> ${this.country}. <strong>Time:</strong> `;
    if (this.hour < 10) {
      timeStr += `0${this.hour}:`;
    } else {
      timeStr += `${this.hour}:`;
    }
    if (this.minutes < 10) {
      timeStr += `0${this.minutes}:`;
    } else {
      timeStr += `${this.minutes}:`;
    }
    if (this.seconds < 10) {
      timeStr += `0${this.seconds}`;
    } else {
      timeStr += `${this.seconds} `;
    }
    return timeStr;
  }
}

var watch;
var watches = [];
const main = document.querySelector("main");
const form = document.querySelector("form");

function createWatch() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const watch = new Watch(data.country, data.hour, data.minutes, data.seconds);

  // validation of user inputs.
  // for loop to iterate an object(watch).
  for (const key in watch) {
    // mutating the first letter of key to get access to its setter function.
    const firstLetter = key.charAt(0).toUpperCase();
    const rest = key.slice(1).toLowerCase();
    const setterName = firstLetter + rest;
    // watch[setterName] === watch.Country/watch.Hour/...
    //watch[key] equal to the value of the current key
    watch[setterName] = watch[key];
    if (watch[key] === "invalid") {
      return;
    }
  }

  return watch;
}

function formSubmission(e) {
  e.preventDefault();
  watch = createWatch();
  if (watch) {
    watches.push(watch);
  } else {
    return;
  }
  if (watches.length === 5) {
    watches.map((watch) => {
      const watchDetails = watch.show();
      const watchDetailsDiv = document.createElement("div");
      watchDetailsDiv.classList.add('watch-details');
      watchDetailsDiv.innerHTML = watchDetails;
      main.appendChild(watchDetailsDiv);
    });
  }
  form.reset();
}
