import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const index = () =>
    import ("@/components/index")
const product = () =>
    import ("@/components/product/index")
const Login = () =>
    import ("@/components/User/Login")
const register = () =>
    import ("@/components/User/register")
const details = () =>
    import ("@/components/details/index")
const addSuccess = () =>
    import ("@/components/shopCar/addSuccess")
const ShopCart = () =>
    import ("@/components/shopCar/ShopCart")
const Shop = () =>
    import ("@/components/shopCar/Shop")
const searchP = () =>
    import ("@/components/SerchProduct")
    // 路由跳转连点报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            redirect: '/',
            component: index,
            children: [{
                    path: '/',
                    name: 'product',
                    component: product,

                },
                {
                    path: '/details/:id',
                    name: 'details',
                    component: details,
                },
                {
                    path: '/addSuccess/:id',
                    name: 'addSuccess',
                    component: addSuccess,
                },
                {
                    path: '/searchP',
                    name: 'searchP',
                    component: searchP,
        
                },
            ],

        }, {
            path: '/Login',
            name: 'Login',
            component: Login,

        },
        {
            path: '/register',
            name: 'register',
            component: register,

        },
        {
            path: '/ShopCart',
            name: 'ShopCart',
            component: ShopCart,

        },
        {
            path: '/Shop',
            name: 'Shop',
            component: Shop,

        },
        
    ]
})