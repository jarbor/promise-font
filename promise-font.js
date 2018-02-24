(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["promiseFont"] = factory();
	else
		root["promiseFont"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* Based on jQuery-FontSpy.js (https://github.com/patrickmarabeas/jQuery-FontSpy.js/blob/master/jQuery-FontSpy.js)
 */
var BASELINE_FONT = 'Courier New';
var TEST_STRING = 'QW@HhsiXJ';
var INTERVAL = 50;
var TIMEOUT = 2000;

var promiseFont = function promiseFont(fontName, config) {
  config = config || {};
  var baselineFont = config.baselineFont || BASELINE_FONT; // Prepare the baseline test

  var tester = document.createElement('span');
  tester.innerHTML = TEST_STRING + config.glyphs;
  tester.style.display = 'inline-block';
  tester.style.position = 'absolute';
  tester.style.top = '-9999px';
  tester.style.left = '-9999px';
  tester.style.visibility = 'hidden';
  tester.style.fontFamily = baselineFont;
  tester.style.fontSize = '250px'; // Attach to the DOM and measure the baseline font width

  document.querySelector('body').appendChild(tester);
  var originalWidth = tester.clientWidth; // Update the font family and begin the interval testing

  tester.style.fontFamily = "".concat(fontName, ", ").concat(baselineFont);
  return new Promise(function (resolve, reject) {
    var timeoutHandler = setTimeout(function () {
      finalize();
      reject();
    }, config.timeout || TIMEOUT);
    var intervalHandler = setInterval(testFont, config.interval || INTERVAL);

    function testFont() {
      if (tester.clientWidth != originalWidth) {
        finalize();
        resolve();
      }
    }

    function finalize() {
      clearTimeout(timeoutHandler);
      clearInterval(intervalHandler);
      tester.remove();
    }
  });
};

var _default = promiseFont;
exports.default = _default;

/***/ })
/******/ ])["default"];
});