const canvas1 = document.getElementById("canvas");
const ctx = canvas1.getContext("2d");

const canvasH = document.getElementById("canvasHealth");
const ctxH = canvasH.getContext("2d");

const canvasTv = document.getElementById("tv-screen-canvas");
const ctxTv = canvasTv.getContext("2d");

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

let comboImg = new Image();
comboImg.src = "/imgs/DDR/Combos.png";

//ranks
let sPlusRank = new Image();
sPlusRank.src = "/imgs/DDR/SplusRank.png";
let sRank = new Image();
sRank.src = "/imgs/DDR/Srank.png";
let aRank = new Image();
aRank.src = "/imgs/DDR/A_Rank.png";
let bRank = new Image();
bRank.src = "/imgs/DDR/B_rank.png";
let cRank = new Image();
cRank.src = "/imgs/DDR/C_Rank.png";
let failureImg = new Image();
failureImg.src = "/imgs/DDR/FAILURE.png";

//backgrounds
let boomimg = new Image();
boomimg.src = "/imgs/DDR/boomboomdollarBG.PNG";
let imforimg = new Image();
imforimg.src = "/imgs/DDR/imforrealCover.png";
let tripimg = new Image();
tripimg.src = "/imgs/DDR/tripmachineBG.png";
let letmoveimg = new Image();
letmoveimg.src = "/imgs/DDR/letthemmoveBG.png";
let tvImg = new Image();
tvImg.src = "/imgs/DDR/tvoverlay.png";
let staticImg = new Image();
staticImg.src = "/imgs/DDR/static.png";
let crtfilterImg = new Image();
crtfilterImg.src = "/imgs/DDR/crtfilter.png";

let imforrealsong = {
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
  highscore: 0,
  songid: "im-for-real",
  songLength: 92,
};
let tripmachinesong = {
  bpm: 160,
  upArrows: [
    2, 4, 9, 18, 20, 25, 35, 39, 41, 45, 55, 66, 77, 80, 96, 97, 105, 108, 113,
    118, 121, 129, 130, 132, 135, 137, 140, 141, 149, 160, 169, 173, 178, 181,
    186, 190,
  ],
  downArrows: [
    7, 10, 14, 16, 23, 26, 30, 32, 34, 36, 40, 45, 47, 51, 56, 59, 60, 69, 74,
    75, 81, 84, 90, 91, 95, 98, 103, 104, 106, 110, 111, 114, 119, 120, 122,
    135, 138, 142, 143, 146, 149, 152, 159, 161, 168, 174, 175, 182, 183, 189,
    193,
  ],
  leftArrows: [
    6, 12, 24, 27, 29, 31, 32, 33, 37, 43, 46, 48, 53, 58, 79, 83, 86, 87, 93,
    99, 102, 107, 110, 111, 115, 120, 123, 127, 128, 134, 136, 145, 148, 151,
    153, 157, 162, 165, 167, 171, 177, 180, 185, 187, 191,
  ],
  rightArrows: [
    8, 11, 13, 15, 16, 22, 28, 33, 38, 42, 44, 46, 49, 57, 61, 62, 63, 64, 65,
    68, 70, 78, 82, 94, 99, 104, 108, 112, 115, 118, 123, 125, 133, 136, 144,
    147, 150, 155, 158, 163, 166, 168, 179, 188, 192,
  ],
  delay: 10350,
  highscore: 0,
  songid: "trip-machine",
  songLength: 88,
};
let keepmovingonsong = {
  bpm: 132,
  upArrows: [
    11, 26, 29, 30, 43, 44, 61, 71, 72, 81, 82, 83, 85, 86, 87, 94, 96, 97, 100,
    104, 113, 114, 120, 123, 124, 127,
  ],
  downArrows: [
    2, 4, 8, 16, 18, 20, 24, 26, 27, 28, 31, 32, 41, 50, 58, 61, 63, 69, 70, 75,
    76, 79, 80, 89, 90, 95, 96, 98, 99, 105, 108, 115, 116, 121, 126, 128,
  ],
  leftArrows: [
    1, 14, 15, 19, 33, 34, 36, 37, 46, 49, 52, 57, 62, 65, 66, 73, 74, 88, 97,
    98, 103, 109, 110, 113, 116, 117, 118, 122, 129,
  ],
  rightArrows: [
    3, 5, 6, 7, 9, 12, 13, 17, 21, 22, 23, 25, 33, 35, 37, 45, 47, 51, 53, 57,
    59, 64, 67, 68, 77, 78, 84, 91, 92, 99, 100, 101, 102, 111, 112, 114, 115,
    119, 125, 129,
  ],
  delay: 5900,
  highscore: 0,
  songid: "keep-on-movin",
  songLength: 67,
};
let boomboomdollarsong = {
  bpm: 170,
  upArrows: [
    13, 17, 18, 29, 33, 35, 37, 38, 50, 52, 56, 65, 69, 81, 89, 92, 97, 98, 113,
    114, 117, 121, 122, 123, 124, 157, 158, 169, 170, 171, 172, 173, 174, 175,
    176, 185, 186, 189, 190,
  ],
  downArrows: [
    5, 6, 14, 19, 20, 25, 26, 30, 42, 45, 47, 57, 59, 62, 63, 64, 68, 70, 73,
    84, 90, 91, 106, 109, 111, 112, 115, 116, 119, 120, 125, 126, 127, 159, 160,
    161, 162, 163, 164, 165, 166, 167, 168, 177, 178, 179, 180, 181, 182, 183,
    184, 187, 188, 191, 192,
  ],
  leftArrows: [
    3, 4, 8, 11, 12, 16, 23, 24, 28, 32, 36, 39, 41, 44, 48, 51, 54, 58, 61, 67,
    71, 74, 76, 79, 80, 82, 85, 87, 93, 96, 99, 100, 103, 105, 108, 115, 118,
    128, 131, 132, 135, 137, 138, 141, 143, 146, 148, 151, 152, 154, 156, 193,
  ],
  rightArrows: [
    1, 2, 7, 9, 10, 15, 21, 22, 27, 31, 34, 40, 43, 46, 49, 53, 55, 60, 66, 72,
    75, 77, 78, 83, 86, 88, 94, 95, 101, 102, 104, 107, 110, 116, 129, 130, 133,
    134, 136, 139, 140, 142, 144, 145, 147, 149, 150, 153, 155,
  ],
  delay: 10250,
  highscore: 0,
  songid: "boom-boom-dollar",
  songLength: 81,
};
let tvInterval = 0;
let playscreen = document.getElementById("play-screen");
playscreen.style.display = "none";

let songSelectionMenu = document.getElementById("song-selection");
songSelectionMenu.style.display = "none";

document.getElementById("game-board").style.display = "none";
document.getElementById("score-screen").style.display = "none";

function loadSongSelectionMenu() {
  document.querySelector("body").style.backgroundImage =
    "url('/imgs/DDR/retrowave.gif')";
  songSelectionMenu.style.display = "flex";
  let tripMachineButton = document.getElementById("Song-sptripmachine");
  let imForRealButton = document.getElementById("Song-imforreal");
  let keepOnMovingButton = document.getElementById("Song-keepOnMoving");
  let boomBoomDollarButton = document.getElementById("Song-boomboomdollar");

  let BoomInterval = false;
  let tripmachineInterval = false;
  let imforrealInterval = false;
  let keeponmovingInterval = false;

  imForRealButton.onclick = () => {
    songSelectionMenu.style.display = "none";
    loadPlayScreen(imforrealsong);
  };
  tripMachineButton.onclick = () => {
    songSelectionMenu.style.display = "none";
    loadPlayScreen(tripmachinesong);
  };
  keepOnMovingButton.onclick = () => {
    songSelectionMenu.style.display = "none";
    loadPlayScreen(keepmovingonsong);
  };
  boomBoomDollarButton.onclick = () => {
    songSelectionMenu.style.display = "none";
    loadPlayScreen(boomboomdollarsong);
  };
  tvInterval = setInterval(() => {
    ctxTv.clearRect(0, 0, 700, 550);
    ctxTv.drawImage(staticImg, 30, 30, 500, 450);
    imForRealButton.onmouseenter = () => {
      imforrealInterval = true;
    };
    imForRealButton.onmouseleave = () => {
      imforrealInterval = false;
    };
    if (imforrealInterval) {
      ctxTv.drawImage(imforimg, 30, 30, 500, 450);
    }
    boomBoomDollarButton.onmouseenter = () => {
      BoomInterval = true;
    };
    boomBoomDollarButton.onmouseleave = () => {
      BoomInterval = false;
    };
    if (BoomInterval) {
      ctxTv.drawImage(boomimg, 30, 30, 500, 450);
    }
    keepOnMovingButton.onmouseenter = () => {
      keeponmovingInterval = true;
    };
    keepOnMovingButton.onmouseleave = () => {
      keeponmovingInterval = false;
    };
    if (keeponmovingInterval) {
      ctxTv.drawImage(letmoveimg, 30, 30, 500, 450);
    }
    tripMachineButton.onmouseenter = () => {
      tripmachineInterval = true;
    };
    tripMachineButton.onmouseleave = () => {
      tripmachineInterval = false;
    };
    if (tripmachineInterval) {
      ctxTv.drawImage(tripimg, 30, 30, 500, 450);
    }
    ctxTv.drawImage(crtfilterImg, 30, 30, 500, 450);
    ctxTv.drawImage(tvImg, 0, 0, 700, 550);
  }, 16);

  keepOnMovingButton.onmouseenter = () => {
    //  document.querySelector("body").style.backgroundImage =
    //   "url('/imgs/DDR/letthemmoveBG.png')";
  };
  tripMachineButton.onmouseenter = () => {
    //  document.querySelector("body").style.backgroundImage =
    //    "url('/imgs/DDR/tripmachineBG.png')";
  };
  boomBoomDollarButton.onmouseenter = () => {
    //  document.querySelector("body").style.backgroundImage =
    //    "url('/imgs/DDR/boomboomdollarBG.PNG')";
  };
}

function loadPlayScreen(CHOSENSONG) {
  clearInterval(tvInterval);
  playscreen.style.display = "";
  function drawLandingRow(/*tempo*/) {
    ctx.drawImage(landingRowImg, 0, 0, 255, 60, 0, 0, 500, 120);
  }

  function healthBarColor() {
    ctxH.fillStyle = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  }

  //utility functions
  function updateStats() {
    document.querySelector("#score").textContent = `${score}`;
    document.querySelector("#okHits").textContent = `${OKHITS}`;
    document.querySelector("#pHits").textContent = `${PHITS}`;
    document.querySelector("#misses").textContent = `${MISSES}`;
    document.querySelector("#cCombo").innerText = `${currentCombo}`;
    document.querySelector("#gCombo").innerText = `${greatestCombo}`;
  }

  //global variables
  let mainCanvasIntervalID = 0;
  let health = 75;
  let score = 0;
  let currentCombo = 0;
  let greatestCombo = 0;
  let MISSES = 0;
  let OKHITS = 0;
  let PHITS = 0;
  //objects

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
              let newArrow = new arrowObj(
                "ArrowUp",
                currentBeat,
                greenArrowsImg
              );
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
          ctx.shadowColor = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
          ctx.shadowBlur = 50;
          healthBarColor();
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
          ctx.drawImage(
            greenArrowsImg,
            62,
            0,
            62,
            60,
            120,
            this.yCord,
            125,
            120
          );
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
          health = health - 5;
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
              if (health >= 100) {
                health = 100;
              } else {
                health += 5;
              }
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
              if (health >= 100) {
                health = 100;
              } else {
                health += 7;
              }
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
  let currentSong = new stepChart(CHOSENSONG);
  function endGame(winorlose) {
    clearInterval(currentSong.songIntervalID);
    clearInterval(mainCanvasIntervalID);
    ctx.clearRect(0, 0, 500, 750);
    if (winorlose === "win") {
      switch (true) {
        case MISSES === 0:
          ctx.drawImage(sPlusRank, 125, 50, 250, 150);
          break;
        case MISSES <= 5:
          ctx.drawImage(sRank, 197, 90, 95, 100);
          break;
        case MISSES <= 10:
          ctx.drawImage(aRank, 197, 90, 95, 100);
          break;
        case MISSES <= 15:
          ctx.drawImage(bRank, 197, 90, 95, 100);
          break;
        default:
          ctx.drawImage(cRank, 197, 90, 95, 100);
          break;
      }
    } else {
      //ctx.drawImage(sRank, 197, 90, 95, 100);
      ctx.drawImage(failureImg, 10, 50, 477, 151);
    }
    document.getElementById("game-intro").style.display = "none";
    document.getElementById("score-screen").style.display = "flex";
  }
  function startGame(song) {
    /*USEING setTimeout() DELAY THE START OF MUSIC BY AMOUNT === TIME IT TAKES TO SCROLL UP*/
    song.startSongInterval();
    let currentSongTime = 0;
    let currentTimeInterval = 0;
    currentTimeInterval = setInterval(() => {
      currentSongTime++;
    }, 1000);
    controls();

    let keyPressFramesL = 0;
    let keyPressFramesR = 0;
    let keyPressFramesU = 0;
    let keyPressFramesD = 0;
    let popUpHitValuesFrames = 0;
    mainCanvasIntervalID = setInterval(() => {
      ctx.clearRect(0, 0, 500, 750);
      drawLandingRow();

      //draws the pop up miss, great, and perfects images
      if (missHit) {
        ctx.drawImage(missImg, 120, 175, 200, 50);
        popUpHitValuesFrames++;
        if (popUpHitValuesFrames > 16) {
          missHit = false;
          popUpHitValuesFrames = 0;
        }
      }
      if (okHit) {
        ctx.drawImage(okHitImg, 100, 200, 240, 60);
        popUpHitValuesFrames++;
        if (popUpHitValuesFrames > 16) {
          okHit = false;
          popUpHitValuesFrames = 0;
        }
      }
      if (pHit) {
        ctx.drawImage(pHitImg, 100, 225, 300, 75);
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
      if (currentCombo > 1) {
        ctx.drawImage(comboImg, 125, 300, 200, 50);
        ctx.font = "40px 'Fredoka One'";
        ctx.fillStyle = "pink";
        ctx.textAlign = "left";
        //ctx.font = "50px";
        ctx.fillText(`${currentCombo}`, 334, 341, 150);
      }
      updateStats();
      collisions(); // and active arrow dra
      keyPressArrow = "";
      ctxH.clearRect(0, 0, 500, 30);
      ctxH.fillRect(0, 0, health * 5, 30);

      if (currentSongTime >= CHOSENSONG.songLength) {
        clearInterval(currentTimeInterval);
        ctxH.clearRect(0, 0, 500, 30);
        endGame("win");
      }
      if (health <= 0) {
        clearInterval(currentTimeInterval);
        ctxH.clearRect(0, 0, 500, 30);
        endGame("loss");
      }
    }, 16);
  }

  document.getElementById("start-button").onclick = () => {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("game-board").style.display = "flex";
    let audio = document.getElementById(CHOSENSONG.songid);
    audio.play();
    startGame(currentSong);
  };
}
window.onload = () => {
  let startScreen = document.getElementById("start-screen");
  const bigstartButton = document.getElementById("Big-start-button");
  bigstartButton.onclick = () => {
    console.log("click");
    startScreen.style.display = "none"; // fix
    loadSongSelectionMenu();
  };
};
