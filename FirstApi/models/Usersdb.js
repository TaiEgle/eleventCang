const mongoose = require('mongoose');
const db = require('./ConnectMongodb')


const Users = db.model('users', {
    uname: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    create: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    salt: {
        type: String
    },
    cartList: [{
        commadity: String,
        productId: String,
        price: Number,
        place: String,
        cover: String,
        more: String,
        productNum: Number,
        checked: Boolean,
    }]
})

//添加用户注册信息
const adduser = (postuser) => {
    const newuser = new Users(postuser);
    return newuser.save()
        .then((res) => {
            // console.log('成功', res);
            return res;
        }).catch((err) => {
            console.log('失败', err);
            return false;

        });
}

//用户登录
const Login = (postuser) => {
    return Users.findOne(postuser)
        .catch((err) => {
            console.log('失败', err);
            return false;
        });
}

// 用户删除购物车
const patchShopCart = (id, update) => {
    console.log(update);
    return Users.updateOne(id, {
            $pull: {
                cartList: { productId: update }
            }
        })
        .then((res) => {
            console.log('成功-----', res);
            return res;
        })
}

// 用户修改购物车
const editShopCart = (id, update) => {
    return Users.update(id, update)
        .then((res) => {
            console.log('成功-----', res);
            return res;
        })
}







module.exports = {
    adduser,
    Login,
    patchShopCart,
    editShopCart
}