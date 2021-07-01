webpackHotUpdate("client",{

/***/ "./src/app/pages/RecordMgr/ListTable/index.tsx":
/*!*****************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListTable/index.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/app/pages/RecordMgr/ListTable/config.tsx");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));



const LocalConfig = {
  isSettedConfig: false,
  listTableConfig: {}
};
function ListTableRoot(props) {
  const {list, loading, handleToggleRowSelect} = props;
  const [selectedRowKeysList, setSelectedRowKeysList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const linkDetail = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((e) => {
    console.log(e);
  }, []);
  if (!LocalConfig.isSettedConfig) {
    LocalConfig.isSettedConfig = true;
    LocalConfig.listTableConfig.columns = _config__WEBPACK_IMPORTED_MODULE_2__["listTableConfig"].columns(__spreadProps(__spreadValues({}, props), {linkDetail}));
    LocalConfig.listTableConfig.table = _config__WEBPACK_IMPORTED_MODULE_2__["listTableConfig"].table({});
  }
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const selectedList = list.filter((item, index) => {
      return item.isChcked && typeof item.key != "undefined" && item.key != "";
    }).map((item, index) => {
      return item.key || "";
    });
    setSelectedRowKeysList(selectedList);
  }, [list]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Table"], __spreadProps(__spreadValues({
    columns: LocalConfig.listTableConfig.columns,
    dataSource: list,
    size: "small",
    loading
  }, LocalConfig.listTableConfig.table), {
    rowSelection: {
      selectedRowKeys: selectedRowKeysList,
      onChange: handleToggleRowSelect
    }
  })));
}
ListTableRoot.defaultProps = {
  list: [],
  loading: true
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(ListTableRoot));


/***/ })

})
//# sourceMappingURL=client.2c5a5da7b128211e77d2.hot-update.js.map