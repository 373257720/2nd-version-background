<template>
  <div class="tosignuproot">
    <el-main>
      <header class="tosignup_header">
        <!-- <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            value-format="timestamp"
            :start-placeholder="$t('project.Start')"
            :default-time="['00:00:00', '23:59:59']"
            :end-placeholder="$t('project.End')"
          ></el-date-picker>
        </div>-->
        <!-- <el-select v-model="value" :placeholder="$t('project.PleaseSelect')" class="block">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
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
          @click="search(value,value1, 1, pagesize)"
        >{{$t('project.Search')}}</el-button>
        <el-button
          @click="$routerto('addproject_ch',{type:0})"
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="addbtn block"
        >{{$t('project.Addproject')}}</el-button>
      </header>
      <el-table :data="tableData" border style="width:100%;">
        <el-table-column
          fixed
          prop="createTime"
          :label="$t('project.CreationDate')"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="optTime"
          :label="$t('project.DateOfApplication')"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          :label="$t('project.ProjectName')"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectCompany"
          :label="$t('project.IndividualOrCompany')"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectStatus"
          :label="$t('project.ProcessStatus')"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span>{{project_status[scope.row.projectStatus]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectLifeCycle"
          :label="$t('project.ProjectStatus')"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.projectLifeCycle===0?$t('project.Normal'):scope.row.projectLifeCycle==1?$t('project.Deleted'):'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >{{$t('project.View')}}</el-button>
            <el-button
              @click="deleterow(scope.row)"
              type="text"
              prop="projectLifeCycle"
              v-if="scope.row.projectLifeCycle===0"
              size="small"
            >{{$t('project.Delete')}}</el-button>
            <el-button
              @click="handleEdit(scope.row)"
              v-if="scope.row.projectLifeCycle===0"
              type="text"
              size="small"
            >{{$t('project.Edit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagevue
        :pagenum="pagetotal"
        :currentpages="currentpage"
        :pagesizes="pagesize"
        v-on:fromchildren="fromchildren1"
      ></pagevue>-->
      <el-pagination :page-size="pagesize" layout="slot">
        <span class="finger" @click="changePage('previous')">上一页</span>
        <span class="finger" @click="changePage('next')">下一页</span>
      </el-pagination>
    </el-main>

    <el-dialog :title="$t('project.Reminder')" v-model="fafa" width="30%" height="50%">
      <span>{{this.$store.state.commondialog}}</span>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
// 待处理项目->1 待签约项目->2 投行拒绝和投资人签约(拒绝签约项目) ->3 已签约待上链->4
// 已上链待推荐->5  待审核项目->6  投行审核中间人提交的投资人资料拒绝（已审核拒绝）->7
// 已审核待发送8   待确认项目->9  签约成功项目->10  投资人拒绝中间人邮箱发送的项目投资邀请（拒绝签约项目）->11
export default {
  name: "tosignuproot",
  data() {
    return {
      fafa: this.$store.state.commondialog,
      value1: null, //日期选择
      value: "", //项目状态
      searchkey: "",
      currentpage: null,
      pageArr: [null],
      pagesize: 3,
      bookmark: "",
      currentpageSerial: 0,
      pagetotal: null,
      options: [
        {
          value: -1,
          label: this.$t("project.All")
        },
        {
          value: 0,
          label: this.$t("project.UnPendingItems")
        },
        {
          value: 1,
          label: this.$t("project.PendingItems")
        },
        {
          value: 2,
          label: this.$t("project.ToBeSignedProject")
        },
        {
          value: 3,
          label: this.$t("project.InvestmentBankHasRejected")
        },
        {
          value: 4,
          label: this.$t("project.SignedForChain")
        },
        // {
        //   value: 5,
        //   label: this.$t('project.ChainedForRecommendation')
        // },
        {
          value: 6,
          label: this.$t("project.PendingReview")
        },
        {
          value: 7,
          label: this.$t("project.InvestmentBankHasRejectedinvestors")
        },
        {
          value: 8,
          label: this.$t("project.ReviewedPending")
        },
        {
          value: 9,
          label: this.$t("project.ProjectsToBeConfirmedByInvestors")
        },
        {
          value: 10,
          label: this.$t("project.SignedContract")
        },
        {
          value: 11,
          label: this.$t("project.InvestorHasRejected")
        }
      ],
      tableData: [],
      project_status: {
        "0": this.$t("project.UnPendingItems"),
        "1": this.$t("project.PendingItems"),
        "2": this.$t("project.ToBeSignedProject"),
        "3": this.$t("project.InvestmentBankHasRejected"),
        "4": this.$t("project.SignedForChain"),
        "5": this.$t("project.ChainedForRecommendation"),
        "6": this.$t("project.PendingReview"),
        "7": this.$t("project.InvestmentBankHasRejectedinvestors"),
        "8": this.$t("project.ReviewedPending"),
        "9": this.$t("project.ProjectsToBeConfirmedByInvestors"),
        "10": this.$t("project.SignedContract"),
        "11": this.$t("project.InvestorHasRejected")
      }
    };
  },
  created() {},
  activated() {
    this.search(this.currentpage, this.pagesize);
  },
  methods: {
    changePage(num) {
      if (num === "previous") {
        if (this.currentpageSerial > 0) {
          this.currentpageSerial--;
          this.search(this.pageArr[this.currentpageSerial], this.pagesize);
        }
      } else if (num === "next") {
        if (this.currentpageSerial < this.pageArr.length - 1) {
          this.currentpageSerial++;
          this.search(this.pageArr[this.currentpageSerial], this.pagesize);
        }
        // if (this.currentpageSerial <= this.pageArr.length - 1) {
        //   this.search(this.pageArr[this.currentpageSerial + 1], this.pagesize);
        // }
      }
    },
    deleterow(row) {
      // console.log(row);
      let self = this;
      this.$confirm(
        self.$t("project.Confirmdelect"),
        self.$t("project.Reminder"),
        {
          confirmButtonText: self.$t("project.Yes"),
          type: "warning",
          center: true,
          showCancelButton: false
        }
      )
        .then(() => {
          this.$global
            .get_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_admin_web/project/updateLifeCycle`,
              {
                projectId: row.id,
                projectLifeCycle: 1
              }
            )
            .then(res => {
              console.log(res);
              this.search(this.currentpage, this.pagesize);
            });
        })
        .catch(err => {});
    },
    handleEdit(row) {
      console.log(row);
      this.$routerto("addproject_ch", {
        type: 1,
        projectId: row.id,
        signStatus: row.signStatus,
        signId: row.signId
      });
    },
    handleClick(row) {
      // console.log(row);
      this.$router.push({
        name: "tosignup_check",
        query: {
          projectid: row.id,
          status: row.projectStatus
          // signId: row.signId
          // pagenum:this.currentpage,
          // userRespList:testStr
        }
      });
    },
    fromchildren1(data) {
      this.currentpage = data.currentpage;
      this.pagesize = data.pagesize;
      this.search(this.value, this.value1, this.currentpage, this.pagesize);
    },
    search(currentpage, size) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getProject`,
          {
            searchKeywords: this.searchkey,
            pageSize: size,
            bookmark: currentpage
          }
        )
        .then(res => {
          if (res.data.resultCode == 10090) {
            this.$store.dispatch("commondialogfunctionaysn", true);
            // console.log( this.$store.state.commondialog);
          } else if (res.data.resultCode == 10000) {
            let a = this.pageArr.every(item => {
              return item !== res.data.data.projectList.bookmark;
            });
            if (a) {
              if (res.data.data.projectList.data.length > 0) {
                this.pageArr.push(res.data.data.projectList.bookmark);
              }
            }
            this.tableData = [...res.data.data.projectList.data];
            this.tableData.forEach(item => {
              for (let key in item.record) {
                item[key] = item.record[key];
              }
              item.projectName =
                item.projectName || "English name of project not added";
              item.createTime = item.createTime
                ? this.$global.timestampToTime(item.createTime)
                : "-";
              item.optTime = item.optTime
                ? this.$global.timestampToTime(item.optTime)
                : "-";
            });
            // console.log(this.tableData);

            // this.pagetotal = res.data.data.projectList.fetchedRecordsCount;
          }
        });
    }
  }
};
</script>

<style lang='scss'>
.tosignuproot {
 .el-pagination{
       text-align: center;
 }
  .el-main {
    /*min-height: 590px;*/
    width: 80%;
  }
  .finger {
    cursor: pointer;
  }
  .tosignup_header {
    // height: 40px;
    // width: 100%;
    // width: 968px;
    display: flex;
    flex-wrap: wrap;
    // padding: 0 20px 0 20px;

    box-sizing: border-box;
    .block {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .el-select {
      width: 200px;
      .el-input--suffix {
        width: 100%;
        /*margin-right: 20px;*/
      }
    }
    .el-input--suffix {
      width: 150px;
      /*margin-right: 20px;*/
    }
    // el-button block
    // button.block2 {
    //   margin-right: 450px;
    // }
  }
}
</style>
