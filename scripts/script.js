const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let hitRowImg = new Image();
hitRowImg.src = "/imgs/DDR/HitArrow.png";

let landingRowImg = new Image();
landingRowImg.src = "/imgs/DDR/landingArrowCheck.png";

let greenArrowsImg = new Image();
greenArrowsImg.src = "/imgs/DDR/DDRgreenArrows.png";

function drawHitRow(/*tempo*/) {
  //   let alt = true;
  //   setInterval(function () {
  //     if (alt) {
  //       ctx.drawImage(landingRowImg, 0, 0);
  //     } else {
  //     }
  //   }, tempo);
  ctx.drawImage(landingRowImg, 0, 0, 255, 60, 0, 0, 500, 120);
}

function drawUI() {} // implement

//utility functions
function updateStats() {
  document.querySelector("#score").textContent = `SCORE: ${score}`;
  document.querySelector(
    "#cCombo"
  ).innerText = `CURRENT COMBO: ${currentCombo}`;
  document.querySelector(
    "#gCombo"
  ).innerText = `GREATEST COMBO: ${greatestCombo}`;
}

//global variables
let mainCanvasIntervalID = 0;
let health = 100;
let score = 0;
let currentCombo = 0;
let greatestCombo = 0;
//objects
let placeHolderSong = {
  bpm: 140,
  upArrows: [13, 21, 27, 31, 43, 53, 54, 60, 62, 64, 65],
  downArrows: [1, 17, 25, 29, 33, 37, 41, 42, 47, 51, 55, 58, 64, 66],
  leftArrows: [9, 30, 35, 45, 46, 59, 63, 68],
  rightArrows: [7, 32, 39, 49, 50, 57, 61, 67],
  delay: 0,
};

//--------------------------------------------
//major classes
//--------------------------------------------
class stepChart {
  constructor(song) {
    this.speed = 10;
    this.upArray = song.upArrows;
    this.downArray = song.downArrows;
    this.leftArray = song.leftArrows;
    this.rightArray = song.rightArrows;
    this.tempo = (1 / (song.bpm / 60)) * 1000;
    this.activeArrowArray = [];
    this.songIntervalID = 0;
    this.delay = song.delay;
  }
  startSongInterval() {
    let currentBeat = 1;
    setTimeout(() => {
      this.songIntervalID = setInterval(() => {
        for (const arrow of this.upArray) {
          if (arrow === currentBeat) {
            let newArrow = new arrowObj("up", currentBeat, greenArrowsImg);
            this.activeArrowArray.push(newArrow);
          }
        }
        for (const arrow of this.downArray) {
          if (arrow === currentBeat) {
            let newArrow = new arrowObj("down", currentBeat, greenArrowsImg);
            this.activeArrowArray.push(newArrow);
          }
        }
        for (const arrow of this.leftArray) {
          if (arrow === currentBeat) {
            let newArrow = new arrowObj("left", currentBeat, greenArrowsImg);
            this.activeArrowArray.push(newArrow);
          }
        }
        for (const arrow of this.rightArray) {
          if (arrow === currentBeat) {
            let newArrow = new arrowObj("right", currentBeat, greenArrowsImg);
            this.activeArrowArray.push(newArrow);
          }
        }
        currentBeat++;
      }, this.tempo);
    }, this.delay);
  }
}

//make array of timestamps for each arrow. more efficient
class arrowObj {
  constructor(direction, beat, img) {
    this.yCord = 750;
    this.direction = direction;
    this.beat = beat;
    this.img = img;
  }
  draw() {
    switch (this.direction) {
      case "left":
        ctx.drawImage(greenArrowsImg, 0, 0, 62, 60, 0, this.yCord, 125, 120);
        break;
      case "right":
        ctx.drawImage(
          greenArrowsImg,
          190,
          0,
          62,
          60,
          375,
          this.yCord,
          125,
          120
        );
        break;
      case "up":
        ctx.drawImage(
          greenArrowsImg,
          125,
          0,
          62,
          60,
          246,
          this.yCord,
          125,
          120
        );
        break;
      case "down":
        ctx.drawImage(greenArrowsImg, 62, 0, 62, 60, 120, this.yCord, 125, 120);
        break;
      default:
        break;
    }
  }
}
//--------------------------------------------
//collisions
function collisions() {
  let arrows = currentSong.activeArrowArray;
  for (let i = 0; i < arrows.length; i++) {
    if (arrows.length > 0) {
      arrows[i].draw();
      arrows[i].yCord -= currentSong.speed;
      // miss check
      if (arrows[i].yCord < -80) {
        arrows.splice(i, 1);
        health = health - 10;
        if (currentCombo > greatestCombo) {
          greatestCombo = currentCombo;
        }
        currentCombo = 0;
      }
    }
  }
}

//--------------------------------------------
function controls() {
  window.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
        break;
      case "ArrowRight":
        break;
      case "ArrowUp":
        break;
      case "ArrowDown":
        break;
    }
  });
}
//-----------------------------------

let currentSong = new stepChart(placeHolderSong);

function startGame(song) {
  /*USEING setTimeout() DELAY THE START OF MUSIC BY AMOUNT === TIME IT TAKES TO SCROLL UP*/
  song.startSongInterval();
  mainCanvasIntervalID = setInterval(function () {
    ctx.clearRect(0, 0, 500, 750);
    drawHitRow();
    updateStats();
    collisions(); // and active arrow draw
  }, 16);
}
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame(currentSong);
    //document.getElementById("start-button").remove(); // fix
  };
};
