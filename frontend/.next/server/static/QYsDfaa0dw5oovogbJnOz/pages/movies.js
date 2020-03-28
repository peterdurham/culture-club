module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export endpoint */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return prodEndpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return perPage; });
// This is client side config only - don't put anything in here that shouldn't be public!
var endpoint = "http://localhost:4444";
var prodEndpoint = "https://culture-club-yoga-prod.herokuapp.com/";
var perPage = 16;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CURRENT_USER_QUERY; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query {\n    me {\n      id\n      email\n      name\n      permissions\n      cart {\n        id\n        quantity\n        item {\n          id\n          price\n          image\n          title\n          description\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var CURRENT_USER_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(_templateObject());

var User = function User(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Query"], _extends({}, props, {
    query: CURRENT_USER_QUERY
  }), function (payload) {
    return props.children(payload);
  });
};

/* harmony default export */ __webpack_exports__["b"] = (User);


/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (amount) {
  var options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }; // if its a whole, dollar amount, leave off the .00

  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  var formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

var PriceTag = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.span.withConfig({
  displayName: "PriceTag",
  componentId: "nwbk6t-0"
})(["background:", ";transform:rotate(3deg);color:white;font-weight:600;padding:5px;line-height:1;font-size:3rem;display:inline-block;position:absolute;top:-3px;right:-3px;"], function (props) {
  return props.theme.red;
});
/* harmony default export */ __webpack_exports__["a"] = (PriceTag);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

var PaginationStyles = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({
  displayName: "PaginationStyles",
  componentId: "aduuar-0"
})(["text-align:center;display:inline-grid;grid-template-columns:repeat(4,auto);align-items:stretch;justify-content:center;align-content:center;margin:2rem 0;border:1px solid ", ";border-radius:10px;& > *{margin:0;padding:15px 30px;border-right:1px solid ", ";&:last-child{border-right:0;}}a[aria-disabled='true']{color:grey;pointer-events:none;}"], function (props) {
  return props.theme.lightgrey;
}, function (props) {
  return props.theme.lightgrey;
});
/* harmony default export */ __webpack_exports__["a"] = (PaginationStyles);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation addToCart($id: ID!) {\n    addToCart(id: $id) {\n      id\n      quantity\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var ADD_TO_CART_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(_templateObject());

var AddToCart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddToCart, _React$Component);

  function AddToCart() {
    _classCallCheck(this, AddToCart);

    return _possibleConstructorReturn(this, _getPrototypeOf(AddToCart).apply(this, arguments));
  }

  _createClass(AddToCart, [{
    key: "render",
    value: function render() {
      var id = this.props.id;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Mutation"], {
        mutation: ADD_TO_CART_MUTATION,
        variables: {
          id: id
        },
        refetchQueries: [{
          query: _User__WEBPACK_IMPORTED_MODULE_3__[/* CURRENT_USER_QUERY */ "a"]
        }]
      }, function (addToCart, _ref) {
        var error = _ref.error,
            loading = _ref.loading;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          onClick: addToCart,
          disabled: loading
        }, "Add", loading && "ing", " To Cart \uD83D\uDED2");
      });
    }
  }]);

  return AddToCart;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (AddToCart);

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-apollo"
var external_react_apollo_ = __webpack_require__(2);

// EXTERNAL MODULE: external "graphql-tag"
var external_graphql_tag_ = __webpack_require__(3);
var external_graphql_tag_default = /*#__PURE__*/__webpack_require__.n(external_graphql_tag_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(1);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(7);

// EXTERNAL MODULE: external "next/link"
var link_ = __webpack_require__(4);
var link_default = /*#__PURE__*/__webpack_require__.n(link_);

// EXTERNAL MODULE: ./components/styles/PriceTag.js
var PriceTag = __webpack_require__(13);

// EXTERNAL MODULE: ./lib/formatMoney.js
var formatMoney = __webpack_require__(12);

// CONCATENATED MODULE: ./components/DeleteMovie.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation DELETE_MOVIE_MUTATION($id: ID!) {\n    deleteMovie(id: $id) {\n      id\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var DELETE_MOVIE_MUTATION = external_graphql_tag_default()(_templateObject());

var DeleteMovie_DeleteMovie =
/*#__PURE__*/
function (_Component) {
  _inherits(DeleteMovie, _Component);

  function DeleteMovie() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DeleteMovie);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DeleteMovie)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "update", function (cache, payload) {
      // manually update the cache on the client, so it matches the server
      // 1. Read the cache for the items we want
      var data = cache.readQuery({
        query: ALL_MOVIES_QUERY
      });
      console.log(data, payload); // 2. Filter the deleted item out of the page

      data.movies = data.movies.filter(function (movie) {
        return movie.id !== payload.data.deleteMovie.id;
      }); // 3. Put the items back!

      cache.writeQuery({
        query: ALL_MOVIES_QUERY,
        data: data
      });
    });

    return _this;
  }

  _createClass(DeleteMovie, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return external_react_default.a.createElement(external_react_apollo_["Mutation"], {
        mutation: DELETE_MOVIE_MUTATION,
        variables: {
          id: this.props.id
        },
        update: this.update
      }, function (deleteMovie, _ref) {
        var error = _ref.error;
        return external_react_default.a.createElement("button", {
          onClick: function onClick() {
            if (confirm("Are you sure you want to delete this Movie?")) {
              deleteMovie().catch(function (err) {
                alert(err.message);
              });
            }
          }
        }, _this2.props.children);
      });
    }
  }]);

  return DeleteMovie;
}(external_react_["Component"]);

/* harmony default export */ var components_DeleteMovie = (DeleteMovie_DeleteMovie);
// EXTERNAL MODULE: ./components/AddToCart.js
var AddToCart = __webpack_require__(15);

// CONCATENATED MODULE: ./components/Movie.js
function Movie_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Movie_typeof = function _typeof(obj) { return typeof obj; }; } else { Movie_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Movie_typeof(obj); }

function Movie_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Movie_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Movie_createClass(Constructor, protoProps, staticProps) { if (protoProps) Movie_defineProperties(Constructor.prototype, protoProps); if (staticProps) Movie_defineProperties(Constructor, staticProps); return Constructor; }

function Movie_possibleConstructorReturn(self, call) { if (call && (Movie_typeof(call) === "object" || typeof call === "function")) { return call; } return Movie_assertThisInitialized(self); }

function Movie_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Movie_getPrototypeOf(o) { Movie_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Movie_getPrototypeOf(o); }

function Movie_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Movie_setPrototypeOf(subClass, superClass); }

function Movie_setPrototypeOf(o, p) { Movie_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Movie_setPrototypeOf(o, p); }









var MovieStyles = external_styled_components_default.a.div.withConfig({
  displayName: "Movie__MovieStyles",
  componentId: "sc-14kuc9l-0"
})(["background:white;border:1px solid ", ";box-shadow:", ";position:relative;display:flex;flex-direction:column;img{width:100%;height:300px;object-fit:cover;}p{line-height:2;font-weight:300;flex-grow:1;padding:0 1rem;font-size:1.5rem;}.buttonList{display:grid;width:100%;border-top:1px solid ", ";grid-template-columns:repeat(auto-fit,minmax(100px,1fr));grid-gap:1px;background:", ";& > *{background:white;border:0;font-size:1rem;padding:1rem;}}"], function (props) {
  return props.theme.offWhite;
}, function (props) {
  return props.theme.bs;
}, function (props) {
  return props.theme.lightgrey;
}, function (props) {
  return props.theme.lightgrey;
});
var Title = external_styled_components_default.a.h3.withConfig({
  displayName: "Movie__Title",
  componentId: "sc-14kuc9l-1"
})(["margin:0 1rem;text-align:center;transform:skew(-5deg) rotate(-1deg);margin-top:-3rem;text-shadow:2px 2px 0 rgba(0,0,0,0.1);a{background:", ";display:inline;line-height:1.3;font-size:2rem;text-align:center;color:white;padding:0 1rem;}"], function (props) {
  return props.theme.red;
});

var Movie_Movie =
/*#__PURE__*/
function (_Component) {
  Movie_inherits(Movie, _Component);

  function Movie() {
    Movie_classCallCheck(this, Movie);

    return Movie_possibleConstructorReturn(this, Movie_getPrototypeOf(Movie).apply(this, arguments));
  }

  Movie_createClass(Movie, [{
    key: "render",
    value: function render() {
      var movie = this.props.movie;
      return external_react_default.a.createElement(MovieStyles, null, movie.image && external_react_default.a.createElement("img", {
        src: movie.image,
        alt: movie.title
      }), external_react_default.a.createElement(Title, null, external_react_default.a.createElement(link_default.a, {
        href: {
          pathname: "/movie",
          query: {
            id: movie.id
          }
        }
      }, external_react_default.a.createElement("a", null, movie.title))), external_react_default.a.createElement(PriceTag["a" /* default */], null, movie.year), external_react_default.a.createElement("p", null, movie.description), external_react_default.a.createElement("div", {
        className: "buttonList"
      }, external_react_default.a.createElement(link_default.a, {
        href: {
          pathname: "update",
          query: {
            id: movie.id
          }
        }
      }, external_react_default.a.createElement("a", null, "Edit \u270F\uFE0F")), external_react_default.a.createElement(AddToCart["a" /* default */], {
        id: movie.id
      }), external_react_default.a.createElement(components_DeleteMovie, {
        id: movie.id
      }, "Delete This Movie")));
    }
  }]);

  return Movie;
}(external_react_["Component"]);


// CONCATENATED MODULE: ./components/MovieCard.js








var CardStyles = external_styled_components_default.a.div.withConfig({
  displayName: "MovieCard__CardStyles",
  componentId: "sc-148vt5q-0"
})(["height:385px;width:200px;box-shadow:0 2px 8px rgba(0,0,0,0.1);border:1px solid rgb(222,222,222);h2{font-size:16px;margin:0;}img{width:100%;height:300px;object-fit:cover;}"]);
var MovieDetails = external_styled_components_default.a.a.withConfig({
  displayName: "MovieCard__MovieDetails",
  componentId: "sc-148vt5q-1"
})(["text-align:left;padding:12px;h2{font-size:14px;line-height:22.4px;font-weight:400;margin:0 10px;cursor:pointer;}h3{font-size:14.4px;line-height:24.68px;font-weight:400;margin:0 10px;}"]);

var MovieCard_MovieCard = function MovieCard(_ref) {
  var movie = _ref.movie;
  console.log(movie);
  return external_react_default.a.createElement(CardStyles, null, external_react_default.a.createElement(link_default.a, {
    href: {
      pathname: "/movie",
      query: {
        id: movie.id
      }
    }
  }, external_react_default.a.createElement("a", null, movie.image && external_react_default.a.createElement("img", {
    src: movie.image,
    alt: "movie poster"
  }))), external_react_default.a.createElement(MovieDetails, null, external_react_default.a.createElement(link_default.a, {
    href: {
      pathname: "/movie",
      query: {
        id: movie.id
      }
    }
  }, external_react_default.a.createElement("h2", null, movie.title)), external_react_default.a.createElement("h3", null, movie.year)));
};

/* harmony default export */ var components_MovieCard = (MovieCard_MovieCard);
// EXTERNAL MODULE: ./components/styles/PaginationStyles.js
var PaginationStyles = __webpack_require__(14);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(10);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: ./config.js
var config = __webpack_require__(5);

// CONCATENATED MODULE: ./components/PaginationMovies.js
function PaginationMovies_templateObject() {
  var data = PaginationMovies_taggedTemplateLiteral(["\n  query PAGINATION_QUERY {\n    moviesConnection {\n      aggregate {\n        count\n      }\n    }\n  }\n"]);

  PaginationMovies_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function PaginationMovies_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var PAGINATION_QUERY = external_graphql_tag_default()(PaginationMovies_templateObject());

var PaginationMovies_Pagination = function Pagination(props) {
  return external_react_default.a.createElement(external_react_apollo_["Query"], {
    query: PAGINATION_QUERY
  }, function (_ref) {
    var data = _ref.data,
        loading = _ref.loading,
        error = _ref.error;
    if (loading) return external_react_default.a.createElement("p", null, "Loading...");
    var count = data.moviesConnection.aggregate.count;
    var pages = Math.ceil(count / config["a" /* perPage */]);
    var page = props.page;
    return external_react_default.a.createElement(PaginationStyles["a" /* default */], null, external_react_default.a.createElement(head_default.a, null, external_react_default.a.createElement("title", null, "Culture Club! - Page ", page, " of ", pages, " ")), external_react_default.a.createElement(link_default.a, {
      prefetch: true,
      href: {
        pathname: "movies",
        query: {
          page: page - 1
        }
      }
    }, external_react_default.a.createElement("a", {
      className: "prev",
      "aria-disabled": page <= 1
    }, "\u2190 Prev")), external_react_default.a.createElement("p", null, "Page ", page, " of ", pages, "!"), external_react_default.a.createElement("p", null, count, " movies total"), external_react_default.a.createElement(link_default.a, {
      prefetch: true,
      href: {
        pathname: "movies",
        query: {
          page: page + 1
        }
      }
    }, external_react_default.a.createElement("a", {
      className: "next",
      "aria-disabled": page >= pages
    }, "\u2192 Next")));
  });
};

/* harmony default export */ var PaginationMovies = (PaginationMovies_Pagination);
// CONCATENATED MODULE: ./components/Movies.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ALL_MOVIES_QUERY; });
function Movies_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Movies_typeof = function _typeof(obj) { return typeof obj; }; } else { Movies_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Movies_typeof(obj); }

function Movies_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Movies_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Movies_createClass(Constructor, protoProps, staticProps) { if (protoProps) Movies_defineProperties(Constructor.prototype, protoProps); if (staticProps) Movies_defineProperties(Constructor, staticProps); return Constructor; }

function Movies_possibleConstructorReturn(self, call) { if (call && (Movies_typeof(call) === "object" || typeof call === "function")) { return call; } return Movies_assertThisInitialized(self); }

function Movies_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Movies_getPrototypeOf(o) { Movies_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Movies_getPrototypeOf(o); }

function Movies_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Movies_setPrototypeOf(subClass, superClass); }

function Movies_setPrototypeOf(o, p) { Movies_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Movies_setPrototypeOf(o, p); }

function Movies_templateObject() {
  var data = Movies_taggedTemplateLiteral(["\n  query ALL_MOVIES_QUERY($skip: Int = 0, $first: Int = ", ") {\n    movies(first: $first, skip: $skip, orderBy: title_DESC) {\n      id\n      title\n      year\n      description\n      image\n      largeImage\n    }\n  }\n"]);

  Movies_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Movies_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var ALL_MOVIES_QUERY = external_graphql_tag_default()(Movies_templateObject(), config["a" /* perPage */]);
var Center = external_styled_components_default.a.div.withConfig({
  displayName: "Movies__Center",
  componentId: "sc-18npa9c-0"
})(["text-align:center;"]);
var MoviesList = external_styled_components_default.a.div.withConfig({
  displayName: "Movies__MoviesList",
  componentId: "sc-18npa9c-1"
})(["display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;grid-gap:10px;max-width:", ";margin:40px auto 100px auto;"], function (props) {
  return props.theme.maxWidth;
});

var Movies_Movies =
/*#__PURE__*/
function (_Component) {
  Movies_inherits(Movies, _Component);

  function Movies() {
    Movies_classCallCheck(this, Movies);

    return Movies_possibleConstructorReturn(this, Movies_getPrototypeOf(Movies).apply(this, arguments));
  }

  Movies_createClass(Movies, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement(Center, null, external_react_default.a.createElement(PaginationMovies, {
        page: this.props.page
      }), external_react_default.a.createElement(external_react_apollo_["Query"], {
        query: ALL_MOVIES_QUERY // fetchPolicy="network-only"
        ,
        variables: {
          skip: this.props.page * config["a" /* perPage */] - config["a" /* perPage */],
          first: config["a" /* perPage */]
        }
      }, function (_ref) {
        var data = _ref.data,
            error = _ref.error,
            loading = _ref.loading;
        if (loading) return external_react_default.a.createElement("p", null, "Loading...");
        if (error) return external_react_default.a.createElement("p", null, "Error: ", error.message);
        return external_react_default.a.createElement(MoviesList, null, data.movies.map(function (movie) {
          return external_react_default.a.createElement(components_MovieCard, {
            movie: movie,
            key: movie.id
          });
        }));
      }), external_react_default.a.createElement(PaginationMovies, {
        page: this.props.page
      }));
    }
  }]);

  return Movies;
}(external_react_["Component"]);

/* harmony default export */ var components_Movies = __webpack_exports__["b"] = (Movies_Movies);


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(54);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Movies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);



var MoviesPage = function MoviesPage(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Movies Page"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Movies__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (MoviesPage);

/***/ })
/******/ ]);