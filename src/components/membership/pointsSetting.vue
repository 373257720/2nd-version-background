<template>
  <div class="pointsSetting">
    <!-- <header class="industry_alter_header">{{title}}</header> -->

    <header class="tosignup_header">
      <nav>
        <el-button
          style="marginleft: 40px"
          @click="$routerto('pointsSettingHistory')"
          type="primary"
          class="addbtn"
          >积分兑换设置记录</el-button
        >
      </nav>
    </header>
    <el-main>
      <el-form
        ref="ruleForm"
        :model="industry_summit"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="积分兑换活动名称:" prop="industryNameCh">
          <el-input
            placeholder="中文名称"
            show-word-limit
            maxlength="50"
            clearable
            v-model="industry_summit.industryNameCh"
          ></el-input>
        </el-form-item>
        <el-form-item label="积分兑换规则:" prop="industryNameEn">
          <el-input
            placeholder="会员积分"
            show-word-limit
            maxlength="50"
            type="number"
            min="0"
            clearable
            v-model="industry_summit.industryNameEn"
          ></el-input>
        </el-form-item>
        <el-form-item label="礼品:" prop="industrychoosegift">
          <el-select
            @change="addgiftSeting()"
            v-model="industry_summit.value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.giftName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兑换积分渲染内容:" prop="industryNameCh">
          <el-input
            placeholder="会员积分"
            show-word-limit
            maxlength="100"
            clearable
            v-model="industry_summit.text"
          ></el-input>
        </el-form-item>
        <el-form-item label="兑换积分时限:" prop="industrytime">
          <el-date-picker
            v-model="industry_summit.starttime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否公开:" prop="">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
      </el-form>
      <p class="dialog-footer">
        <button @click="$routerto('Exchange')">
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
        callback(new Error("请输入大于0的正整数"));
      }
    };
    var valid_industrytime = (rule, value, callback) => {
      console.log(value)
      if (value) {
        this.industry_summit.starttime = value;
        callback();
      } else {
        callback(new Error("请选择日期"));
      }
    };
    var valid_choosegift = (rule, value, callback) => {
      if (value) {
        this.industry_summit.value = value;
        
        callback();
      } else {
        callback(new Error("请选择兑换礼品"));
      }
    };
    return {
      value: "",
      options: [],
      radio: "1",

      dialogFormVisible_industry: false,
      tableData: [],
      title: "",
      industry_summit: {
        industryId: -1,
        industryNameEn: "",
        industryNameCh: "",
      value: "",
        text: "",
        starttime: "",
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
       
        industrychoosegift: [
          { required: true, validator: valid_choosegift, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getgift();

    // if (this.$route.query.industryId) {
    //   this.title = this.$t("industry.Pleaseenterindustrytobeedited");
    //   this.industry_summit.industryId = this.$route.query.industryId;
    //   this.search();
    // } else {
    //   this.title = this.$t("industry.Pleaseentertheindustrytobeadded");
    // }
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
    // 添加礼品兑换设置
    addgiftSeting() {
      // console.log(this.industry_summit.value); //兑换礼品id
      // console.log(this.industry_summit.industryNameEn); //兑换礼品需要积分
      // console.log(this.industry_summit.industryNameCh); //兑换礼品活动名称
      // console.log(this.industry_summit.text); //兑换内容
      console.log(this.industry_summit.starttime); //兑换开始时间

      var date1 = new Date(this.industry_summit.starttime[0]); //获取当前时间
      var starttime = date1.getTime() / 1000;
      console.log(starttime); //兑换开始时间
      var date2 = new Date(this.industry_summit.starttime[1]); //获取当前时间
      var endtime = date2.getTime() / 1000;
      console.log(endtime); //兑换开始时间
      console.log(this.radio); //是否公开
    },
    //获取礼品
    getgift() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslExchangeGiftList`,
          { searchKey: "" }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.options = [...res.data.data.lists];
            // console.log(this.options);
            this.options.forEach((item, idx) => {
              // item.idx = idx + 1;
            });
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addgiftSeting();
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
      let self = this;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/saveIndustry`,
          self.industry_summit
        )
        .then((result) => {
          this.$confirm(result.data.resultDesc, self.$t("project.Reminder"), {
            confirmButtonText: self.$t("project.Yes"),
            center: true,
            showCancelButton: false,
          }).then(() => {
            if (result.data.resultCode == 10000) {
              this.$routerto("industry_lists");
            }
          });
        });
    },
  },
};
</script>

<style lang='scss'>
.pointsSetting {
  padding: 20px 0;
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
