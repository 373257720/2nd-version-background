<template>
  <div class="tagList">

    <el-main>
      <el-form
        ref="ruleForm"
        :model="coin_category_summit"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="English Name" prop="tagsNameEn">
          <el-input
            placeholder="Exo（China）"
            show-word-limit
            maxlength="50"
            clearable
            v-model="coin_category_summit.tagsNameEn"
          ></el-input>
        </el-form-item>
        <el-form-item label="中文标签" prop="tagsName">
          <el-input
            placeholder="例（China）"
            show-word-limit
            maxlength="50"
            clearable
            v-model="coin_category_summit.tagsName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('industry.SerialNumber')" prop="tagsSort">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="coin_category_summit.tagsSort"
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="dialog-footer">
        <button >{{$t('project.Cancel')}}</button>
        <button @click="submitForm('ruleForm')">{{$t('project.Confirm')}}</button>
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
        this.coin_category_summit.tagsNameEn = value;
        //  console.log(this.coin_category_summit.tagsNameEn)
        callback();
      } else {
        callback(new Error("Please enter english"));
      }
    };
    var valid_currencyName = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g,"");
      // let a=/^[\u4E00-\u9FA5][\u4E00-\u9FA5\s]*[\u4E00-\u9FA5]$/.test(str);
      if (value) {
        this.coin_category_summit.tagsName = value;
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
        tagsSort: null,
        tagsNameEn: "",
        tagsName: ""
      },
      rules: {
        tagsSort: [
          {
            required: true,
            message: this.$t("industry.Pleaseenterthanzero"),
            trigger: "blur"
          }
        ],
        tagsNameEn: [
          { required: true, validator: valid_currencytype, trigger: "blur" }
        ],
        tagsName: [
          { required: true, validator: valid_currencyName, trigger: "blur" }
        ]
      }
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.add_tag();
        } else {
          return false;
        }
      });
    },

    add_tag() {
      // console.log(this.coin_category_summit)
      let self = this;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/addProjectTags`,
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
             self.coin_category_summit.tagsSort=null;
               self.coin_category_summit.tagsNameEn='';
                 self.coin_category_summit.tagsName='';
            }
          });
        });
    }
  }
};
</script>

<style lang='scss'>
.tagList {
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
