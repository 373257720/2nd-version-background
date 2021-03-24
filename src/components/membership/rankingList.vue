<template>
  <div class="pointsSetting">
    <!-- <header class="industry_alter_header">{{title}}</header> -->

    <el-main>
      <el-form
        ref="ruleForm"
        :model="industry_summit"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="积分排行刷新时间：:" prop="Integral_refreshtime">
          <el-date-picker
            v-model="industry_summit.Integral_refreshtime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <p class="dialog-footer">
        <button @click="$routerto('membershipList')">
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
  data () {
    return {
      Integral_refreshtime: null, // 积分刷新时间
      dialogFormVisible_industry: false,
      tableData: [],
      title: '',
      industry_summit: {
        Integral_refreshtime: []
      },
      rules: {
        Integral_refreshtime: [
          {
            required: true,
            message: this.$t('industry.Pleaseenterthanzero'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getBslRankingSystem()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add_industry()
        } else {
          return false
        }
      })
    },
    getBslRankingSystem () {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getBslRankingSystem`
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            switch (res.data.data.rankingSystem.startTime.toString().length) {
              case 10:
                this.$set(
                  this.industry_summit.Integral_refreshtime,
                  0,
                  res.data.data.rankingSystem.startTime * 1000
                )
                break
              default:
                this.$set(
                  this.industry_summit.Integral_refreshtime,
                  0,
                  res.data.data.rankingSystem.startTime
                )
            }
            switch (res.data.data.rankingSystem.endTime.toString().length) {
              case 10:
                this.$set(
                  this.industry_summit.Integral_refreshtime,
                  1,
                  res.data.data.rankingSystem.endTime * 1000
                )
                break
              default:
                this.$set(
                  this.industry_summit.Integral_refreshtime,
                  1,
                  res.data.data.rankingSystem.endTime
                )
            }
            console.log(this.industry_summit.Integral_refreshtime)
            // this.Integral_refreshtime =
            //   res.data.data.rankingSystem.optTime * 1000;
            // console.log(this.Integral_refreshtime);
            // if (res.data.data.rankingSystem.startTime.toString().length === 10) {
            // }else if()

            // console.log(res.data.data.rankingSystem.startTime);
          }
        })
    },
    add_industry () {
      // console.log(this.industry_summit)
      // let self = this
      var date1 = new Date(this.industry_summit.Integral_refreshtime[0]) // 获取当前时间
      var starttime = date1.getTime() / 1000
      // console.log(starttime) // 兑换开始时间
      var date2 = new Date(this.industry_summit.Integral_refreshtime[1]) // 获取当前时间
      var endtime = date2.getTime() / 1000
      this.$global
        .postJson_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/saveModifyBslRankingSystem`,
          {
            startTime: starttime,
            endTime: endtime
          }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.$message({
              message: res.data.resultDesc,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.resultDesc,
              type: 'warn'
            })
          }
        })
    }
  }
}
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
