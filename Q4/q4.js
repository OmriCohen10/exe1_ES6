class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    return `(${this.x},${this.y})`;
  }

  equals(point) {
    if (this.x === point.x && this.y === point.y) {
      return true;
    } else {
      return false;
    }
  }
}

// =============== Q4 ========================

const p1 = new Point(1, 2);
const p2 = new Point(1, 2);
const p3 = new Point(3, 4);
const p4 = new Point(5, 6);
const p5 = new Point(7, 8);
const p6 = new Point(9, 10);

const points = [p1, p2, p3, p4, p5];

// =============== Q4.1 ========================

// test to show() method
console.log(p1.show()); // (1,2)
// test to equals(p) method
console.log(p1.equals(p2)); // true
console.log(p1.equals(p3)); // false

// =============== Q4.2 ========================

function isPointFound(points, x, y) {
  const isFound = points.find((point) => point.x === x && point.y === y);
  if (isFound) {
    return `True - (${x},${y}) is found in Points array.`;
  } else {
    return `False - (${x},${y}) not found in Points array.`;
  }
}

console.log(isPointFound(points, 3, 4)); // true
console.log(isPointFound(points, 1, 5)); // false

// =============== Q4.3 ========================

function isPointEqual(points, pointObject) {
  const equalsPoints = points.filter((point) => {
    if (pointObject.equals(point)) {
      return point;
    }
  });
  if (equalsPoints.length > 0) {
    return true;
  } else {
    return false;
  }
}

console.log(isPointEqual(points, p1)); // true
console.log(isPointEqual(points, p6)); // false

// =============== Q4.4 ========================

function calcLane(points) {
  const laneDistance = points.reduce((acc, currentPoint, currentIndex) => {
    if (points.length - 1 === currentIndex) {
      return acc;
    }
    return (acc += Math.sqrt(
      Math.pow(currentPoint.x - points[currentIndex + 1].x, 2) +
        Math.pow(currentPoint.y - points[currentIndex + 1].y, 2)
    ));
  }, 0);

  return laneDistance.toFixed(3);
}

// console.log(calcLane(points));
const main = document.querySelector("main");
const orderedList = document.createElement("ol");
const distance = document.createElement("p");
distance.innerHTML = `Lane Distance = <span>${calcLane(points)}</span>`;
points.forEach((point) => {
  const listItem = document.createElement("li");
  listItem.innerText = point.show();
  orderedList.appendChild(listItem);
});

main.appendChild(orderedList);
main.appendChild(distance);
