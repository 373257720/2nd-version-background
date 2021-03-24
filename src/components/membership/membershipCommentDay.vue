<template>
  <div class="membershipCommentDay">
    <el-main>
      <header class="tosignup_header">
        <nav>
          <!-- <el-button
            @click="$routerto('customPoints')"
            type="primary"
            class="addbtn block"
            >{{ $t("Membership.Pointscustomization") }}</el-button
          > -->
        </nav>
        <section>
          <el-button
            @click="
              () => {
                dialogFormVisible_popup = true;
                getBslMemberGradeConfigureList();
              }
            "
            type="primary"
            class="addbtn block"
            >会员评价日</el-button
          >
          <!-- <el-input
            :placeholder="$t('project.ProjectName')"
            v-model="searchkey"
            class="block"
            clearable
          ></el-input> -->
          <!-- <el-button
            type="primary"
            icon="el-icon-search"
            class="block"
            @click="search(value, value1, 1, pagesize)"
            >{{ $t("project.Search") }}</el-button
          > -->
        </section>
      </header>
      <el-table
        :data="
          tableData.slice((currentpage - 1) * pagesize, currentpage * pagesize)
        "
        border
      >
        <el-table-column
          width="200"
          prop="bslEmail"
          :label="$t('Member.Account')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('Member.DateofRegister')"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ $global.stamptodate(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberLevel"
          show-overflow-tooltip
          :label="$t('Member.MembershipLevel')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberIntegral"
          show-overflow-tooltip
          width="150"
          :label="$t('Member.MembershipPoints')"
          align="center"
        >
          <!-- <input type="text" @input="CheckInputIntFloat" v-model="input" /> -->
        </el-table-column>
        <!-- <el-table-column
          prop="memberIntegral"
          show-overflow-tooltip
          :label="$t('Member.MembershipPoints')"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="middlemanNumber"
          show-overflow-tooltip
          :label="$t('Membership.RecommendedMiddleman')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="investorNumber"
          show-overflow-tooltip
          :label="$t('Membership.ReferInvestors')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="investmentAmountTotal"
          show-overflow-tooltip
          :label="$t('Member.projectFunding')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="endGradeTime"
          width="300"
          label="会员重新评级日"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ $global.stamptodate(scope.row.endGradeTime) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          :label="$t('project.Operation')"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.industryStatus !== 0"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >{{ $t("project.View") }}</el-button
            >
          </template>
        </el-table-column> -->
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
    <el-dialog
      :visible.sync="dialogFormVisible_popup"
      width="30%"
      :modal="true"
      :close-on-click-modal="false"
      center
    >
      <span slot="title" class="dialog-footer">{{
        $t("CategoryOfCoin.Add")
      }}</span>

      <!-- <el-input
        v-model="memberIntegral"
        oninput="value=value.replace(/[^\d]/g,'')"
        placeholder
      ></el-input> -->

      <el-radio-group v-model="radio">
        <el-radio v-for="item in radioList" :key="item.id" :label="item.id">{{
          item["gradeName" + $global.lan()]
        }}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogFormVisible_popup = false">
          {{ $t("project.Cancel") }}
        </button>
        <button @click="updateMemberGradeConfigure">
          {{ $t("project.Confirm") }}
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import '@/components/eventBus'
// import login from "../login";
export default {
  name: "membershipCommentDay",
  data() {
    return {
      radio: 3,
      radioList: [],
      memberIntegral: 0,
      dialogFormVisible_popup: false,
      centerDialogVisible: false,
      value1: [], //日期选择
      value: "", //项目状态
      searchkey: "",
      input: "",
      currentpage: 1,
      pagesize: 8,
      scopeRow: {},
      pagetotal: null,
      tableData: [],
      deleteType: 0,
      industryId: "",
      Searchtimer: null,
    };
  },
  created() {
    this.search();
  },
  activated() {},
  methods: {
    getBslMemberGradeConfigureList() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslMemberGradeConfigureList`
        )
        .then((res) => {
          console.log(res);
          if (res.data.resultCode == 10000) {
            this.radioList = res.data.data.lists;
          }
        });
    },
    handleCurrentChange(cpage) {
      this.currentpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    // 更改会员积分
    updateMemberGradeConfigure() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/updateMemberGradeConfigure`,
          { id: this.radio }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.$message({
              message: res.data.resultDesc,
              type: "success",
            });
            this.search();
          } else {
            this.$message({
              message: res.data.resultDesc,
              type: "warn",
            });
          }
          this.dialogFormVisible_popup = false;
        });
    },
    search() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getMemberLogIntegralList`
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.tableData = [...res.data.data.lists];
            console.log(this.tableData);
            this.tableData.forEach((item, idx) => {
              item.idx = idx + 1;
              item.membershipValidity = (item.membershipValidity + "000") * 1;
              item.createTime = (item.createTime + "000") * 1;

              // if(item.industryStatus==-1){
              //   item.industry_Status='已删除'
              // }else if(item.industryStatus==0){
              //   item.industry_Status='正常'
              // }
            });
          }
        });
    },
  },
};
</script>

<style lang='scss'>
.membershipCommentDay {
  //   padding: 20px 0 0 0;
  .el-radio-group {
    display: flex;
    flex-direction: column;
    .el-radio {
      margin-bottom: 20px;
    }
    .el-radio:last-of-type {
      margin-bottom: 0;
    }
    .el-dialog--center {
      text-align: left;
    }
  }
  .el-main {
    /*min-height: 580px;*/
    width: 80%;
  }
  .tosignup_header {
    // height: 40px;
    // width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // margin-bottom: 20px;
    padding: 0 0 0 20px;
    box-sizing: border-box;
    .block {
      margin-bottom: 20px;
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
  .dialog-footer {
    /*padding-top: 20px;*/
    display: flex;
    justify-content: space-between;
    button {
      width: 40%;
      height: 40px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
      background-color: #edf1f4;
      border: 1px solid #dcdfe6;
    }
  }
}
</style>
