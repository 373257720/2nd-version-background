<template>
  <div id="add_contract">
    <!-- <header>{{$t('UserManagement.Addnewbackgrounduser')}}</header> -->
    <header>添加新合同</header>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item label="合同名称" prop="bslEmail">
        <el-input
          placeholder="Email"
          v-model.trim="ruleForm.bslEmail"
        ></el-input>
      </el-form-item>
      <el-form-item label="合同类型" prop="bslName">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传合同模板word" prop="bslPwd">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传合同模板excl" prop="bslPwd2">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
        </el-upload>
      </el-form-item>
      <!--      <el-form-item class="add_contract_bottom">-->
      <!--        <el-button type="primary" @click="$router.go(-1)">返回</el-button>-->
      <!--        <el-button type="primary" class="next" @click="submitForm('ruleForm')">提交</el-button>-->
      <!--      </el-form-item>-->
    </el-form>
    <p class="dialog-footer">
      <button @click="$router.go(-1)">{{ $t("project.Back") }}</button>
      <button @click="submitForm('ruleForm')">
        {{ $t("project.Confirm") }}
      </button>
    </p>
  </div>
</template>

<script>
// import qs from "qs";
// import { log } from "util";
export default {
  data() {
    let self = this;
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(self.$t("UserManagement.PleaseEnterNewPassword")));
      } else {
        // if (this.ruleForm.bslPwd !== '') {
        //   // this.$refs.ruleForm.validateField('bslPwd');
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(self.$t("UserManagement.PleaseEnterNewPasswordagain"))
        );
      } else if (value !== this.ruleForm.bslPwd) {
        callback(
          new Error(
            self.$t("UserManagement.PasswordsEnteredTwiceAreInconsistent")
          )
        );
      } else {
        callback();
      }
    };
    return {
      labelposition: "top",
      ruleForm: {
        bslEmail: "",
        bslName: "",
        bslPwd: "",
        bslPwd2: "",
      },
      rules: {
        bslPwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        bslPwd2: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        bslName: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
        ],
        bslEmail: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnterEmail"),
            trigger: "blur",
          },
          {
            type: "email",
            message: this.$t("UserManagement.EmailFormatIsIncorrect"),
            trigger: ["blur", "change"],
          },
        ],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "项目方与中间人",
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang='scss'>
#add_contract {
  .el-select {
    width: 100%;
  }
  .el-button--primary {
    width: 200px;
  }
  .money_range {
    margin-bottom: 22px;
    span {
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
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-form-item {
        width: 40%;
        margin-bottom: 0;
      }
      i {
        /*width: 20%;*/
        font-size: 20px;
        color: #606266;
        text-align: center;
      }
    }
  }
  .el-dialog {
    .el-dialog__header {
      background: #edf1f4;
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      /*text-align: left;*/
      height: 50px;
      box-sizing: border-box;
      padding: 10px 20px;
      position: relative;
    }
    .thick {
      p {
        margin-bottom: 10px;
        span {
          display: block;
          margin-bottom: 8px;
        }
      }
    }
    .el-dialog__footer {
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
      button:nth-of-type(1) {
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
.add_contract_bottom {
  text-align: center;
  .el-button {
    width: 98px;
  }
}
</style>

<style lang='scss' scoped>
#add_contract {
  width: 600px;
  margin: 50px auto;
  .dialog-footer {
    padding-top: 40px;
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
  header {
    text-align: center;
    font-size: 26px;
    margin: 50px 0;
  }
  .el-upload-dragger{
      width: 600px !important;
      .el-upload-dragger{
      width: 600px !important;
      }
    //   height: 100px;
  }
  > div {
    margin-bottom: 15px;
    > p {
      margin-bottom: 10px;
    }
  }
  .industry {
    i {
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left: 50px;
      top: -38px;
      color: #606266;
    }
    i:hover {
      color: #00adef;
    }
  }
  .currencyType {
    i {
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left: 145px;
      top: -38px;
      color: #606266;
    }
    i:hover {
      color: #00adef;
    }
  }
}
</style>
