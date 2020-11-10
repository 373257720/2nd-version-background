<template>
  <div class="userroot">
    <el-main>
      <el-table
        :data="tableData"
        border
        style="width:100%;"
      >
        <el-table-column prop="optTime" :label="$t('project.Verificationtime')"  width="180" align="center"></el-table-column>
        <el-table-column prop="bslEmail" :label="$t('project.Email')"  show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="userCountry" :label="$t('project.Nationality')"  align="center"></el-table-column>
        <el-table-column prop="newname"  :label="$t('project.PersonalName')" show-overflow-tooltip  min-width align="center"></el-table-column>
        <el-table-column prop="createTime" :label="$t('project.registerTime')"  width="180" align="center"></el-table-column>
        <el-table-column prop="projectstatus" :label="$t('project.Verifystatus')" align="center"></el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')"   align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">
             {{$t('project.View')}}
            </el-button>
            <!-- <el-button type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
          <pagevue
      :pagenum="pagetotal"
      :currentpages="currentpage"
      :pagesizes="pagesize"
      v-on:fromchildren="fromchildren1"
    ></pagevue>
    </el-main>

  </div>
</template>

<script>
  export default {
    name:'verified_userroot',
    data() {
      return {
        ischeck: false,
        currentpage: 1,
        pagesize: 8,
        pagetotal: null,
        tableData: []
      };
    },
    created() {
      if(this.$route.query.pagenum){
      this.currentpage=this.$route.query.pagenum*1;
      }
      this.changepage(this.currentpage, this.pagesize);
    },
    methods: {
      changepage(currentpage, pagesize) {
        let self=this;
        // this.$axios({
        //   method: "get",
        //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthList?optStatus=1&pageIndex=${currentpage}&pageSize=${pagesize}`,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   }
        // })
    this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthList`,{
       optStatus:1,
       pageIndex:currentpage,
       pageSize:pagesize
      })
        .then(res => {
          if(res.data.resultCode==10000){
            this.tableData = [...res.data.data.lists];
            this.tableData.forEach(item => {
              if(item.userIdentityType==1){
                item.newname=item.userName;
              }else if(item.userIdentityType==2){
                item.newname=this.$i18n.locale=='zh_CN'?item.userCompanyCh:item.userCompanyEn;
              }
              item.createTime = item.createTime
                ? this.$global.timestampToTime(item.createTime)
                : "-";
              item.optTime = item.optTime
                ? this.$global.timestampToTime(item.optTime)
                : "-";
              if (item.optStatus === 1) {
                item.projectstatus = self.$t('project.Approve');
              } else if (item.optStatus === 2) {
                item.projectstatus = self.$t('project.Disapprove');
              }
              item.userCountry=this.$i18n.locale=='zh_CN'?item.userCountryCh:item.userCountryEn;
            });
            console.log(this.tableData)
            this.pagetotal = res.data.data.pageTotal;
          }

        });
      },
      handleClick(row) {
        this.$router.push({
          name: "usercheck",
          query: { idx: row.userId, userIdentityType: row.userIdentityType ,pagenum: this.currentpage}
        });
        // this.$router.push("/home/userlist/verified_user/usercheck");
      },
      fromchildren1(data) {
        this.currentpage=data.currentpage;
        this.changepage(data.currentpage, data.pagesize);
      }
    },
    watch: {
      $route(to, from) {
        if (to.name == "usercheck") {
          this.ischeck = !this.ischeck;
        } else {
          this.ischeck = false;
        }
      }
    }
  };
</script>

<style lang='scss'>
  .userroot{
    .el-main{
      /*min-height: 605px;*/

    }
  }

</style>
