import { StashItem } from "./stashItem.js";

document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".stopwatch__play"),
    replayButton = document.querySelector(".stopwatch__replay"),
    roundButton = document.querySelector(".stopwatch__round"),
    stopwatch = document.querySelector(".stopwatch"),
    stopwatchStash = document.querySelector(".stopwatch-stash"),
    timerScoreMinutes = document.querySelector(".stopwatch__minutes"),
    timerScoreSeconds = document.querySelector(".stopwatch__seconds"),
    roundTimerScoreMinutes = document.querySelector(".stopwatch__round-minutes"),
    roundTimerScoreSeconds = document.querySelector(".stopwatch__round-seconds"),
    roundBody = document.querySelector(".stopwatch__round-body");

  let countTime = 0,
    roundCountTime = 0,
    stopwatchStarted = false,
    countInterval,
    roundCountInterval,
    stashOrder = 1;

  playButton.addEventListener("click", playToggle);

  function playToggle() {
    if (!stopwatchStarted) {
      replayAddListener();
      roundAddListener();
    }
    stopwatchStateToggler();
    if (stopwatch.classList.contains("active")) {
      replayButton.classList.remove("active");
      countInterval = setInterval(timeCountFunc, 1000);
      roundCountInterval = setInterval(roundtimeCountFunc, 1000);
    } else {
      replayButton.classList.add("active");
      clearInterval(countInterval);
      clearInterval(roundCountInterval);
    }
    stopwatchStarted = true;
  }

  function timeCountFunc(clear) {
    if (clear === 0) {
      countTime = 0;
    }

    let seconds = Math.floor(countTime % 60);
    let minutes = Math.floor((countTime / 60) % 60);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    timerScoreSeconds.textContent = seconds;
    timerScoreMinutes.textContent = minutes;

    if (countTime === 3600) {
      replayFunc(false);
      countTime = 0;
      roundCountTime = 0;
    }

    countTime++;
  }

  function roundtimeCountFunc(clear) {
    if (clear === 0) {
      roundCountTime = 0;
    }
    let seconds = Math.floor(roundCountTime % 60);
    let minutes = Math.floor((roundCountTime / 60) % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    roundTimerScoreSeconds.textContent = seconds;
    roundTimerScoreMinutes.textContent = minutes;
    roundCountTime++;
  }

  timeCountFunc();
  roundtimeCountFunc();

  function ButtonsStateToggler() {
    playButton.classList.toggle("active");
    roundButton.classList.toggle("active");
  }

  function replayFunc(event) {
    if (replayButton.classList.contains("active")) {
      roundBody.style.opacity = "0";
      timeCountFunc(0);
      roundtimeCountFunc(0);
      clearInterval(countInterval);
      clearInterval(roundCountInterval);

      const stashItems = document.querySelectorAll(".stopwatch-stash__item");
      stashItems.forEach((elem) => {
        elem.remove();
      });

      replayButton.classList.remove("active");
      stopwatchStarted = false;
      roundStart = false;

      stashOrder = 1;
    } else if (event === false) {
      roundBody.style.opacity = "0";
      timeCountFunc(0);
      roundtimeCountFunc(0);
      clearInterval(countInterval);
      clearInterval(roundCountInterval);

      const stashItems = document.querySelectorAll(".stopwatch-stash__item");
      stashItems.forEach((elem) => {
        elem.remove();
      });

      replayButton.classList.remove("active");
      stopwatchStarted = false;
      roundStart = false;

      stashOrder = 1;
      stopwatchStateToggler();
    } else {
      if (event) event.preventDefault();
    }
  }

  let roundStart = false;

  function roundFunc(event) {
    if (roundButton.classList.contains("active")) {
      stashOrder = stashOrder < 10 ? `0${stashOrder}` : stashOrder;
      let currentTime = `${timerScoreMinutes.textContent} : ${timerScoreSeconds.textContent}`;
      let diff = `+${roundTimerScoreMinutes.textContent} : ${roundTimerScoreSeconds.textContent}`;
      new StashItem(stopwatchStash, stashOrder, diff, currentTime, roundStart);
      roundBody.style.opacity = "1";
      stashOrder++;
      clearInterval(roundCountInterval);
      roundCountInterval = setInterval(roundtimeCountFunc, 1000);
      roundtimeCountFunc(0);

      roundStart = true;
    } else {
      event.preventDefault();
    }
  }

  function stopwatchStateToggler() {
    stopwatch.classList.toggle("active");
    ButtonsStateToggler();
  }

  function replayAddListener() {
    replayButton.addEventListener("click", replayFunc);
  }

  function roundAddListener() {
    roundButton.addEventListener("click", roundFunc);
  }
});
