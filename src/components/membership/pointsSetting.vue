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
        <el-form-item label="积分兑换活动名称:" prop="integralExchangeName">
          <el-input
            placeholder=""
            show-word-limit
            maxlength="50"
            clearable
            v-model="industry_summit.integralExchangeName"
          ></el-input>
        </el-form-item>
        <el-form-item label="礼品兑换积分:" prop="integralAmount">
          <el-input
            placeholder=""
            show-word-limit
            clearable
            v-model="industry_summit.integralAmount"
            @input="
              (value) =>
                (industry_summit.integralAmount = $global.inputModel(
                  value,
                  0,
                  false
                ))
            "
          ></el-input>
        </el-form-item>
        <el-form-item label="礼品:" prop="exchangeGiftId">
          <el-select v-model="industry_summit.exchangeGiftId" placeholder="">
            <el-option
              v-for="item in GiftList"
              :key="item.id"
              :label="item['giftName' + $global.lan()]"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兑换积分渲染内容:" prop="exchangeDetails">
          <el-input
            placeholder=""
            show-word-limit
            maxlength="100"
            clearable
            v-model="industry_summit.exchangeDetails"
          ></el-input>
        </el-form-item>
        <el-form-item label="兑换积分时限:" prop="starttime">
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
          <!-- <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio> -->
            <el-radio-group v-model="industry_summit.exchangeOpen">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
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
      console.log(value);
      if (value) {
        this.industry_summit.starttime = value;
        callback();
      } else {
        callback(new Error("请选择日期"));
      }
    };
    return {
      value: "",
      GiftList: [],
      radio: "1",
      dialogFormVisible_industry: false,
      tableData: [],
      title: "",
      industry_summit: {
        id: null,
        integralExchangeName: "",
        integralAmount: null,
        exchangeGiftId: null,
        exchangeDetails: "",
        starttime: [],
        exchangeOpen: true,
        exchangeStatus: false,
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

        exchangeGiftId: [
          {
            required: true,
            message: "请选择兑换礼品",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getBslExchangeGiftList();
    if (this.$route.query.Id) {
      this.title = this.$t("industry.Pleaseenterindustrytobeedited");
      this.industry_summit.id = this.$route.query.Id * 1;
      this.getgift();
    } else {
      this.title = this.$t("industry.Pleaseentertheindustrytobeadded");
    }
    
  },
  methods: {
    // 获取礼品设置信息
    getBslExchangeGiftList() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslExchangeGiftList`,
          {
            pageIndex: null,
            pageSize: null,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.resultCode === 10000) {
            this.GiftList = res.data.data.lists;
            console.log(this.GiftList);
          }
        });
    },
    // 添加礼品兑换设置
    addgiftSeting() {
      // console.log(this.industry_summit.value); //兑换礼品id
      // console.log(this.industry_summit.industryNameEn); //兑换礼品需要积分
      // console.log(this.industry_summit.industryNameCh); //兑换礼品活动名称
      // console.log(this.industry_summit.text); //兑换内容
      // console.log(this.industry_summit.starttime) // 兑换开始时间
      var date1 = new Date(this.industry_summit.starttime[0]); // 获取当前时间
      var starttime = date1.getTime() / 1000;
      // console.log(starttime) // 兑换开始时间
      var date2 = new Date(this.industry_summit.starttime[1]); // 获取当前时间
      var endtime = date2.getTime() / 1000;

      let obj = {
        integralExchangeName: this.industry_summit.integralExchangeName,
        integralAmount: this.industry_summit.integralAmount,
        exchangeGiftId: this.industry_summit.exchangeGiftId,
        exchangeDetails: this.industry_summit.exchangeDetails,
        exchangeStartTime: starttime,
        exchangeEndTime: endtime,
        exchangeOpen: this.industry_summit.exchangeOpen,
        exchangeStatus: false,
        id: this.industry_summit.id,
      };
      this.$global
        .postJson_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/saveModifyBslExchangeIntegral`,
          obj
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.$message({
              message: res.data.resultDesc,
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.resultDesc,
              type: "warn",
            });
          }
        });
    },
    // 获取礼品
    getgift() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslExchangeIntegral`,
          { id: this.industry_summit.id }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            for (var key in res.data.data.bslExchangeIntegral) {
              for (var i in this.industry_summit) {
                if (key === i) {
                  this.industry_summit[i] =
                    res.data.data.bslExchangeIntegral[key];
                }
                if (key === "exchangeStartTime") {
                  this.$set(
                    this.industry_summit.starttime,
                    0,
                    res.data.data.bslExchangeIntegral[key] * 1000
                  );
                } else if (key === "exchangeEndTime") {
                  this.$set(
                    this.industry_summit.starttime,
                    1,
                    res.data.data.bslExchangeIntegral[key] * 1000
                  );
                }
              }
            }
            console.log(this.industry_summit);
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
  },
};
</script>

<style lang='scss'>
.pointsSetting {
  padding: 20px 0;
  .tosignup_header {
    padding-left: 30px;
  }
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100% !important;
  }
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
