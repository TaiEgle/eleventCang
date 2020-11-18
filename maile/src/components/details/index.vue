<template>
    <div class="details">
        <div class="product-list">
			<div class="product-item">
				<img class="p-img" :src="this.product.cover" alt="">
				<ul class="more">
					<li>{{product.commadity}}</li>
					<li><span>价格:</span>￥{{product.price}}</li>
					<li><span>运费 ￥9.9 </span> {{product.place}}</li>
                    <li>
                    <span>颜色分类</span>
                    <el-radio-group v-model="radio1">
                            <el-radio-button label="红色"></el-radio-button>
                            <el-radio-button label="蓝色"></el-radio-button>
                            <el-radio-button label="白色"></el-radio-button>
                            <el-radio-button label="黑色"></el-radio-button>
                            <el-radio-button label="米色"></el-radio-button>
                            <el-radio-button label="卡其色"></el-radio-button>
                    </el-radio-group>
                    </li>
					<li>
                        <span>数量:</span>
                    <el-input-number v-model="num" :disabled="true" size="mini"></el-input-number>
                     <span>&nbsp;件</span>
                    </li>
                    <li class="btn">
					<el-button class="btn-more" @click="addShop">加入购物车</el-button>
					<el-button class="btn-more">立即购买</el-button>
                    </li>
				</ul>

			</div>
			
        <div class="line"></div>
		</div>
    </div>
</template>

<script>
import {GetOneProduct} from '@/request/api';
import {addShopCart} from '@/request/api';
    export default {
           inject:['reload'],
        data() {
            return {
                product:'',
                id:'',
                number:0,
                radio1:'颜色',
                num:1
                
            }
        },
        created() {
            this.id=this.$route.params.id;
            GetOneProduct(this.id)
			.then((res) => {
				this.product=res.data
			}).catch((err) => {
				console.log(err);
			});
        },
        methods: {
            addShop(){
                
                // console.log(this.id);
                addShopCart({
                    productId:this.id
                    })
                .then((res) => {
                    // console.log(res);
                    // 加入购物车成功
                    if(res.meta.status==200){
                        this.$router.push({
                                name:'addSuccess',                          
                                 }) 
                                 this.reload();                      
                    }
                    // 加入购物车失败
                    if(res.meta.status!==200){
                        this.$message({
                                message: '还没有登陆，快去登陆吧~',
                                type: 'success'
                                });
                                setTimeout(()=>{
                                    this.$router.push({
                                            name:'Login'
                                             }) 
                                },2000)
                    }
                }).catch((err) => {
                    console.log(err);
                });                              
            }
        },
    }
</script>

<style scoped>
.p-img{
    width: 400px;
    height: 400px;
}
.product-list{
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    padding: 50px 100px;
    /* border: 1px solid; */
}
.details{
    padding-top: 40px;
    border-top: 2px solid #ccc;
}
.product-item{
    display: flex;
    justify-content: start;
}
.more{
    width:50%;
    /* border: 1px solid #000; */
    margin-left: 50px;
}
.more li{
        padding: 15px 0;
}
.more li:first-child{
    font-size: 18px;
    font-weight: 700;
    
}
.more li:nth-child(2){
    color: red;
    font-weight: 700;
    font-size: 20px;
    background-color: #e5e4e4;
}
.more li span{
    font-size: 14px;
    color: #838383;
    margin-right: 20px;

}
.btn{
    text-align: center;
}
.btn-more{
    width: 160px;
}
.line{
    width: 100%;
    margin:60px auto;
    border-bottom: 2px solid #000;
}

</style>