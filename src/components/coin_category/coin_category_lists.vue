<template>
  <div class="coin_category_lists">
    <header class="tosignup_header">
      <div class="block">
      </div>
      <el-button @click="$routerto('coin_category_alter')" type="primary" icon="el-icon-circle-plus-outline" class="addbtn">
       {{$t('CategoryOfCoin.Add')}}</el-button>
    </header>
    <el-main>
      <el-table  :data="tableData.slice((currentpage - 1) * pagesize, currentpage * pagesize)"  border style="width:80%">
        <el-table-column width="200" prop="idx" :label="$t('industry.SerialNumber')" align="center"></el-table-column>
        <el-table-column prop="currencyType" :label="$t('project.Currency')"    align="center"></el-table-column>
        <el-table-column prop="currencyName" :label="$t('CategoryOfCoin.Description')"  align="center"></el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')"  width="200" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">{{$t('project.Edit')}}</el-button>
            <el-button @click=" deleterow(scope.row)" type="text" size="small">{{$t('project.Delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-pagination
      style="width:80%"
      :page-size="pagesize"
      :pager-count="5"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="currentpage"
      @size-change="handleSizeChange"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name:'coin_category_lists',
    data() {
      return {
        value1: [], //日期选择
        value: "", //项目状态
        searchkey: "",
        currentpage: 1,
        pagesize: 8,
        pagetotal: null,
        tableData: []
      };
    },
    created() {
    },
    activated() {
      this.search();
    },
    methods: {
      handleCurrentChange(cpage) {
        this.currentpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      deleterow(row) {
        console.log(row)
         let self = this;
        this.$confirm(self.$t('project.Confirmdelect')+'?', self.$t('project.Reminder'), {
          confirmButtonText: self.$t('project.Confirm'),
          cancelButtonText: self.$t('project.Cancel'),
          type: "warning",
          center: true,
          showCancelButton: true
        }).then(() => {
          this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/currency/deleteCurrencyAdmin`,{
            currencyId:row.currencyId
          })
          .then(res => {
            // console.log(res);
            if(res.data.resultCode==10000){
              this.search();
            }

          });
        }).catch(()=>{

        });
      },

      handleClick(row) {
        this.$routerto('coin_category_alter',{currencyId:row.currencyId,pagenum:this.currentpage})
      },
      fromchildren1(data) {
        this.currentpage = data.currentpage;
        this.pagesize = data.pagesize;
        this.search(
          this.value,
          this.value1[0] / 1000,
          this.value1[1] / 1000,
          this.currentpage,
          this.pagesize
        );
      },
      search() {
        this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/currency/getAllCurrency`)
        .then(res => {
          if(res.data.resultCode==10000){
            this.tableData=[...res.data.data]
            this.tableData.forEach((item,idx)=>{
              item.idx=idx+1;
            })
          }
        })
      }
    }
  };
</script>

<style lang='scss'>
  .coin_category_lists{
    padding-top: 20px;
    .el-main{
      /*min-height: 580px;*/

    }
    .tosignup_header {
      height: 40px;
      width: 80%;
      display: flex;
      padding: 0 0 0 20px;
      box-sizing: border-box;
      .block {
        margin-right: 20px;
      }
      .el-input--suffix {
        width: 200px;
        margin-right: 20px;
      }

    }
    .el-pagination{
      display: flex;
      justify-content: center;
    }


  }
</style>
