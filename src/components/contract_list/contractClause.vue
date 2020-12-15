<template>
  <div id="contractClause">
    <!-- <header>{{$t('UserManagement.Addnewbackgrounduser')}}</header> -->
    <header>{{$t('Contract.addContract')}}</header>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item>
        <div class="Currencyrange">
          <div v-for="(item,idx) in ruleForm.arr " :key="item.cellInfo">
            <div v-if="item.type===3" class="item-first additem">
              <el-form-item>
                <Slot name="label" class="addredOption">
                  <span>{{item.cellInfo}}</span>
                  <i @click="addRedoption(item)" class="el-icon-circle-plus-outline addsymbol"></i>
                </Slot>
                <el-select v-model="item.redOption" :placeholder="$t('project.PleaseSelect')">
                  <el-option
                    v-for="(i) in item.listCell"
                    :key="i.label"
                    :label="i.label"
                    :value="i.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-for="(self) in item.listRedCell.orange"
                :key="self.cellInfo"
                :label="self.cellInfo"
              >
                <!-- {{ruleForm.arr[idx].listRedCell.orange+'.'+index+'.'+listCell[item.redOption]}} -->
                <el-input
                  type="textarea"
                  :autosize="{minRows: 5,maxRows: 10 }"
                  :placeholder="$t('UserManagement.PleaseEnter')"
                  v-model="self.listCell[item.redOption]"
                ></el-input>
              </el-form-item>
            </div>
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
      <span slot="title">{{$t('CategoryOfCoin.Add')}}</span>
      <el-form ref="add_coin" :model="Redoption_summit" label-width="120px" label-position="top">
        <el-form-item :label="$t('Contract.Option')" prop="currencyType">
          <el-input
            :placeholder="$t('UserManagement.PleaseEnter')"
            show-word-limit
            maxlength="50"
            clearable
            v-model="Redoption_summit.label"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogFormVisible_redOption_add = false">{{$t('project.Cancel')}}</button>
        <button @click="Redoption_summitFn">{{$t('project.Confirm')}}</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    let self = this;
    return {
      dialogFormVisible_redOption_add: false,
      labelposition: "top",
      ruleForm: {
        Redoption: "",
        arr: []
      },
      Redoption_summit: {
        value: null,
        label: ""
      },
      fileId: null,
      // arr: [],
      itemdata: {},
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
      obj: {
        red: {
          title: "",
          option: [
            { label: "1", value: 0 },
            { label: "2", value: 1 },
            { label: "3", value: 2 }
          ]
        },
        orange: {
          title: {
            0: {
              name: "A",
              caluse: [
                ["A-01", "A-02"],
                ["A-11", "A-12"],
                ["A-21", "A-22"]
              ]
            },
            1: {
              name: "B",
              caluse: [["B-01"], ["B-11"], ["B-21"]]
            },
            2: {
              name: "C",
              caluse: [
                ["C-01", "C-02"],
                ["C-11", "C-12"],
                ["C-21", "C-22", "C-23"]
              ]
            }
          }
        }
      }
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
          // this.ruleForm
          this.ruleForm.arr = res.data.data.list;
          this.ruleForm.arr.forEach((item, idx) => {
            if (item.type === 3) {
              this.istype3 = true;
              item.listCell = [];
              this.$set(item, "redOption", null);
              item.listRedCell = { orange: [] };
              let num = 1;
              if (this.ruleForm.arr[idx + 1].type !== 4) {
                this.ruleForm.arr.splice(idx, 1);
                return;
              }
              while (this.ruleForm.arr[idx + num].type === 4) {
                item.listRedCell.orange.push(this.ruleForm.arr[idx + num]);
                num++;
              }
              // this.obj.red.option = [];
              // this.arr.
              // this.obj.red.title = item.cellInfo;
            } else if (item.type === 4) {
              item.listCell = [];
              // this.obj.orange.title[num].name = item.cellInfo;
              // num++;
              // item.singer = new Array();
            }
          });
          console.log(this.ruleForm.arr);
        }
      });
  },
  methods: {
    Redoption_summitFn() {
      // let sw = true;
      console.log(this.itemdata);
      if (this.Redoption_summit.label) {
        // Object.assign(obj, this.Redoption_summit);
        // obj.value = this.brands.length > 0 ? this.brands.length : 0;
        let sw = this.itemdata.listCell.every(item => {
          return item.label !== this.Redoption_summit.label;
        });
        if (sw) {
          this.itemdata.listCell.push({
            label: this.Redoption_summit.label,
            value: this.itemdata.listCell.length
          });
          // this.itemdata.listRedCell.orange.forEach(item => {
          // });
          this.Redoption_summit.label = "";
          this.dialogFormVisible_redOption_add = false;
        }
      }
    },
    addRedoption(item) {
      console.log(item);
      this.itemdata = item;
      this.dialogFormVisible_redOption_add = true;
      // return this.Redoption_summitFn(item);
    },
    delectItem(key, num) {
      console.log(this.obj.orange.title[key].caluse[this.ruleForm.Redoption]);
      this.obj.orange.title[key].caluse[this.ruleForm.Redoption].splice(num, 1);
    },
    submitForm(formName) {
      // this.$routerto("");
      // let oo = {};
      let arr = this.$global.deepCopy(this.ruleForm.arr);
      arr.forEach(item => {
        if (item.type === 3) {
          item.listCell = item.listCell.map(i => {
            return i.label;
          });
        }
      });
      // console.log(arr);
      let obj = {
        importList: JSON.stringify(arr),
        fileId: this.fileId * 1
      };
      this.$axios({
        method: "post",
        url: `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/saveExcelContractTemplate?Ad_Token=${this.$store.state.X_Token}`,
        data: this.$qs.stringify(obj),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
      });

      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     console.log(valid);
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
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .Currencyrange {
    // margin-bottom: 22px;
    div.additem {
      //   display: flex;
      //   justify-content: space-between;
      margin-bottom: 80px;
      > div {
        margin-bottom: 10px;
      }
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
  .addredOption {
    i {
      cursor: pointer;
    }
  }
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
    margin-bottom: 50px;
  }
}
</style>
