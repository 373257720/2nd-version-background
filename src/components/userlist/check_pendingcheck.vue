<template>
  <div id="check_pendingcheck">
    <div class="check_pending">
      <div class="check_pendingcheck" v-if="identityType!=2">
        <header>
          <ul class="pending_left">
            <li v-for="(value,key) in pending_individual" :key="key">
              <p>{{value.title}}</p>
              <el-input placeholder v-model="value.value" :disabled="true"></el-input>
            </li>
          </ul>
        </header>
        <main v-if="nationality==1 && identityPicOne">
          <aside>
            <p>{{$t('project.IDCardFront')}}</p>
            <nav>
              <el-popover placement="top" trigger="click">
                <img class="pic" :src="$axios.defaults.baseURL+identityPicOne" alt />
                <img slot="reference" :src="$axios.defaults.baseURL+identityPicOne" alt />
              </el-popover>
            </nav>
          </aside>
          <section>
            <p>{{$t('project.IDCardBack')}}</p>
            <nav>
              <!--              <img :src="identityPicTwo" alt />-->
              <el-popover placement="top" trigger="click">
                <img class="pic" :src="$axios.defaults.baseURL+identityPicTwo" alt />
                <img slot="reference" :src="$axios.defaults.baseURL+identityPicTwo" alt />
              </el-popover>
            </nav>
          </section>
        </main>
        <main v-else-if="nationality==2 && identityPicOne">
          <aside>
            <p>{{$t('project.passport')}}</p>
            <nav>
              <el-popover placement="top" trigger="click">
                <img class="pic" :src="$axios.defaults.baseURL+identityPicOne" alt />
                <img slot="reference" :src="$axios.defaults.baseURL+identityPicOne" alt />
              </el-popover>
            </nav>
          </aside>
        </main>
      </div>
      <div class="check_pendingcheck" v-if="identityType==2">
        <header>
          <ul class="pending_left">
            <li v-for="(value,key) in pending_company" :key="key">
              <p>{{value.title}}</p>
              <el-input placeholder v-model="value.value" :disabled="true"></el-input>
            </li>
          </ul>
        </header>
        <main v-if="userCompanyPic">
          <section>
            <p>{{$t('project.Certificate')}}</p>
            <nav>
              <el-popover placement="right" trigger="click">
                <img class="pic" :src="$axios.defaults.baseURL+userCompanyPic" alt />
                <img slot="reference" :src="$axios.defaults.baseURL+userCompanyPic" alt />
              </el-popover>
            </nav>
          </section>
          <section></section>
        </main>
      </div>
      <p class="dialog-footer">
        <button @click="dialogFormVisible = true">{{$t('project.Disapprove')}}</button>
        <button @click="dialogVisible = true">{{$t('project.Approve')}}</button>
      </p>
    </div>

    <el-dialog :title="$t('project.Disapprove')" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item :label="$t('project.DenialReason')">
          <el-checkbox-group v-model="form.type">
            <el-checkbox :label="$t('project.IDpictureisnotclear')" name="type"></el-checkbox>
            <el-checkbox :label="$t('project.Companynamedoesnotmatch')" name="type"></el-checkbox>
            <el-checkbox :label="$t('project.Personalinformationisincorrect')" name="type"></el-checkbox>
            <el-checkbox :label="$t('project.Else')" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('project.Cancel')}}</el-button>
        <el-button type="primary" @click="check(2)">{{$t('project.Confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('project.Reminder')"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <span>{{$t('project.Approve')}} ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible= false">{{$t('project.Cancel')}}</el-button>
        <el-button type="primary" @click="check(1)">{{$t('project.Confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: []
      },
      identityType: "",
      dialogFormVisible: false,
      dialogVisible: false,
      identityPicOne: "",
      identityPicTwo: "",
      userCompanyPic: "",
      idx: "",
      // formLabelWidth: "120px",
      pending_individual: {
        createTime: {
          title: this.$t("project.registerTime"),
          value: ""
        },
        userType: {
          title: this.$t("project.Type"),
          value: ""
        },
        identityType: {
          title: this.$t("project.Identity"),
          value: ""
        },
        bslEmail: {
          title: this.$t("project.Email"),
          value: ""
        },

        userCountry: {
          title: this.$t("project.Nationality"),
          value: ""
        },
        userName: {
          title: this.$t("project.PersonalName"),
          value: ""
        },
        userIdentity: {
          title: this.$t("project.IdentificationNumber"),
          value: ""
        }
        // optTime: {
        //   title: "验证时间",
        //   value: ""
        // }
      },
      nationality: "", //国籍
      pending_company: {
        createTime: {
          title: this.$t("project.registerTime"),
          value: ""
        },
        userType: {
          title: this.$t("project.Type"),
          value: ""
        },
        identityType: {
          title: this.$t("project.Identity"),
          value: ""
        },
        bslEmail: {
          title: this.$t("project.Email"),
          value: ""
        },
        userCountry: {
          title: this.$t("project.Nationality"),
          value: ""
        },
        userCompanyCh: {
          title: "公司名称",
          value: ""
        },
        userCompanyEn: {
          title: "Company name",
          value: ""
        },
        userAddressCh: {
          title: "公司地址",
          value: ""
        },
        userAddressEn: {
          title: "Company address",
          value: ""
        }
      }
      // pending_eng: {
      //   createTime: {
      //     title: "Registration time",
      //     value: ""
      //   },
      //   userType: {
      //     title: "type",
      //     value: ""
      //   },
      //   bslName: {
      //     title: "User Name",
      //     value: ""
      //   },
      //   userCountryEn: {
      //     title: "nationality",
      //     value: ""
      //   },
      //   userCompanyEn: {
      //     title: "Corporate name",
      //     value: ""
      //   },
      //   userIdentity: {
      //     title: "ID card",
      //     value: ""
      //   },
      //   optTime: {
      //     title: "Verification time",
      //     value: ""
      //   }
      // },
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    check(num) {
      var str;
      if (num == 1) {
        str = "";
      } else if (num == 2) {
        str = this.form.type.join(",");
      }
      this.dialogVisible = false;
      this.dialogFormVisible = false;

      // this.$axios({
      //   method: "post",
      //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/saveAuth?userId=${this.idx}&optStatus=${num}&optRemark=${str}`,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })

      this.$global
        .post_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/saveAuth`, {
          userId: this.idx,
          optStatus: num,
          optRemark: str
        })
        .then(res => {
          console.log(res);
          if (res.data.resultCode == 10000) {
            this.$router.push({ name: "verified_user" });
          }
        });
    }
  },
  created() {
    let self = this;
    this.idx = this.$route.query.idx;
    this.identityType = this.$route.query.userIdentityType;
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthDetail`,
        {
          userId: this.idx
        }
      )
      .then(res => {
        console.log(res.data.data);
        var arr = res.data.data;
        for (var key in arr) {
          if (key == "userType") {
            if (arr[key] == 1) {
              arr[key] = self.$t("project.ProjectParty");
            } else if (arr[key] == 4) {
              arr[key] = self.$t("project.Middleman");
            } else if (arr[key] == 3) {
              arr[key] = self.$t("project.Investor");
            }
          }
          if (key == "userCountryEn") {
            if (arr[key] == "China") {
              self.nationality = 1;
            } else {
              self.nationality = 2;
            }
          }
          if (key == "createTime") {
            arr[key] = self.$global.timestampToTime(arr[key]);
          }
        }
        if (arr.identityType) {
          if (this.identityType == 1) {
            arr.identityType = self.$t("project.individual");
            this.identityPicOne = arr.identityPicOne;
            this.identityPicTwo = arr.identityPicTwo;
            for (var key in this.pending_individual) {
              if (key == "userCountry") {
                self.pending_individual[key].value =
                  self.$i18n.locale == "zh_CN"
                    ? arr.userCountryCh
                    : arr.userCountryEn;
              } else {
                self.pending_individual[key].value = arr[key];
              }
            }
          } else if (this.identityType == 2) {
            arr.identityType = self.$t("project.company");
            self.userCompanyPic = arr.userCompanyPic;
            for (var key in this.pending_company) {
              if (key == "userCountry") {
                self.pending_company[key].value =
                  self.$i18n.locale == "zh_CN"
                    ? arr.userCountryCh
                    : arr.userCountryEn;
              } else {
                self.pending_company[key].value = arr[key];
              }
            }
          }
        }
      });
  }
};
</script>
<style lang='scss'>
.pic {
  width: 500px;
  height: 420px;
}
#check_pendingcheck {
  .el-button--primary {
    /*color: black;*/
  }
  .el-button--text {
    /*color: black;*/
  }
  .el-dialog__footer {
    text-align: center;
  }
  .el-button--text {
    width: 200px;
    background: #409eff;
    color: white;
  }
  .el-dialog__header {
    text-align: center;
    //  font-size: 20px;
  }
  .el-dialog__body {
    text-align: center;
    font-size: 15px;
  }
}
</style>

<style lang='scss' scoped>
#check_pendingcheck {
  padding: 80px 0;
  .check_pending {
    width: 900px;
    margin: 0 auto;
    p.dialog-footer {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      button {
        cursor: pointer;
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
  header {
    display: flex;
    width: 900px;
    justify-content: space-between;
    .pending_left {
      width: 900px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        margin-bottom: 30px;
        width: 400px;
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
  main {
    display: flex;
    width: 900px;
    margin-bottom: 50px;
    justify-content: space-between;
    p {
      margin-bottom: 10px;
    }
    nav {
      height: 200px;
      width: 400px;
      overflow: hidden;
      // background: #58bc58;
      border: 1px solid #e4e7ed;
      background-color: #f5f7fa;
      margin-bottom: 20px;
      border-radius: 4px;
      img {
        height: 200px;
        width: 400px;
      }
    }
  }

  /*footer.review {*/
  /*  width:100%;*/
  /*  margin: 0 auto;*/
  /*  margin-bottom: 60px;*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  p {*/
  /*    width: 400px;*/
  /*    text-align: center;*/
  /*  }*/

  /*}*/
}
</style>
