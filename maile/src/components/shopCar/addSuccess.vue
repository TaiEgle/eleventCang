<template>
    <div class="success">
        <ul class="suc">
            <li>
                <img class="suc-icon" src="../../../img/timg.jpg" alt="">
            </li>
            <li>
                <h2>已成功加入购物车!</h2>
                <p>{{commadity}}</p>
            </li>
            <li><el-button @click="back">返回首页</el-button></li>
            <li><el-button @click="ToShopCart"> 去购物车结算</el-button></li>
            
        </ul>
    </div>
</template>

<script>
import {GetOneProduct} from '@/request/api';
    export default {
     
        data() {
            return {
                id:'',
                commadity:""
            }
        },created() {
           this.id =this.$route.params.id
            GetOneProduct(this.id)
            .then((res) => {
                // console.log(res);
                this.commadity=res.data.commadity 
            }).catch((err) => {
                console.log(err);
            });
        },
        methods: {
            // 回首页
            back(){
                this.$router.push({
                                name:'index',                          
                                 })
            },
            // 去购物车
            ToShopCart(){
                this.$router.push({
                                name:'ShopCart',                          
                                 })
            },
        },
    }
</script>

<style scoped>
.suc{
    margin-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
    display: flex;
    padding-left: 120px;
    align-items: center;
}
.suc-icon{
    width: 70px;
    height: 70px;
}
.suc li:first-child{
    flex: 1;
}
.suc li:nth-child(2){
    line-height: 30px;
    flex: 10;
}
.suc li:nth-child(3){
flex: 2;
}
.suc li:nth-child(4){
flex: 3;
}
</style>