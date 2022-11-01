const canvas1 = document.getElementById("canvas");
const ctx = canvas1.getContext("2d");

const canvasH = document.getElementById("canvasHealth");
const ctxH = canvasH.getContext("2d");


let hitRowImg = new Image();
hitRowImg.src = "/imgs/DDR/HitArrow.png";

let landingRowImg = new Image();
landingRowImg.src = "/imgs/DDR/landingArrowCheck.png";

let greenArrowsImg = new Image();
greenArrowsImg.src = "/imgs/DDR/DDRgreenArrows.png";

let missImg = new Image();
missImg.src = "/imgs/DDR/missHit.png";

let okHitImg = new Image();
okHitImg.src = "/imgs/DDR/greatHits.png";

let pHitImg = new Image();
pHitImg.src = "/imgs/DDR/perfect.png";

function drawLandingRow(/*tempo*/) {
  ctx.drawImage(landingRowImg, 0, 0, 255, 60, 0, 0, 500, 120);
}

function drawUI() {

} // implement
function healthBar(){
  
}



//utility functions
function updateStats() {
  document.querySelector("#score").textContent = `SCORE: ${score}`;
  document.querySelector("#okHits").textContent = `GREAT HITS: ${OKHITS}`;
  document.querySelector("#pHits").textContent = `PERFECT HITS: ${PHITS}`;
  document.querySelector("#misses").textContent = `MISSES: ${MISSES}`;
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
let MISSES = 0;
let OKHITS = 0;
let PHITS = 0;
//objects
let placeHolderSong = {
  bpm: 140,
  upArrows: [
    13, 21, 27, 31, 37, 43, 53, 54, 60, 62, 64, 65, 74, 77, 80, 93, 97, 103,
    107, 111, 115, 118, 121, 122, 129, 134, 141, 145, 146, 152, 156, 159, 161,
    169, 174, 177, 178, 180, 185, 186,
  ],
  downArrows: [
    1, 17, 25, 29, 33, 41, 42, 47, 51, 55, 58, 64, 66, 70, 73, 78, 82, 86, 90,
    92, 95, 101, 107, 112, 114, 121, 123, 130, 132, 136, 143, 147, 148, 150,
    154, 159, 161, 172, 176, 177, 179, 182, 184, 186, 192,
  ],
  leftArrows: [
    9, 30, 35, 45, 46, 59, 63, 68, 71, 75, 83, 85, 88, 91, 96, 98, 99, 105, 110,
    113, 117, 119, 127, 128, 131, 135, 139, 151, 155, 160, 163, 165, 166, 170,
    175, 183, 188, 191,
  ],
  rightArrows: [
    7, 32, 39, 49, 50, 57, 61, 67, 69, 79, 81, 84, 87, 89, 94, 99, 102, 106,
    109, 113, 117, 125, 126, 133, 137, 138, 140, 149, 153, 157, 160, 162, 164,
    167, 168, 171, 173, 181, 187, 189, 190,
  ],
  delay: 5500,
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
            let newArrow = new arrowObj("ArrowUp", currentBeat, greenArrowsImg);
            this.activeArrowArray.push(newArrow);
          }
        }
        for (const arrow of this.downArray) {
          if (arrow === currentBeat) {
            let newArrow = new arrowObj(
              "ArrowDown",
              currentBeat,
              greenArrowsImg
            );
            this.activeArrowArray.push(newArrow);
          }
        }
        for (const arrow of this.leftArray) {
          if (arrow === currentBeat) {
            let newArrow = new arrowObj(
              "ArrowLeft",
              currentBeat,
              greenArrowsImg
            );
            this.activeArrowArray.push(newArrow);
          }
        }
        for (const arrow of this.rightArray) {
          if (arrow === currentBeat) {
            let newArrow = new arrowObj(
              "ArrowRight",
              currentBeat,
              greenArrowsImg
            );
            this.activeArrowArray.push(newArrow);
          }
        }
        currentBeat++;
        //document.querySelector("canvas").style.border = "10px solid red";
        ctx.shadowColor = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
        ctx.shadowBlur = 50;
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
      case "ArrowLeft":
        ctx.drawImage(greenArrowsImg, 0, 0, 62, 60, 0, this.yCord, 125, 120);
        break;
      case "ArrowRight":
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
      case "ArrowUp":
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
      case "ArrowDown":
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
        missHit = true;
        MISSES++;
      }
      if (arrows[i] !== undefined) {
        if (arrows[i].direction === keyPressArrow) {
          if (arrows[i].yCord > -55 && arrows[i].yCord < 20) {
            // perfect hit
            arrows.splice(i, 1);
            switch (keyPressArrow) {
              case "ArrowLeft":
                pHit = true;
                pHitL = true;
                break;
              case "ArrowRight":
                pHit = true;
                pHitR = true;
                break;
              case "ArrowUp":
                pHit = true;
                pHitU = true;
                break;
              case "ArrowDown":
                pHit = true;
                pHitD = true;
                break;
            }
            keyPressArrow = "";
            currentCombo++;
            PHITS++;
            score += 2;
          } else if (arrows[i].yCord > -79 && arrows[i].yCord < 40) {
            // great hit
            arrows.splice(i, 1);
            switch (keyPressArrow) {
              case "ArrowLeft":
                okHit = true;
                okHitL = true;
                break;
              case "ArrowRight":
                okHit = true;
                okHitR = true;
                break;
              case "ArrowUp":
                okHit = true;
                okHitU = true;
                break;
              case "ArrowDown":
                okHit = true;
                okHitD = true;
                break;
            }
            keyPressArrow = "";
            currentCombo++;
            OKHITS++;
            score++;
          } else {
            health = health - 5;
            missHit = true;
            MISSES++;
          }
        }
      }
    }
  }
}
let missHit = false;
let okHit = false;
let okHitL = false;
let okHitR = false;
let okHitU = false;
let okHitD = false;
let pHit = false;
let pHitL = false;
let pHitR = false;
let pHitU = false;
let pHitD = false;
//--------------------------------------------
function controls() {
  window.addEventListener("keydown", (event) => {
    event.preventDefault();
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
        keyPressArrow = "ArrowLeft";
        keyPressArrowL = true;
        break;
      case "ArrowRight":
        keyPressArrow = "ArrowRight";
        keyPressArrowR = true;
        break;
      case "ArrowUp":
        keyPressArrow = "ArrowUp";
        keyPressArrowU = true;
        break;
      case "ArrowDown":
        keyPressArrow = "ArrowDown";
        keyPressArrowD = true;
        break;
    }
  });
}
//-----------------------------------
let keyPressArrow = "";
let keyPressArrowL = false;
let keyPressArrowR = false;
let keyPressArrowU = false;
let keyPressArrowD = false;

//----------------------------------

let currentSong = new stepChart(placeHolderSong);

function startGame(song) {
  /*USEING setTimeout() DELAY THE START OF MUSIC BY AMOUNT === TIME IT TAKES TO SCROLL UP*/
  song.startSongInterval();
  controls();
  let mCIFrames = 0;
  let keyPressFramesL = 0;
  let keyPressFramesR = 0;
  let keyPressFramesU = 0;
  let keyPressFramesD = 0;
  let popUpHitValuesFrames = 0;
  mainCanvasIntervalID = setInterval(function () {
    ctx.clearRect(0, 0, 500, 750);
    drawLandingRow();

    //draws the pop up miss, great, and perfects images
    if (missHit) {
      ctx.drawImage(missImg, 100, 300, 300, 75);
      popUpHitValuesFrames++;
      if (popUpHitValuesFrames > 16) {
        missHit = false;
        popUpHitValuesFrames = 0;
      }
    }
    if (okHit) {
      ctx.drawImage(okHitImg, 100, 300, 300, 75);
      popUpHitValuesFrames++;
      if (popUpHitValuesFrames > 16) {
        okHit = false;
        popUpHitValuesFrames = 0;
      }
    }
    if (pHit) {
      ctx.drawImage(pHitImg, 100, 300, 300, 75);
      popUpHitValuesFrames++;
      if (popUpHitValuesFrames > 16) {
        pHit = false;
        popUpHitValuesFrames = 0;
      }
    }

    if (keyPressArrowL) {
      if (pHitL) {
        ctx.drawImage(hitRowImg, 0, 65, 62, 60, 0, 0, 121, 120);
      } else if (okHitL) {
        ctx.drawImage(hitRowImg, 0, 0, 62, 60, 0, 0, 121, 120);
      } else {
        ctx.drawImage(landingRowImg, 255, 0, 62, 60, 0, 0, 121, 120);
      }
      keyPressFramesL++;
      if (keyPressFramesL > 8) {
        keyPressFramesL = 0;
        keyPressArrowL = false;
        okHitL = false;
        pHitL = false;
      }
    }
    if (keyPressArrowR) {
      // if conditional for normal press, great hit, perfect hit
      if (pHitR) {
        ctx.drawImage(hitRowImg, 190, 65, 62, 60, 375, 0, 121, 120);
      } else if (okHitR) {
        ctx.drawImage(hitRowImg, 190, 0, 62, 60, 375, 0, 121, 120);
      } else {
        ctx.drawImage(landingRowImg, 448, 0, 62, 60, 375, 0, 125, 120);
      }

      keyPressFramesR++;
      if (keyPressFramesR > 8) {
        keyPressFramesR = 0;
        keyPressArrowR = false;
        okHitR = false;
        pHitR = false;
      }
    }
    if (keyPressArrowU) {
      if (pHitU) {
        ctx.drawImage(hitRowImg, 127, 65, 62, 60, 250, 0, 117, 120);
      } else if (okHitU) {
        ctx.drawImage(hitRowImg, 127, 0, 62, 60, 250, 0, 116, 118);
      } else {
        ctx.drawImage(landingRowImg, 382, 0, 62, 60, 250, 0, 119, 120);
      }

      keyPressFramesU++;
      if (keyPressFramesU > 8) {
        keyPressFramesU = 0;
        keyPressArrowU = false;
        okHitU = false;
        pHitU = false;
      }
    }
    if (keyPressArrowD) {
      if (pHitD) {
        ctx.drawImage(hitRowImg, 62, 65, 62, 60, 123, 0, 119, 120);
      } else if (okHitD) {
        ctx.drawImage(hitRowImg, 62, 0, 62, 60, 123, 0, 117, 118);
      } else {
        ctx.drawImage(landingRowImg, 318, 0, 62, 60, 125, 0, 117, 120);
      }
      keyPressFramesD++;
      if (keyPressFramesD > 8) {
        keyPressFramesD = 0;
        keyPressArrowD = false;
        okHitD = false;
        pHitD = false;
      }
    }
    updateStats();
    collisions(); // and active arrow draw
    mCIFrames++;
    keyPressArrow = "";
  }, 16);
}
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    let audio = document.getElementById("im-for-real");
    audio.play();
    startGame(currentSong);
    //document.getElementById("start-button").remove(); // fix
  };
};
