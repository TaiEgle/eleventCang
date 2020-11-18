/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import store from '../store/index'
import { MessageBox } from 'element-ui'


axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.state.token;
        token && (config.headers.Authorization = 'Bearer ' + token);

        return config;

    },
    error => {
        return Promise.error(error);
    })

axios.interceptors.response.use(
    response => {
        if (response.data.meta.status == 403) {
            // console.log(66666666666666666);
            // console.log(response);

            MessageBox.confirm('你的用户状态已经过期了,是否要重新登陆！', {
                confirmButtonText: '重新登陆',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(403);
                store.state.token = '';
                store.state.uname = '';
                localStorage.setItem('name', '');
                localStorage.setItem('token', '');
                location.reload()
                this.$router.push({
                    name:'Login'
                })
                location.reload()


            })
        } else {
            return response;
        }
        // return response;
    }, error => {
        return Promise.reject(error)
    })



/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.response)
        })
    });
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} data [请求时携带的参数] 
 */
export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    });
}
/** 
 * delete方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} data [请求时携带的参数] 
 */


export function del(url, data) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export default axios;