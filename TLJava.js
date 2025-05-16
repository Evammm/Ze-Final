//constants
const tileSize = 60;
const canvas = document.getElementById("gSCanvas");
const ctx = canvas.getContext("2d");



//variables
let ball = { x: 100, y: 100, speedx: 0, speedy: 0 };
let mineTest = { x: 0 * tileSize, y: 9 * tileSize, revealed: 0, mine: 1};
let cellTest = { x: 100, y: 200, revealed: 0, mine: 0};

let puttCount = 0;

function drawBall() {
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function moveBall() {
ball.x += ball.speedx;
ball.y += ball.speedy;
}

function friction() {
 if (ball.speedx > 1) {
  if (ball.speedx > 30) {
    ball.speedx -= 2;
  } else {
  ball.speedx --;
  }
 } else if (ball.speedx < -1) {
  if (ball.speedx < -30) {
    ball.speedx += 2;
  } else {
  ball.speedx ++;
  }
 } else {
  if (ball.speedy < 2 && ball.speedy > -2) {
    ball.speedx = 0;
  }
 }
 if (ball.speedy > 1) {
  if (ball.speedy > 30) {
    ball.speedy -= 2;
  } else {
  ball.speedy --;
  }
 } else if (ball.speedy < -1) {
  if (ball.speedy < -30) {
    ball.speedy += 2;
  } else {
  ball.speedy ++;
  }
 } else {
  if (ball.speedx < 2 && ball.speedx > -2) {
  ball.speedy = 0;
  }
 }
}

function checkBoundry() {
  if (ball.y <= 0) {
    ball.y = 1;
    ball.speedy = ball.speedy + 3;
    ball.speedy *= -1;
  } 
  if (ball.y >= 600) {
    ball.y = 599;
    ball.speedy = ball.speedy - 3;
    ball.speedy *= -1;
  }
  if (ball.x <= 0) {
    ball.x = 1;
    ball.speedx = ball.speedx + 3;
    ball.speedx *= -1;
  }
  if (ball.x >= 600) {
    ball.x = 599;
    ball.speedx = ball.speedx - 3;
    ball.speedx *= -1;
  } 
}

//the lifeblood of any html game
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveBall();
    friction();
    drawBall();
    checkBoundry();
    drawMines();
}

function drawMines(clicked_id) {
  ctx.fillStyle = "green"
  ctx.fillRect(mineTest.x, mineTest.y, tileSize, tileSize);
}


setInterval(updateGame, 50);


document.addEventListener("click", (event) => {
  puttCount ++
  var rect = canvas.getBoundingClientRect();
  if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom) {
    ball.speedx += (ball.x - (event.clientX - rect.left))/6;
    ball.speedy += (ball.y - (event.clientY - rect.top))/6;
    document.getElementById("puttCount").innerText = "Putts: "+puttCount;
  }
})


