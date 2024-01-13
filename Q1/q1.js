class Counter {
  constructor(input) {
    this.input = input;
  }

  get Input() {
    return this.input;
  }

  set Input(value) {
    const regExpression = /^[0-9]/;
    if (value > 20) {
      alert("Please insert numbers that are smaller than 20.");
      return (this.input = "counter");
    }
    if (regExpression.test(value)) {
      return (this.input = value);
    } else {
      alert("Invalid input - only numbers allowed");
      return (this.input = "counter");
    }
  }

  // Indicate rather the user click "start" btn already or not.
  static isStart = false;

  initialize() {
    document.getElementById("counter-value").innerHTML = this.input;
    Counter.isStart = true;
    console.log(Counter.isStart);
  }

  increment() {
    this.input++;
  }

  go() {
    const values = [];
    for (let i = 1; i <= this.input; i++) {
      values.push(i);
    }
    return values;
  }
}

const userInput = document.getElementById("inputField");
const counter = new Counter(userInput.value);

function initializeCounter() {
  counter.Input = userInput.value; // validate user input through setter function.
  if (counter.input === "counter") {
    return;
  } else {
    counter.initialize();
    userInput.value = "";
  }
}

function handleCounterIncrement() {
  if (!Counter.isStart) {
    alert("Enter a number and press start, before incrementing the counter.");
    return;
  }
  counter.increment();
  document.getElementById("counter-value").innerHTML = counter.input;
}

function displaySequence() {
  if (!Counter.isStart) {
    alert('Enter a number and press start, before press "Go".');
    return;
  }
  const main = document.getElementById("inputs");
  const seq = document.createElement("div");
  seq.classList.add("seq");
  const values = counter.go();
  seq.innerHTML = values;
  main.appendChild(seq);
  document.getElementById("counter-value").innerHTML = "counter";
  Counter.isStart = false;
  alert('Good job! Let\'s start new counter!!');
}
