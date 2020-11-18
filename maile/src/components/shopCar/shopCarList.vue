<template>
  <div>
    <div class="shopCart-list">
      <el-table
        ref="multipleTable"
        :data="Cartproduct"
        tooltip-effect="dark"
        style="width: 80%; margin: 0 auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="全选" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="cover" width="120">
          <template slot-scope="scope"
            ><img
              :src="scope.row.cover"
              alt=""
              style="width: 100%; hight: 100%"
          /></template>
        </el-table-column>
        <el-table-column prop="commadity" label="商品名称" width="150">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="150">
        </el-table-column>
        <el-table-column label="数量" width="200">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.productNum"
              @change="handleChange(scope.row.productNum, scope.row)"
              :min="1"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" width="300" show-overflow-tooltip>
          <template slot-scope="scope">{{
            scope.row.price * scope.row.productNum
          }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <div slot="empty" class="empty">
          <img src="../../../img/timg.gif" alt="" />
          <div empty-right>
            <h1>您的购物车还是空的！</h1>
            <h4>登录后将显示您之前加入的商品</h4>
            <el-button @click="ToLogin">立即登录</el-button>
            <el-button @click="ToIndex">我要去购物</el-button>
          </div>
        </div>
      </el-table>
    </div>

    <div class="cont">
      <ul class="underBar">
        <li>共{{ ProductNum }}件商品,已选择{{Num}}件</li>
        <li class="underBar-right">
          <p>合计:<span class="money">{{total}}</span>元</p>
          <el-button>去结算</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getShopCart, delShopCart, editShopCart } from "@/request/api";
export default {
  inject: ["reload"],
  props: {
    Cartproduct: {
      type: Array,
    },
  },
  data() {
    return {
      multipleSelection: [],
      num: "",
    };
  },
 
  methods: {
      // 多选框
    handleSelectionChange(val) {
        this.multipleSelection = val;
      console.log(this.multipleSelection);
      

    },
      
      
      // 全选
      handleSelectionAll(){
            this.Cartproduct.forEach(item=>{
              this.$refs.multipleTable.toggleRowSelection(item);
            })
          },  
    // 数量
    handleChange(num, p) {
      console.log(num, p.productId);
      editShopCart({
        productNum: num,
        productId: p.productId,
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除
    handleDelete(h, l) {
      // console.log(h,l.productId);
      delShopCart({
        productId: l.productId,
      })
        .then((res) => {
          // console.log(res);
          if (res.meta.status == 200) {
            this.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 去登陆
    ToLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    // 去首页
    ToIndex() {
      this.$router.push({
        name: "product",
      });
    },
  },
  computed: {
    //   总价
    total(){
            let total=0;
            this.multipleSelection.forEach(item=>{
              total += item.productNum * item.price;
            })
            return total;
          },
        //   选择总数量
        Num(){
            let num=0;
            this.multipleSelection.forEach(item=>{
              num += item.productNum;
            })
            return num;
        },
        // 总数量
        ProductNum(){
            let Pnum=0;
            this.Cartproduct.forEach(item=>{
              Pnum += item.productNum;
            })
            return Pnum;
        }
  },
   mounted() {
    this.handleSelectionAll();
  },
};
</script>

<style scoped>
.shopCart-list {
  margin-bottom: 120px;
}

.el-table__row {
  text-align: center;
}

.empty {
  display: flex;
  padding: 100px 0;
  justify-content: space-between;
}
.empty img {
  width: 50%;
}
.underBar {
  width: 80%;
  height: 80px;
  left: 152px;
  bottom: 10px;
  display: flex;
  position: fixed;
  z-index: 1;
  line-height: 80px;
  background-color: #ccc;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1); /*添加阴影*/
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0); /*向上浮动*/
  transform: translate3d(0, -2px, 0);
  text-indent: 3em;
  justify-content: space-between;
}
.underBar-right {
  display: flex;
  margin-right: 50px;
  color: #f25807;
  align-items: center;
}
.underBar-right .el-button {
  width: 200px;
  height: 50px;
  color: #fff;
  font-size: 22px;
  margin-left: 40px;
  background-color: #ff6700;
}
.underBar-right .el-button:hover {
  color: #fff;
  background-color: #f25807;
}
.money {
  font-size: 40px;
}
</style>