class Duck {
  constructor(name, color, age, weight, image) {
    this.name = name;
    this.color = color;
    this.age = age;
    this.weight = weight;
    this.image = image;
  }

  show() {
    return `Name: ${this.name}. Color: ${this.color}. Age: ${this.age}. Weight: ${this.weight} kg.`;
  }

  quack() {
    const totalQuacks = Math.ceil((this.age * this.weight) / 2);
    let stringOfQuacks = "";
    for (let i = 0; i < totalQuacks; i++) {
      stringOfQuacks += " Quack!";
    }
    let audio1 = new Audio("quack-duck.mp3");
    let audio2 = new Audio("quack-duck.mp3");
    let audio3 = new Audio("quack-duck.mp3");

    audio1.play();
    audio1.addEventListener("ended", () => {
      audio2.play();
    });
    audio2.addEventListener("ended", () => {
      audio3.play();
    });

    return stringOfQuacks;
  }

  static isDetailsShown = false;
}

var duck;
var imageURL;
const main = document.querySelector("main");
const imageInput = document.getElementById("image-input");
const showBtn = document.getElementById("show-btn");
const quackBtn = document.getElementById("quack-btn");
const quackParagraph = document.getElementById("quack");

function getImageFromUser() {
  const imageFile = imageInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  // reader.onload is an async performance
  reader.onload = () => {
    imageURL = reader.result;
    return imageURL;
  };
}

function createDuck() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const duckObject = new Duck(
    data.name,
    data.color,
    data.age,
    data.weight,
    imageURL
  );
  return duckObject;
}

function formSubmission(e) {
  e.preventDefault();
  duck = createDuck();
  const actionsBtn = document.getElementById("action-buttons");
  actionsBtn.classList.add("active");
  const createBtn = document.getElementById("create-btn");
  createBtn.disabled = true;
  imageInput.disabled = true;
}

showBtn.addEventListener("click", () => {
  if (Duck.isDetailsShown) {
    return;
  } else {
    Duck.isDetailsShown = true;
    quackParagraph.innerHTML = "";
    const detailsDiv = document.createElement("div");
    detailsDiv.id = "duck-details";
    // call duck's "show" method.
    const duckDetails = duck.show();
    //create dynamically paragraph for displaying duck's details.
    const duckParagraph = document.createElement("p");
    duckParagraph.innerHTML = duckDetails;
    //create dynamically img tag for displaying duck's image.
    const duckImage = document.createElement("img");
    duckImage.src = duck.image;
    //add the above to a div
    detailsDiv.appendChild(duckParagraph);
    detailsDiv.appendChild(duckImage);
    // add this div to main
    main.appendChild(detailsDiv);
  }
});

quackBtn.addEventListener("click", () => {
  if (Duck.isDetailsShown) {
    Duck.isDetailsShown = false;
    const detailsDiv = document.getElementById("duck-details");
    main.removeChild(detailsDiv);
  }
  quackParagraph.innerHTML = duck.quack();
});
