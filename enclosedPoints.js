
// const S = "ABCDA";
// const X = [2, -1, -4, -3, 3];
// const Y = [2, -2, 4, 1, -3];

// const S = "ABB";
// const X = [1, -2, -2];
// const Y = [1, -2, 2];

// const S = "CCD";
// const X = [1, -1, 2];
// const Y = [1, -1, -2];

const S = "ABCDAEFG";
const X = [2, -1, -2, -3, 3, 2, 2, 0];
const Y = [2, -2, 2, 1, -3, -1, -2, 1];


function solution(S, X, Y) {
  let pointArray = S;
  let distanceIndexArr = [...new Array(X.length)].map((el, idx) => (el = idx));
  let distanceArr = [...new Array(X.length)].map((el, idx) => (el = getDistance(X[idx], Y[idx])));
  let enclosedPointsMap = new Map();

  distanceArr.sort((a, b) =>a- b);
  distanceIndexArr.sort((a, b) => getDistance(X[a], Y[a]) - getDistance(X[b], Y[b]));

  for (let i = 0; i < distanceIndexArr.length; i++) {
    const point = pointArray[distanceIndexArr[i]];
    if (enclosedPointsMap.has(point)) {
      enclosedPointsMap.forEach((idx) => {
        if (isSameDist(X[idx], Y[idx], X[distanceIndexArr[i]], Y[distanceIndexArr[i]])) {
          enclosedPointsMap.delete(point)
        }
      });
      break;
    }
    enclosedPointsMap.set(point, distanceIndexArr[i]);
  }
  let radius = distanceArr[enclosedPointsMap.size - 1] + 0.5
  enclosedPointsMap.size !== 0 ? drawEnclosingCircle(radius) : ""
  return enclosedPointsMap.size;
}

function getDistance(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function isSameDist(x1, y1, x2, y2) {
  return Math.abs(getDistance(x1, y1) - getDistance(x2, y2)) < 1;
}


function drawEnclosingCircle(radius) {
  noFill();
  stroke("black");
  strokeWeight(3);
  ellipse(250, 250, radius * 100, radius * 100);
}

function createCoordSistem() {
  for (let x = 0; x < width; x += width / 10) {
    for (let y = 0; y < height; y += height / 10) {
      stroke("grey");
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
  stroke("red");
  strokeWeight(2);
  line(-500, 250, 500, 250);
  line(250, -500, 250, 500);
}

function setup() {
  createCanvas(500, 500);
  createCoordSistem();
  let greeting = createElement("h2", "Enclosed points");
  greeting.position(500, 500);
  let sol = createElement("h2", solution(S, X, Y).toString());
  sol.position(500, 550);
  let zoom_factor = 50
  for (let i = 0; i < X.length; i++) {
    stroke("purple");
    strokeWeight(10);
    screenX = zoom_factor*X[i] + width / 2;
    screenY = zoom_factor*(-Y[i]) + height / 2;
    point(screenX, screenY);
    let pnt = createElement("h4", S[i]);
    pnt.position(screenX, screenY);
  }
}
