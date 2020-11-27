<template>
  <div class="userroot">
    <el-main>
      <header class="tosignup_header">
        <el-select v-model="issuccessful" :placeholder="$t('project.PleaseSelect')" class="block">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          :placeholder="$t('project.ProjectName')"
          v-model="keywords"
          class="block"
          clearable
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="block"
          @click="search"
        >{{$t('project.Search')}}</el-button>
      </header>
      <el-table :data="tableData" border style="width:100%;">
        <el-table-column
          prop="optTime"
          :label="$t('project.Verificationtime')"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bslEmail"
          :label="$t('project.Email')"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column prop="userCountry" :label="$t('project.Nationality')" align="center"></el-table-column>
        <el-table-column
          prop="newname"
          :label="$t('project.PersonalName')"
          show-overflow-tooltip
          min-width
          align="center"
        ></el-table-column>
        <el-table-column
          prop="registrationTime"
          :label="$t('project.registerTime')"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column prop="optStatus" :label="$t('project.Verifystatus')" align="center"></el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >{{$t('project.View')}}</el-button>

            <el-button @click="Frozen(scope.row)" type="text" size="small">
              {{scope.row.userStatus===1?$t('project.Recover'):scope.row.userStatus===0?$t('project.Frozen'):""}}
              <!-- {{$t('project.Frozen')}} -->
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagevue
        :pagenum="pagetotal"
        :currentpages="bookmark"
        :pagesizes="pagesize"
        v-on:fromchildren="fromchildren1"
      ></pagevue>
    </el-main>
    <el-dialog
      :title="$t('project.Reminder')"
      :visible.sync="dialogVisible"
      width="40%"
      center
      :before-close="handleClose"
    >
      <span>{{$t('project.PleaseComfirm')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible= false">{{$t('project.Cancel')}}</el-button>
        <el-button type="primary" @click="frozenFun(1)">{{$t('project.Confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "verified_userroot",
  data() {
    return {
      dialogVisible: false,
      ischeck: false,
      // currentpage: 1,
      pagesize: 8,
      issuccessful: null,
      keywords: "",
      pagetotal: null,
      tableData: [],
      bookmark: null,
      scopedRow: {},
      options: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 1,
          label: "通过"
        },
        {
          value: 2,
          label: "不通过"
        }
      ]
    };
  },
  created() {
    if (this.$route.query.pagenum) {
      // this.currentpage = this.$route.query.pagenum * 1;
    }
    this.changepage(this.bookmark, this.pagesize);
  },
  methods: {
    handleClose(done) {
      done();
    },
    search() {
      this.changepage(null, this.pagesize);
    },
    changepage(currentpage, pagesize) {
      let self = this;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthList`,
          {
            optStatus: this.issuccessful,
            keywords: this.keywords,
            bookmark: currentpage,
            pageSize: pagesize
          }
        )
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.data.data.map(item => {
              let newname;
              let optStatus;
              if (item.record.optStatus === 1) {
                optStatus = self.$t("project.Approve");
              } else if (item.record.optStatus === 2) {
                optStatus = self.$t("project.Disapprove");
              }
              if (item.record.userIdentityType == 1) {
                newname = item.record.userName;
              } else if (item.record.userIdentityType == 2) {
                newname =
                  this.$i18n.locale == "zh_CN"
                    ? item.record.userCompanyCh
                    : item.record.userCompanyEn;
              } else {
                newname = item.record.userName;
              }
              return {
                userId: item.id,
                userIdentityType: item.record.userIdentityType,
                registrationTime: item.record.registrationTime
                  ? this.$global.timestampToTime(item.record.registrationTime)
                  : "",
                newname: newname,
                userCountry:
                  this.$i18n.locale == "zh_CN"
                    ? item.record.userCountryCh
                    : item.record.userCountryEn,
                optTime: item.record.registrationTime
                  ? this.$global.timestampToTime(item.record.optTime)
                  : "",
                optStatus: optStatus,
                userStatus: item.record.userStatus,
                // userType: userType,
                bslEmail: item.record.bslEmail,
                submitTime: item.record.submitTime
                  ? this.$global.timestampToTime(item.record.submitTime)
                  : ""
              };
            });
          }
        });
    },
    frozenFun(data) {
      let userStatus;
      if (this.scopedRow.userStatus === 1) {
        userStatus = 0;
      } else if (this.scopedRow.userStatus === 0) {
        userStatus = 1;
      }
      this.$nextTick(() => {
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_admin_web/user/frozenThawUser`,
            {
              userId: this.scopedRow.userId,
              userStatus: userStatus
            }
          )
          .then(res => {
            this.dialogVisible = false;
            this.scopedRow.userStatus = userStatus;
          });
      });
    },
    Frozen(row) {
      this.dialogVisible = true;
      this.scopedRow = row;
    },
    handleClick(row) {
      this.$router.push({
        name: "usercheck",
        query: {
          idx: row.userId,
          userIdentityType: row.userIdentityType,
          pagenum: this.currentpage
        }
      });
      // this.$router.push("/home/userlist/verified_user/usercheck");
    },
    fromchildren1(data) {
      this.currentpage = data.currentpage;
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
.userroot {
  .el-dialog--center .el-dialog__body {
    text-align: center;
  }
  .el-main {
    width: 80%;
    /*min-height: 605px;*/
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
}
</style>
