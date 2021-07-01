webpackHotUpdate("bundle",{

/***/ "./src/app/pages/RecordMgr/ListTable/config.tsx":
/*!******************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListTable/config.tsx ***!
  \******************************************************/
/*! exports provided: listTableConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listTableConfig", function() { return listTableConfig; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");




const Container = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
	width: 100%;
`;
const TextOverflowEllipsis = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
`;
const ContentTdView = (props) => {
  const {value} = props;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextOverflowEllipsis, null, value));
};
const listTableConfig = {
  table(profile) {
    return {
      pagination: false
    };
  },
  columns(profile) {
    return [
      {
        title: "No.",
        dataIndex: "rowIndex",
        width: "5%",
        render(value) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, value || 0);
        }
      },
      {
        title: "ID",
        dataIndex: "id",
        width: "5%",
        render(value) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, value);
        }
      },
      {
        title: "Title",
        dataIndex: "title",
        width: "40%",
        render(value) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, value);
        }
      },
      {
        title: "Content",
        dataIndex: "content",
        width: "30%",
        render(value) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ContentTdView, {
            value
          });
        }
      },
      {
        title: "Action",
        dataIndex: "key",
        width: "20%",
        render(value, itemData, index) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
            type: "link",
            className: "table-op-btn",
            loading: itemData.isLoading,
            style: {paddingLeft: 0, paddingRight: 0},
            onClick: () => {
              profile.handleDeleteItem(itemData);
            }
          }, "[delete]"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            style: {padding: "0 5px"}
          }, "/"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
            to: {pathname: `/record/detail/${itemData.id}`},
            target: "_blank"
          }, "[detail]"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            href: "javascript:alert(1);",
            onClick: (e) => {
              profile.linkDetail(e);
            }
          }, "[detail]"));
        }
      }
    ];
  }
};


/***/ })

})
//# sourceMappingURL=bundle.d89fc58b5cbb07862e8a.hot-update.js.map