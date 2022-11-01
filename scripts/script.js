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

let comboImg = new Image();
comboImg.src = "/imgs/DDR/Combos.png";

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
};

let playscreen = document.getElementById("play-screen");
playscreen.style.display = "none";

let songSelectionMenu = document.getElementById("song-selection");
songSelectionMenu.style.display = "none";

document.getElementById("game-board").style.display = "none";
document.getElementById("score-screen").style.display = "none"; // temporary

function loadSongSelectionMenu() {
  songSelectionMenu.style.display = "flex";
  let tripMachineButton = document.getElementById("Song-sptripmachine");
  let imForRealButton = document.getElementById("Song-imforreal");
  let keepOnMovingButton = document.getElementById("Song-keepOnMoving");

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
    loadPlayScreen(imforrealsong);
  };
  // other two song starts
  imForRealButton.onmouseenter = () => {
    document.querySelector("body").style.backgroundImage =
      "url('/imgs/DDR/imforrealCover.png')";
  };
  keepOnMovingButton.onmouseenter = () => {
    document.querySelector("body").style.backgroundImage =
      "url('/imgs/DDR/letthemmoveBG.png')";
  };
  tripMachineButton.onmouseenter = () => {
    document.querySelector("body").style.backgroundImage =
      "url('/imgs/DDR/tripmachineBG.png')";
  };
}

function loadPlayScreen(CHOSENSONG) {
  playscreen.style.display = "";
  function drawLandingRow(/*tempo*/) {
    ctx.drawImage(landingRowImg, 0, 0, 255, 60, 0, 0, 500, 120);
  }

  function healthBarColor() {
    ctxH.fillStyle = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
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
  let health = 50;
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
          //document.querySelector("canvas").style.border = "10px solid red";
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
              health = health - 10;
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

  function endGame() {
    clearInterval(currentSong.songIntervalID);
    ctx.clearRect(0, 0, 500, 750);
  }
  let currentSong = new stepChart(CHOSENSONG);
  function startGame(song) {
    /*USEING setTimeout() DELAY THE START OF MUSIC BY AMOUNT === TIME IT TAKES TO SCROLL UP*/
    song.startSongInterval();
    controls();

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
        ctx.drawImage(missImg, 120, 250, 200, 50);
        popUpHitValuesFrames++;
        if (popUpHitValuesFrames > 16) {
          missHit = false;
          popUpHitValuesFrames = 0;
        }
      }
      if (okHit) {
        ctx.drawImage(okHitImg, 100, 300, 240, 60);
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
      if (currentCombo > 1) {
        ctx.drawImage(comboImg, 150, 400, 150, 37);
        ctx.fillStyle = "gold";
        ctx.textAlign = "center";
        ctx.font = "50px Sans-Serif";
        ctx.fillText(`${currentCombo}`, 225, 470, 100);
      }
      updateStats();
      collisions(); // and active arrow dra
      keyPressArrow = "";
      ctxH.clearRect(0, 0, 500, 30);
      ctxH.fillRect(0, 0, health * 5, 30);
      if (health <= 0) {
        ctxH.clearRect(0, 0, 500, 30);
        endGame();
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
