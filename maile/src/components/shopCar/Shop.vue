<template>
    <div>
    <p class="total">总价{{total}}</p>
    <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="数量"
      width="180">
      <template slot-scope="scope">
      <el-button @click="sub(scope.row)">-</el-button>
      {{ scope.row.pic }}
      <el-button @click="add(scope.row)">+</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="产品名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button @click="handleSelectionAll()">全选</el-button>
  </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [{
                  id:1,
                  name: '手机',
                  price: 20,
                  pic:1
                }, {
                  id:2,
                  name: '电视',
                  price: 40,
                  pic:1
                }, {
                  id:3,
                  name: '平板电脑',
                  price: 50,
                  pic:1
                }, {
                  id:4,
                  name: '背包',
                  price: 120,
                  pic:1
                }, {
                  id:5,
                  name: '鼠标',
                  price: 60,
                  pic:1
                }, {
                  id:6,
                  name: '显示器',
                  price: 30,
                  pic:2
                }, {

                  id:7,
                  name: '钢笔',
                  price: 200,
                  pic:1
                }],
                multipleSelection: []
                }
        },
        methods: {
             toggleSelection(rows) {
              if (rows) {
                rows.forEach(row => {
                  this.$refs.multipleTable.toggleRowSelection(row);
                });
              } else {
                this.$refs.multipleTable.clearSelection();
              }
            },
            handleSelectionChange(val) {
              this.multipleSelection = val;
              console.log(val);
            },
            handleSelectionAll(){
              this.tableData3.forEach(item=>{
                this.$refs.multipleTable.toggleRowSelection(item);
              })
            },
            add(row){
              // 添加数量
              if(row.pic === 9){
                console.log('最多买9个');
                return;
              }
              console.log(row.pic);

              row.pic = row.pic + 1;
              console.log(row.pic);
            },
            sub(row){
              // 减少数量
              if(row.pic <= 1){
                console.log('最少买一个');
                return;
              }
              console.log(row.pic);
              row.pic = row.pic - 1;
              console.log(row.pic);
            }



        },
        computed: {
          total(){
            let total=0;
            this.multipleSelection.forEach(item=>{
              total += item.pic * item.price
            })
            return total;
          }
        },
        mounted() {
          this.handleSelectionAll();
        }
    }
</script>

<style scoped>
.total{
  font-size: 4em;
  color:red;
}
</style>