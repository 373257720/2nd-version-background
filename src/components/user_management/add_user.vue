<template>
  <div id="add_user">
    <header>{{$t('UserManagement.Addnewbackgrounduser')}}</header>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item :label="$t('UserManagement.Backgroundaccount')"  prop="bslEmail">
        <el-input placeholder="Email" v-model.trim="ruleForm.bslEmail"></el-input>
      </el-form-item>
      <el-form-item :label="$t('UserManagement.Backgroundaccountname')"   prop="bslName">
        <el-input  v-model.trim="ruleForm.bslName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('UserManagement.password')"   prop="bslPwd">
        <el-input type="password" v-model="ruleForm.bslPwd"></el-input>
      </el-form-item>
      <el-form-item  :label="$t('UserManagement.confirmpassword')"   prop="bslPwd2">
        <el-input type="password" v-model="ruleForm.bslPwd2"></el-input>
      </el-form-item>
<!--      <el-form-item class="add_user_bottom">-->
<!--        <el-button type="primary" @click="$router.go(-1)">返回</el-button>-->
<!--        <el-button type="primary" class="next" @click="submitForm('ruleForm')">提交</el-button>-->
<!--      </el-form-item>-->

    </el-form>
    <p  class="dialog-footer">
      <button @click="$router.go(-1)" >{{$t('project.Back')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('project.Confirm')}}</button>
    </p>
  </div>
</template>

<script>
// import qs from "qs";
// import { log } from "util";
export default {
  data () {
    let self = this
    var checkData1 = (rule, value, callback) => {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error(self.$i18n.locale === 'en_US' ? 'Password cannot enter Chinese characters' : '密码不能输入汉字!'))
        } else {
          callback()
        }
      }
      callback()
    }
    var checkEmail = (rule, value, callback) => {
      let ruleReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value) {
        if (!ruleReg.test(value)) {
          callback(new Error(this.$t('UserManagement.EmailFormatIsIncorrect')))
        } else {
          callback()
        }
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(self.$t('UserManagement.PleaseEnterNewPassword')))
      } else {
        // if (this.ruleForm.bslPwd !== '') {
        //   // this.$refs.ruleForm.validateField('bslPwd');
        // }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(self.$t('UserManagement.PleaseEnterNewPasswordagain')))
      } else if (value !== this.ruleForm.bslPwd) {
        callback(new Error(self.$t('UserManagement.PasswordsEnteredTwiceAreInconsistent')))
      } else {
        callback()
      }
    }
    return {
      labelposition: 'top',
      ruleForm: {
        bslEmail: '',
        bslName: '',
        bslPwd: '',
        bslPwd2: ''
      },
      rules: {
        bslPwd: [
          { validator: checkData1, trigger: 'blur' },
          { required: true, validator: validatePass, trigger: 'blur' }],
        bslPwd2: [ { validator: checkData1, trigger: 'blur' }, { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        bslName: [
          { required: true, message: this.$t('UserManagement.PleaseEnter'), trigger: 'blur' }
        ],
        bslEmail: [
         
          { required: true, message: this.$t('UserManagement.PleaseEnterEmail'), trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
          // {
          //   type: 'email',
          //   message: this.$t('UserManagement.EmailFormatIsIncorrect'),
          //   trigger: ['blur', 'change']
          // }
        ]
      }

    }
  },
  created () {

  },
  methods: {
    // back() {
    //   this.$routerto('user_managementlists',{pagenum:this.$route.query.pagenum});
    // },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit()
        } else {
          return false
        }
      })
    },
    commit () {
      // let cloneObj = this.deepClone(this.form);
      let cloneObj = {
        bslEmail: this.ruleForm.bslEmail,
        bslName: this.ruleForm.bslName,
        bslPwd: this.ruleForm.bslPwd
      }
      // this.$axios({
      //   method: "post",
      //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/saveAdminUser?`,
      //   data: this.$qs.stringify(cloneObj),
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })
      this.$global.post_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/saveAdminUser`, cloneObj)
        .then(res => {
          if (res.data.resultCode == 10000) {
            this.$store.dispatch('submit_formdata_action', res.data.data)
          // this.$routerto("tosignuproot");
          }
          this.warning(res.data.resultCode, res.data.resultDesc)
        })
    },
    warning (resultCode, reminder) {
      let self = this
      if (resultCode == 10000) {
        this.$confirm(reminder, self.$t('project.Reminder'), {
          confirmButtonText: self.$t('project.Confirm'),
          type: 'warning',
          center: true,
          showCancelButton: false
        }).then(() => {
          this.$routerto('tosignuproot')
        })
      } else {
        this.$confirm(reminder, self.$t('project.Reminder'), {
          confirmButtonText: self.$t('project.Confirm'),
          // cancelButtonText: "取消",
          type: 'warning',
          center: true,
          showCancelButton: false
        })
      }
    }

  }
}
</script>

<style lang='scss'>
#add_user {
  .el-select {
    width: 100%;
  }
  .el-button--primary {
    width: 200px;
  }
  .money_range{
    margin-bottom: 22px;
    span{
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
      content: '*';
      color: #F56C6C;
      margin-right: 4px;
    }
    >div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-form-item{
        width: 40%;
        margin-bottom: 0;
      }
        i{
          /*width: 20%;*/
          font-size: 20px;
          color: #606266;
          text-align: center;
        }
    }
  }
  .el-dialog{
    .el-dialog__header{
      background: #EDF1F4;
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      /*text-align: left;*/
      height: 50px;
      box-sizing: border-box;
      padding: 10px 20px;
      position: relative;
    }
    .thick{
      p{
        margin-bottom: 10px;
        span{
          display: block;
          margin-bottom: 8px;
        }
      }

    }
    .el-dialog__footer{
      button{
        /*color: #FFF;*/
        width: 40%;
        height: 40px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #EDF1F4;
        border:1px solid #DCDFE6;
      }
      button:nth-of-type(1){

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
.add_user_bottom {
  text-align: center;
  .el-button {
    width: 98px;
  }
}
</style>

<style lang='scss' scoped>
#add_user {
  width: 600px;
  margin: 50px auto;
  .dialog-footer{
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    button{
      /*color: #FFF;*/
      width: 40%;
      height: 40px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
      background-color: #EDF1F4;
      border:1px solid #DCDFE6;
    }
  }
  header {
    text-align: center;
    font-size: 26px;
    margin: 50px 0;
  }
  > div {
    margin-bottom: 15px;
    > p {
      margin-bottom: 10px;
    }
  }
  .industry{
    i{
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left:50px;
      top:-38px;
      color:#606266;
    }
    i:hover{
      color: #00adef;
    }
  }
  .currencyType{
    i{
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left:145px;
      top:-38px;
      color:#606266;
    }
    i:hover{
      color: #00adef;
    }
  }
}
</style>
