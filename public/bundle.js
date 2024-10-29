/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/index.js":
/*!*************************!*\
  !*** ./public/index.js ***!
  \*************************/
/***/ (() => {

eval("console.log('Hello, Progressive Web App!');\r\n\r\nif ('serviceWorker' in navigator) {\r\n    window.addEventListener('load', () => {\r\n      navigator.serviceWorker\r\n        .register('/service-worker.js') // Remplacez par le chemin de votre fichier service worker\r\n        .then(registration => {\r\n          console.log('Service Worker enregistré avec succès:', registration);\r\n        })\r\n        .catch(error => {\r\n          console.error('Échec de l\\'enregistrement du Service Worker:', error);\r\n        });\r\n    });\r\n  }\n\n//# sourceURL=webpack://tp/./public/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/index.js"]();
/******/ 	
/******/ })()
;