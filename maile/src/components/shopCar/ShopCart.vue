<template>
    <div class="shopCart">
        <div class="top">
            <p>我的购物车</p>
            <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
        </div>


<shopCartList :Cartproduct="Cartproduct"></shopCartList>
    </div>
</template>

<script>
    import {getShopCart,delShopCart,editShopCart} from '@/request/api'
    import shopCartList from '@/components/shopCar/shopCarList'
    export default{
        components:{
            shopCartList
        },
        data() {
            return {
                Cartproduct:[],
            }
        },
        created() {
            getShopCart()
            .then((res) => {
                this.Cartproduct=res.data;        
                console.log(this.Cartproduct);
            }).catch((err) => {
                console.log(err);
            });
        },
    
    }
</script>

<style scoped>
.top{
    height: 100px;
    padding-left: 250px;
    margin-bottom: 30px;
    display: flex;
    background-color: #fff;
    border-bottom: 2px solid #ff6700;
}
.top p:first-child{
    line-height: 100px;
        font-size: 30px;
}
.top p:nth-child(2){
    margin-left: 15px;
    font-size: 12px;
    color: #757575;
    line-height: 115px;
}

.shoplist{
    width: 100%;
    height: 100px;
    display: flex;
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
}
.shoplist img{
    width: 80px;
    height: 80%;
}

</style>