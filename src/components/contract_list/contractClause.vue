<template>
  <div id="contractClause">
    <header>{{ $t("Contract.addContract") }}</header>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item>
        <div class="Currencyrange">
          <div v-for="(item, index) in ruleForm.arr" :key="index">
            <div v-if="item.type === 3" class="item-first additem">
              <el-form-item>
                <Slot name="label" class="addredOption">
                  <span>{{ item.cellInfo }}</span>
                  <i
                    @click="addRedoption(item)"
                    class="el-icon-circle-plus-outline addsymbol"
                  ></i>
                </Slot>
                <div class="redoption" v-for="(i, d) in item.listCell" :key="d">
                  <section>
                    <h1>{{ item.cellInfo }} Option {{ d + 1 }}</h1>
                    <el-button
                      v-show="item.listCell.length > 1"
                      @click="deleteitem(item.listCell, d)"
                      type="primary"
                      icon="el-icon-delete"
                    ></el-button>
                  </section>
                  <el-form-item
                    :prop="'arr.' + index + '.listCell.' + d + '.label'"
                    :rules="{
                      required: true,
                      message: $t('project.cannotbenull'),
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      type="text"
                      :placeholder="$t('UserManagement.PleaseEnter')"
                      v-model="i.label"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    v-for="(self, e) in item.orange"
                    :key="self.cellInfo"
                    :label="self.cellInfo"
                    :prop="'arr.' + index + '.orange.' + e + '.listCell.' + d"
                    :rules="{
                      required: true,
                      message: $t('project.cannotbenull'),
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 5, maxRows: 10 }"
                      :placeholder="$t('UserManagement.PleaseEnter')"
                      v-model="self.listCell[d]"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <p class="dialog-footer">
      <button @click="$router.go(-1)">{{ $t("project.Back") }}</button>
      <button @click="submitForm('ruleForm')">
        {{ $t("project.Confirm") }}
      </button>
    </p>
    <el-dialog
      :visible.sync="dialogFormVisible_redOption_add"
      width="30%"
      :modal="true"
      :close-on-click-modal="false"
      center
    >
      <span slot="title">{{ $t("Contract.AddOption") }}</span>
      <el-form
        ref="add_coin"
        :model="Redoption_summit"
        label-width="120px"
        label-position="top"
      >
        <el-form-item :label="$t('Contract.Option')" prop="currencyType">
          <el-input
            :placeholder="$t('UserManagement.PleaseEnter')"
            show-word-limit
            maxlength="50"
            clearable
            v-model.trim="Redoption_summit.label"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogFormVisible_redOption_add = false">
          {{ $t("project.Cancel") }}
        </button>
        <button @click="Redoption_summitFn">{{ $t("project.Confirm") }}</button>
      </span>
    </el-dialog>

    <el-dialog
      class="contractformat"
      :title="$t('project.Reminder')"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <span>{{ $t("Contract.contractformat") }} ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$router.go(-1)">{{
          $t("project.Confirm")
        }}</el-button>
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
      dialogVisible: false,
      dialogFormVisible_redOption_add: false,
      labelposition: "top",
      ruleForm: {
        Redoption: "",
        arr: [],
      },
      Redoption_summit: {
        value: null,
        label: "",
      },
      fileId: null,
      // arr: [],
      itemdata: {},
      rules: {
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
    };
  },
  created() {
    this.fileId = this.$route.query.filed || null;
    this.getExcelContractTemplate();
  },
  methods: {
    getExcelContractTemplate() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/getExcelContractTemplate`,
          { fileId: this.fileId }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.ruleForm.arr = res.data.data.list;
            let isTureformat = this.ruleForm.arr.some((item, idx) => {
              return item.type === 3 && this.ruleForm.arr[idx + 1].type === 4;
            });
            // console.log(isTureformat);
            if (!isTureformat) {
              this.dialogVisible = true;
              return;
            }
            this.ruleForm.arr.forEach((item, idx) => {
              if (item.type === 3) {
                // this.istype3 = true;
                // item.listCell = [
                //   {
                //     label: "",
                //     value: 0,
                //   },
                // ];
                item.listCell = item.listCell.map((item, idx) => {
                  return {
                    label: item,
                    value: idx,
                  };
                });

                this.$set(item, "redOption", null);
                this.$set(item, "orange", []);
                // item.listRedCell = { orange: };
                let num = 1;
                if (this.ruleForm.arr[idx + 1].type !== 4) {
                  this.ruleForm.arr.splice(idx, 1);
                  return;
                }
                while (this.ruleForm.arr[idx + num].type === 4) {
                  item.orange.push(this.ruleForm.arr[idx + num]);
                  num++;
                }
              } else if (item.type === 4) {
                // item.listCell = [];
              }
            });
            console.log(this.ruleForm.arr);
          }
        });
    },
    handleClose(done) {
      done();
    },
    deleteitem(item, id) {
      item.splice(id, 1);
      // this.form.potentialInvestorarr.splice(index, 1);
    },
    Redoption_summitFn() {
      // let sw = true;
      console.log(this.itemdata);
      if (this.Redoption_summit.label) {
        // Object.assign(obj, this.Redoption_summit);
        // obj.value = this.brands.length > 0 ? this.brands.length : 0;
        let sw = this.itemdata.listCell.every((item) => {
          return item.label !== this.Redoption_summit.label;
        });
        if (sw) {
          this.itemdata.listCell.push({
            label: this.Redoption_summit.label,
            value: this.itemdata.listCell.length,
          });
          // this.itemdata.listRedCell.orange.forEach(item => {
          // });
          this.Redoption_summit.label = "";
          this.dialogFormVisible_redOption_add = false;
        } else {
          this.$message({
            message: this.$t("project.optionalreadyexist"),
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: this.$t("project.cannotbenull"),
          type: "warning",
        });
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

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = this.$global.deepCopy(this.ruleForm.arr);
          arr.forEach((item) => {
            if (item.type === 3) {
              item.listCell = item.listCell.map((i) => {
                return i.label;
              });
            }
          });
          console.log(arr);
          let obj = {
            importList: JSON.stringify(arr),
            fileId: parseInt(this.fileId),
          };
          this.$axios({
            method: "post",
            url: `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/saveExcelContractTemplate?Ad_Token=${this.$store.state.X_Token}`,
            data: this.$qs.stringify(obj),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }).then((res) => {
            this.$message({
              message: res.data.resultDesc,
              type: "success",
            });
            this.$router.replace({
              name: "contractItem",
            });
          });
        } else {
          return false;
        }
      });
    },
    // upload(file, fileList, name) {
    //   console.log("file", file);
    //   console.log("fileList", fileList);
    //   let files = { 0: file.raw };
    //   this.readExcel1(files, name);
    // },
  },
};
</script>

<style lang='scss'>
#contractClause {
  .el-form-item__content {
    margin-bottom: 30px;
  }
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
    }
  }
  .contractformat {
    .el-dialog__body {
      text-align: center;
    }
    .el-dialog__footer {
      .dialog-footer {
        display: flex;
        justify-content: center;
        .el-button--primary {
          color: #606266;
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

  .addredOption {
    font-weight: bold;
    i {
      cursor: pointer;
    }
  }
  .redoption {
    margin-bottom: 50px;
    section {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .dialog-footer {
    // padding-top: 40px;
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
