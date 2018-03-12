/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_style_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_style_css__);




function init() {
  __WEBPACK_IMPORTED_MODULE_1__view__["a" /* view */].init(__WEBPACK_IMPORTED_MODULE_0__calculator__["a" /* calculator */]);
  __WEBPACK_IMPORTED_MODULE_0__calculator__["a" /* calculator */].init(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* view */]);
}

window.addEventListener('DOMContentLoaded', init);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calculator; });
var calculator = {
  deps: {
    view: ''
  },
  currentNum: '0',
  memory: '',
  evalQueue: '',
  equalsPressed: false,
  opPressed: true,
  procInput: function procInput(input) {
    if (input.classList.contains('clear')) {
      this.deps.view.clear();
    } else if (input.classList.contains('number')) {
      this.deps.view.displayNumInput(input);
    } else {
      this.deps.view.displayOpResult(input);
    }
  },
  procNumInput: function procNumInput(num) {
    if (this.equalsPressed) {
      this.deps.view.clear();
    }
    if (this.opPressed) {
      this.opPressed = false;
    }
    if (this.currentNum === '0') {
      this.currentNum = num;
    } else {
      this.currentNum = '' + this.currentNum + num;
    }
  },
  procOpInput: function procOpInput(op) {
    if (op === '=') {
      this.procEqualsPressed();
    } else {
      if (!calculator.opPressed) {
        if (op === 'X') {
          this.procMultPressed(op);
        } else {
          this.procSumDiffDiv(op);
        }
      }
    }
  },
  procEqualsPressed: function procEqualsPressed() {
    this.memory = this.evalQueue ? this.round(eval('' + this.evalQueue + this.currentNum)) : this.currentNum;
    this.evalQueue = '';
    this.currentNum = this.memory;
    this.equalsPressed = true;
  },
  procMultPressed: function procMultPressed(op) {
    if (this.equalsPressed) {
      this.equalsPressed = false;
    }
    this.memory = this.evalQueue ? this.round(eval('' + this.evalQueue + this.currentNum)) : this.currentNum;
    this.evalQueue = this.evalQueue + ' ' + this.currentNum + '*';
    this.currentNum = '0';
    this.opPressed = true;
  },
  procSumDiffDiv: function procSumDiffDiv(op) {
    if (this.equalsPressed) {
      this.equalsPressed = false;
    }
    this.memory = this.evalQueue ? this.round(eval('' + this.evalQueue + this.currentNum)) : this.currentNum;
    this.evalQueue = this.evalQueue + ' ' + this.currentNum + ' ' + op;
    this.currentNum = '0';
    this.opPressed = true;
  },
  round: function round(num) {
    return Math.round(num * 100000) / 100000;
  },
  init: function init(viewObj) {
    this.deps.view = viewObj;
  }
};



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return view; });
var view = {
  deps: {
    calculator: ''
  },
  isMobile: typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1,
  body: document.querySelector('body'),
  cacheDom: function cacheDom() {
    this.calculator = this.body.querySelector('#calculator');
    this.output = this.calculator.querySelector("#output");
    this.clickables = this.calculator.querySelectorAll('.nums-ops p');
    this.queue = this.calculator.querySelector("#queue");
  },
  adjustTextSize: function adjustTextSize(el) {
    if (this.deps.calculator.memory.toString().length > 17 || this.deps.calculator.currentNum.length > 17) {
      el.style['font-size'] = '1.2em';
    } else if (this.deps.calculator.memory.toString().length > 10 || this.deps.calculator.currentNum.length > 10) {
      el.style['font-size'] = '2em';
    } else {
      el.style['font-size'] = '3em';
    }
  },
  addCalcListeners: function addCalcListeners(clickable) {
    if (this.isMobile) {
      clickable.addEventListener('touchend', function () {
        this.deps.calculator.procInput(clickable);
      });
    } else {
      clickable.addEventListener('click', function () {
        view.deps.calculator.procInput(clickable);
      });
    }
  },
  displayNumInput: function displayNumInput(num) {
    this.deps.calculator.procNumInput(num.textContent);
    this.adjustTextSize(this.output);
    this.output.textContent = this.deps.calculator.currentNum;
  },
  clear: function clear() {
    this.deps.calculator.currentNum = '0';
    this.output.textContent = this.deps.calculator.currentNum;
    this.deps.calculator.evalQueue = '';
    this.queue.textContent = this.deps.calculator.evalQueue;
    this.deps.calculator.memory = '';
    this.deps.calculator.equalsPressed = false;
    this.deps.calculator.opPressed = true;
    this.adjustTextSize(this.output);
  },
  displayOpResult: function displayOpResult(op) {
    this.deps.calculator.procOpInput(op.textContent);
    this.adjustTextSize(this.output);
    this.deps.calculator.memory ? this.output.textContent = this.deps.calculator.memory : this.output.textContent = '0';
    this.queue.textContent = this.deps.calculator.evalQueue;
  },
  mobile3DBehavior: function mobile3DBehavior() {
    if (this.isMobile) {
      this.calculator.addEventListener('touchstart', function (e) {
        e.currentTarget.style.transform = "translateZ(50px) rotateY(0deg) rotateZ(0deg)";
        e.stopPropagation();
      });
      this.body.addEventListener('touchstart', function (e) {
        view.calculator.style.transform = "translateZ(50px) rotateY(45deg) rotateZ(20deg)";
      });
    }
  },
  bindEvents: function bindEvents() {
    for (var i = 0; i < this.clickables.length; i++) {
      this.addCalcListeners(this.clickables[i]);
    }
  },
  init: function init(calculatorObj) {
    this.deps.calculator = calculatorObj;
    this.cacheDom();
    this.mobile3DBehavior();
    this.bindEvents();
  }
};



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "style.css";

/***/ })
/******/ ]);