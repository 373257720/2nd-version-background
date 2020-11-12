<template>
  <div class="contractItem">
    <el-main>
      <header class="tosignup_header">
        <nav>
          <el-button
            @click="$routerto('customPoints')"
            type="primary"
            class="addbtn"
          >积分自定义</el-button>
          <el-button
            @click="$routerto('industry_alter')"
            type="primary"
            class="addbtn"
          >积分清零</el-button>
        </nav>

        <section>
          <el-input
            :placeholder="$t('project.ProjectName')"
            v-model="searchkey"
            class="block"
            clearable
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search(value,value1, 1, pagesize)"
          >{{$t('project.Search')}}</el-button>
        </section>
      </header>
      <el-table
        :data="tableData.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
        border
      >
        <el-table-column width="200" prop="idx" :label="$t('Member.Account')" align="center"></el-table-column>
        <el-table-column
          prop="industryNameCh"
          show-overflow-tooltip
          :label="$t('Member.DateofRegister')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          :label="$t('Member.MembershipLevel')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          width="150"
          :label="$t('Member.MembershipPoints')"
          align="center"
        >
          <!-- <input type="text" @input="CheckInputIntFloat" v-model="input" /> -->
          <el-input v-model="input"       oninput="CheckInputIntFloat"  placeholder=""></el-input>
        </el-table-column>
        <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          :label="$t('Member.MembershipPoints')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          :label="$t('Member.Toagent')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          :label="$t('Member.ToInvestor')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          :label="$t('Member.projectFunding')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          :label="$t('Member.ExpiredDateofMembership')"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.industryStatus!==0"
              disabled
              type="text"
              size="small"
            >{{$t('project.View')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="pagesize"
        :pager-count="5"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentpage"
        @size-change="handleSizeChange"
        :total="tableData.length"
      ></el-pagination>
    </el-main>
  </div>
</template>

<script>
// import '@/components/eventBus'
// import login from "../login";
export default {
  name: "membershipList",
  data() {
    return {
      centerDialogVisible: false,
      value1: [], //日期选择
      value: "", //项目状态
      searchkey: "",
      input: "",
      currentpage: 1,
      pagesize: 8,
      pagetotal: null,
      tableData: [],
      deleteType: 0,
      industryId: ""
    };
  },
  created() {},
  activated() {
    // console.log(123);

    this.search();
  },
  methods: {
    CheckInputIntFloat(value) {
      var regexp = /^[1-9]\d*$/;
      let gg = value;
      let a;
      // console.log(gg.replace(regexp, ""));
      if ("" != gg.replace(regexp, "")) {
        console.log(gg.replace(regexp));

        // e.target.value=gg.replace(regexp)
        value = gg.match(regexp) === null ? "" : gg.match(regexp);
      }
      console.log(value);
      
    },
    handleCurrentChange(cpage) {
      this.currentpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    deleterow(row) {
      console.log(row);
      let self = this;
      this.industryId = row.industryId;
      this.centerDialogVisible = true;
      this.$confirm(
        self.$t("project.Confirmdelect"),
        self.$t("project.Reminder"),
        {
          confirmButtonText: self.$t("project.Yes"),
          cancelButtonText: self.$t("project.No"),
          type: "warning",
          center: true,
          showCancelButton: true
        }
      )
        .then(() => {
          this.$global
            .get_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/deleteIndustry`,
              { industryId: row.industryId }
            )
            .then(res => {
              if (res.data.resultCode == 10000) {
                this.$message({
                  message: res.data.resultDesc,
                  type: "success"
                });
                this.search();
              } else {
                this.$message({
                  message: res.data.resultDesc,
                  type: "warn"
                });
              }
            });
        })
        .catch(() => {});
    },

    handleClick(row) {
      this.$router.push({
        name: "industry_alter",
        query: {
          industryId: row.industryId
        }
      });
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
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/getAllIndustry`,
          { searchKey: "" }
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            this.tableData = [...res.data.data];
            console.log(this.tableData);
            this.tableData.forEach((item, idx) => {
              item.idx = idx + 1;
              // if(item.industryStatus==-1){
              //   item.industry_Status='已删除'
              // }else if(item.industryStatus==0){
              //   item.industry_Status='正常'
              // }
            });
          }
        });
    }
  }
};
</script>

<style lang='scss'>
.contractItem {
  //   padding: 20px 0 0 0;
  .el-main {
    /*min-height: 580px;*/
    width: 80%;
  }
  .tosignup_header {
    height: 40px;
    // width: 80%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
  .el-pagination {
    display: flex;
    justify-content: center;
  }
  .remote_control {
    .el-dialog__header {
      background: #edf1f4;
    }
    .el-dialog--center .el-dialog__body {
      padding: 30px 20px 10px 20px;
    }
    .el-dialog__footer {
      button {
        /*color: #FFF;*/
        width: 40%;
        height: 40px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #edf1f4;
        border: 1px solid #dcdfe6;
      }
      button:nth-of-type(1) {
      }
    }
    .el-radio-group {
      width: 100%;
      .el-radio {
        width: 100%;
      }
      .el-radio__label {
        display: inline-block;
        word-wrap: break-word;
        white-space: normal;
        width: 100%;
      }
    }

    p.thick {
      color: black;
      font-size: 16px;
      margin-bottom: 30px;
    }
    .el-radio-group {
      > div {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
