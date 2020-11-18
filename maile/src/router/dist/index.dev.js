"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 路由懒加载
var index = function index() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/index"));
  });
};

var product = function product() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/product/index"));
  });
};

var Login = function Login() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/User/Login"));
  });
};

var register = function register() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/User/register"));
  });
};

var details = function details() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/details/index"));
  });
};

var addSuccess = function addSuccess() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/shopCar/addSuccess"));
  });
};

var ShopCart = function ShopCart() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/shopCar/ShopCart"));
  });
};

var Shop = function Shop() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/shopCar/Shop"));
  });
}; // 路由跳转连点报错


var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

_vue["default"].use(_vueRouter["default"]);

var _default = new _vueRouter["default"]({
  routes: [{
    path: '/',
    name: 'index',
    redirect: '/',
    component: index,
    children: [{
      path: '/',
      name: 'product',
      component: product
    }, {
      path: '/details/:id',
      name: 'details',
      component: details
    }, {
      path: '/addSuccess/:id',
      name: 'addSuccess',
      component: addSuccess
    }]
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
    path: '/ShopCart',
    name: 'ShopCart',
    component: ShopCart
  }, {
    path: '/Shop',
    name: 'Shop',
    component: Shop
  }]
});

exports["default"] = _default;