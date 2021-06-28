webpackHotUpdate("client",{

/***/ "./src/app/pages/RecordMgr/List/list.tsx":
/*!***********************************************!*\
  !*** ./src/app/pages/RecordMgr/List/list.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

__webpack_require__(/*! antd/lib/modal/style */ "./node_modules/antd/lib/modal/style/index.js");

var _modal = _interopRequireDefault(__webpack_require__(/*! antd/lib/modal */ "./node_modules/antd/lib/modal/index.js"));

__webpack_require__(/*! antd/lib/row/style */ "./node_modules/antd/lib/row/style/index.js");

var _row = _interopRequireDefault(__webpack_require__(/*! antd/lib/row */ "./node_modules/antd/lib/row/index.js"));

__webpack_require__(/*! antd/lib/pagination/style */ "./node_modules/antd/lib/pagination/style/index.js");

var _pagination = _interopRequireDefault(__webpack_require__(/*! antd/lib/pagination */ "./node_modules/antd/lib/pagination/index.js"));

__webpack_require__(/*! antd/lib/message/style */ "./node_modules/antd/lib/message/style/index.js");

var _message2 = _interopRequireDefault(__webpack_require__(/*! antd/lib/message */ "./node_modules/antd/lib/message/index.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

__webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");

var _layout = _interopRequireDefault(__webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _ListTable = _interopRequireDefault(__webpack_require__(/*! ../ListTable */ "./src/app/pages/RecordMgr/ListTable/index.tsx"));

var _ListFilterForm = _interopRequireDefault(__webpack_require__(/*! ../ListFilterForm */ "./src/app/pages/RecordMgr/ListFilterForm/index.tsx"));

var _config = __webpack_require__(/*! ./config */ "./src/app/pages/RecordMgr/List/config.ts");

var actions = _interopRequireWildcard(__webpack_require__(/*! @/store/record/action */ "./src/app/store/record/action.ts"));

var _utils = __webpack_require__(/*! ./utils */ "./src/app/pages/RecordMgr/List/utils.ts");

__webpack_require__(/*! ./index.less */ "./src/app/pages/RecordMgr/List/index.less");

var _utils2 = __webpack_require__(/*! @/utils/utils */ "./src/app/utils/utils.ts");

var _config2 = __webpack_require__(/*! @/store/record/config */ "./src/app/store/record/config.ts");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Content = _layout.default.Content;

function RecordList(props) {
  console.log("RecordList.props \u2764\u2764\u2764", props);
  var g_RENDER_WAY = props.g_RENDER_WAY,
      list = props.list,
      countTotal = props.countTotal,
      location = props.location,
      history = props.history,
      deleteItemsRequestAction = props.deleteItemsRequestAction,
      handleToggleRowSelectAction = props.handleToggleRowSelectAction,
      fetchListRequestAction = props.fetchListRequestAction,
      addItemRequestAction = props.addItemRequestAction;

  var _useState = (0, _react.useState)(_config.basePageConfig),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      pageConfig = _useState2[0],
      setPageConfig = _useState2[1];

  var _useState3 = (0, _react.useState)(_config.baseFormConfig),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      formConfig = _useState4[0],
      setFormConfig = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      tableLoading = _useState6[0],
      setTableLoading = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isDeleteModalVisible = _useState8[0],
      setIsDeleteModelVisible = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      deleteModalTargetTitle = _useState10[0],
      setDeleteModalTargetTitle = _useState10[1];
  /* ... */


  var pageConfigReference = (0, _react.useRef)(null);
  pageConfigReference.current = pageConfig;
  var formConfigReference = (0, _react.useRef)(null);
  formConfigReference.current = formConfig;
  var propsListReference = (0, _react.useRef)(null);
  propsListReference.current = list;
  var handleSearch = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            history.push({
              pathname: location.pathname,
              search: (0, _utils.createSearchString)(1, +pageConfigReference.current.pageSize, formConfigReference.current.keywords)
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), []);
  var handleFresh = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            history.push({
              pathname: location.pathname,
              search: (0, _utils.createSearchString)(+pageConfigReference.current.pageIndex, +pageConfigReference.current.pageSize, formConfigReference.current.keywords)
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), []);
  var handleModifyFormInput = (0, _react.useCallback)(function ($evte) {
    var value = $evte.target.value;
    setFormConfig(function (formConfig) {
      return _objectSpread(_objectSpread({}, formConfig), {}, {
        keywords: value
      });
    });
  }, []);
  var onDialogEditFormClosed = (0, _react.useCallback)(function (hasSubmitedItem) {
    if (hasSubmitedItem) {
      fetchTableData(_objectSpread(_objectSpread({}, pageConfigReference.current), formConfigReference.current));
    }
  }, []);
  var onPaginationChange = (0, _react.useCallback)(function (pageIndex, pageSize) {
    history.push({
      pathname: location.pathname,
      search: (0, _utils.createSearchString)(pageIndex, +(pageSize || _config.basePageConfig.pageSize), formConfigReference.current.keywords)
    });
  }, []);
  var fetchTableData = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(params) {
      var res, _countTotal;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setTableLoading(true);
              _context3.prev = 1;
              _context3.next = 4;
              return fetchListRequestAction(params);

            case 4:
              res = _context3.sent;
              _countTotal = typeof res.data.countTotal !== 'undefined' ? res.data.countTotal : pageConfig.countTotal;
              setPageConfig(function (pageConfig) {
                return _objectSpread(_objectSpread({}, pageConfig), {}, {
                  countTotal: _countTotal
                });
              });
              setTableLoading(false);
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);

              _message2.default.error(_context3.t0.msg);

              setTableLoading(false);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 10]]);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), []);
  var deleteRowData = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var selectedIdList, res;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            selectedIdList = propsListReference.current.filter(function (item, index) {
              return item.isChcked;
            }).map(function (item, index) {
              return item.id;
            });
            _context4.prev = 1;
            _context4.next = 4;
            return deleteItemsRequestAction(selectedIdList);

          case 4:
            res = _context4.sent;

            _message2.default.success("Deleted Success");

            setIsDeleteModelVisible(false);
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);

            _message2.default.error(_context4.t0.msg);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  })), []);
  var handleDeleteItem = (0, _react.useCallback)(function (itemData) {
    handleToggleRowSelectAction([itemData.key]);
    setIsDeleteModelVisible(true);
  }, []);
  (0, _react.useEffect)(function () {
    console.log("RecordList.location @@@", props);
    var pageIndex = +(0, _utils2.getQueryValueOfUrl)('pageIndex') || pageConfig.pageIndex;
    var pageSize = +(0, _utils2.getQueryValueOfUrl)('pageSize') || pageConfig.pageSize;
    var keywords = decodeURI((0, _utils2.getQueryValueOfUrl)('keywords') || '');
    setPageConfig(_objectSpread(_objectSpread({}, pageConfig), {}, {
      pageSize: pageSize,
      pageIndex: pageIndex,
      countTotal: countTotal
    }));
    setFormConfig(_objectSpread(_objectSpread({}, formConfig), {}, {
      keywords: keywords
    }));
    fetchTableData({
      pageIndex: pageIndex,
      pageSize: pageSize,
      keywords: keywords
    });
  }, [location]);
  (0, _react.useEffect)(function () {
    if (!isDeleteModalVisible) {
      return;
    }

    var selectedList = list.filter(function (item, index) {
      return item.isChcked;
    });
    setDeleteModalTargetTitle(selectedList.length ? selectedList[0].title : '');
  }, [isDeleteModalVisible]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("section", {
    className: "list-container"
  }, /*#__PURE__*/_react.default.createElement("section", {
    className: "list-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "list-header"
  }, /*#__PURE__*/_react.default.createElement(_ListFilterForm.default, {
    onDialogEditFormClosed: onDialogEditFormClosed,
    handleAddItem: addItemRequestAction,
    keywordsValue: formConfig.keywords,
    handleKeywordsEnterAction: handleSearch,
    handleKeywordsChangeAction: handleModifyFormInput,
    handleRefreshAction: handleFresh
  })), /*#__PURE__*/_react.default.createElement(Content, null, /*#__PURE__*/_react.default.createElement(_ListTable.default, {
    handleDeleteItem: handleDeleteItem,
    handleToggleRowSelect: handleToggleRowSelectAction,
    loading: tableLoading,
    list: list
  })), /*#__PURE__*/_react.default.createElement(_row.default, {
    className: "pagination-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_pagination.default, {
    size: "small",
    total: pageConfig.countTotal,
    current: pageConfig.pageIndex,
    pageSize: pageConfig.pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: onPaginationChange
  })), /*#__PURE__*/_react.default.createElement(_row.default, {
    className: "total-count-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", null, "Total Count: ", countTotal)))), /*#__PURE__*/_react.default.createElement(_modal.default, {
    title: "Modal",
    visible: isDeleteModalVisible,
    onOk: deleteRowData,
    onCancel: function onCancel() {
      setIsDeleteModelVisible(false);
    }
  }, /*#__PURE__*/_react.default.createElement("p", null, "Are you sure you want to delete ", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: '#ff0000'
    }
  }, deleteModalTargetTitle), " ?")));
}

var _default = (0, _reactRedux.connect)(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ownProps = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, ownProps), state[_config2.REDUCER_RECORD_REDUCER]);
}, _objectSpread({}, actions))(RecordList);

exports.default = _default;

/***/ })

})
//# sourceMappingURL=client.1fca41be8eeaa3289af8.hot-update.js.map