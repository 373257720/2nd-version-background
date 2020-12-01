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
            <el-form-item v-if="item.type===3" class="item-first" :label="item.cellInfo">
              <i
                @click="dialogFormVisible_redOption_add = true"
                class="el-icon-circle-plus-outline addsymbol"
              ></i>
              <el-select v-model="ruleForm.Redoption" placeholder="请选择">
                <el-option
                  v-for="(item) in brands"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="istype3 && item.type===4" :label="item.cellInfo">
              <i @click="additem" class="el-icon-circle-plus-outline addsymbol"></i>
              <div v-for="(value,key) in item.listCell">
                <ul class="orangeOption" v-if="key==ruleForm.Redoption">
                  <li>
                    {{value}}
                    <!-- {{key}}{{ruleForm.Redoption}} -->
                    <!-- {{itdd}} -->
                    <!-- <el-input type="textarea" autosize placeholder="请输入内容" v-model="itdd"></el-input> -->
                    <!-- <el-button type="primary" icon="el-icon-delete"></el-button> -->
                  </li>
                </ul>
              </div>
            </el-form-item>
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
    <el-dialog
      :visible.sync="dialogFormVisible_redOption_add"
      width="30%"
      :modal="true"
      :close-on-click-modal="false"
      center
    >
      <span slot="title" class="dialog-footer">{{$t('CategoryOfCoin.Add')}}</span>
      <el-form ref="add_coin" :model="Redoption_summit" label-width="120px" label-position="top">
        <el-form-item :label="$t('project.Currency')" prop="currencyType">
          <el-input
            :placeholder="$t('CategoryOfCoin.forexampleHKD')"
            show-word-limit
            maxlength="50"
            clearable
            v-model="Redoption_summit.label"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('industry.SerialNumber')" prop="currencySort">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="coin_category_summit.currencySort"
          ></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogFormVisible_redOption_add = false">{{$t('project.Cancel')}}</button>
        <button @click="Redoption_summitFn('add_coin')">{{$t('project.Confirm')}}</button>
      </span>
    </el-dialog>
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
      dialogFormVisible_redOption_add: false,
      labelposition: "top",
      ruleForm: {
        Redoption: ""
      },
      Redoption_summit: {
        value: 0,
        label: ""
      },
      istype3: false,
      orangeOption: [{}],
      fileId: null,
      arr: [],
      brands: [],
      defaultParams: {
        // 转品牌选项
        // label: "name",
        // value: "brand_id",
        // children: "children"
      },
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
        if (res.data.resultCode == 10000) {
          this.arr = res.data.data.list;
          this.arr.forEach(item => {
            if (item.type === 3) {
              this.istype3 = true;
            }
            if (item.type === 4) {
              item.listCell = {};
              // item.singer = new Array();
            }
          });
        }
        // console.log(this.arr);
      });
    // console.log(XLSX);
    //  console.log(ActiveXObject);
  },
  methods: {
    Redoption_summitFn() {
      let obj = {
        label: "",
        value: 0
      };
      let sw = true;
      if (this.Redoption_summit.label) {
        Object.assign(obj, this.Redoption_summit);
        obj.value = this.brands.length > 0 ? this.brands.length : 0;
        this.brands.forEach(item => {
          if (item.label === this.Redoption_summit.label) {
            sw = false;
            return;
          }
        });
        if (sw) {


          
          this.arr.forEach(item => {
            if (item.type === 4) {
              item.listCell[this.ruleForm.Redoption] = [];
              item.listCell[this.ruleForm.Redoption].push("");
            }
          });
          this.brands.push(obj);
          console.log(this.arr);
          this.Redoption_summit.label = "";
          console.log(this.brands);
          this.dialogFormVisible_redOption_add = false;
        }
      }
      // console.log();
    },
    async excludefn() {
      this.brands.forEach(item => {
        if (item.label === this.Redoption_summit.label) return;
      });
    },
    addRedoption() {
      this.dialogFormVisible_redOption_add = true;
    },

    additem() {
      if (this.ruleForm.Redoption || this.ruleForm.Redoption === 0) {
        this.arr.forEach(item => {
          if (item.type === 4) {
            // item.listCell[this.ruleForm.Redoption].push("");
            console.log(item.listCell);

            // item.listCell[this.ruleForm.Redoption].push("");
            // console.log(item.listCell[this.ruleForm.Redoption]);
          }
        });

        // this.arr = this.arr;
        console.log(this.arr);
      }
    },
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
    width: 80px;
  }
  .Currencyrange {
    margin-bottom: 22px;

    .item-first {
      margin-bottom: 22px;
      .el-form-item__content {
        width: 220px;
        // display: flex;
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
  .orangeOption {
    li {
      display: flex;
      .el-textarea {
        margin-right: 50px;
      }
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
}
</style>
