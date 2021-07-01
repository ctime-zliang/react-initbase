exports.id = "server";
exports.modules = {

/***/ "./src/app/pages/RecordMgr/ListTable/index.tsx":
/*!*****************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListTable/index.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ \"./src/app/pages/RecordMgr/ListTable/config.tsx\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/utils */ \"./src/app/utils/utils.ts\");\nvar __defProp = Object.defineProperty;\nvar __defProps = Object.defineProperties;\nvar __getOwnPropDescs = Object.getOwnPropertyDescriptors;\nvar __getOwnPropSymbols = Object.getOwnPropertySymbols;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __propIsEnum = Object.prototype.propertyIsEnumerable;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;\nvar __spreadValues = (a, b) => {\n  for (var prop in b || (b = {}))\n    if (__hasOwnProp.call(b, prop))\n      __defNormalProp(a, prop, b[prop]);\n  if (__getOwnPropSymbols)\n    for (var prop of __getOwnPropSymbols(b)) {\n      if (__propIsEnum.call(b, prop))\n        __defNormalProp(a, prop, b[prop]);\n    }\n  return a;\n};\nvar __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));\n\n\n\n\nconst LocalConfig = {\n  isSettedConfig: false,\n  listTableConfig: {}\n};\nfunction ListTableRoot(props) {\n  const {list, loading, handleToggleRowSelect} = props;\n  const [selectedRowKeysList, setSelectedRowKeysList] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const linkDetail = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])((e, itemData) => {\n    e.preventDefault();\n    const event = new Event(\"click\", {bubbles: true});\n    const pageIndex = +Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__[\"getQueryValueOfUrl\"])(\"pageIndex\");\n    const pageSize = +Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__[\"getQueryValueOfUrl\"])(\"pageSize\");\n    const keywords = decodeURI(Object(_utils_utils__WEBPACK_IMPORTED_MODULE_3__[\"getQueryValueOfUrl\"])(\"keywords\") || \"\");\n    let str = `?from=list`;\n    let hasFlag = false;\n    if (pageIndex) {\n      hasFlag = true;\n      str += `&pi=${pageIndex}`;\n    }\n    if (pageSize) {\n      hasFlag = true;\n      str += `&ps=${pageSize}`;\n    }\n    if (keywords) {\n      hasFlag = true;\n      str += `&k=${keywords}`;\n    }\n    if (!hasFlag) {\n      str = ``;\n    }\n    const url = `/record/detail/${itemData.id}${str}`;\n    console.log(url);\n    const fragment = document.createRange().createContextualFragment(`<a href=\"${url}\" target=\"_blank\">-</a>`);\n    const aElement = fragment.querySelector(\"a\");\n    console.log(aElement);\n    aElement && aElement.dispatchEvent(event);\n  }, []);\n  if (!LocalConfig.isSettedConfig) {\n    LocalConfig.isSettedConfig = true;\n    LocalConfig.listTableConfig.columns = _config__WEBPACK_IMPORTED_MODULE_2__[\"listTableConfig\"].columns(__spreadProps(__spreadValues({}, props), {linkDetail}));\n    LocalConfig.listTableConfig.table = _config__WEBPACK_IMPORTED_MODULE_2__[\"listTableConfig\"].table({});\n  }\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const selectedList = list.filter((item, index) => {\n      return item.isChcked && typeof item.key != \"undefined\" && item.key != \"\";\n    }).map((item, index) => {\n      return item.key || \"\";\n    });\n    setSelectedRowKeysList(selectedList);\n  }, [list]);\n  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Table\"], __spreadProps(__spreadValues({\n    columns: LocalConfig.listTableConfig.columns,\n    dataSource: list,\n    size: \"small\",\n    loading\n  }, LocalConfig.listTableConfig.table), {\n    rowSelection: {\n      selectedRowKeys: selectedRowKeysList,\n      onChange: handleToggleRowSelect\n    }\n  })));\n}\nListTableRoot.defaultProps = {\n  list: [],\n  loading: true\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(ListTableRoot));\n\n\n//# sourceURL=webpack:///./src/app/pages/RecordMgr/ListTable/index.tsx?");

/***/ })

};