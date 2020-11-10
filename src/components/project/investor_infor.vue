<template>
  <div id="investor_infor">
    <el-aside width="250px" class="fl-aside">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title">投资者列表</template>
          <el-menu-item
            v-for="item in datalist"
            :key="item.bslName"
            index="/home/userlist/verified_user"
            @click="gg(item.userId)"
          >{{item.bslName}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <div class="right">
      <h2>签约客户信息</h2>
      <header>
        <ul class="pending_left">
          <li v-for="(value,key) in pending_ch" :key="key">
            <p>{{value.title}}</p>
            <el-input placeholder="-" v-model="value.value" :disabled="true"></el-input>
          </li>
        </ul>
        <ul class="pending_right">
          <li v-for="(value,key) in pending_eng" :key="key">
            <p>{{value.title}}</p>
            <el-input placeholder="-" v-model="value.value" :disabled="true"></el-input>
          </li>
        </ul>
      </header>
      <main>
        <aside>
          <nav>
            <img :src="$axios.defaults.baseURL+userCompanyPic" alt />
          </nav>
          <el-button type="text" @click="dialogVisible = true">审核通过</el-button>
          <el-dialog
            :title="$t(project.Reminder)"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose"
          >
            <span>审核通过</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible= false">取 消</el-button>
              <el-button type="primary" @click="check(1)">确 定</el-button>
            </span>
          </el-dialog>
        </aside>
        <section>
          <nav>
            <img :src="$axios.defaults.baseURL+userCompanyPic" alt />
          </nav>
          <el-button type="text" @click="dialogFormVisible = true">审核失败</el-button>
          <el-dialog title="审核失败" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="90px">
              <el-form-item label="拒绝原因：">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="证件图片不清晰" name="type"></el-checkbox>
                  <el-checkbox label="公司名称不符" name="type"></el-checkbox>
                  <el-checkbox label="个人信息不正确" name="type"></el-checkbox>
                  <el-checkbox label="其他" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="check(2)">确 定</el-button>
            </div>
          </el-dialog>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: []
      },
      dialogFormVisible: false,
      dialogVisible: false,
      datalist: [],
      resdata: {},
      // formLabelWidth: "120px",
      pending_ch: {
        createTime: {
          title: "注册时间",
          value: ""
        },
        userCountryCh: {
          title: "国籍",
          value: ""
        },
        userIdentity: {
          title: "身份证号",
          value: ""
        },

        optTime: {
          title: "验证时间",
          value: ""
        },
        userCompanyCh: {
          title: "投资者公司",
          value: ""
        },
        usercontact: {
          title: "投资者联系方式",
          value: ""
        }
        // identityPicOne: {
        //   title: "身份证",
        //   value: ""
        // }
      },
      pending_eng: {
        bslName: {
          title: "用户名称",
          value: ""
        },
        userCompanyCh: {
          title: "公司名称",
          value: ""
        },
        userAddressCh: {
          title: "公司地址",
          value: ""
        },

        userCompanyEn: {
          title: "投资者名字",
          value: ""
        },
        userIdentity: {
          title: "感兴趣行业",
          value: ""
        }
        // userCompanyPic: {
        //   title: "公司营业执照",
        //   value: ""
        // }
      },
      identityPicOne: "",
      identityPicTwo: "",
      userCompanyPic: "",
      idx: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   }，
    handleClose(done) {
      done();
    },
    gg(id) {
      console.log(this.resdata[id]);
      for (var key in this.pending_ch) {
        this.pending_ch[key].value = this.resdata[id][key];
      }
      for (var key in this.pending_eng) {
        this.pending_eng[key].value = this.resdata[id][key];
      }
      console.log(this.pending_ch);
      this.identityPicOne = this.resdata[id].identityPicOne;
      this.userCompanyPic = this.resdata[id].userCompanyPic;
      // console.log(  this.identityPicOne );
    },
    check(num) {
      this.dialogVisible = false;
      this.dialogFormVisible = false;
      var str = this.form.type.join(",");
      // this.$axios({
      //   method: "post",
      //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/saveAuth?userId=${this.idx}&optStatus=${num}&optRemark=${str}`,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })

        this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/saveAuth`,{
          userId:this.idx,
          optStatus:num,
          optRemark:str
        })
      .then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.datalist = JSON.parse(this.$route.query.userRespList);
    let arr = [];
    this.datalist.forEach(item => {
      arr.push(item.userId);
    });

    let obj = { userIdList: arr,Ad_Token:this.$store.state.X_Token};
    // console.log(arr);
    this.$axios({
      method: "post",
      url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserListAdmin`,
      data: this.$qs.stringify(obj, { arrayFormat: "brackets" }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => {
      for (var i = 0; i < res.data.data.length; i++) {
        this.resdata[res.data.data[i].userId] = res.data.data[i];
      }
      // this.resdata = res.data.data;

      console.log(this.resdata);
    });
  },
  mounted() {
    var div = document.getElementsByClassName("maincontent")[0];
    div.scrollTop = 0;
  }
};
</script>
<style lang='scss'>
#investor_infor {
  .fl-aside {
    overflow-y: auto;
    height: 500px;
    margin-right: 100px;
  }
  .el-button--primary {
    color: black;
  }
  .el-button--text {
    color: black;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>

<style lang='scss' scoped>
#investor_infor {
  display: flex;
  h2 {
    height: 50px;
    text-align: center;
  }
  header {
    display: flex;
    width: 900px;
    justify-content: space-between;
    // margin: 0 auto;
    .pending_left,
    .pending_right {
      width: 400px;

      li {
        margin-bottom: 30px;
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
  main {
    display: flex;
    width: 900px;
    // margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
    justify-content: space-between;
    nav {
      height: 200px;
      width: 400px;
      // background: #58bc58;
      border: 1px solid #e4e7ed;
      background-color: #f5f7fa;
      margin-bottom: 20px;
      border-radius: 4px;
      img {
        height: 200px;
        width: 400px;
      }
    }
    button {
      width: 40%;
      height: 50px;
      border: 1px solid #e4e7ed;
      background-color: #f5f7fa;
      // margin-bottom: 20px;
      border-radius: 4px;
      // background: red;
    }
  }
}
</style>
