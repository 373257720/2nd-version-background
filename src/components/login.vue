<template>
  <div id="register">
    <div class="register con">
      <h2>{{$t('Home.login')}}</h2>
      <div class="username">
        <el-input :placeholder="$t('Home.Pleaseenteraccount')" v-model="username" clearable></el-input>
      </div>
      <div class="password">
        <el-input :placeholder="$t('Home.Pleaseenterthepassword')" v-model="password" show-password clearable></el-input>
      </div>
      <p>{{remind}}</p>
      <button @click="login">{{$t('Home.login')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  inject: ['reload'],
  data() {
    return {
      username: "",
      password: "",
      remind: "",
      loading: false
    };
  },
  created() {
    // if(this.$i18n.locale){
      // if (this.$i18n.locale== "en_US") {
      //   this.language = "English";
      // } else if (this.$i18n.locale == "zh_CN")
      // {this.language = "中文"}
      this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/base/language.do`,
        {lan:this.$i18n.locale})
        .then(res => {
          if(res.data.resultCode==10000){
            window.localStorage.setItem('lan',this.$i18n.locale);
            this.$Local(this.$i18n.locale);
            this.$i18n.locale=this.$i18n.locale;
            this.$store.dispatch("X_Token_actions",JSON.parse(res.data.data).Ad_Token
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    // }else{
    //   this.language = "English";
    // };
  },
  methods: {
    login() {
      this.remind = "";
      this.loading = true;
      if (this.username && this.password) {
        this.$global.post_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/adminLogin.do`,{
          bslEmail: this.username,
          bslPwd: this.password
        })
          .then(res => {
            var rescode = res.data.resultCode;
            if (rescode == 10000) {
              window.sessionStorage.clear();
              this.$store.dispatch("reset_actions", this.$restore_obj);
              this.$store.dispatch("X_Token_actions", res.data.data.Ad_Token);
              this.$store.dispatch("setUser", this.username);
              this.$store.dispatch("usertype_action", res.data.data.userType);
              this.reload();
              this.$routerto("home");
            } else  {
              this.remind = res.data.resultDesc;
            }
          })
          .catch(error => {});
      } else {
        // this.loading = false;
        this.remind = this.$t('Home.Accountandpasswordcannotbeempty');

      }
    }
  }
};
</script>
<style lang='scss'>
#register {
  .register {
    text-align: center;
    .el-input--suffix {
      width: 460px;
    }
    .username .el-input--suffix {
      margin-bottom: 40px;
    }
    .password .el-input--suffix {
      margin-bottom: 20px;
    }
    .el-input__inner {
      background: #f6f6f6;
    }
  }
}
</style>
<style lang='scss' scoped>
#register {
  position: relative;
  top: 60px;
  height: calc(100% - 210px);
}
.register {
  width: 553px;
  height: 400px;
  box-shadow: 0px 0px 10px #b4bccc;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  p {
    color: #f36d6c;
    line-height: 40px;
    height: 40px;
  }
  h2 {
    margin: 34px 0 48px 0;
    font: {
      size: 34px;
      weight: bold;
    }
  }
  button {
    background: #00adef;
    width: 470px;
    height: 40px;
    // margin-top: 60px;
    font-size: 18px;
    color: white;
    font-weight: 700;
    cursor: pointer;
    // color:
  }
  button:hover{
    // background: grey;
    background: #1599e5;
  }
}
</style>
