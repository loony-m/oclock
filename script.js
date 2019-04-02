'use strict';
function Clock(options) {

  this._state = null;
  this._timerValue = null;
  this._inited = false;

  this._render = function () {
    this._state = new Date();
    let hh = this._state.getHours();
    let mm = this._state.getMinutes();
    let ss = this._state.getSeconds();

    options.elem.innerHTML = `
      ${this._addZero(hh)}:${this._addZero(mm)}:${this._addZero(ss)}
    `;
  }

  this._init = function () {
    options.elem.innerHTML = `
      <div class="js-clock"></div>
      <input class="js-stop" type="button" value="Stop">
      <input class="js-start" type="button" value="Start"> 
    `;
    options.elem.querySelector(".js-stop").onclick = this.stop.bind(this);
    options.elem.querySelector(".js-start").onclick = this.start.bind(this);

    options.elem = options.elem.querySelector(".js-clock");
  }

  this._addZero = function (n) {
    return (n < 10 ? "0" : "") + n;
  }

  this.start = function () {
    if (!this._inited) {
      this._init();
      this._inited = true;
    }
    this._timerValue = setInterval(() => this._render(), 1000);
  }

  this.stop = function () {
    clearInterval(this._timerValue);
  }
}