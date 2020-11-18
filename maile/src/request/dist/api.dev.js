"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editShopCart = exports.delShopCart = exports.getShopCart = exports.addShopCart = exports.register = exports.Login = exports.GetOneProduct = exports.GetProduct = exports.GetSwippers = void 0;

var _http = require("./http");

var GetSwippers = function GetSwippers(num) {
  return (0, _http.get)('/api/Swippers', num);
};

exports.GetSwippers = GetSwippers;

var GetProduct = function GetProduct(id) {
  return (0, _http.get)("/api/P1/", id);
};

exports.GetProduct = GetProduct;

var GetOneProduct = function GetOneProduct(id) {
  return (0, _http.get)("/api/P1/".concat(id));
}; // 登录


exports.GetOneProduct = GetOneProduct;

var Login = function Login(Users) {
  return (0, _http.post)('/api/login', Users);
}; // 注册


exports.Login = Login;

var register = function register(Users) {
  return (0, _http.post)('/api/register', Users);
}; // 加入购物车


exports.register = register;

var addShopCart = function addShopCart(id) {
  return (0, _http.post)("/api/addCart", id);
}; // 查询购物车


exports.addShopCart = addShopCart;

var getShopCart = function getShopCart() {
  return (0, _http.get)("/api/getCart");
}; // 删除购物车的商品


exports.getShopCart = getShopCart;

var delShopCart = function delShopCart(pid) {
  return (0, _http.post)("/api/delCart", pid);
}; // 修改购物车的商品


exports.delShopCart = delShopCart;

var editShopCart = function editShopCart(pid) {
  return (0, _http.post)("/api/editCart", pid);
};

exports.editShopCart = editShopCart;