<template>
  <div class="editLevel">
    <!-- <header class="editLevel_header">{{title}}</header> -->
    <el-main>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="会员等级名称:" prop="memberLevelName">
          <el-input
            placeholder="请输入大于0的整数"
            show-word-limit
            maxlength="50"
            clearable
            v-model="ruleForm.memberLevelName"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员等级名称:" prop="memberLevelNameEn">
          <el-input
            placeholder="请输入大于0的整数"
            show-word-limit
            maxlength="50"
            clearable
            v-model="ruleForm.memberLevelNameEn"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员等级:" prop="memberLevel">
          <el-input
            placeholder="请输入大于0的整数"
            show-word-limit
            maxlength="50"
            clearable
            v-model="ruleForm.memberLevel"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员积分" prop="memberLevelIntegral">
          <el-input
            placeholder="请输入大于0的整数"
            show-word-limit
            maxlength="50"
            clearable
            v-model="ruleForm.memberLevelIntegral"
          ></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="memberColour">
          <el-color-picker v-model="ruleForm.memberColour"></el-color-picker>
        </el-form-item>
        <el-form-item label="总共可推荐项目次数" prop="memberRecommendCount">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="ruleForm.memberRecommendCount"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="优先推荐中间人时间（月）"
          prop="recommendMiddlemanTime"
        >
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="ruleForm.recommendMiddlemanTime"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="优先推荐投资人时间（月）"
          prop="recommendInvestorTime"
        >
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="ruleForm.recommendInvestorTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员有效期" prop="memberTime">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="ruleForm.memberTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="保级积分值" prop="relegationIntegralValue">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="ruleForm.relegationIntegralValue"
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="dialog-footer">
        <button @click="$routerto('MembershipSystemArrangment')">
          {{ $t("project.Cancel") }}
        </button>
        <button @click="submitForm('ruleForm')">
          {{ $t("project.Confirm") }}
        </button>
      </p>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    var validIndustryNameCh = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g,"");
      // let a=/^[\u4E00-\u9FA5][\u4E00-\u9FA5\s]*[\u4E00-\u9FA5]$/.test(str);
      // if(a){
      //   this.ruleForm.industryNameCh=str;
      //   callback()
      // }else {
      //   callback(new Error('请输入中文'));
      // }
      if (value) {
        this.ruleForm.industryNameCh = value
        callback()
      } else {
        callback(new Error('请输入中文'))
      }
    }
    var validIndustryNameEn = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g, "");
      // let a = /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
      // if (a) {
      //   this.ruleForm.industryNameEn = str;
      //   callback();
      // } else {
      //   callback(new Error("Please Input English"));
      // }

      if (value) {
        this.ruleForm.industryNameEn = value
        callback()
      } else {
        callback(new Error('请输入大于0的整数'))
      }
    }
    return {
      dialogFormVisible_industry: false,
      tableData: [],
      title: '',
      ruleForm: {
        memberLevelName: '',
        memberLevelNameEn: '',
        memberLevel: null,
        id: null,
        memberLevelIntegral: null,
        memberColour: '',
        memberRecommendCount: 0,
        recommendMiddlemanTime: null,
        recommendInvestorTime: null,
        memberTime: null,
        relegationIntegralValue: null
      },
      rules: {
        industrySort: [
          {
            required: true,
            message: this.$t('industry.Pleaseenterthanzero'),
            trigger: 'blur'
          }
        ],
        industryNameCh: [
          { required: true, validator: validIndustryNameCh, trigger: 'blur' }
        ],
        industryNameEn: [
          { required: true, validator: validIndustryNameEn, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.ruleForm.id = this.$route.query.Id * 1
    // if (this.$route.query.Id) {
    //   this.title = this.$t("industry.Pleaseenterindustrytobeedited");
    //   this.ruleForm.industryId = this.$route.query.industryId;

    // } else {
    //   this.title = this.$t("industry.Pleaseentertheindustrytobeadded");
    // }
    this.search()
  },
  // watch:{
  //   ruleForm: {
  //     handler(newName, oldName) {
  //       // console.log(newName, oldName)
  //      // let str = newName.replace(/\s*/g,"");

  //       // this.ruleForm.industryNameCh=newName.industryNameEn.replace(/\s*/g,"");
  //       // this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')
  //       // if(/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(newName.industryNameEn)){
  //       //   console.log(newName)
  //       //   newName=oldName
  //       // }
  //       ;
  //     },
  //     deep: true,
  //     immediate: true
  //   },
  // },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add_industry()
        } else {
          return false
        }
      })
    },
    search () {
      console.log(this.$route)
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/detailsBslMemberSystem`,
          { id: this.$route.query.Id }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            let tableData = res.data.data
            for (var key in tableData.bslMemberSystem) {
              for (var name in this.ruleForm) {
                if (key === name) {
                  this.ruleForm[name] = tableData.bslMemberSystem[key]
                }
              }
            }
            console.log(this.ruleForm)
          }
        })
    },
    add_industry () {
      console.log(this.ruleForm)
      let self = this
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/saveModifyBslMemberSystem`,
          self.ruleForm
        )
        .then((result) => {
          this.$confirm(result.data.resultDesc, self.$t('project.Reminder'), {
            confirmButtonText: self.$t('project.Yes'),
            center: true,
            showCancelButton: false
          }).then(() => {
            if (result.data.resultCode === 10000) {
              this.$routerto('MembershipSystemArrangment')
            }
          })
        })
    }
  }
}
</script>

<style lang='scss'>
.editLevel {
  padding: 80px 0;
  .editLevel_header {
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
