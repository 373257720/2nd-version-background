<template>
  <div class="contractItem">
    <el-main>
      <header class="tosignup_header">
        <nav>
          <el-button
            @click="$routerto('editLevel')"
            type="primary"
            class="addbtn"
            >{{ $t("Membership.NewMembershiplevel") }}</el-button
          >
        </nav>
      </header>
      <el-table
        :data="
          tableData.slice((currentpage - 1) * pagesize, currentpage * pagesize)
        "
        border
      >
        <el-table-column
          width="200"
          prop="levelName"
          label="会员名称"
          align="center"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="memberLevel"
          :label="$t('Member.MembershipLevel')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberLevelIntegral"
          show-overflow-tooltip
          :label="$t('Member.MembershipPoints')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberColour"
          show-overflow-tooltip
          :label="$t('Membership.Colour')"
          align="center"
        >
          <template slot-scope="scope">
            <span
              :style="{
                display:'inline-block',
                backgroundColor: scope.row.memberColour,
                width: '30px',
                height: '30px',
              }"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberRecommendCount"
          show-overflow-tooltip
          :label="$t('Membership.Totalrecommendedtimes')"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="recommendMiddlemanTime"
          show-overflow-tooltip
          :label="$t('Membership.PriorityRecommendationOfIntermediaryTime')"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="recommendInvestorTime"
          show-overflow-tooltip
          :label="$t('Membership.PriorityTToRecommendInvestorTime')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberTime"
          width="200"
          show-overflow-tooltip
          label="会员有效期"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ $global.stamptodate(scope.row.memberTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="relegationIntegralValue"
          show-overflow-tooltip
          label="保级积分值"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('project.Operation')"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >{{ $t("project.Edit") }}</el-button
            >
            <el-button @click="deleterow(scope.row)" type="text" size="small">{{
              $t("project.Delete")
            }}</el-button>
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
  name: 'contractItem',
  data () {
    return {
      centerDialogVisible: false,
      value1: [],
      value: String,
      searchkey: String,
      currentpage: 1,
      pagesize: 8,
      pagetotal: null,
      tableData: [],
      deleteType: 0,
      industryId: String
    }
  },
  created () {
    this.search()
  },
  activated () {
    // this.search();
  },
  methods: {
    handleCurrentChange (cpage) {
      this.currentpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    deleterow (row) {
      console.log(row)
      let self = this
      this.id = row.id
      this.centerDialogVisible = true
      this.$confirm(
        self.$t('project.Confirmdelect'),
        self.$t('project.Reminder'),
        {
          confirmButtonText: self.$t('project.Yes'),
          cancelButtonText: self.$t('project.No'),
          type: 'warning',
          center: true,
          showCancelButton: true
        }
      )
        .then(() => {
          this.$global
            .post_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_admin_web/member/delBslMemberSystem`,
              { id: row.id }
            )
            .then((res) => {
              if (res.data.resultCode == 10000) {
                this.$message({
                  message: res.data.resultDesc,
                  type: 'success'
                })
                this.search()
              } else {
                this.$message({
                  message: res.data.resultDesc,
                  type: 'warn'
                })
              }
            })
        })
        .catch(() => {})
    },

    handleClick (row) {
      this.$router.push({
        name: 'editLevel',
        query: {
          Id: row.id
        }
      })
    },
    fromchildren1 (data) {
      this.currentpage = data.currentpage
      this.pagesize = data.pagesize
      this.search(
        this.value,
        this.value1[0] / 1000,
        this.value1[1] / 1000,
        this.currentpage,
        this.pagesize
      )
    },
    search () {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslMemberSystemList`,
          { searchKey: '' }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.tableData = [...res.data.data.lists]
            console.log(this.tableData)
            this.tableData.forEach((item, idx) => {
              item.idx = idx + 1
              this.$set(
                item,
                'levelName',
                item['memberLevelName' + this.$global.lan()]
              )
              // if(item.industryStatus==-1){
              //   item.industry_Status='已删除'
              // }else if(item.industryStatus==0){
              //   item.industry_Status='正常'
              // }
            })
          }
        })
    }
  }
}
</script>

<style lang='scss'>
.contractItem {
  //   padding: 20px 0 0 0;
  .el-main {
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
