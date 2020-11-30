<template>
  <div id="contractClause">
    <!-- <header>{{$t('UserManagement.Addnewbackgrounduser')}}</header> -->
    <header>添加新合同</header>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item>
        <div class="Currencyrange">
          <div class="additem" v-for="(item,index) in arr" :key="index">
            <el-form-item v-if="item.type===2" class="item-first">
              <el-form-item label="合同名称" prop="bslEmail">
                <i @click="additem" class="el-icon-circle-plus-outline addsymbol"></i>
                <el-input placeholder="Email" v-model.trim="ruleForm.bslEmail"></el-input>
                <ul>
                  <li v-for="item in item2.listCell" :key="item">
                    <el-input placeholder="Email" v-model.trim="item2"></el-input>
                  </li>
                </ul>
              </el-form-item>
              <!-- <el-input v-model="item.money_range_minimum"></el-input>
              <i @click="additem" class="el-icon-circle-plus-outline addsymbol"></i>-->
            </el-form-item>
            <!-- <el-form-item :prop="'arr.' + index + '.money_range_maximum'" :rules="rules.maximun">
              <el-input v-model="item.money_range_maximum"></el-input>
            </el-form-item>-->
          </div>
        </div>
      </el-form-item>

      <!--      <el-form-item class="add_contract_bottom">-->
      <!--        <el-button type="primary" @click="$router.go(-1)">返回</el-button>-->
      <!--        <el-button type="primary" class="next" @click="submitForm('ruleForm')">提交</el-button>-->
      <!--      </el-form-item>-->
    </el-form>
    <p class="dialog-footer">
      <button @click="$router.go(-1)">{{ $t("project.Back") }}</button>
      <button @click="submitForm('ruleForm')">{{ $t("project.Confirm") }}</button>
    </p>
  </div>
</template>

<script>
// import qs from "qs";
// import { log } from "util";
import XLSX from "xlsx";
export default {
  data() {
    let self = this;
    return {
      labelposition: "top",
      ruleForm: {},
      fileId: null,
      arr: [],
      rules: {
        bslName: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur"
          }
        ],
        bslEmail: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnterEmail"),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$t("UserManagement.EmailFormatIsIncorrect"),
            trigger: ["blur", "change"]
          }
        ]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "项目方与中间人"
    };
  },
  created() {
    this.fileId = this.$route.query.filed || null;
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/getExcelContractTemplate`,
        { fileId: this.fileId }
      )
      .then(res => {
        console.log(res);
        if (res.data.resultCode == 10000) {
          this.arr = res.data.data.list;
        }
      });
    // console.log(XLSX);
    //  console.log(ActiveXObject);
  },
  methods: {
    additem() {},
    submitForm(formName) {
      this.$routerto("");
      // this.$refs[formName].validate(valid => {
      //   if (valid) {

      //   } else {
      //     return false;
      //   }
      // });
    },
    upload(file, fileList, name) {
      console.log("file", file);
      console.log("fileList", fileList);
      let files = { 0: file.raw };
      this.readExcel1(files, name);
    },
    readExcel1(files, name) {
      //表格导入

      if (files.length <= 0) {
        //如果没有文件名
        return false;
      }
      if (name === "excel") {
        if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
          this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
          return false;
        }
      } else if (name === "word") {
        if (!/\.(doc|docx)$/.test(files[0].name.toLowerCase())) {
          this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
          return false;
        }
      }
      var that = this;
      // console.log(files);
      const fileReader = new FileReader();
      fileReader.onload = function(e) {
        console.log(e.target.result);
      };
      fileReader.readAsText(files[0]);

      // fileReader.onload = ev => {
      //   try {
      //     const data = ev.target.result;
      //     const workbook = XLSX.read(data, {
      //       type: "array"
      //     });

      //     // console.log(workbook);
      //     var result = {};
      //     const wsname = workbook.SheetNames[0]; //取第一张表
      //     console.log(XLSX);
      //     workbook.SheetNames.forEach(function(sheetName) {
      //       // console.log(workbook.Sheets[sheetName]);

      //       var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      //         header: 1
      //       });

      //       if (roa.length) result[sheetName] = roa;
      //     });
      //     console.log(result);

      //     // const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
      //     // console.log(ws);
      //     // that.peopleArr = [];//清空接收数据
      //     // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
      //     //     that.peopleArr = [];
      //     // }
      //     //重写数据
      //     try {
      //     } catch (err) {
      //       console.log(err);
      //     }

      //     this.$refs.upload.value = "";
      //   } catch (e) {
      //     return false;
      //   }
      // };

      // fileReader.readAsArrayBuffer(files[0]);
    }
  }
};
</script>

<style lang='scss'>
#contractClause {
  .el-select {
    width: 100%;
  }
  .el-button--primary {
    width: 200px;
  }
  .Currencyrange {
    margin-bottom: 22px;

    .item-first {
      margin-bottom: 22px;
      .el-form-item__content {
        width: 220px;
        display: flex;
        align-items: center;

        .el-input {
          //   width: 200px;
          margin-right: 22px;
        }
        i {
          // margin-left: 22px;
        }
      }
    }

    div.additem {
      //   display: flex;
      //   justify-content: space-between;
      margin-bottom: 20px;
    }
    .el-input {
      //   width: 120px;
    }
    .el-input__inner {
      /*width: 100px;*/
      //   padding: 0 10px;
      //   font-size: 12px;
    }
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
#contractClause {
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
  .el-upload-dragger {
    width: 600px !important;
    .el-upload-dragger {
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
