<template>
  <div class="industry_alter">
    <!-- <header class="industry_alter_header">{{title}}</header> -->
    <el-main>
      <el-form
        ref="ruleForm"
        :model="industry_summit"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="礼品名称:" prop="industryNameCh">
          <el-input
            placeholder="中文名称"
            show-word-limit
            maxlength="50"
            clearable
            v-model="industry_summit.industryNameCh"
          ></el-input>
        </el-form-item>
        <el-form-item label="礼品名称:" prop="industryNameCh">
          <el-input
            placeholder="英文文名称"
            show-word-limit
            maxlength="50"
            clearable
            v-model="industry_summit.industryNameEn"
          ></el-input>
        </el-form-item>
        <el-form-item label="礼品数量:" prop="industryNameEn">
          <el-input
            placeholder="礼品数量"
            show-word-limit
            maxlength="50"
            clearable
            v-model="industry_summit.industryStatus"
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="dialog-footer">
        <button @click="$routerto('giftSetting')">
          {{ $t("project.Cancel") }}
        </button>
        <button @click="submitForm('ruleForm')">
          {{ $t("project.Confirm") }}
        </button>
      </p>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    var valid_industryNameCh = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g,"");
      // let a=/^[\u4E00-\u9FA5][\u4E00-\u9FA5\s]*[\u4E00-\u9FA5]$/.test(str);
      // if(a){
      //   this.industry_summit.industryNameCh=str;
      //   callback()
      // }else {
      //   callback(new Error('请输入中文'));
      // }
      if (value) {
        this.industry_summit.industryNameCh = value;
        callback();
      } else {
        callback(new Error("请输入中文"));
      }
    };
    var valid_industryNameEn = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g, "");
      // let a = /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
      // if (a) {
      //   this.industry_summit.industryNameEn = str;
      //   callback();
      // } else {
      //   callback(new Error("Please Input English"));
      // }

      if (value) {
        this.industry_summit.industryNameEn = value;
        callback();
      } else {
        callback(new Error("Please Input English"));
      }
    };
    return {
      dialogFormVisible_industry: false,
      tableData: [],
      title: "",
      industry_summit: {
        industryId: -1,
        industryNameEn: "",
        industryNameCh: "",
        industryStatus: 0,
        industrySort: null,
      },
      rules: {
        industrySort: [
          {
            required: true,
            message: this.$t("industry.Pleaseenterthanzero"),
            trigger: "blur",
          },
        ],
        industryNameCh: [
          { required: true, validator: valid_industryNameCh, trigger: "blur" },
        ],
        industryNameEn: [
          { required: true, validator: valid_industryNameEn, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    if (this.$route.query.industryId) {
      this.title = this.$t("industry.Pleaseenterindustrytobeedited");
      this.industry_summit.industryId = this.$route.query.industryId;
      this.search();
    } else {
      this.title = this.$t("industry.Pleaseentertheindustrytobeadded");
    }
  },
  // watch:{
  //   industry_summit: {
  //     handler(newName, oldName) {
  //       // console.log(newName, oldName)
  //      // let str = newName.replace(/\s*/g,"");

  //       // this.industry_summit.industryNameCh=newName.industryNameEn.replace(/\s*/g,"");
  //       // this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')
  //       // if(/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(newName.industryNameEn)){
  //       //   console.log(newName)
  //       //   newName=oldName
  //       // }
  //       ;
  //     },
  //     deep: true,
  //     immediate: true
  //   },
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid);
          this.add_industry();
        } else {
          return false;
        }
      });
    },
    search() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/getAllIndustry`,
          { searchKey: "" }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.tableData = [...res.data.data];
            this.tableData.forEach((item) => {
              if (item.industryId == this.$route.query.industryId) {
                this.industry_summit.industryStatus = item.industryStatus;
                this.industry_summit.industryNameEn = item.industryNameEn;
                this.industry_summit.industryNameCh = item.industryNameCh;
                this.industry_summit.industrySort = item.industrySort;
              }
            });
          }
        });
    },
    add_industry() {
      // console.log(this.industry_summit)
      // let self = this;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/saveModifyBslExchangeGift`,
          {
            giftName: this.industry_summit.industryNameCh,
            giftNameEn: this.industry_summit.industryNameEn,
            giftNumber: this.industry_summit.industryStatus,
          }
        )
        .then((result) => {
          if (result.data.resultCode == 10000) {
             this.$message({
                  message: result.data.resultDesc,
                  type: "success"
                });
            this.$routerto("giftSetting");
          }
        });
    },
  },
};
</script>

<style lang='scss'>
.industry_alter {
  padding: 80px 0;
  .industry_alter_header {
    height: 40px;
    width: 80%;
    font-size: 20px;
    line-height: 40px;
    margin: 0 auto;
    text-align: center;
  }
  .el-main {
    width: 40%;
    margin: 0 auto;
    .thick {
      p {
        margin-bottom: 50px;
        span {
          display: block;
          margin-bottom: 10px;
        }
      }
    }
    .dialog-footer {
      padding-top: 20px;
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
  }
}
</style>
