webpackHotUpdate("client",{

/***/ "./src/app/pages/RecordMgr/Detail/detail.tsx":
/*!***************************************************!*\
  !*** ./src/app/pages/RecordMgr/Detail/detail.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _store_record_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/record/config */ "./src/app/store/record/config.ts");
/* harmony import */ var _store_record_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/store/record/action */ "./src/app/store/record/action.ts");
/* harmony import */ var _pages_RecordMgr_EditForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/pages/RecordMgr/EditForm */ "./src/app/pages/RecordMgr/EditForm/index.tsx");
/* harmony import */ var _EditForm_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../EditForm/config */ "./src/app/pages/RecordMgr/EditForm/config.ts");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.less */ "./src/app/pages/RecordMgr/Detail/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/utils */ "./src/app/utils/utils.ts");
var __defProp = Object.defineProperty;
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};










const filterFormData = (paramsFormData) => {
  const copyFormData = JSON.parse(JSON.stringify(paramsFormData));
  Object.keys(_EditForm_config__WEBPACK_IMPORTED_MODULE_6__["baseEditFormDataConfig"]).forEach((item, index) => {
    copyFormData[item] = paramsFormData[item];
  });
  return copyFormData;
};
function RecordDetailRoot(props) {
  const {match, history, fetchItemRequestAction, updateItemRequestAction} = props;
  const [formData, setFormData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_EditForm_config__WEBPACK_IMPORTED_MODULE_6__["baseEditFormDataConfig"]);
  const [isExists, setIsExists] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [isSpinShow, setIsSpanShow] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [errMessage, setErrMessage] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(``);
  const [itemId, setItemId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const handleUpdateFormData = (paramsFormData) => {
    setFormData(__spreadValues({}, filterFormData(paramsFormData)));
  };
  const updateFormData = (paramsFormData) => {
    setFormData(filterFormData(paramsFormData));
  };
  const fetchItemData = (id) => __async(this, null, function* () {
    try {
      setIsExists(true);
      setIsSpanShow(true);
      const res = yield fetchItemRequestAction(id);
      handleUpdateFormData(res.data);
      setIsSpanShow(false);
      setIsSubmitBtnDisabled(false);
    } catch (error) {
      setIsExists(false);
      setIsSpanShow(false);
      antd__WEBPACK_IMPORTED_MODULE_2__["message"].error(error.msg);
      setErrMessage(error.msg);
    }
  });
  const submitItemData = () => __async(this, null, function* () {
    try {
      setIsSubmitBtnLoading(true);
      const res = yield updateItemRequestAction(itemId, formData);
      setIsSubmitBtnLoading(false);
      antd__WEBPACK_IMPORTED_MODULE_2__["message"].success(`Updated Success`);
      window.setTimeout(() => {
        const pageIndex = +Object(_utils_utils__WEBPACK_IMPORTED_MODULE_8__["getQueryValueOfUrl"])("pi");
        const pageSize = +Object(_utils_utils__WEBPACK_IMPORTED_MODULE_8__["getQueryValueOfUrl"])("ps");
        const keywords = decodeURI(Object(_utils_utils__WEBPACK_IMPORTED_MODULE_8__["getQueryValueOfUrl"])("wd") || "");
        const query = {};
        if (pageIndex) {
          query["pageIndex"] = pageIndex;
        }
        if (pageSize) {
          query["pageSize"] = pageSize;
        }
        if (keywords) {
          query["keywords"] = keywords;
        }
        const pm = {
          pathname: "/record",
          query
        };
        console.log(pm);
        history.push(pm);
      });
    } catch (error) {
      antd__WEBPACK_IMPORTED_MODULE_2__["message"].error(error.msg);
      setIsSubmitBtnLoading(false);
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const urlParams = match.params;
    if (urlParams && urlParams.id) {
      setItemId(urlParams.id);
      fetchItemData(urlParams.id);
      return;
    }
    setIsSubmitBtnDisabled(false);
  }, []);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "detail-container"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ["error-wrapper", !isExists ? "error-wrapper-show" : ""].join(" ")
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
    message: errMessage,
    type: "error"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_RecordMgr_EditForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
    formData,
    updateFormData
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Spin"], {
    className: ["detail-spin", isSpinShow ? "detail-spin-show" : ""].join(" ")
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "submit-wrapper"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    type: "primary",
    disabled: isSubmitBtnDisabled,
    loading: isSubmitBtnLoading,
    onClick: submitItemData
  }, "Submit"))));
}
RecordDetailRoot.defaultProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])((state = {}, ownProps) => {
  return __spreadValues(__spreadValues({}, ownProps), state[_store_record_config__WEBPACK_IMPORTED_MODULE_3__["REDUCER_RECORD_REDUCER"]]);
}, __spreadValues({}, _store_record_action__WEBPACK_IMPORTED_MODULE_4__))(RecordDetailRoot));


/***/ })

})
//# sourceMappingURL=client.0765cd56ce022f45da56.hot-update.js.map