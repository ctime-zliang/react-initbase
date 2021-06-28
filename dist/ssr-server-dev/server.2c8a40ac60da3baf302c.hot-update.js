exports.id = "server";
exports.modules = {

/***/ "./src/server/router/api/main.ts":
/*!***************************************!*\
  !*** ./src/server/router/api/main.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"@babel/runtime/helpers/interopRequireDefault\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _main = _interopRequireDefault(__webpack_require__(/*! ../../app/controller/main */ \"./src/server/app/controller/main.ts\"));\n\nvar prefixUrl = \"/api\";\nvar _default = [{\n  desc: '测试 API',\n  method: 'GET',\n  path: \"\".concat(prefixUrl, \"/rtest\"),\n  action: _main.default.invokeAction('rtest')\n}];\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/server/router/api/main.ts?");

/***/ })

};