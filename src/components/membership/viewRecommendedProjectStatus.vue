<template>
  <div class="membershipList">
    <el-main>
      <header class="tosignup_header">
        <nav>
          <!-- <el-button
            @click="$routerto('customPoints')"
            type="primary"
            class="addbtn block"
            >{{ $t("Membership.Pointscustomization") }}</el-button
          > -->
          <!-- <el-button @click="$routerto('industry_alter')" type="primary" class="addbtn block">{{$t('Membership.PointsCleared')}}</el-button> -->
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
            class="block"
            @click="search(value, value1, 1, pagesize)"
            >{{ $t("project.Search") }}</el-button
          >
          <el-button
            type="primary"
            class="block"
            @click="$routerto('ProjectStatusCustomization')"
            >{{ "链接项目状态自定义" }}</el-button
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
          prop="createTime"
          label="时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bslName"
          show-overflow-tooltip
          label="会员"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="industryNameEn"
          show-overflow-tooltip
          :label="$t('Member.MembershipLevel')"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="projectNameEn"
          show-overflow-tooltip
          width="150"
          label="项目"
          align="center"
        >
          <!-- <input type="text" @input="CheckInputIntFloat" v-model="input" /> -->
        </el-table-column>

        <el-table-column
          prop="middlemanName"
          show-overflow-tooltip
          :label="$t('Membership.RecommendedMiddleman')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="investorName"
          show-overflow-tooltip
          :label="$t('Membership.ReferInvestors')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberIntegral"
          show-overflow-tooltip
          label="链接项目状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.bslProjectLinkStatusList.length == 1">{{
              arr[scope.row.bslProjectLinkStatusList[0].statusRanking]
            }}</span>
            <el-select
              v-if="scope.row.bslProjectLinkStatusList.length > 1"
              @change="changeintegral(scope.row)"
              v-model="scope.row.option"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, idx) in scope.row.bslProjectLinkStatusList"
                :key="item.id"
                :label="arr[item.statusRanking]"
                :value="idx"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="amountCompleted"
          show-overflow-tooltip
          :label="$t('Member.projectFunding')"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.completeStatus"
              v-model="scope.row.amountCompleted"
              @input="
                (value) => (scope.row.amountCompleted = inputModel(value, 2))
              "
              @blur="addprojectfund(scope.row)"
              placeholder="请输入内容"
            ></el-input>

            <span v-else>{{ scope.row.amountCompleted }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="bslProjectLinkStatusList.list"
          show-overflow-tooltip
          label="获取积分"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <span>{{
              scope.row.bslProjectLinkStatusList[scope.row.option]
                .projectIntegral
            }}</span> -->
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
      integral: "",
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
      industryId: "",
      arr: {
        1: "Meet company",
        2: "Sign termsheet",
        3: "Sign investment agreemen",
        4: "Settle cash",
      },
    };
  },
  created() {
    // this.$global
    //   .get_encapsulation(
    //     `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslProjectLinkList`,
    //     {
    //       userId: this.$route.query.userId,
    //     }
    //   )
    //   .then((res) => {
    //     if (res.data.resultCode == 10000) {
    //       this.tableData = [...res.data.data.lists];
    //       console.log(this.tableData);
    //       this.tableData.forEach((item, idx) => {
    //         item.createTime = this.$global.stamptodate(item.createTime);
    //         // if(item.industryStatus==-1){
    //         //   item.industry_Status='已删除'
    //         // }else if(item.industryStatus==0){
    //         //   item.industry_Status='正常'
    //         // }
    //       });
    //       this.$message({
    //         message: res.data.resultDesc,
    //         type: "success",
    //       });
    //       // this.search();
    //     } else {
    //       this.$message({
    //         message: res.data.resultDesc,
    //         type: "warn",
    //       });
    //     }
    //   });
  },
  activated() {
    // console.log(123);
    // this.search();
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslProjectLinkList`,
        {
          userId: this.$route.query.userId,
        }
      )
      .then((res) => {
        if (res.data.resultCode == 10000) {
          this.tableData = [...res.data.data.lists];
          console.log(this.tableData);
          this.tableData.forEach((item, idx) => {
            item.createTime = this.$global.stamptodate(item.createTime);
            item.projectsName = item["projectsName" + this.$global.lan()];
            this.$set(item, "option", 0);
            // if(item.industryStatus==-1){
            //   item.industry_Status='已删除'
            // }else if(item.industryStatus==0){
            //   item.industry_Status='正常'
            // }
          });
          // this.search();
        }
      });
  },
  methods: {
    inputModel(value, point) {
      let val = value.replace(/[^\d.]/g, "");
      let len = val.length;
      let newValue = val;
      console.log(val, value);
      // 解决首位直接输入 '0开头的数字'问题
      if (len == 2 && val.charAt(0) == 0 && val.charAt(1) != ".") {
        newValue = val.charAt(1);
        return newValue;
      }
      // 解决数字键盘可以输入输入多个小数点问题
      if (val.split(".").length > 2) {
        newValue = "";
        return newValue;
      }
      // 解决开始就输入点问题
      if (val.indexOf(".") === 0) {
        newValue = "";
        return newValue;
      }
      // 解决保留两位小数问题
      if (val) {
        let pointIndex = val.indexOf(".");
        if (point == 0 && len == 2 && val.charAt(pointIndex) == ".") {
          console.log("只能输入整数");
          newValue = val.substr(0, pointIndex);
          return newValue;
        }
        if (pointIndex > 0 && len - pointIndex > point + 1) {
          console.log("只能输入" + point + "位小数");
          newValue = val.substr(0, pointIndex + point + 1);
          return newValue;
        }
      }
      // 解决输入最大值问题
      // if (this.max > 0 && val > this.max) {
      //   //   console.log("---4---");
      //   value = val.substr(0, len - 1);
      //   return value;
      // }

      return newValue;
    },
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
          showCancelButton: true,
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
                  type: "success",
                });
                this.search();
              } else {
                this.$message({
                  message: res.data.resultDesc,
                  type: "warn",
                });
              }
            });
        })
        .catch(() => {});
    },

    handleClick(row) {
      console.log(row);
      // this.$router.push({
      //   name: "industry_alter",
      //   query: {
      //     industryId: row.industryId,
      //   },
      // });
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
    changeintegral(row) {
      // console.log(this.value);
      console.log(row);
      // console.log( this.tableData);
      // this.tableData.forEach((item, idx) => {
      //   if (row.projectsId == item.projectsId) {
      //     item.bslProjectLinkStatusList.forEach((i, t) => {
      //       console.log(i);
      //       if (this.value == i.bslProjectLinkId) {
      //         //  console.log(i.projectIntegral)
      //         this.integral = i.projectIntegral;
      //       }
      //     });
      //   }
      // });
    },
    // 项目资金
    addprojectfund(row) {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/saveBslProjectLinkAmountCompleted`,
          {
            amountCompleted: row.amountCompleted,
            id: row.id,
          }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.$message({
              message: res.data.resultDesc,
              type: "success",
            });
            // this.search();
          } else {
            console.log(res.data.resultDesc);
            this.$message({
              message: res.data.resultDesc,
              type: "warn",
            });
          }
        });
    },
    search() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslMemberList`
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
