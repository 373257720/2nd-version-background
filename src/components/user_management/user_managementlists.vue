<template>
  <div class="user_managementlist">
    <header class="tosignup_header" v-if="$store.state.usertype===1">
      <div class="block">
      </div>
      <el-button @click="$routerto('add_user')"  type="primary" icon="el-icon-circle-plus-outline" class="addbtn">
        {{$t('UserManagement.Addnewbackgrounduser')}}</el-button>
    </header>
    <el-main>
      <el-table  :data="tableData"  border>
        <el-table-column width="200" prop="createTime" :label="$t('project.registerTime')" align="center"></el-table-column>
        <el-table-column prop="bslEmail"  :label="$t('project.Email')" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="userType"  :label="$t('project.Type')"   show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="userStatus" :label="$t('UserManagement.userstatus')"   show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span>{{scope.row.userStatus===0?$t('project.Normal'):scope.row.userStatus===-1?$t('project.Deleted'):''}}</span>
<!--            // item.userStatus=item.userStatus===0?"正常":item.userStatus===-1?"已删除":'';-->
          </template>
        </el-table-column>
        <el-table-column prop="receiptEmail" :label="$t('UserManagement.Whethertoreceivemail')"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.receiptEmail===1?$t('project.Yes'):scope.row.receiptEmail===0?$t('project.No'):''}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')"  align="center">
          <template slot-scope="scope">

            <el-button  v-if="$store.state.usertype===1 && scope.row.userStatus===0"  @click="Accept_Click(scope.row)" type="text" size="small">
              {{scope.row.receiptEmail===1?$t('UserManagement.Cancelreceivingmail'):$t('UserManagement.Confirmreceivingmail')}}</el-button>
            <el-button  v-else-if="$store.state.usertype===1 && scope.row.userStatus===-1" disabled class="isnegative" type="text" size="small">
              {{scope.row.receiptEmail===1?$t('UserManagement.Cancelreceivingmail'):$t('UserManagement.Confirmreceivingmail')}}</el-button>
            <el-button  v-if="scope.row.userStatus===0"  @click="handleClick(scope.row)" type="text" size="small">{{$t('UserManagement.changePassword')}}</el-button>
            <el-button  v-else-if="scope.row.userStatus===-1" disabled class="isnegative"  type="text" size="small">{{$t('UserManagement.changePassword')}}</el-button>
<!--            <el-button-->
<!--              @click="deleterow(scope.row)"-->
<!--              type="text"-->
<!--              size="small"-->
<!--            >冻结</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
<!--    <el-pagination-->
<!--      style="width:80%;"-->
<!--      :page-size="pagesize"-->
<!--      :pager-count="5"-->
<!--      layout="prev, pager, next"-->
<!--      @current-change="handleCurrentChange"-->
<!--      :current-page.sync="currentpage"-->
<!--      @size-change="handleSizeChange"-->
<!--      :total="pagetotal"-->
<!--    ></el-pagination>-->
    <pagevue
      :pagenum="pagetotal"
      :currentpages="currentpage"
      :pagesizes="pagesize"
      v-on:fromchildren="fromchildren1"
    ></pagevue>
  </div>
</template>

<script>
  export default {
    name:'user_managementlists',
    data() {
      return {
        searchkey: "",
        // super_administrian:false,
        currentpage: 1,
        pagesize: 7,
        pagetotal: null,
        tableData: [],
      };
    },
    created() {


    },
    activated() {
      this.search();
    },
    methods: {
      Accept_Click(row){
        let self=this;
        // console.log(row)
        let reminder;
        let receiptEmail;
        if(row.receiptEmail===1){
            // reminder='取消接收邮件, 是否继续?'
          reminder=self.$t('UserManagement.Cancelreceivingmail')+'?'
            receiptEmail=0;
        }else if(row.receiptEmail===0){
          reminder=self.$t('UserManagement.Confirmreceivingmail')+'?'
          receiptEmail=1;
        }
        this.$confirm(reminder, self.$t('project.Reminder'), {
          confirmButtonText: self.$t('project.Confirm'),
          cancelButtonText: self.$t('project.Cancel'),
          type: 'warning'
        }).then(() => {
          this.$global.post_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/setReceiptEmail`,{userId:row.id,
            receiptEmail:receiptEmail}).then(res=>{
              if(res.data.resultCode==10000){
                if(row.receiptEmail===1){
                  row.receiptEmail=0;
                }else if(row.receiptEmail===0){
                  row.receiptEmail=1;
                }
                this.$message({
                  type: 'success',
                  message: res.data.resultDesc
                });
              }else{
                this.$message({
                  message: res.data.resultDesc,
                  type: 'warn'
                });
              }
          })

        }).catch(() => {

        });
      },
      handleCurrentChange(cpage) {
        this.currentpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      deleterow(row) {
        // console.log(row)
        let self=this;
        this.industryId=row.industryId;
        this.centerDialogVisible=true
        this.$confirm(self.$t('project.Reminder'), {
          confirmButtonText: self.$t('project.Confirm'),
          cancelButtonText: self.$t('project.Cancel'),
          type: "warning",
          center: true,
          showCancelButton: true
        }).then(() => {
          // this.$axios({
          //   method: "get",
          //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/deleteIndustry?industryId=${row.industryId}`,
          // })
           this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/industry/deleteIndustry`,{
             industryId:row.industryId
           })
          .then(res => {
            if(res.data.resultCode==10000){
              this.$message({
                message: res.data.resultDesc,
                type: 'success'
              });
              this.search();
            }else{
              this.$message({
                message: res.data.resultDesc,
                type: 'warn'
              });
            }

          });
        }).catch(()=>{

        });
      },

      handleClick(row) {
        console.log(row)
        this.$router.push({
          name: "change_password",
          query: {
            userId: row.id,
            bslEmail:row.bslEmail
          }
        });

      },
      fromchildren1(data) {
        this.currentpage = data.currentpage;
        this.pagesize = data.pagesize;
        this.search();
      },
      search(currentpage,pagesize) {
        let self=this;
        // this.$axios({
        //   method: "get",
        //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getAdminUserList`,
        //   params:{
        //       pageIndex:this.currentpage,
        //       pageSize: this.pagesize}
        // })
          this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/getAdminUserList`,{
               pageIndex:this.currentpage,
              pageSize: this.pagesize
           })
        .then(res => {
          if(res.data.resultCode==10000){
            this.pagetotal=res.data.data.pageTotal;
            this.tableData=[...res.data.data.lists];
            this.tableData.forEach((item,idx)=>{
              item.createTime=item.createTime? this.$global.timestampToTime(item.createTime):'';
              item.userType=item.userType===0?self.$t('UserManagement.Generaladministrativeuser'):item.userType===1?self.$t('UserManagement.Superadministrator'):'';
              // item.userStatus=item.userStatus===0?"正常":item.userStatus===-1?"已删除":'';
              // item.receiptEmail=item.receiptEmail===1?"是":item.receiptEmail===0?"否":'';
            })
          }
        })
      }
    }
  };
</script>

<style lang='scss'>
  .user_managementlist{
    padding-top: 20px;
    .el-button--text{
        /*width: 80px;*/
    }
    .el-main{
      /*min-height: 560px;*/

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
    .isnegative{
      color:grey;
    }
    /*.remote_control {*/

    /*  .el-dialog__header{*/
    /*    background: #EDF1F4;*/
    /*  }*/
    /*  .el-dialog--center .el-dialog__body {*/
    /*    padding: 30px 20px 10px 20px;*/
    /*  }*/
    /*  .el-dialog__footer{*/
    /*    button{*/
    /*      !*color: #FFF;*!*/
    /*      width: 40%;*/
    /*      height: 40px;*/
    /*      font-size: 14px;*/
    /*      cursor: pointer;*/
    /*      border-radius: 5px;*/
    /*      background-color: #EDF1F4;*/
    /*      border:1px solid #DCDFE6;*/
    /*    }*/
    /*    button:nth-of-type(1){*/

    /*    }*/
    /*  }*/

    /*  .el-radio-group{*/
    /*    width: 100%;*/
    /*    .el-radio{*/
    /*      width: 100%;*/
    /*    }*/
    /*    .el-radio__label{*/
    /*      display: inline-block;*/
    /*      word-wrap:break-word;white-space:normal;*/
    /*      width: 100%;*/
    /*    }*/
    /*  }*/

    /*  p.thick {*/
    /*    color: black;*/
    /*    font-size: 16px;*/
    /*    margin-bottom: 30px;*/
    /*  }*/
    /*  .el-radio-group {*/
    /*    > div {*/
    /*      margin-bottom: 10px;*/
    /*    }*/
    /*  }*/
    /*}*/
  }
</style>
