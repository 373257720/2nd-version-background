<template>
  <div id="app" v-if="isRouterAlive">
    <div id="top">
      <div class="top">
        <div class="top_left fl">
          <img src="./assets/image1.png" alt />
        </div>
        <div class="top_right fr">
          <el-dropdown @command="handleCommandlang" trigger="click" class="language">
            <span class="el-dropdown-link">
              {{language}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="en_US">English</el-dropdown-item>
              <el-dropdown-item command="zh_CN">中文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown
            @command="handleCommand"
            trigger="click"
            class="logout"
            v-if="$route.name!='login'"
          >
            <span class="el-dropdown-link">
              {{this.$store.state.currentUser}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login" icon="el-icon-back">{{$t('Home.logout')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <router-view v-if="isalive"></router-view>
    <div id="bottom">
      <div class="bottom con">
        <p>
          <img src="./assets/image1.png" alt />
        </p>
        <!-- <ul>
          <li>About us</li>
          <li>Contact us</li>
          <li>User agreement</li>
          <li>Privacy treaty</li>
          <li>Legal statement</li>
          <li>Rate standard</li>
          <li>Problem feedback</li>
          <li>Novice tutorial</li>
        </ul>
        <footer>copyright@4coin web.2018</footer> -->
      </div>
    </div>
    <!-- :visible.sync="this.$store.state.commandialog" -->
  </div>
</template>

<script>
import { i18n } from "./language";

export default {
  name: "App",
  provide: function() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isalive: true,
      language: "",
      isRouterAlive: true
    };
  },
  watch: {
    commandialog: function(neww, olld) {
      console.log(neww, olld);
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,


          
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    if (this.$i18n.locale) {
      if (this.$i18n.locale == "en_US") {
        this.language = "English";
      } else if (this.$i18n.locale == "zh_CN") {
        this.language = "中文";
      }
    } else {
      this.language = "English";
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    handleCommand(command) {
      console.log(command);
      if (command == "change_password") {
        // this.$routerto("change_password");
      } else if (command == "login") {
        this.$global
          .get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/logOut`)
          .then(res => {
            if (res.data.resultCode == 10000) {
              sessionStorage.clear();
              this.$store.dispatch("reset_actions", this.$restore_obj);
              this.$routerto("login");
            } else {
              this.$message(res.data.resultDesc);
            }
          });
      }
    },
    handleCommandlang(command) {
      this.$global
        .get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/base/language.do`, {
          lan: command
        })
        .then(res => {
          if (res.data.resultCode == 10000) {
            if (command == "en_US") {
              this.language = "English";
            } else if (command == "zh_CN") {
              this.language = "中文";
            }
            window.localStorage.setItem("lan", command);
            this.$Local(command);
            this.$i18n.locale = command;
            this.$store.dispatch(
              "X_Token_actions",
              res.data.data.Ad_Token
            );
            this.isalive = false;
            this.$nextTick(() => {
              this.isalive = true; // DOM更新后再通过v-if添加router-view节点
            });
          } else {
            this.$message(res.data.resultDesc);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss'>
//

#app {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 260px;
  }

  .el-textarea__inner{
        font-family: '\5FAE\8F6F\96C5\9ED1';
  }
  .el-table__fixed-right::before, .el-table__fixed::before{
  height:0;
}
}
.el-dialog {
  border-radius: 5px;
  overflow: hidden;
}
#top {
  background-color: rgb(238, 241, 246);
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  z-index: 2000;
  .top {
    height: 60px;

    line-height: 60px;
    // overflow: hidden;
    .top_left {
      color: #788ca5;
      font-size: 18px;
      margin-left: 50px;
      height: 60px;
      /*font-weight: 700;*/
      display: flex;
      align-items: center;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 95%;
        /*width: 120px;*/
        /*height: 50px;*/
      }
    }
    .top_right {
      // color: #788ca5;
      height: 60px;
      font-size: 18px;
      margin-right: 100px;
      font-weight: 700;
      display: flex;
      .language {
        margin: 0;
        padding: 0;
        margin-right: 30px;
      }
      .el-dropdown {
        cursor: pointer;
        color: #788ca5;
      }
    }
  }
}
#bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  // padding: 0 0 12px 0;
  // height: 100px;
  background: #222222;
  background-color: rgb(238, 241, 246);
  overflow: hidden;
  text-align: center;
  p {
    color: #788ea6;
    font-size: 18px;
    margin: 10px 0;
    /*width: 120px;*/
    height: 41px;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  ul {
    // margin-bottom: 20px;
    color: #788ca5;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    li {
      flex-grow: 1;
    }
  }
  footer {
    color: #4c5d71;
    font-size: 12px;
  }
}
</style>
