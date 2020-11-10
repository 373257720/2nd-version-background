<template>
  <div id="contract_terms">
 
      <header>{{$t('project.contractTerms')}}</header>

    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item class="companyname" v-for="(item,idx) in arr" :key="item.title">
        <span style="color: #606266;">{{$i18n.locale==="en_US"?item.titleEn:item.title}}</span>
        <i @click="additem(item,idx)" class="el-icon-circle-plus-outline addsymbol"></i>
        <i @click="deleteitem(idx)" class="el-icon-delete"></i>
        <div class="Currencyrange">
          <div class="additem" v-for="(it,index) in item.terms" :key="index">
            <span class="order">{{index+1}}.</span>
            <el-input
              class="shuru"
              v-model="it.item_ch"
              placeholder="中文"
              @change="(value)=>{translate(value,it,index)}"
            ></el-input>
            <el-input
              class="shuru"
              :suffix-icon="it.loading"
              v-model="it.item_En"
              placeholder="English"
            ></el-input>
            <!-- @input="minimum(it, index)" -->
            <el-button @click="deleteterms(idx,index)" type="primary" icon="el-icon-delete"></el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div>添加条款：</div>
    <p class="dialog-add">
      <el-input placeholder="中文" @change="translate" v-model="newtitle"></el-input>
      <el-input placeholder="English" :suffix-icon="loading" v-model="newtitleEN"></el-input>
      <button @click="addtitle">增加</button>
    </p>
    <p class="dialog-footer">
      <button @click="$routerto('industry_lists')">{{$t('project.Cancel')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('project.Confirm')}}</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelposition: "top",
      loading: "",
      restaurants: [],
      watch: true,
      formLabelWidth: "100px",
      newtitle: "",
      newtitleEN: "",
      arr: [
        {
          title: "费率:",
          titleEn: "Fee sharing mechanism:",
          terms: [
            {
              item_ch: "",
              item_En: "",
              loading: ""
            }
          ]
        }
      ],
      form: {
        saveOrUpdate: this.$route.query.type,
        projectUserId: "",
        financingStage: "",
        projectName: "",
        projectDescribe: "",
        projectCompany: "",
        projectCompanyEn: "",
        collectMoneyMin: "",
        collectMoneyMax: "",
        currencyType: "",
        projectMobile: "",
        projectEmail: "",
        projectDetail: "",
        projectLan: "",
        projectId: "",
        industryId: "",
        projectIndustry: "",
        projectIndustryEn: "",
        potentialInvestorsTagsEn: "",
        potentialInvestorsTags: "",
        bslAreaCode: "",
        projectArea: "",
        projectAreaEn: "",
        projectNameEn: "",
        projectDescribeEn: "",
        projectDetailEn: ""
      },

      rules: {
        // potentialInvestorsTagsEn: [
        //   {
        //     required: true,
        //     message: "Please input",
        //     trigger: "blur"
        //   }
        // ],
        // potentialInvestorsTags: [
        //   {
        //     required: true,
        //     message: "Please input",
        //     trigger: "blur"
        //   }
        // ],
        // projectNameEn: [
        //   {
        //     required: true,
        //     message: "Please input",
        //     trigger: "blur"
        //   },
        //   {
        //     min: 1,
        //     max: 500,
        //     message: "Between 1 and 300 characters in length",
        //     trigger: "blur"
        //   }
        // ],
        // projectDescribeEn: [
        //   {
        //     required: true,
        //     message: "Please input",
        //     trigger: "blur"
        //   }
        //   // {
        //   //   min: 1,
        //   //   max: 1500,
        //   //   message: "长度在 1 到 1500个字符",
        //   //   trigger: "blur"
        //   // }
        // ],
        // projectDetailEn: [
        //   {
        //     required: true,
        //     message: "Please input",
        //     trigger: "blur"
        //   },
        //   {
        //     min: 1,
        //     trigger: "blur"
        //   }
        // ],
        // collectMoneyMax: [
        //   {
        //     required: true,
        //     validator: validatePass2,
        //     trigger: "blur"
        //   }
        // ],
        // collectMoneyMin: [
        //   {
        //     required: true,
        //     validator: validatePass,
        //     trigger: "blur"
        //   }
        // ],
        // currencyType: [
        //   {
        //     required: true,
        //     message: this.$t("project.PleaseSelect"),
        //     trigger: "change"
        //   }
        // ],
        // projectCompany: [
        //   {
        //     required: true,
        //     message: this.$t("UserManagement.PleaseEnter"),
        //     trigger: "change"
        //   }
        // ],
        // bslAreaCode: [
        //   {
        //     required: true,
        //     message: this.$t("project.PleaseSelect"),
        //     trigger: "change"
        //   }
        // ],
        // projectIndustry: [
        //   {
        //     required: true,
        //     message: this.$t("project.PleaseSelect"),
        //     trigger: "change"
        //   }
        // ],
        // projectDescribe: [
        //   {
        //     required: true,
        //     message: this.$t("UserManagement.PleaseEnter"),
        //     trigger: "blur"
        //   },
        //   {
        //     min: 1,
        //     max: 300,
        //     message: "长度在 1 到 300个字符",
        //     trigger: "blur"
        //   }
        // ],
        // projectName: [
        //   {
        //     required: true,
        //     message: this.$t("UserManagement.PleaseEnter"),
        //     trigger: "blur"
        //   },
        //   {
        //     min: 1,
        //     max: 300,
        //     message: "长度在 1 到 300 个字符",
        //     trigger: "blur"
        //   }
        // ],
        // projectDetail: [
        //   {
        //     required: true,
        //     message: this.$t("UserManagement.PleaseEnter"),
        //     trigger: "blur"
        //   },
        //   {
        //     min: 1,
        //     trigger: "blur"
        //   }
        // ],
        // financingStage: [
        //   {
        //     required: true,
        //     message: this.$t("project.PleaseSelect"),
        //     trigger: "change"
        //   }
        // ],
        // projectMobile: [
        //   {
        //     required: true,
        //     message: this.$t("UserManagement.PleaseEnter"),
        //     trigger: "blur"
        //   }
        // ],
        // projectEmail: [
        //   {
        //     required: true,
        //     message: this.$t("UserManagement.PleaseEnterEmail"),
        //     trigger: "blur"
        //   },
        //   {
        //     type: "email",
        //     message: this.$t("UserManagement.EmailFormatIsIncorrect"),
        //     trigger: ["blur", "change"]
        //   }
        // ]
      }
    };
  },

  created() {},
  computed: {},
  mounted() {},
  methods: {
    async translate(value, it) {
      //  console.log(value,it)

      if (it) {
        this.$set(it, "loading", "el-icon-loading");
        let a = await this.$global.translateL(value);
        this.$set(it, "loading", "");
        if (a.trans_result instanceof Array) {
          this.$set(it, "item_En", a.trans_result[0].dst);
        }
      } else {
        this.loading = "el-icon-loading";
        let a = await this.$global.translateL(value);
        this.loading = "";
        if (a.trans_result instanceof Array) {
          this.newtitleEN = a.trans_result[0].dst;
        }

        //  let a = await this.$global.translateL(value);
      }
    },
    additem(item, idx) {
      //   console.log(this.arr);
      this.arr[idx].terms.push({
        item_ch: "",
        item_En: "",
        loading: ""
        //     }
      });
      //    this.arr.item.push({
      //       //   key:1,
      //       title: this.newtitle,
      //       item_ch: ""
      //     });
    },
    deleteitem(idx) {
      this.arr.splice(idx, 1);
      // if(this.arr.length===1){
      //   return
      // }
      //   this.arr[index].terms.splice(index, 1);
    },
    deleteterms(idx, index) {
      if (this.arr[idx].terms.length > 1) {
        this.arr[idx].terms.splice(index, 1);
      } else {
        this.$message("最少为1");
      }
    },
    addtitle() {
      let a = true;
      if (this.newtitle && this.newtitleEN) {
        this.arr.forEach((item, idx) => {
          if (item.title === this.newtitle || item.titleEn===this.newtitleEN) {
            a = false;
          }
        });
        if (a) {
          this.$nextTick(() => {
            this.arr.push({
              title: this.newtitle,
              titleEn: this.newtitleEN,
              terms: [
                {
                  item_ch: "",
                  item_En: "",
                  loading: ""
                }
              ]
            });
          });
        }
      }
    },

    get_formdata() {
      this.region_remoteMethod();
      this.remoteMethod();
      let {
        projectId: projectId,
        signStatus: signStatus,
        signId: signId
      } = this.$route.query;
      let get_form = {
        // lan:this.$i18n.locale,
        projectId: projectId,
        signStatus: signStatus,
        signId: signId
      };
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getProjectDetailsList`,
          get_form
        )
        .then(res => {
          let chineseLists = res.data.data[0];
          let EngLists = res.data.data[1];
          for (let i in chineseLists) {
            for (let j in this.form) {
              if (j == i) {
                this.form[j] = chineseLists[i];
                if (j == "collectMoneyMin" || j == "collectMoneyMax") {
                  this.form[j] = this.form[j].toLocaleString();
                  if (/\./i.test(this.form[j])) {
                    //判断处理含有.的情况下
                    if (this.form[j].split(".").length > 1) {
                      if (this.form[j].split(".")[1].length < 2) {
                        this.form[j] = this.form[j] + "0";
                      }
                    }
                  } else {
                    this.form[j] = this.form[j] + ".00";
                  }
                }
              }
            }
          }
          this.form.projectDescribeEn = EngLists.projectDescribe;
          this.form.projectDetailEn = EngLists.projectDetail;
          this.form.projectCompanyEn = EngLists.projectCompany;
          this.form.projectNameEn = EngLists.projectName;
          this.form.projectIndustryEn = EngLists.projectIndustry;
          this.form.projectAreaEn = EngLists.projectArea;
          this.form.potentialInvestorsTagsEn = EngLists.potentialInvestorsTags;
        });
    },
    remoteMethod(query) {
      let type = typeof query;
      if (type == "string") {
        this.loading = true;
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getRelationCompany`,
            {
              searchKey: query
            }
          )
          .then(res => {
            this.loading = false;
            this.restaurants = res.data.data;
            if (this.restaurants.length <= 0) {
              this.form.projectCompany = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.loading = true;
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getRelationCompany`
          )
          .then(res => {
            this.loading = false;
            this.restaurants = res.data.data;
            console.log(this.restaurants);
            if (this.restaurants.length <= 0) {
              this.form.projectCompany = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deepClone(source) {
      const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) {
        // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === "object") {
            // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = deepClone(source[keys]);
          } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit();
        } else {
          return false;
        }
      });
    },
    commit() {
      let cloneObj = this.deepClone(this.form);
      cloneObj.collectMoneyMax = cloneObj.collectMoneyMax.replace(/,/g, "") * 1;
      cloneObj.collectMoneyMin = cloneObj.collectMoneyMin.replace(/,/g, "") * 1;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/saveProject`,
          cloneObj
        )
        .then(res => {
          // if (res.data.resultCode == 10000) {
          //   this.$store.dispatch("submit_formdata_action", res.data.data);
          // }
          this.warning(res.data.resultCode, res.data.resultDesc);
        });
    },
    warning(resultCode, reminder) {
      let self = this;
      if (resultCode == 10000) {
        this.$confirm(reminder, self.$t("project.Reminder"), {
          confirmButtonText: self.$t("project.Confirm"),
          type: "warning",
          center: true,
          showCancelButton: false
        }).then(() => {
          // this.$routerto("addproject_eng",this.$route.query)
          // this
          this.$routerto("tosignuproot");
        });
      } else {
        this.$confirm(reminder, self.$t("project.Reminder"), {
          confirmButtonText: self.$t("project.Confirm"),
          // cancelButtonText: "取消",
          type: "warning",
          center: true,
          showCancelButton: false
        }).then(() => {
          // this.$routerto("addproject_eng",this.$route.query)
          // this
          // this.$routerto('tosignuproot')
        });
      }
    }
  }
};
</script>

<style lang='scss'>
#contract_terms {
  .Currencyrange {
    margin-bottom: 22px;
    .el-input--suffix .el-input__inner {
    }
    .shuru {
      width: 35%;
    }
    div.additem {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .order {
        padding: 0 10px;
      }
    }

    .el-button {
      padding: 0;
      /*background: #2ABEE2;*/
      background: none;
      border: none;
    }
    .el-input {
      //   width: 120px;
    }
    .el-select {
      .el-input {
        /*width:125px;*/
      }
    }
    .el-input__inner {
      /*width: 100px;*/
      padding: 0 10px;
      font-size: 12px;
    }

    > div {
      display: flex;
      /*justify-content: space-between;*/
      align-items: center;
      .el-form-item {
        /*width: 20%;*/
        margin-bottom: 0;
      }
      i {
        /*width: 20%;*/
        font-size: 20px;
        color: #606266;
        text-align: center;
      }
    }
  }
  .el-select {
    width: 100%;
  }

  .el-button--primary {
    width: 200px;
  }

  .money_range {
    margin-bottom: 22px;

    span {
      vertical-align: middle;
      float: left;
      float: none;
      display: inline-block;
      text-align: left;
      padding: 0 0 10px;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    span:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-form-item {
        width: 40%;
        margin-bottom: 0;
      }

      i {
        /*width: 20%;*/
        font-size: 20px;
        color: #606266;
        text-align: center;
      }
    }
  }

  .el-dialog {
    .el-dialog__header {
      background: #edf1f4;
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      /*text-align: left;*/
      height: 50px;
      box-sizing: border-box;
      padding: 10px 20px;
      position: relative;
    }

    .thick {
      p {
        margin-bottom: 10px;

        span {
          display: block;
          margin-bottom: 8px;
        }
      }
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
  }

  .companyname {
    .my-autocomplete {
      li {
        line-height: normal;
        padding: 7px;

        .name {
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .addr {
          font-size: 12px;
          color: #b4b4b4;
        }

        .highlighted .addr {
          color: #ddd;
        }
      }
    }
  }
}

.contract_terms_bottom {
  text-align: center;
  padding-top: 30px;

  .el-button {
    width: 98px;
  }
}
</style>

<style lang='scss' scoped>
div.selected {
  color: #409eff;
  font-weight: 700;
}

#contract_terms {
  width: 800px;
  margin: 0 auto;
  padding: 40px 0;

  header {
    text-align: center;
    margin: 50px 0;
    font-size: 26px;
  }

  > div {
    margin-bottom: 15px;

    > p {
      margin-bottom: 10px;
    }
  }

  .industry {
    i {
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left: 90px;
      top: -38px;
      color: #606266;
    }

    i:hover {
      color: #00adef;
    }
  }
  .dialog-add {
    // padding-top: 20px;
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    .el-input {
      width: 35%;
    }
    button {
      /*color: #FFF;*/
      width: 20%;
      height: 40px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
      background-color: #edf1f4;
      border: 1px solid #dcdfe6;
    }
  }
  .dialog-footer {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
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
  }

  .currencyType {
    i {
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left: 90px;
      top: -38px;
      color: #606266;
    }

    i:hover {
      color: #00adef;
    }
  }
}
</style>
