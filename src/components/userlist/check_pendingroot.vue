<template>
  <div class="check_pendingroot">
    <el-main>
      <el-table :data="tableData" border style="width:100%;">
        <el-table-column
          fixed
          prop="createTime"
          width="200"
          :label="$t('project.registerTime')"
          align="center"
        ></el-table-column>
        <el-table-column prop="userType" :label="$t('project.Type')" align="center"></el-table-column>
        <el-table-column
          prop="bslEmail"
          show-overflow-tooltip
          :label="$t('project.Email')"
          min-width
          align="center"
        ></el-table-column>
        <el-table-column
          prop="screateTime"
          width="200"
          :label="$t('project.Submissiontime')"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >{{$t('project.View')}}</el-button>
            <!-- <el-button type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
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
  name: "check_pendingroot",
  data() {
    return {
      ischeck: false,
      currentpage: 1,
      pagesize: 8,
      pagetotal: null,
      tableData: []
    };
  },
  created() {},
  activated() {
    this.changepage(this.currentpage, this.pagesize);
  },
  methods: {
    changepage(currentpage, pagesize) {
      let self = this;
      // this.$axios({
      //   method: "get",
      //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthList?optStatus=0&pageIndex=${currentpage}&pageSize=${pagesize}`,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthList`,
          {
            optStatus: 0,
            pageIndex: currentpage,
            pageSize: pagesize
          }
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            this.tableData = [...res.data.data.lists];
            console.log(this.tableData);
            this.tableData.forEach(item => {
              item.createTime = item.createTime
                ? this.$global.timestampToTime(item.createTime)
                : "";
              item.screateTime = item.screateTime
                ? this.$global.timestampToTime(item.screateTime)
                : "-";
              if (item.userType) {
                if (item.userType == 1) {
                  item.userType = self.$t("project.ProjectParty");
                } else if (item.userType == 4) {
                  item.userType = self.$t("project.Middleman");
                } else if (item.userType == 3) {
                  item.userType = self.$t("project.Investor");
                }
              }
            });
            this.pagetotal = res.data.data.pageTotal;
          }
        });
    },
    handleClick(row) {
      this.$router.push({
        name: "check",
        query: {
          idx: row.userId,
          userIdentityType: row.userIdentityType,
          pagenum: this.currentpage
        }
      });
    },
    fromchildren1(data) {
      this.currentpage = data.currentpage;
      this.changepage(data.currentpage, data.pagesize);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "check") {
        this.ischeck = !this.ischeck;
      } else {
        this.ischeck = false;
      }
    }
  }
};
</script>

<style lang='scss'>
.check_pendingroot {
  .el-main {
    /*min-height: 570px;*/
  }
}
</style>
