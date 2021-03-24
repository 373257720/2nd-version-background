<template>
  <div class="addIcon">
    <el-main>
      <el-form
        ref="ruleForm"
        :model="ruleform"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="English Name" prop="stateNameEn">
          <el-input
            placeholder="Ex.（China）"
            show-word-limit
            maxlength="50"
            clearable
            v-model="ruleform.stateNameEn"
          ></el-input>
        </el-form-item>
        <el-form-item label="中文标签" prop="stateName">
          <el-input
            placeholder="例（中国）"
            show-word-limit
            maxlength="50"
            clearable
            v-model="ruleform.stateName"
          ></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input
            placeholder="例（中国）"
            show-word-limit
            maxlength="50"
            clearable
            v-model.number="ruleform.integral"
          ></el-input>
        </el-form-item>
        <el-form-item label="中文标签" prop="bslIconUrl">
          <el-select
            v-model="bslIconUrl"
            @change="selectIcon"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, idx) in PicUploadList"
              :key="item.id"
              :label="item.picName"
              :value="idx"
            >
              <!-- <img :src="item.picPathUrl+item.picPath" alt=""> -->
              <span style="float: left">{{ item.picName }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span> -->
            </el-option>
          </el-select>
          <img
            class="iconImg"
            v-if="ruleform.bslIconUrl"
            :src="ruleform.bslIconUrl"
            alt=""
          />
        </el-form-item>
        <el-form-item :label="$t('industry.SerialNumber')" prop="ranking">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model.number="ruleform.ranking"
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="dialog-footer">
        <button @click="$router.go(-1)">{{ $t("project.Cancel") }}</button>
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
    var valid_currencytype = (rule, value, callback) => {
      //  var str = value.replace(/(^\s*)|(\s*$)/g,"");
      //  let a=/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
      if (value) {
        this.ruleform.stateNameEn = value
        //  console.log(this.ruleform.tagsNameEn)
        callback()
      } else {
        callback(new Error('Please enter english'))
      }
    }
    var valid_currencyName = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g,"");
      // let a=/^[\u4E00-\u9FA5][\u4E00-\u9FA5\s]*[\u4E00-\u9FA5]$/.test(str);
      if (value) {
        this.ruleform.stateName = value
        callback()
      } else {
        callback(new Error('请输入中文'))
      }
    }
    return {
      dialogFormVisible_industry: false,
      tableData: [],
      title: '',
      PicUploadList: [],
      ruleform: {
        id: null,
        bslIconUrl: '',
        ranking: null,
        integral: null,
        stateNameEn: '',
        stateName: ''
      },
      bslIconUrl: '',
      rules: {
        // bslIconUrl: [{ required: true, trigger: "blur,change" }],
        ranking: [
          {
            required: true,
            message: this.$t('industry.Pleaseenterthanzero'),
            trigger: 'blur'
          }
        ],
        integral: [
          { required: true, validator: valid_currencytype, trigger: 'blur' }
        ],
        stateNameEn: [
          { required: true, validator: valid_currencytype, trigger: 'blur' }
        ],
        stateName: [
          { required: true, validator: valid_currencyName, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // if (this.$route.query.currencyId) {
    //   this.title = this.$t(
    //     "CategoryOfCoin.Pleaseenterthecurrencyyouwanttoedit"
    //   );
    //   this.ruleform.currencyId = this.$route.query.currencyId;
    //   this.search();
    // } else {
    //   this.title = this.$t(
    //     "CategoryOfCoin.Pleaseenterthecurrencyyouwanttoincrease"
    //   );
    // }
    this.ruleform.id = this.$route.query.id ? this.$route.query.id * 1 : null
    this.ruleform.id && this.getProjectStatusConfigure()
    this.getBslPicUploadList()
  },
  methods: {
    getProjectStatusConfigureList () {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getProjectStatusConfigureList`
        )
        .then((res) => {
          console.log(res)
        })
    },
    getProjectStatusConfigure () {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/getProjectStatusConfigure`, {
            id: this.ruleform.id
          }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {  
            for (var key in this.ruleform) {
              for (var i in res.data.data.bslProjectStatusConfigure) {
                if (key === i) {
                  this.ruleform[key] = res.data.data.bslProjectStatusConfigure[i]
                }
              }
            }
          }
        })
    },
    selectIcon (value) {
      let a = this.PicUploadList[value]
      this.ruleform.bslIconUrl = a.picPathUrl + a.picPath
      console.log(this.ruleform.bslIconUrl)
      // this.ruleform.bslIconUrl=  this.PicUploadList[value]
    },
    getBslPicUploadList () {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/upload/getBslPicUploadList`
        )
        .then((res) => {
          console.log(res)
          if (res.data.resultCode == 10000) {
            this.PicUploadList = res.data.data.lists
          }
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add_tag()
        } else {
          return false
        }
      })
    },
    // 添加标签123123123123
    add_tag () {
      console.log(this.ruleform)

      let self = this
      this.$global
        .postJson_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/member/saveModifyProjectStatusConfigure`,
          self.ruleform
        )
        .then((result) => {
          console.log(result)
          
          this.$confirm(result.data.resultDesc, self.$t('project.Reminder'), {
            confirmButtonText: self.$t('project.Confirm'),
            center: true,
            showCancelButton: false
          }).then(() => {
            if (result.data.resultCode == 10000) {
              //   self.ruleform.tagsSort = null;
              //   self.ruleform.tagsNameEn = "";
              //   self.ruleform.tagsName = "";
              //   this.$routerto("addIcon");
            }
          })
        })
    }
  }
}
</script>

<style lang='scss'>
.addIcon {
  padding-top: 80px;
  .coin_category_alter_header {
    height: 40px;
    width: 80%;
    font-size: 20px;
    line-height: 40px;
    margin: 0 auto;
    text-align: center;
  }
  .iconImg {
    margin-top: 20px;
    width: 100%;
    height: 180px;
  }
  .el-select {
    width: 100%;
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
