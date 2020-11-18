"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;
exports.del = del;
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("../store/index"));

var _elementUi = require("element-ui");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].interceptors.request.use(function (config) {
  // 每次发送请求之前判断vuex中是否存在token        
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
  var token = _index["default"].state.token;
  token && (config.headers.Authorization = 'Bearer ' + token);
  return config;
}, function (error) {
  return Promise.error(error);
});

_axios["default"].interceptors.response.use(function (response) {
  if (response.data.meta.status == 403) {
    // console.log(66666666666666666);
    // console.log(response);
    _elementUi.MessageBox.confirm('你的用户状态已经过期了,是否要重新登陆！', {
      confirmButtonText: '重新登陆',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(function () {
      console.log(403);
      _index["default"].state.token = '';
      _index["default"].state.uname = '';
      localStorage.setItem('name', '');
      localStorage.setItem('token', '');
      location.reload();

      _this.$router.push({
        path: '/'
      });

      location.reload();
    });
  } else {
    return response;
  } // return response;

}, function (error) {
  return Promise.reject(error);
});
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */


function get(url, params) {
  return new Promise(function (resolve, reject) {
    _axios["default"].get(url, {
      params: params
    }).then(function (res) {
      resolve(res.data);
    })["catch"](function (err) {
      reject(err.response);
    });
  });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} data [请求时携带的参数] 
 */


function post(url, data) {
  return new Promise(function (resolve, reject) {
    _axios["default"].post(url, data).then(function (res) {
      resolve(res.data);
    })["catch"](function (err) {
      reject(err);
    });
  });
}
/** 
 * delete方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} data [请求时携带的参数] 
 */


function del(url, data) {
  return new Promise(function (resolve, reject) {
    _axios["default"]["delete"](url, data).then(function (res) {
      resolve(res.data);
    })["catch"](function (err) {
      reject(err.data);
    });
  });
}

var _default = _axios["default"];
exports["default"] = _default;