<template>
  <div id="add_contract">
    <!-- <header>{{$t('UserManagement.Addnewbackgrounduser')}}</header> -->
    <header>{{$t('Contract.addContract')}}</header>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item :label="$t('Contract.ContractName')" prop="fileName">
        <el-input v-model.trim="ruleForm.fileName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Contract.ContractType')" prop="contractType">
        <el-select v-model="ruleForm.contractType" :placeholder="$t('project.PleaseSelect')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传合同模板word" prop="fileWord">
        <el-upload
          class="file-upload"
          ref="fileUpload"
          action
          :http-request="handleRequest"
          :on-remove="(file,filelist)=>{return handleRemove(file,filelist,'word')}"
          :before-remove="handleBeforeRemove"
          :on-change="(file,filelist)=>{return handleChange(file,filelist,'word')}"
          :multiple="false"
          :auto-upload="true"
          accept=".doc, .docx"
          :limit="1"
        >
          <el-button size="small" type="primary">{{$t('Contract.Upload')}}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传合同模板excl" prop="fileExcel">
        <el-upload
          :on-preview="handlePreview"
          class="upload-demo"
          ref="execl"
          accept=".xls, .xlsx"
          name="execl"
          action="Fake Action"
          :http-request="handleRequestExcel"
          :on-remove="(file,filelist)=>{return handleRemove(file,filelist,'excel')}"
          :before-remove="handleBeforeRemove"
          :on-change="(file,filelist)=>{return handleChange(file,filelist,'excel')}"
          :show-file-list="true"
          :auto-upload="true"
          multiple
          :limit="1"
        >
          <el-button size="small" type="primary">{{$t('Contract.Upload')}}</el-button>
        </el-upload>
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
    return {
      labelposition: "top",
      fileList: [],
      ruleForm: {
        fileName: "",
        contractType: 0,
        fileWord: "",
        fileWordName: "",
        fileExcel: "",
        fileExcelName: ""
      },

      rules: {
        fileName: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: ["blur", "change"]
          }
        ],

        fileWord: [
          {
            required: true,
            message: this.$t("Contract.PleaseUpload"),
            trigger: ["blur", "change"]
          }
        ],
        fileExcel: [
          {
            required: true,
            message: this.$t("Contract.PleaseUpload"),
            trigger: ["blur", "change"]
          }
        ],
        contractType: [],
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
          value: 0,
          label: this.$t("Contract.ProjectownerAndIntermediary")
        },
        {
          value: 1,
          label: this.$t("Contract.IntermediaryAndIntermediary")
        }
      ]
      // value: "项目方与中间人"
    };
  },
  created() {
    // console.log(XLSX);
    //  console.log(ActiveXObject);
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    file2JSON(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = function(event) {
          let resSheet = XLSX.read(event.target.result, {
            type: "binary"
          });

          let resJSON = [];
          resSheet.SheetNames.forEach(sheetName => {
            resJSON.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(resSheet.Sheets[sheetName])
            });
          });

          resolve(resJSON);
        };

        reader.readAsBinaryString(file.raw);
      });
    },
    handleBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRequest(params) {
      console.log(params);

      let formData = new FormData();
      formData.append("file", params.file);
      formData.append("Ad_Token", this.$store.state.X_Token);
      this.$axios({
        method: "post",
        url: `${this.$axios.defaults.baseURL}/bsl_admin_web/upload/wordFile`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log(res);
        if (res.data.resultCode == 10000) {
          this.ruleForm.fileWord = res.data.data.path;
          this.ruleForm.fileWordName = "\\" + res.data.data.fileWordName;
        } else {
        }
      });
    },
    handleRequestExcel(params) {
      let formData = new FormData();
      formData.append("file", params.file);
      formData.append("Ad_Token", this.$store.state.X_Token);
      this.$axios({
        method: "post",
        url: `${this.$axios.defaults.baseURL}/bsl_admin_web/upload/excelFile`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log(res);
        if (res.data.resultCode == 10000) {
          this.ruleForm.fileExcel = res.data.data.path;
          this.ruleForm.fileExcelName = "\\" + res.data.data.fileExcelName;
        } else {
        }
      });
    },
    handlePreview(file) {
      console.log(file);

      if (!file.url) {
        this.$message.error("下载失败");
        return;
      }
      const type = file.url.split(".")[4];
      // 判断文件类型
      if (
        type === "doc" ||
        type === "docx" ||
        type === "xlsx" ||
        type === "xls" ||
        type === "ppt" ||
        type === "pptx"
      ) {
        // 在当前浏览器直接下载
        document.location.href = file.url;
      } else {
        // 图片在浏览器打开 新的页面展示
        window.open(file.url, "hello");
      }
    },

    handleRemove(file, fileList, name) {
      console.log(file, fileList, name);
      if (name === "excel") {
        this.ruleForm.fileExcel = "";
        this.ruleForm.fileExcelName = "";
      } else if (name === "word") {
        this.ruleForm.fileWord = "";
        this.ruleForm.fileWordName = "";
      }
      console.log(this.ruleForm);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$global
            .post_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/saveContractTemplate`,
              this.ruleForm
            )
            .then(res => {
              if (res.data.resultCode === 10000) {
                this.$routerto("contractClause", { filed: res.data.data.id });
              }
            });
        } else {
          return false;
        }
      });
    },
    handleChange(file, fileList, name) {
      console.log(name);

      // console.log("file", file);
      // console.log("fileList", fileList);
      if (name === "excel") {
        if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
          this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
          return false;
        }
      } else if (name === "word") {
        if (!/\.(doc|docx)$/.test(file.name.toLowerCase())) {
          this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
          return false;
        }
      }
      // this.file = file.raw;
      // console.log(file);
    },

    readExcel1(files, name) {
      //表格导入
      // if (files.length <= 0) {
      //   //如果没有文件名
      //   return false;
      // }
      // console.log(name);
      // console.log(files);
      // const fileReader = new FileReader();
      // fileReader.onload = function(e) {
      //   // console.log(e.target.result);
      // };
      // fileReader.readAsText(files[0]);
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
