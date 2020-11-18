import {get, post, del } from './http'


export const GetSwippers = num => get('/api/Swippers', num);
// 获取商品
export const GetProduct = id => get(`/api/P1/`, id);
// 根据关键词搜索
export const SelectProduct = name => post(`/api/P1/`, name);

export const GetOneProduct = id => get(`/api/P1/${id}`);

// 登录
export const Login = Users => post('/api/login', Users);
// 注册
export const register = Users => post('/api/register', Users);
// 加入购物车
export const addShopCart = id => post(`/api/addCart`, id);

// 查询购物车
export const getShopCart = () => get(`/api/getCart`);
// 删除购物车的商品
export const delShopCart = (pid) => post(`/api/delCart`, pid);

// 修改购物车的商品
export const editShopCart = (pid) => post(`/api/editCart`, pid);