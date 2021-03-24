<template>
  <div class="coin_category_alter">
    <header class="coin_category_alter_header">{{ title }}</header>
    <el-main>
      <el-form
        ref="ruleForm"
        :model="coin_category_summit"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item :label="$t('project.Currency')" prop="currencyType">
          <el-input
            :placeholder="$t('CategoryOfCoin.forexampleHKD')"
            show-word-limit
            maxlength="50"
            clearable
            v-model="coin_category_summit.currencyType"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('CategoryOfCoin.Description')"
          prop="currencyName"
        >
          <el-input
            :placeholder="$t('CategoryOfCoin.forexamplegangbi')"
            show-word-limit
            maxlength="50"
            clearable
            v-model="coin_category_summit.currencyName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('industry.SerialNumber')" prop="currencySort">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            v-model="coin_category_summit.currencySort"
            @input="
              (value) =>
                (coin_category_summit.currencySort = $global.inputModel(
                  value,
                  0,
                  false
                ))
            "
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="dialog-footer">
        <button @click="$router.go(-1)">{{ $t("project.Cancel") }}</button>
        <button @click="submitForm('ruleForm')">
          {{ $t("project.Confirm") }}
        </button>
      </p>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    var valid_currencytype = (rule, value, callback) => {
      //  var str = value.replace(/(^\s*)|(\s*$)/g,"");
      //  let a=/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
      if (value) {
        this.coin_category_summit.currencyType = value;
        //  console.log(this.coin_category_summit.currencyType)
        callback();
      } else {
        callback(new Error("Please enter english"));
      }
    };
    var valid_currencyName = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g,"");
      // let a=/^[\u4E00-\u9FA5][\u4E00-\u9FA5\s]*[\u4E00-\u9FA5]$/.test(str);
      if (value) {
        this.coin_category_summit.currencyName = value;
        callback();
      } else {
        callback(new Error("请输入中文"));
      }
    };
    return {
      dialogFormVisible_industry: false,
      tableData: [],
      title: "",
      coin_category_summit: {
        currencyId: -1,
        currencySort: null,
        currencyType: "",
        currencyName: "",
      },
      rules: {
        currencySort: [
          {
            required: true,
            message: this.$t("industry.Pleaseenterthanzero"),
            trigger: "blur",
          },
        ],
        currencyType: [
          { required: true, validator: valid_currencytype, trigger: "blur" },
        ],
        currencyName: [
          { required: true, validator: valid_currencyName, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    if (this.$route.query.currencyId) {
      this.title = this.$t(
        "CategoryOfCoin.Pleaseenterthecurrencyyouwanttoedit"
      );
      this.coin_category_summit.currencyId = this.$route.query.currencyId;
      this.search();
    } else {
      this.title = this.$t(
        "CategoryOfCoin.Pleaseenterthecurrencyyouwanttoincrease"
      );
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add_coin();
        } else {
          return false;
        }
      });
    },
    search() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/currency/getAllCurrency`
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.tableData = [...res.data.data];
            this.tableData.forEach((item) => {
              if (item.currencyId == this.$route.query.currencyId) {
                this.coin_category_summit.currencySort = item.currencySort;
                this.coin_category_summit.currencyType = item.currencyType;
                this.coin_category_summit.currencyName = item.currencyName;
              }
            });
          }
        });
    },
    add_coin() {
      // console.log(this.coin_category_summit)
      let self = this;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/currency/saveOrUpdateCurrency`,
          self.coin_category_summit
        )
        .then((result) => {
          console.log(result);
          this.$confirm(result.data.resultDesc, self.$t("project.Reminder"), {
            confirmButtonText: self.$t("project.Confirm"),
            center: true,
            showCancelButton: false,
          }).then(() => {
            if (result.data.resultCode == 10000) {
              this.$routerto("coin_category_lists");
            }
          });
        });
    },
  },
};
</script>

<style lang='scss'>
.coin_category_alter {
  padding-top: 80px;
  .coin_category_alter_header {
    height: 40px;
    width: 80%;
    font-size: 20px;
    line-height: 40px;
    margin: 0 auto;
    text-align: center;
  }
  .el-main {
    width: 40%;
    margin: 0 auto;
    .thick {
      p {
        margin-bottom: 50px;
        span {
          display: block;
          margin-bottom: 10px;
        }
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
  }
}
</style>
