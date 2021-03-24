<template>
  <div class="membershipList">
    <el-main>
      <header class="tosignup_header">
        <nav>
          <!-- <span> 会员积分历史统计数据 </span> -->
          <!-- <el-input
            :placeholder="$t('Member.Account')"
            v-model="searchkey"
            class="block"
            clearable
          ></el-input> -->
          <el-select @change="selectOne" v-model="time" placeholder="会员积分历史统计数据">
            <el-option
              v-for="(item, idx) in timeframe"
              :key="item.start_grade_time"
              :value="idx"
            >
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            class="block"
            @click="search(value, value1, 1, pagesize)"
            >{{ $t("project.Search") }}</el-button
          >
        </nav>
        <section>
          <!-- <el-button
            @click="$routerto('HistoryRetrieval')"
            type="primary"
            class="addbtn block"
            >检索历史数据</el-button
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
          width="200"
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
          width="150"
          label="原会员等级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberIntegral"
          show-overflow-tooltip
          width="150"
          :label="$t('Member.MembershipPoints')"
          align="center"
        >
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
          prop="membershipValidity"
          width="300"
          :label="$t('Member.ExpiredDateofMembership')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ $global.stamptodate(scope.row.membershipValidity) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="newMemberLevel"
          width="300"
          label="季(年)末会员重新评级结果"
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
              v-if="scope.row.industryStatus !== 0"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >{{ $t("project.View") }}</el-button
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
      memberIntegral: 0,
      dialogFormVisible_popup: false,
      centerDialogVisible: false,
      value1: [], // 日期选择
      value: '', // 项目状态
      searchkey: '',
      input: '',
      time: '',
      timeframe: [],
      currentpage: 1,
      pagesize: 8,
      scopeRow: {},
      pagetotal: null,
      tableData: [],
      deleteType: 0,
      startTime: null,
      endTime: null,
      industryId: '',
      Searchtimer: null
    }
  },
  created () {},
  activated () {
    // console.log(123);
    this.getMemberLogTime()
    this.search()
  },
  methods: {
    selectOne (value) {
      this.startTime = this.timeframe[value].start_grade_time
      this.endTime = this.timeframe[value].end_grade_time
      this.time = this.timeframe[value].label
    },
    getMemberLogTime () {
      let self = this
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getMemberLogTime`
        )
        .then((res) => {
          console.log(res)
          if (res.data.resultCode === 10000) {
            let arr = res.data.data
            arr.forEach((item) => {
              item.label =
                self.$global.stamptodate(item.start_grade_time) +
                '-' +
                self.$global.stamptodate(item.end_grade_time)
            })
            this.timeframe = [
              { start_grade_time: null, end_grade_time: null, label: '全部' }
            ].concat(arr)
            console.log(this.timeframe)
          }
        })
    },
    handleCurrentChange (cpage) {
      this.currentpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },

    // 防抖
    // handleSearch(value) {
    //   if (this.Searchtimer) {
    //     clearTimeout(this.Searchtimer);
    //   }
    //   this.Searchtimer = setTimeout(() => {
    //     this.ChangesIntegral(value);
    //   }, 400);
    // },
    // 更改会员积分

    handleClick (row) {
      console.log(row)
      this.$router.push({
        name: 'viewRecommendedProjectStatus',
        query: {
          userId: row.memberId
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
      console.log(123)
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getMemberLogIntegralList`,
          {
            startTime: this.startTime,
            endTime: this.endTime,
            pageSize: this.pageSize
          }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.tableData = [...res.data.data.lists]
            console.log(this.tableData)
            this.tableData.forEach((item, idx) => {
              item.idx = idx + 1
              item.membershipValidity = (item.membershipValidity + '000') * 1
              // item.createTime = (item.createTime + "000") * 1;
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
.membershipList {
  //   padding: 20px 0 0 0;
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
