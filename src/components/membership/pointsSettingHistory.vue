<template>
  <div class="contractItem">
    <el-main>
      <header class="tosignup_header">
        <nav>
          <!-- <el-button
            @click="$routerto('giftSetting')"
            type="primary"
            class="addbtn"
          >礼品设置</el-button>
          <el-button
            @click="$routerto('pointsSetting')"
            type="primary"
            class="addbtn"
          >积分兑换设置</el-button>
          <el-button
            @click="$routerto('exchangeHistory')"
            type="primary"
            class="addbtn"
          >兑换历史</el-button> -->
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
            @click="search(value, value1, 1, pagesize)"
            >{{ $t("project.Search") }}</el-button
          >
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
          prop="optTime"
          label="设置时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="integralExchangeName"
          show-overflow-tooltip
          label="规则名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="integralAmount"
          show-overflow-tooltip
          label="兑换积分"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="exchangeGiftId"
          show-overflow-tooltip
          label="兑换礼品"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="exchangeDetails"
          show-overflow-tooltip
          label="宣传内容"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="exchangeEndTime"
          show-overflow-tooltip
          label="时限"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="exchangeStatus"
          show-overflow-tooltip
          label="是否公开"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.exchangeStatus == false ? "否" : "是" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="$routerto('pointsSetting',{Id:scope.row.id})"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="delseting(scope.row)"
              >删除</el-button
            >
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
  name: 'membershipList',
  data () {
    return {
      centerDialogVisible: false,
      value1: [], // 日期选择
      value: '', // 项目状态
      searchkey: '',
      input: '',
      currentpage: 1,
      pagesize: 8,
      pagetotal: null,
      tableData: [],
      deleteType: 0,
      industryId: ''
    }
  },
  created () {},
  activated () {
    // console.log(123);

    this.search()
  },
  methods: {
    CheckInputIntFloat (value) {
      var regexp = /^[1-9]\d*$/
      let gg = value
      // console.log(gg.replace(regexp, ""));
      if (gg.replace(regexp, '') !== '') {
        console.log(gg.replace(regexp))

        // e.target.value=gg.replace(regexp)
        value = gg.match(regexp) === null ? '' : gg.match(regexp)
      }
      console.log(value)
    },
    handleCurrentChange (cpage) {
      this.currentpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    deleterow (row) {
      console.log(row)
      let self = this
      this.industryId = row.industryId
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
            .get_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/deleteIndustry`,
              { industryId: row.industryId }
            )
            .then((res) => {
              if (res.data.resultCode === 10000) {
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
        name: 'industry_alter',
        query: {
          industryId: row.industryId
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
    delseting (row) {
      console.log(row)
      var date1 = new Date(row.exchangeEndTime) // 获取当前时间
      var time = date1.getTime() / 1000
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/saveModifyBslExchangeIntegral`,
          {
            integralExchangeName: row.integralExchangeName,
            integralAmount: row.integralAmount,
            exchangeGiftId: row.exchangeGiftId,
            exchangeDetails: row.exchangeDetails,
            exchangeStartTime: row.exchangeStartTime,
            exchangeEndTime: time,
            exchangeOpen: row.exchangeOpen,
            exchangeStatus: true,
            id: row.id
          }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
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
    },
    search () {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslExchangeIntegralList`,
          { searchKey: '' }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.tableData = [...res.data.data.lists]
            // console.log(this.tableData);
            this.tableData.forEach((item, idx) => {
              item.optTime = this.$global.stamptodate(item.optTime)
              item.exchangeEndTime = this.$global.stamptodate(
                item.exchangeEndTime
              )
              item.idx = idx + 1
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
