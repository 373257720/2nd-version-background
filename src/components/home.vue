<template>
  <div id="home">
    <el-aside width="250px" class="fl-aside" style="background-color: rgb(238, 241, 246)">
      <el-menu
        :default-active="activeName"
        active-text-color="#409EFF"
        :unique-opened="true"
        @select="selectone"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home/project">
          <el-menu-item index="project">
            <i class="el-icon-message"></i>
            <span slot="title">{{$t('Home.Itemlist')}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="userlist">
          <template slot="title">
            <i class="el-icon-menu"></i>
            {{$t('Home.userlist')}}
          </template>
          <router-link to="/home/userlist/verified_user">
            <el-menu-item index="verified_user">{{$t('Home.Authenticateduser')}}</el-menu-item>
          </router-link>
          <router-link to="/home/userlist/check_pending">
            <el-menu-item index="check_pending">{{$t('Home.Pendingusers')}}</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/home/contractListsRoot">
          <el-menu-item index="contractListsRoot">
            <i class="el-icon-news"></i>
            <!-- <span slot="title">{{ $t("Home.Backgroundusermanagement") }}</span> -->
            <span slot="title">{{$t('Home.ContractList')}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="memberlist">
          <template slot="title">
            <i class="el-icon-menu"></i>
            {{$t('Home.MemberList')}}
          </template>
          <router-link to="/home/membership/membershipList">
            <el-menu-item index="membershipList">{{$t('Membership.MemberManagement')}}</el-menu-item>
          </router-link>
          <router-link to="/home/membership/MembershipSystemArrangment">
            <el-menu-item
              index="MembershipSystemArrangment"
            >{{$t('Membership.MembershipSystemManagement')}}</el-menu-item>
          </router-link>
          <router-link to="/home/membership/Exchange">
            <el-menu-item index="Exchange">{{$t('Membership.redemption')}}</el-menu-item>
          </router-link>
          <router-link to="/home/membership/rankingList">
            <el-menu-item index="rankingList">{{$t('Membership.PointsRanking')}}</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/home/Recommand/RecommandList">
          <el-menu-item index="Recommand">
            <i class="el-icon-news"></i>
            <!-- <span slot="title">{{ $t("Home.Backgroundusermanagement") }}</span> -->
            <span slot="title">{{$t('Home.RecommandList')}}</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home/user_management/user_managementlists">
          <el-menu-item index="user_management">
            <i class="el-icon-news"></i>
            <span slot="title">{{$t('Home.Backgroundusermanagement')}}</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home/industry">
          <el-menu-item index="industry">
            <i class="el-icon-document"></i>
            <span slot="title">{{$t('Home.Industrylist')}}</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home/coin_category/coin_category_lists">
          <el-menu-item index="coin_category">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t('Home.Currencylist')}}</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home/tag">
          <el-menu-item index="tag">
            <i class="el-icon-message"></i>
            <span slot="title">{{$t('Home.tagList')}}</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{$t(item.meta.title)}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="maincontent"
      v-loading="isShowLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
    ></div>
    <div class="main_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { log } from "util";
export default {
  data () {
    return {
      loadingCount: 0,
      isShowLoading: false,
      msg: 'Welcome to Your Vue.js App',
      levelList: [],
      activeName: ''
    }
  },
  created () {
    let that = this
    this.$axios.interceptors.request.use(
      config => {
        // console.log(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/adminLogin.do`)
        // 在发送请求之前做些什么
        // if (config.url.indexOf("/bsl_admin_web/base/countryList") > -1) {
        //   return config;
        // }
        that.addLoading()
        return config
      },
      function (error) {
        // 对请求错误做些什么
        that.isShowLoading = false
        that.loadingCount = 0
        return Promise.reject(error)
      }
    )
    this.$axios.interceptors.response.use(
      res => {
        // console.log(2222);
        that.isCloseLoading()
        if (res.data && res.data.resultCode) {
          let code = res.data.resultCode
          return res
        }
      },
      error => {
        // this.isShowLoading = false;
        that.isCloseLoading()
        return Promise.reject(error)
      }
    )

    // let href = window.location.href;
    // this.activeName = href.split("/#")[1];
  },
  methods: {
    selectone (index, indexPath) {
      // console.log(index, indexPath);
    },
    addLoading () {
      this.isShowLoading = true
      this.loadingCount++
      // console.log( this.loadingCount)
    },

    isCloseLoading () {
      this.loadingCount--
      if (this.loadingCount <= 0) {
        this.loadingCount = 0
        this.isShowLoading = false
      }
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta.title)
      console.log(matched)
      // const first = matched[0];
      this.levelList = matched
    },
    aactiveName () {}
  },
  watch: {
    $route (index) {
      let path = index.path.substr(1).split('/')
      if (path[1] == 'userlist' || path[1] == 'membership') {
        this.activeName = path[2]
      } else {
        this.activeName = path[1]
      }
      this.getBreadcrumb()
    }
  },
  mounted () {
    let path = this.$route.path.substr(1).split('/')
    if (path[1] == 'userlist' || path[1] == 'membership') {
      this.activeName = path[2]
    } else {
      this.activeName = path[1]
    }
    this.getBreadcrumb()
  }
}
</script>
<style lang="scss">
#home {
  .el-button + .el-button {
    margin-left: 0;
  }
}
.fl-aside {
  .is-opened {
    margin: 0;
  }
  .el-submenu {
    margin: 0;
    display: block;
  }
}
</style>

<style lang="scss" scoped>
.breadcrumb {
  position: absolute;
  top: 60px;
  height: 60px;
  left: 250px;
  box-sizing: border-box;
  padding-left: 30px;
  width: 100%;
  line-height: 60px;
  border-bottom: 1px solid #ebeef5;
  // text-align: 60px;
  a {
  }
}
.maincontent {
  position: absolute;
  // position: relative;
  // border-top: 1px solid #ebeef5;
  /*padding-top: 20px;*/
  // padding-bottom: 50px;
  box-sizing: border-box;
  // overflow-y: scroll;
  top: 120px;
  left: 250px;
  width: calc(100% - 250px);
  height: calc(100% - 180px);
}
.main_content {
  position: absolute;
  top: 120px;
  box-sizing: border-box;
  left: 250px;
  width: calc(100% - 250px);
  height: calc(100% - 180px);
  overflow-y: auto;
  /*overflow-x: auto;*/
}
#home {
  height: calc(100% - 120px);
  padding-top: 60px;
  .fl-aside {
    position: absolute;
    top: 60px;
    width: 250px;
    height: calc(100% - 120px);
    // background: red;
  }
  // text-align: center;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 100%;
  /*margin: 0 10px;*/
}
a {
  color: #42b983;
}
</style>
