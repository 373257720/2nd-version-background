<template>
  <div class="coin_category_alter">
    <!-- <header class="coin_category_alter_header">{{title}}</header> -->
    <header class="coin_category_alter_header">{{$t('Contract.ViewContract')}}</header>
    <header class="coin_category_alter_header">合同模板对象：{{contractType[title]}}</header>
    <el-main>
      <div class="contract_content">{{$t('Contract.Content')}}</div>
      <el-input type="textarea" autosize placeholder v-model="textarea1"></el-input>
      <!-- <el-form
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
        <el-form-item :label="$t('CategoryOfCoin.Description')" prop="currencyName">
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
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="coin_category_summit.currencySort"
          ></el-input>
        </el-form-item>
      </el-form>-->
      <p class="dialog-footer">
        <button @click="$router.go(-1)">{{$t('project.Confirm')}}</button>
        <!-- <button @click="submitForm('ruleForm')">{{$t('project.Confirm')}}</button> -->
      </p>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contractType: [
        this.$t("Contract.ProjectownerAndIntermediary"),
        this.$t("Contract.IntermediaryAndIntermediary")
      ],
      title: "",
      previewName: "",
      dialogVisible: false,
      textarea1: "",
      previewUrl: ""
    };
  },
  created() {
    this.id = parseInt(this.$route.query.Id);
    this.title = parseInt(this.$route.query.type);
    // console.log(this.title);

    this.search();
    // if (this.$route.query.currencyId) {
    //   this.title = this.$t(
    //     "CategoryOfCoin.Pleaseenterthecurrencyyouwanttoedit"
    //   );
    //   this.coin_category_summit.currencyId = this.$route.query.currencyId;
    //   this.search();
    // } else {
    //   this.title = this.$t(
    //     "CategoryOfCoin.Pleaseenterthecurrencyyouwanttoincrease"
    //   );
    // }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
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
          `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/getWordContractTemplate`,
          {
            fileId: this.id
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.resultCode == 10000) {
            this.textarea1 = res.data.data.readWord;
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
        .then(result => {
          console.log(result);
          this.$confirm(result.data.resultDesc, self.$t("project.Reminder"), {
            confirmButtonText: self.$t("project.Confirm"),
            center: true,
            showCancelButton: false
          }).then(() => {
            if (result.data.resultCode == 10000) {
              this.$routerto("coin_category_lists");
            }
          });
        });
    }
  }
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
    width: 60%;
    margin: 0 auto;
    .contract_content {
      width: 100%;
      // height: 500px;
      background-color: #fff;
    }
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
        width: 100%;
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
