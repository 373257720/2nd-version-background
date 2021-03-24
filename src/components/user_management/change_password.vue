<template>
  <div class="coin_category_alter">
    <header class="coin_category_alter_header">
      {{title}}
    </header>
    <el-main>
      <el-form
        ref="ruleForm"
        :model="changepassword_summit"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item :label="$t('UserManagement.Backgroundaccount')" >
          <el-input   show-word-limit   disabled v-model="bslEmail"></el-input>
        </el-form-item>
        <el-form-item :label="$t('UserManagement.newpassword')"  prop="password">
          <el-input  :placeholder="$t('UserManagement.PleaseFillInTheNewPassword')" type="password" show-password  clearable v-model="changepassword_summit.password"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('UserManagement.confirmpassword')"  prop="password2">
          <el-input  :placeholder="$t('UserManagement.PleaseEnterNewPasswordagain')" type="password" show-password  clearable  v-model="changepassword_summit.password2"></el-input>
        </el-form-item>
      </el-form>
      <p  class="dialog-footer">
        <button @click="$router.go(-1)" >{{$t('project.Back')}}</button>
        <button @click="submitForm('ruleForm')">{{$t('project.Confirm')}}</button>
      </p>
    </el-main>
  </div>
</template>

<script>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(self.$t('UserManagement.PleaseEnterNewPassword')))
      } else {
        // if (this.changepassword_summit.password !== '') {
        //   this.$refs.ruleForm.validateField('password');
        // }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(self.$t('UserManagement.PleaseEnterNewPasswordagain')))
      } else if (value !== this.changepassword_summit.password) {
        callback(new Error(self.$t('UserManagement.PasswordsEnteredTwiceAreInconsistent')))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible_industry: false,
      title: this.$t('UserManagement.changePassword'),
      userId: '',
      bslEmail: '',
      changepassword_summit: {
        password: '',
        password2: ''
      },
      rules: {
        password: [
          { validator: checkData1, trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
               { validator: checkData1, trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    console.log(this.$route.query)
    this.bslEmail = this.$route.query.bslEmail ? this.$route.query.bslEmail : ''
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confirm()
        } else {
          return false
        }
      })
    },
    confirm () {
      let self = this
      this.userId = this.$route.query.userId ? this.$route.query.userId : null
      this.$global.post_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/updateAdminUserPwd`, {
        userId: this.userId, newPwd: this.changepassword_summit.password
      }).then(res => {
        this.$confirm(res.data.resultDesc, self.$t('project.Reminder'), {
          confirmButtonText: self.$t('project.Confirm'),
          center: true,
          showCancelButton: false
        }).then((res) => {
          this.password2 = ''
          this.password = ''
          this.$router.go(-1)
          // if(res.data.resultCode==10000){
          //   // this.$routerto('coin_category_lists')
          // }
        })
      })
    }
  }
}
</script>

<style lang='scss'>
  .coin_category_alter{
    padding-top: 80px;
    .coin_category_alter_header {
      height: 40px;
      width: 80%;
      font-size: 20px;
      line-height: 40px;
      margin:0 auto;
      text-align: center;
    }
    .el-main{
      width: 40%;
      margin:0 auto;
      .thick{
        p{
          margin-bottom: 50px;
          span{
            display: block;
            margin-bottom: 10px;
          }
        }
      }
      .dialog-footer{
        padding-top: 20px;
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

    }
  }

</style>
