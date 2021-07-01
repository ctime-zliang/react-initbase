exports.id = "server";
exports.modules = {

/***/ "./src/app/pages/RecordMgr/Detail/detail.tsx":
/*!***************************************************!*\
  !*** ./src/app/pages/RecordMgr/Detail/detail.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _store_record_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/record/config */ \"./src/app/store/record/config.ts\");\n/* harmony import */ var _store_record_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/store/record/action */ \"./src/app/store/record/action.ts\");\n/* harmony import */ var _pages_RecordMgr_EditForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/pages/RecordMgr/EditForm */ \"./src/app/pages/RecordMgr/EditForm/index.tsx\");\n/* harmony import */ var _EditForm_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../EditForm/config */ \"./src/app/pages/RecordMgr/EditForm/config.ts\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.less */ \"./src/app/pages/RecordMgr/Detail/index.less\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/utils */ \"./src/app/utils/utils.ts\");\nvar __defProp = Object.defineProperty;\nvar __getOwnPropSymbols = Object.getOwnPropertySymbols;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __propIsEnum = Object.prototype.propertyIsEnumerable;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;\nvar __spreadValues = (a, b) => {\n  for (var prop in b || (b = {}))\n    if (__hasOwnProp.call(b, prop))\n      __defNormalProp(a, prop, b[prop]);\n  if (__getOwnPropSymbols)\n    for (var prop of __getOwnPropSymbols(b)) {\n      if (__propIsEnum.call(b, prop))\n        __defNormalProp(a, prop, b[prop]);\n    }\n  return a;\n};\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\n\n\n\n\n\n\n\n\n\nconst filterFormData = (paramsFormData) => {\n  const copyFormData = JSON.parse(JSON.stringify(paramsFormData));\n  Object.keys(_EditForm_config__WEBPACK_IMPORTED_MODULE_6__[\"baseEditFormDataConfig\"]).forEach((item, index) => {\n    copyFormData[item] = paramsFormData[item];\n  });\n  return copyFormData;\n};\nfunction RecordDetailRoot(props) {\n  const {match, history, fetchItemRequestAction, updateItemRequestAction} = props;\n  const [formData, setFormData] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(_EditForm_config__WEBPACK_IMPORTED_MODULE_6__[\"baseEditFormDataConfig\"]);\n  const [isExists, setIsExists] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(true);\n  const [isSpinShow, setIsSpanShow] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(true);\n  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(true);\n  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const [errMessage, setErrMessage] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(``);\n  const [itemId, setItemId] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);\n  const handleUpdateFormData = (paramsFormData) => {\n    setFormData(__spreadValues({}, filterFormData(paramsFormData)));\n  };\n  const updateFormData = (paramsFormData) => {\n    setFormData(filterFormData(paramsFormData));\n  };\n  const fetchItemData = (id) => __async(this, null, function* () {\n    try {\n      setIsExists(true);\n      setIsSpanShow(true);\n      const res = yield fetchItemRequestAction(id);\n      handleUpdateFormData(res.data);\n      setIsSpanShow(false);\n      setIsSubmitBtnDisabled(false);\n    } catch (error) {\n      setIsExists(false);\n      setIsSpanShow(false);\n      antd__WEBPACK_IMPORTED_MODULE_2__[\"message\"].error(error.msg);\n      setErrMessage(error.msg);\n    }\n  });\n  const submitItemData = () => __async(this, null, function* () {\n    try {\n      setIsSubmitBtnLoading(true);\n      const res = yield updateItemRequestAction(itemId, formData);\n      setIsSubmitBtnLoading(false);\n      antd__WEBPACK_IMPORTED_MODULE_2__[\"message\"].success(`Updated Success`);\n      window.setTimeout(() => {\n        const pageIndex = +Object(_utils_utils__WEBPACK_IMPORTED_MODULE_8__[\"getQueryValueOfUrl\"])(\"pi\");\n        const pageSize = +Object(_utils_utils__WEBPACK_IMPORTED_MODULE_8__[\"getQueryValueOfUrl\"])(\"ps\");\n        const keywords = decodeURI(Object(_utils_utils__WEBPACK_IMPORTED_MODULE_8__[\"getQueryValueOfUrl\"])(\"wd\") || \"\");\n        let str = ``;\n        let hasFlag = false;\n        if (pageIndex) {\n          str += `?pageIndex=${pageIndex}`;\n          hasFlag = true;\n        }\n        if (pageSize) {\n          str += `${hasFlag ? \"&\" : \"?\"}pageSize=${pageSize}`;\n          hasFlag = true;\n        }\n        if (keywords) {\n          str += `${hasFlag ? \"&\" : \"?\"}keywords=${keywords}`;\n          hasFlag = true;\n        }\n        debugger;\n        history.push({pathname: \"/record\" + str});\n      });\n    } catch (error) {\n      antd__WEBPACK_IMPORTED_MODULE_2__[\"message\"].error(error.msg);\n      setIsSubmitBtnLoading(false);\n    }\n  });\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const urlParams = match.params;\n    if (urlParams && urlParams.id) {\n      setItemId(urlParams.id);\n      fetchItemData(urlParams.id);\n      return;\n    }\n    setIsSubmitBtnDisabled(false);\n  }, []);\n  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"detail-container\"\n  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: [\"error-wrapper\", !isExists ? \"error-wrapper-show\" : \"\"].join(\" \")\n  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__[\"Alert\"], {\n    message: errMessage,\n    type: \"error\"\n  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_RecordMgr_EditForm__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    formData,\n    updateFormData\n  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__[\"Spin\"], {\n    className: [\"detail-spin\", isSpinShow ? \"detail-spin-show\" : \"\"].join(\" \")\n  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"submit-wrapper\"\n  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n    type: \"primary\",\n    disabled: isSubmitBtnDisabled,\n    loading: isSubmitBtnLoading,\n    onClick: submitItemData\n  }, \"Submit\"))));\n}\nRecordDetailRoot.defaultProps = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])((state = {}, ownProps) => {\n  return __spreadValues(__spreadValues({}, ownProps), state[_store_record_config__WEBPACK_IMPORTED_MODULE_3__[\"REDUCER_RECORD_REDUCER\"]]);\n}, __spreadValues({}, _store_record_action__WEBPACK_IMPORTED_MODULE_4__))(RecordDetailRoot));\n\n\n//# sourceURL=webpack:///./src/app/pages/RecordMgr/Detail/detail.tsx?");

/***/ })

};