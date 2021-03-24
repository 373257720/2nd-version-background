<template>
  <div class="RecommandList">
    <el-main>
      <header class="tosignup_header">
        <nav>
          <el-button type="primary" @click="export1" class="addbtn block"
            >导出</el-button
          >
        </nav>
        <section>
          <el-select v-model="ruleForm.selectType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-date-picker
            v-model="timeFrame"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-input
            placeholder="推荐中间人"
            v-model="ruleForm.userName"
            class="block"
            clearable
          ></el-input>
          <el-input
            :placeholder="$t('project.ProjectName')"
            v-model="ruleForm.projectName"
            class="block"
            clearable
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            class="block"
            @click="
              () => {
                search(null, pagesize, true);
              }
            "
            >{{ $t("project.Search") }}</el-button
          >
        </section>
      </header>
      <el-table :data="tableData" border>
        <el-table-column width="140" label="推荐时间" align="center">
          <template slot-scope="scope">
            <span>{{ $global.stamptodate(scope.row.signTime4) }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140" label="项目名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row["projectName" + $global.lan()] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userCompanyCh"
          width="100"
          label="推荐人"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.userIdentityType == 1
                ? scope.row.userName
                : scope.row["userCompany" + $global.language()]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="recommendUserType"
          label="推荐人类型"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ userIdentityType[4] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="被推荐人"
          prop="userCompanyCh4"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.signStatus4 < 49">{{
              scope.row.userIdentityType4 == 1
                ? scope.row.userName4
                : scope.row["userCompany" + $global.language() + "4"]
            }}</span>
            <span v-if="scope.row.signStatus4 > 49">{{
              scope.row.userIdentityType3 == 1
                ? scope.row.userName3
                : scope.row["userCompany" + $global.language() + "3"]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="被推荐人类型"
          prop="recommendedUserType"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ userIdentityType[scope.row.recommendedUserType] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分成机制类型"
          prop="sharingMechanismType"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{
              sharingMechanismType[scope.row.sharingMechanismType]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分成机制（利益%）"
          prop="sharingMechanism"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          label="推荐结果"
          prop="signStatus4"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="[29, 32, 37, 39].includes(scope.row.signStatus4)"
              >失败</span
            >
            <span v-if="[41, 54].includes(scope.row.signStatus4)">成功</span>
          </template>
          <!-- 推荐结果41,54成功，29,32,37,39失败 -->
        </el-table-column>
        <el-table-column
          label="上链信息"
          width="200"
          show-overflow-tooltip
          prop="agreementKey"
          align="center"
        ></el-table-column>
      </el-table>
      <el-pagination :page-size="pagesize" layout="slot">
        <span class="finger" @click="changePage('previous')">{{
          $t("project.Previous")
        }}</span>
        <span class="finger" @click="changePage('next')">{{
          $t("project.Next")
        }}</span>
      </el-pagination>
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
      value1: [], // 日期选择
      value: '', // 项目状态
      timeFrame: '',
      ruleForm: {
        selectType: 0,
        startSignSubmitTime4: '',
        endSignSubmitTime4: '',
        userName: '',
        projectName: '',
        bookmark: ''
      },
      userIdentityType: {
        4: '中间人',
        3: '投资者'
      },
      sharingMechanismType: {
        0: '中介机构筹集资金总额的百分比',
        1: '项目方佣金收入的百分比'
      },
      options: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '中间人'
        },
        {
          value: 2,
          label: '投资人'
        }
      ],
      projectName: '', // 模糊查询项目名称
      RecommendedMiddleman: '', // 模糊查询推荐中间人名称
      currentpage: null,
      pagesize: 8,
      pageArr: [null],
      pagetotal: null,
      tableData: [],
      currentpageSerial: 0,
      deleteType: 0,
      industryId: ''
    }
  },
  computed: {},
  created () {
    // let a=
    // this.search(this.currentpage, this.pagesize);
  },
  activated () {
    this.search(this.currentpage, this.pagesize)
  },
  methods: {
    export1 () {
      var starttime, endtime
      console.log(this.timeFrame)
      if (this.timeFrame) {
        var date1 = new Date(this.timeFrame[0])
        starttime = this.$global.stamptodate(date1.getTime() / 1000)
        var date2 = new Date(this.timeFrame[1])
        endtime = this.$global.stamptodate(date2.getTime() / 1000)
      } else {
        starttime = ''
        endtime = ''
      }
      window.location.href = `${this.$axios.defaults.baseURL}/bsl_admin_web/recommendList/exportExcelMiddlemanInvestorRHistory?Ad_Token=${this.$store.state.X_Token}&selectType=${this.ruleForm.selectType}&startSignSubmitTime4=${starttime}&endSignSubmitTime4=${endtime}&userName=${this.ruleForm.userName}&projectName=${this.ruleForm.projectName}&bookmark=`
    },
    downloadFile (fileName, data) {
      if (!data) {
        return
      }
      window.location.href = `${this.$axios.defaults.baseURL}/bsl_web/upload/downloadFile?X_Token=${this.$store.state.X_Token}&fileUrl=${data}`
    },
    changePage (num) {
      if (num === 'previous') {
        if (this.currentpageSerial > 0) {
          this.currentpageSerial--
          this.search(this.pageArr[this.currentpageSerial], this.pagesize)
        }
      } else if (num === 'next') {
        if (this.currentpageSerial < this.pageArr.length - 1) {
          this.currentpageSerial++
          this.search(this.pageArr[this.currentpageSerial], this.pagesize)
        }
        // if (this.currentpageSerial <= this.pageArr.length - 1) {
        //   this.search(this.pageArr[this.currentpageSerial + 1], this.pagesize);
        // }
      }
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
    search (currentpage, pagesize, issearch) {
      if (issearch) this.pageArr = []
      var starttime, endtime

      console.log(this.timeFrame)
      if (this.timeFrame) {
        var date1 = new Date(this.timeFrame[0])
        starttime = this.$global.stamptodate(date1.getTime() / 1000)
        var date2 = new Date(this.timeFrame[1])
        endtime = this.$global.stamptodate(date2.getTime() / 1000)
      } else {
        starttime = null
        endtime = null
      }
      console.log(starttime, endtime)
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/recommendList/adminIBackGetMiddlemanInvestorRHistory`,
          {
            startSignSubmitTime4: starttime,
            endSignSubmitTime4: endtime,
            userName: this.ruleForm.userName,
            projectName: this.ruleForm.projectName,
            selectType: this.ruleForm.selectType,
            bookmark: currentpage,
            pageSize: pagesize
          }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            let a = this.pageArr.every((item) => {
              return item !== res.data.data.bookmark
            })
            if (a) {
              if (res.data.data.signList.length > 0) {
                this.pageArr.push(res.data.data.bookmark)
              }
            }
            this.tableData = [...res.data.data.signList]
          }
        })
    }
  }
}
</script>

<style lang='scss'>
.RecommandList {
  //   padding: 20px 0 0 0;
  .finger {
    cursor: pointer;
  }
  .el-main {
    /*min-height: 580px;*/
    width: 80%;
  }
  .tosignup_header {
    // height: 40px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
