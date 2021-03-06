const { addProduct, getProduct, patchProduct, deleteProduct, getOneProduct,getSeleProduct } = require('../models/Productdb')

const show = async(req, res) => {
    let num = req.query.num * 1;
    let page = (req.query.page - 1) * num
    console.log(num);
    console.log(page);

    let data = await getProduct(num, page);
    if (data) {
        res.send({
            meta: {
                status: 200,
                msg: '获取商品成功'
            },
            data: data
        })
    } else {
        res.send({
            meta: {
                status: 400,
                msg: '获取数据失败'
            },
            data: null
        })
    }
}

const create = async(req, res) => {
    let postProduct = req.body;

    let rs = await addProduct(postProduct);
    if (rs) {
        res.send({
            meta: {
                status: 200,
                msg: '添加成功'
            },
            data: rs
        })
    } else {
        res.send({
            meta: {
                status: 400,
                msg: '添加失败'
            },
            data: null
        })

    }
}
const change = async(req, res) => {
    let id = req.params.id
    let update = req.body
    console.log(id);
    console.log(update);
    let rs = await patchProduct(id, update);
    if (rs.nModified > 0) {
        res.send({
            meta: {
                status: 200,
                msg: '修改成功'
            },
            data: rs
        })
    } else {
        res.send({
            meta: {
                status: 400,
                msg: '修改失败'
            },
            data: null
        })

    }
}
const del = async(req, res) => {
    let id = req.params.id
    let rs = await deleteProduct(id);
    if (rs) {
        res.send({
            meta: {
                status: 200,
                msg: '删除成功'
            },
            data: rs
        })
    } else {
        res.send({
            meta: {
                status: 400,
                msg: '删除失败'
            },
            data: null
        })

    }
}
const showOne = async(req, res) => {
    let id = req.params.id

    let rs = await getOneProduct(id);
    if (rs) {
        res.send({
            meta: {
                status: 200,
                msg: '查找成功'
            },
            data: rs
        })
    } else {
        res.send({
            meta: {
                status: 400,
                msg: '查找失败'
            },
            data: null
        })

    }
}
const sele = async(req, res) => {
    let name = req.body.name
    // console.log(name);

    let rs = await getSeleProduct(name);
    if (rs.length>0) {
        res.send({
            meta: {
                status: 200,
                msg: '查找成功'
            },
            data: rs
        })
    } else {
        res.send({
            meta: {
                status: 400,
                msg: '查找失败'
            },
            data: null
        })

    }
}







module.exports = {
    show,
    showOne,
    create,
    del,
    change,
    sele
}