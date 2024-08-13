const newGrass = "grass",
  GRAESS_COUNT = 50;
////////////////
const newBall = "pokeball",
  BALL_COUNT = 5;
//////////////
const PLAYER = document.querySelector(".player");
////////////
const PLAYER_SPEED = 1.5;
///////////
const SOUND = new Audio("assets/coin.mp3");
/////////////

let playerPos = {
  x: 0,
  y: 0,
};
let playerVal = {
  x: 0,
  y: 0,
};
const START_PLAYER_POS = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
/////////////
function start() {
  generateRondomElement(newGrass, GRAESS_COUNT);
  generateRondomElement(newBall, BALL_COUNT);
  playerPos = START_PLAYER_POS;
}
function updata() {
  playerPos.x += playerVal.x;
  playerPos.y += playerVal.y;
  PLAYER.style.left = playerPos.x + "px";
  PLAYER.style.top = playerPos.y + "px";
  checkCollisions();
  ///////////////////////
  requestAnimationFrame(updata);
}
////////////////////
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    playerVal.y = -1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = " url('assets/player_front.png')";
  }
  if (e.key == "ArrowDown") {
    playerVal.y = 1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = " url('assets/player_back.png')";
  }
  if (e.key == "ArrowLeft") {
    playerVal.x = -1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = "url('assets/player_left.png')";
  }
  if (e.key == "ArrowRight") {
    playerVal.x = 1 * PLAYER_SPEED;
    PLAYER.style.backgroundImage = " url('assets/player_right.png')";
  }
  PLAYER.classList.add("walk");
});
window.addEventListener("keyup", (e) => {
  playerVal.x = 0;
  playerVal.y = 0;
  PLAYER.classList.remove("walk");
});
function generateRondomElement(className, elementCount) {
  for (let count = 0; count < elementCount; count++) {
    const newElement = document.createElement("div");
    newElement.classList.add(className);
    newElement.style.top = Math.random() * 100 + "%";
    newElement.style.left = Math.random() * 100 + "%";
    document.body.appendChild(newElement);
  }
}
function checkCollisions() {
  const balls = document.querySelectorAll(".pokeball");

  balls.forEach((ball) => {
    if (collision(ball, PLAYER)) {
      ball.style.top = Math.random() * 100 + "%";
      ball.style.left = Math.random() * 100 + "%";
      SOUND.play();
    }
  });
}

/////////////////////////////
function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

// function generateRondomBall() {
//   for (let count = 0; count < BALL_COUNT; count++) {
//     const newBall = document.createElement("div");
//     newBall.classList.add(pokeball);
//     newBall.style.top = Math.random() * 100 + "%";
//     newBall.style.left = Math.random() * 100 + "%";
//     document.body.appendChild(newBall);
//   }
// }
start();
updata();
