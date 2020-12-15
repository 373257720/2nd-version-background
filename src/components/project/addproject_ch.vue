<template>
  <div id="addproject_ch">
    <header>
      <header>{{$t('project.MyProjectInformation')}}</header>
    </header>
    <el-form
      ref="form"
      @submit.native.prevent
      :model="form"
      :rules="rules"
      label-width="80px"
      :label-position="labelposition"
    >
      <el-form-item
        :label="$t('project.Nameofinvestmentbank')"
        class="companyname"
        prop="projectCompany"
      >
        <el-select
          :popper-append-to-body="false"
          v-model="form.projectCompany"
          filterable
          remote
          @change="selectOne"
          :placeholder="$t('project.keyword')"
          :remote-method="remoteMethod"
          :loading="loading"
          @focus="remoteMethod"
        >
          <el-option
            v-for="(item) in restaurants"
            :key="item.userId"
            :label="$i18n.locale=='zh_CN'?item.userCompanyCh:item.userCompanyEn"
            :value="item.userId"
          >
            <div class="region_display" style="display:flex;justify-content: space-between">
              <span>{{item.userCompanyEn}}</span>
              <span>{{ item.userCompanyCh}}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('project.Region')" class="region" prop="bslAreaCode">
        <el-select
          :popper-append-to-body="false"
          @change="selectregion"
          v-model="form.bslAreaCode"
          :placeholder="$t('project.PleaseSelect')"
          remote
          multiple
          @focus="region_remoteMethod"
          :remote-method="region_remoteMethod"
          filterable
        >
          <el-option
            v-for="item in regionlist"
            :key="item.countryCode"
            :label="$i18n.locale=='zh_CN'?item.countryZhname:item.countryEnname"
            :value="item.countryCode"
          >
            <div class="region_display" style="display:flex;justify-content: space-between">
              <span>{{item.countryEnname}}</span>
              <span>{{ item.countryZhname }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('project.Industry')" class="industry" prop="projectIndustry">
        <i @click="dialogFormVisible_industry = true" class="el-icon-circle-plus-outline"></i>
        <el-select
          :popper-append-to-body="false"
          v-model="form.industryId"
          filterable
          multiple
          @change="selectindustry"
          :placeholder="$t('project.PleaseSelect')"
        >
          <el-option
            v-for="(item) in industrylist"
            :key="item.industryId"
            :label="$i18n.locale=='zh_CN'?item.industryNameCh:item.industryNameEn"
            :value="item.industryId"
          >
            <span
              style="float: left; "
            >{{item.industryNameEn.length <= 50 ?item.industryNameEn:item.industryNameEn.slice(0,50)+'...'}}</span>
            <el-tooltip
              :disabled="item.industryNameCh.length<=10?true:false"
              class="item"
              effect="dark"
              :content="item.industryNameCh"
              placement="top-start"
            >
              <span
                style="float: right; "
              >{{item.industryNameCh.length<=10?item.industryNameCh:item.industryNameCh.slice(0,11)+'...'}}</span>
            </el-tooltip>
            <!--            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.industryNameEn}}</span>-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="projectNameEn" label="Project Name">
        <el-input v-model="form.projectNameEn"></el-input>
      </el-form-item>
      <el-form-item label="项目名称(中文)" prop="projectName">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('project.Currency')" class="currencyType" prop="currencyType">
        <i @click="dialogFormVisible_coin_add = true" class="el-icon-circle-plus-outline"></i>
        <el-select
          :popper-append-to-body="false"
          v-model="form.currencyType"
          filterable
          @change="select_coin"
          :placeholder="$t('project.PleaseSelect')"
        >
          <el-option
            v-for="(item) in getcoins"
            :key="item.currencyId"
            :label="item.industryNameCh"
            :value="item.currencyType"
          >
            <span style="float: left; ">{{item.currencyType}}</span>
            <span style="float: right; color: #8492a6; font-size: 14px">{{ item.currencyName}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <div class="money_range">
        <span>{{$t('project.FundingRangeBewteen')}}</span>
        <div>
          <el-form-item prop="collectMoneyMin">
            <el-input
              @change="((val)=>{add_xiaoshudian(val, 1)})"
              v-model.trim="form.collectMoneyMin"
            ></el-input>
          </el-form-item>
          <i class="el-icon-minus"></i>
          <el-form-item prop="collectMoneyMax">
            <el-input
              @change="((val)=>{add_xiaoshudian(val, 2)})"
              v-model.trim="form.collectMoneyMax"
            ></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item>
        <slot name="label">
          <span>Potential investors</span>
          <i @click="potentialInvestorarrFn" class="el-icon-circle-plus-outline"></i>
        </slot>
        <el-form-item
          class="potentialInvestors"
          v-for="(self,idx) in form.potentialInvestorarr"
          :prop="'potentialInvestorarr.'+idx+'.potentialInvestorsTagsEn'"
          :rules="{required: true, message: 'domain can not be null', trigger: 'blur'}"
          :key="idx"
        >
          <div>
            <span>{{idx+1}}.</span>
            <section>
              <el-input v-model="self.potentialInvestorsTagsEn"></el-input>
              <el-button
                v-show="form.potentialInvestorarr.length>1"
                @click="deleteitem(idx)"
                type="primary"
                icon="el-icon-delete"
              ></el-button>
            </section>
          </div>
        </el-form-item>
      </el-form-item>
      <el-form-item label="理想的投资人(中文)">
        <el-form-item
          class="potentialInvestors"
          v-for="(self,idx) in form.potentialInvestorarr"
          :key="idx"
          :rules="{required: true, message: 'domain can not be null', trigger: 'blur'}"
          :prop="'potentialInvestorarr.'+idx+'.potentialInvestorsTags'"
        >
          <div>
            <span>{{idx+1}}.</span>
            <section>
              <el-input v-model="self.potentialInvestorsTags"></el-input>
              <el-button
                v-show="form.potentialInvestorarr.length>1"
                @click="deleteitem(idx)"
                type="primary"
                icon="el-icon-delete"
              ></el-button>
            </section>
          </div>
        </el-form-item>
      </el-form-item>
      <el-form-item :label="$t('Contract.RecommmandPercent')">
        <el-input-number
          v-model="form.sharingMechanism"
          :precision="2"
          :step="0.1"
          :min="0"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('project.FinancingStage')" prop="financingStage">
        <el-select
          :popper-append-to-body="false"
          v-model="form.financingStage"
          :placeholder="$t('project.PleaseSelect')"
        >
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('project.ContactNumber')" prop="projectMobile">
        <el-input v-model="form.projectMobile"></el-input>
      </el-form-item>
      <el-form-item :label="$t('project.Email')" prop="projectEmail">
        <el-input v-model="form.projectEmail"></el-input>
      </el-form-item>
      <el-form-item prop="projectDescribeEn" label="Project Profile">
        <el-input
          type="textarea"
          maxlength="1500"
          show-word-limit
          v-model="form.projectDescribeEn"
          :autosize="{ minRows: 6, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目简介(中文)" prop="projectDescribe">
        <el-input
          type="textarea"
          maxlength="300"
          show-word-limit
          v-model="form.projectDescribe"
          :autosize="{ minRows: 6, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item prop="projectDetailEn" label="Project Details">
        <el-input
          type="textarea"
          v-model="form.projectDetailEn"
          :autosize="{ minRows: 10, maxRows: 10}"
        ></el-input>
      </el-form-item>

      <el-form-item label="项目详情(中文)" prop="projectDetail">
        <el-input
          type="textarea"
          v-model="form.projectDetail"
          :autosize="{ minRows: 10, maxRows: 10}"
        ></el-input>
      </el-form-item>
      <el-form-item label="请为项目添加标签" class="region" prop="projectTags">
        <el-select
          :popper-append-to-body="false"
          @change="selectTags"
          v-model="form.projectTags"
          :placeholder="$t('project.PleaseSelect')"
          remote
          multiple
          :remote-method="region_remoteMethod"
          filterable
        >
          <el-option
            v-for="item in regionlist"
            :key="item.countryCode"
            :label="$i18n.locale=='zh_CN'?item.countryZhname:item.countryEnname"
            :value="item.countryCode"
          >
            <div class="region_display" style="display:flex;justify-content: space-between">
              <span>{{item.countryEnname}}</span>
              <span>{{ item.countryZhname }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="addproject_ch_bottom">
        <!--        <el-button type="primary" @click="$router.go(-1)">返回</el-button>-->
        <!--        <el-button type="primary" class="next" @click="submitForm('form')">提交</el-button>-->
        <p class="dialog-footer">
          <button @click="$router.go(-1)">{{$t('project.Back')}}</button>
          <button @click="submitForm('form')">{{$t('project.Submit')}}</button>
        </p>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="dialogFormVisible_industry"
      width="30%"
      :modal="true"
      :close-on-click-modal="false"
      center
    >
      <span slot="title" class="dialog-footer">{{$t('industry.Addindustry')}}</span>
      <el-form
        ref="industy_submitForm"
        :model="industry_summit"
        :rules="industry_rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="中文名称:" prop="industryNameCh">
          <el-input
            placeholder="例:(金融)"
            show-word-limit
            maxlength="50"
            clearable
            v-model="industry_summit.industryNameCh"
          ></el-input>
        </el-form-item>
        <el-form-item label="English Name:" prop="industryNameEn">
          <el-input
            placeholder="E.g:(Finance)"
            show-word-limit
            maxlength="50"
            clearable
            v-model="industry_summit.industryNameEn"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('industry.SerialNumber')" prop="industrySort">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="industry_summit.industrySort"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogFormVisible_industry = false">{{$t('project.Cancel')}}</button>
        <button @click="industy_submitForm('industy_submitForm')">{{$t('project.Confirm')}}</button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormVisible_coin_add"
      width="30%"
      :modal="true"
      :close-on-click-modal="false"
      center
    >
      <span slot="title" class="dialog-footer">{{$t('CategoryOfCoin.Add')}}</span>
      <el-form
        ref="add_coin"
        :model="coin_category_summit"
        :rules="coin_rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item :label="$t('project.Currency')" prop="currencyType">
          <el-input
            :placeholder="$t('CategoryOfCoin.forexampleHKD')"
            show-word-limit
            maxlength="50"
            clearable
            v-model="coin_category_summit.currencyType"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('CategoryOfCoin.Description')" prop="currencyName">
          <el-input
            :placeholder="$t('CategoryOfCoin.forexamplegangbi')"
            show-word-limit
            maxlength="50"
            clearable
            v-model="coin_category_summit.currencyName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('industry.SerialNumber')" prop="currencySort">
          <el-input
            :placeholder="$t('industry.Pleaseenterthanzero')"
            show-word-limit
            maxlength="9"
            clearable
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="coin_category_summit.currencySort"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogFormVisible_coin_add = false">{{$t('project.Cancel')}}</button>
        <button @click="coin_submitForm('add_coin')">{{$t('project.Confirm')}}</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var valid_currencytype = (rule, value, callback) => {
      console.log(value);
      // var str = value.replace(/(^\s*)|(\s*$)/g, "");
      // let a = /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
      if (value) {
        this.coin_category_summit.currencyType = value;
        // console.log(this.coin_category_summit.currencyType)
        callback();
      } else {
        callback(new Error("Please Input English"));
      }
    };
    var valid_currencyName = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g, "");
      // let a = /^[\u4E00-\u9FA5][\u4E00-\u9FA5\s]*[\u4E00-\u9FA5]$/.test(str);
      if (value) {
        this.coin_category_summit.currencyName = value;
        callback();
      } else {
        callback(new Error("请输入中文"));
      }
    };
    var valid_industryNameCh = (rule, value, callback) => {
      // var str = value.replace(/(^\s*)|(\s*$)/g, "");
      // let a = /^[\u4E00-\u9FA5][\u4E00-\u9FA5\s]*[\u4E00-\u9FA5]$/.test(str);
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
      if (value) {
        this.industry_summit.industryNameEn = value;
        callback();
      } else {
        callback(new Error("Please Input English"));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      let min = this.form.collectMoneyMin.replace(/,/g, "") * 1;
      let max = value.replace(/,/g, "") * 1;
      if (max == "") {
        callback(new Error(this.$t("UserManagement.PleaseEnter")));
      } else if (max <= min) {
        callback(
          new Error(this.$t("project.Amountneedstobegreaterthantheminimum"))
        );
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      let min = value.replace(/,/g, "") * 1;
      if (min === "") {
        callback(new Error(this.$t("UserManagement.PleaseEnter")));
      } else if (min <= 0) {
        callback(new Error(this.$t("project.Amountneedstobegreaterthan")));
      } else {
        callback();
      }
    };
    return {
      labelposition: "top",
      loading: false,
      dialogFormVisible_coin_add: false,
      dialogFormVisible_industry: false,
      restaurants: [],
      getcoins: [],
      industrylist: [],
      formLabelWidth: "100px",
      regionlist: {},
      ProjectTags:[],
      industry_summit: {
        industryId: -1,
        industryNameEn: "",
        industryNameCh: "",
        industrySort: null
      },
      coin_category_summit: {
        currencyId: -1,
        currencySort: null,
        currencyType: "",
        currencyName: ""
      },
      form: {
        potentialInvestorarr: [
          {
            potentialInvestorsTagsEn: "",
            potentialInvestorsTags: ""
          }
        ],
        sharingMechanism: null,
        saveOrUpdate: this.$route.query.type,
        projectId: "",
        IsSign: true,
        projectUserId: "",
        projectName: "",
        projectNameEn: "",
        projectDescribe: "",
        projectDescribeEn: "",
        projectCompany: "",
        projectCompanyEn: "",
        industryId: [],
        projectIndustry: [],
        projectIndustryEn: [],
        bslAreaCode: [],
        projectArea: [],
        projectAreaEn: [],
        collectMoneyMin: "",
        collectMoneyMax: "",
        currencyType: "",
        projectMobile: "",
        projectEmail: "",
        projectDetail: "",
        projectDetailEn: "",
        projectStatus: null,
        projectLifeCycle: null,
        financingStage: "",
        interestProjectCount: null,
        committedCount: null,
        potentialInvestorsTags: "",
        potentialInvestorsTagsEn: "",
        projectTags: "",
        projectTagsEn: "",
        sharingMechanism: 1
      },
      coin_rules: {
        currencySort: [
          {
            required: true,
            message: this.$t("industry.Pleaseenterthanzero"),
            trigger: "blur"
          }
        ],
        currencyType: [
          {
            required: true,
            validator: valid_currencytype,
            trigger: "blur"
          }
        ],
        currencyName: [
          {
            required: true,
            validator: valid_currencyName,
            trigger: "blur"
          }
        ]
      },
      industry_rules: {
        industrySort: [
          {
            required: true,
            message: this.$t("industry.Pleaseenterthanzero"),
            trigger: "blur"
          }
        ],
        industryNameCh: [
          {
            required: true,
            validator: valid_industryNameCh,
            trigger: "blur"
          }
        ],
        industryNameEn: [
          {
            required: true,
            validator: valid_industryNameEn,
            trigger: "blur"
          }
        ]
      },
      rules: {
        potentialInvestorsTagsEn: [
          {
            required: true,
            message: "Please input",
            trigger: "blur"
          }
        ],
        potentialInvestorsTags: [
          {
            required: true,
            message: "Please input",
            trigger: "blur"
          }
        ],
        projectNameEn: [
          {
            required: true,
            message: "Please input",
            trigger: "blur"
          },
          {
            min: 1,
            max: 500,
            message: "Between 1 and 300 characters in length",
            trigger: "blur"
          }
        ],
        projectDescribeEn: [
          {
            required: true,
            message: "Please input",
            trigger: "blur"
          }
          // {
          //   min: 1,
          //   max: 1500,
          //   message: "长度在 1 到 1500个字符",
          //   trigger: "blur"
          // }
        ],
        projectDetailEn: [
          {
            required: true,
            message: "Please input",
            trigger: "blur"
          },
          {
            min: 1,
            trigger: "blur"
          }
        ],
        collectMoneyMax: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        collectMoneyMin: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        currencyType: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change"
          }
        ],
        projectCompany: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "change"
          }
        ],
        bslAreaCode: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change"
          }
        ],
        projectIndustry: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change"
          }
        ],
        projectDescribe: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur"
          },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300个字符",
            trigger: "blur"
          }
        ],
        projectName: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur"
          },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300 个字符",
            trigger: "blur"
          }
        ],
        projectDetail: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur"
          },
          {
            min: 1,
            trigger: "blur"
          }
        ],
        financingStage: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change"
          }
        ],
        projectMobile: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur"
          }
        ],
        projectEmail: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnterEmail"),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$t("UserManagement.EmailFormatIsIncorrect"),
            trigger: ["blur"]
          }
        ]
      },
      //融资阶段
      options3: [
        // {
        //   value: 0,
        //   label: this.$t("project.SeedRound")
        // },
        {
          value: 1,
          label: this.$t("project.AngelWheel")
        },
        {
          value: 2,
          label: this.$t("project.ARound")
        },
        {
          value: 3,
          label: this.$t("project.BRound")
        },
        {
          value: 4,
          label: this.$t("project.CRound")
        },
        {
          value: 5,
          label: "Pre-IPO"
        },
        {
          value: 6,
          label: this.$t("project.DebtFinancing")
        }
      ]
    };
  },
  watch: {
    "form.collectMoneyMin": {
      handler(newvalue, oldvalue) {
        // let newvalue_=(newvalue.indexOf('.00')>0)?newvalue.replace('.00' ,''):newvalue; //禁止ie8,9自动添加.00的小数点
        let newvalue_ = newvalue;
        if (isNaN(parseFloat(newvalue_.replace(/,/gi, "")))) {
          //如果当前输入的不是数字就停止执行
          this.form.collectMoneyMin = ""; //防止不是数字是input出现NaN提示
          return false;
        }
        if (parseFloat(newvalue_.replace(/,/gi, "")) > 1000000000000) {
          this.form.collectMoneyMin = oldvalue;
          return;
        }
        if (/\./i.test(newvalue_)) {
          //判断处理含有.的情况下
          if (newvalue_.split(".").length - 1 > 1) {
            this.form.collectMoneyMin = oldvalue;
            return;
          }
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.form.collectMoneyMin = oldvalue; //限制只能输入2位小数点
          } else {
            this.form.collectMoneyMin = newvalue_.replace(/[^\d\.\,]/gi, ""); //开始输入小数点之后，只能输入数字
          }
        }
        // else{
        // this.form.collectMoneyMin=((parseFloat(newvalue_.replace(/,/ig,'')).toLocaleString()).toString())
        // .replace('.00' ,'');
        // }
      },
      deep: true,
      immediate: true
    },
    "form.collectMoneyMax": {
      handler(newvalue, oldvalue) {
        let newvalue_ = newvalue;
        console.log(newvalue_);
        // let newvalue_=(newvalue.indexOf('.00')>0)?newvalue.replace('.00' ,''):newvalue; //禁止ie8,9自动添加.00的小数点
        if (isNaN(parseFloat(newvalue_.replace(/,/gi, "")))) {
          //如果当前输入的不是数字就停止执行
          this.form.collectMoneyMax = ""; //防止不是数字是input出现NaN提示
          return false;
        }
        if (parseFloat(newvalue_.replace(/,/gi, "")) > 1000000000000) {
          this.form.collectMoneyMax = oldvalue;
          return;
        }
        if (/\./i.test(newvalue_)) {
          //判断处理含有.的情况下
          if (newvalue_.split(".").length - 1 > 1) {
            this.form.collectMoneyMax = oldvalue;
            return;
          }
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.form.collectMoneyMax = oldvalue; //限制只能输入2位小数点
          } else {
            this.form.collectMoneyMax = newvalue_.replace(/[^\d\.\,]/gi, ""); //开始输入小数点之后，只能输入数字
          }
        } else {
          // this.form.collectMoneyMax=((parseFloat(newvalue_.replace(/,/ig,'')).toLocaleString()).toString()).replace('.00' ,'');
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.form.projectId = this.$route.query.projectId || null;
    this.get_coin();
    this.getAllProjectTags()
    this.region_remoteMethod();
    let axiosList = [
      // this.$axios.get(`${this.$axios.defaults.baseURL}/bsl_admin_web/base/countryList?searchKey=`),
      // this.$axios.get(`${this.$axios.defaults.baseURL}/bsl_admin_web/industry/getAllIndustry?searchKey=`),
      this.$global.get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/base/countryList`,
        {
          searchKey: ""
        }
      ),
      this.$global.get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/getAllIndustry`,
        {
          searchKey: ""
        }
      )
    ];
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2) => {
        if (res1) {
          for (let i = 0; i < res1.data.data.length; i++) {
            this.regionlist[res1.data.data[i].countryCode] = res1.data.data[i];
          }
        }
        if (res2) {
          res2.data.data.forEach(item => {
            if (item.industryStatus === false) {
              this.industrylist.push(item);
            }
          });
        }
      })
    );
    // 0 is add ,1 is edit
    if (this.$route.query.type == 0) {
    } else if (this.$route.query.type == 1) {
      this.get_formdata();
    }
  },
  computed: {},
  mounted() {},
  methods: {
    getAllProjectTags() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getAllProjectTags`,
        )
        .then(res => {
            console.log(res);
            
        });
    },
    deleteitem(index) {
      // console.log(index);
      this.form.potentialInvestorarr.splice(index, 1);
    },
    selectTags(val) {
      this.form.projectTagsEn = [];
      val.forEach(item => {
        for (let key in this.regionlist) {
          if (key === item) {
            this.form.projectTagsEn.push(this.regionlist[key].countryEnname);
          }
        }
      });
    },
    potentialInvestorarrFn() {
      this.form.potentialInvestorarr.push({
        potentialInvestorsTagsEn: "",
        potentialInvestorsTags: ""
      });
    },
    add_xiaoshudian(newvalue, num) {
      var value = parseFloat(newvalue.replace(/,/gi, ""));
      value = Math.round(value * 100) / 100;
      var s = value.toString().split(".");
      if (num == 1) {
        if (s.length == 1) {
          this.form.collectMoneyMin = value.toLocaleString().toString() + ".00";
        }
        if (s.length > 1) {
          if (s[1].length < 2) {
            this.form.collectMoneyMin = value.toLocaleString().toString() + "0";
          }
        }
      } else if (num == 2) {
        if (s.length == 1) {
          this.form.collectMoneyMax = value.toLocaleString().toString() + ".00";
        }
        if (s.length > 1) {
          if (s[1].length < 2) {
            this.form.collectMoneyMax = value.toLocaleString().toString() + "0";
          }
        }
      }
    },
    add_coin() {
      let self = this;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/currency/saveOrUpdateCurrency`,
          this.coin_category_summit
        )
        .then(result => {
          console.log(result);
          this.$confirm(result.data.resultDesc, self.$t("project.Reminder"), {
            confirmButtonText: self.$t("project.Confirm"),
            center: true,
            showCancelButton: false
          }).then(() => {
            if (result.data.resultCode == 10000) {
              this.dialogFormVisible_coin_add = false;
              this.get_coin();
              this.coin_category_summit.currencySort = null;
              this.coin_category_summit.currencyType = "";
              this.coin_category_summit.currencyName = "";
            }
          });
        });
    },
    get_formdata() {
      // this.region_remoteMethod();
      // this.remoteMethod();
      let {
        projectId: projectId,
        signStatus: signStatus,
        signId: signId
      } = this.$route.query;
      let get_form = {
        projectId: projectId
      };
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getProjectDetails`,
          get_form
        )
        .then(res => {
          let result = res.data.data.bslProjectVO.data;
          for (let i in result) {
            for (let j in this.form) {
              if (j == i) {
                this.form[j] = result[i];
                if (
                  j == "bslAreaCode" ||
                  j == "projectArea" ||
                  j == "projectAreaEn" ||
                  j == "projectIndustry" ||
                  j == "projectIndustryEn" ||
                  j == "projectTags" ||
                  j == "projectTagsEn" ||
                  j == "potentialInvestorsTags" ||
                  j == "potentialInvestorsTagsEn"
                ) {
                  this.form[j] = JSON.parse(this.form[j]);
                }
                if (j == "collectMoneyMin" || j == "collectMoneyMax") {
                  this.form[j] = this.form[j].toLocaleString();
                  if (/\./i.test(this.form[j])) {
                    //判断处理含有.的情况下
                    if (this.form[j].split(".").length > 1) {
                      if (this.form[j].split(".")[1].length < 2) {
                        this.form[j] = this.form[j] + "0";
                      }
                    }
                  } else {
                    this.form[j] = this.form[j] + ".00";
                  }
                }
              }
            }
          }
          this.form.potentialInvestorarr = [];
          console.log(this.form);

          this.form.potentialInvestorsTags.forEach(item => {
            this.form.potentialInvestorarr.push({
              potentialInvestorsTagsEn: "",
              potentialInvestorsTags: item
            });
          });
          this.form.potentialInvestorsTagsEn.forEach((item, index) => {
            this.$set(
              this.form.potentialInvestorarr[index],
              "potentialInvestorsTagsEn",
              item
            );
          });
          // console.log(this.industrylist);
          this.form.industryId = [this.form.industryId];

          // console.log(this.form);

          // this.form.projectDescribeEn = EngLists.projectDescribe;
          // this.form.projectDetailEn = EngLists.projectDetail;
          // this.form.projectCompanyEn = EngLists.projectCompany;
          // this.form.projectNameEn = EngLists.projectName;
          // this.form.projectIndustryEn = EngLists.projectIndustry;
          // this.form.projectAreaEn = EngLists.projectArea;
          // this.form.potentialInvestorsTagsEn = EngLists.potentialInvestorsTags;
        });
    },
    get_coin() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/currency/getAllCurrency`
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            this.getcoins = res.data.data;
          }
        });
    },
    industry_lists() {
      this.industrylist = [];
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/getAllIndustry`
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            res.data.data.forEach(item => {
              if (item.industryStatus === 0) {
                this.industrylist.push(item);
              }
            });
          }
        });
    },
    region_remoteMethod(query) {
      let searchKey = query ? query : "";
      this.regionlist = {};
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/base/countryList`,
          {
            searchKey: searchKey
          }
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.regionlist[res.data.data[i].countryCode] = res.data.data[i];
            }
            this.regionlist = Object.assign({}, this.regionlist);
          }
        });
      // } else {
      //   this.regionlist = [];
      // }
    },
    add_industry() {
      console.log(this.industry_summit);
      let self = this;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/base/countryList`,
          this.industry_summit
        )
        .then(res => {
          this.$confirm(res.data.resultDesc, self.$t("project.Reminder"), {
            confirmButtonText: self.$t("project.Confirm"),
            type: "warning",
            center: true,
            showCancelButton: false
          }).then(() => {
            if (res.data.resultCode == 10000) {
              this.dialogFormVisible_industry = false;
              this.industry_lists();
              this.industry_summit.industryNameCh = "";
              this.industry_summit.industryNameEn = "";
              this.industry_summit.industrySort = null;
            }
          });
        });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // back() {
    //   this.$routerto('tosignup',{pagenum:this.$route.query.pagenum});
    // },
    selectOne(item) {
      // console.log(item);
      this.restaurants.forEach(self => {
        if (self.userId === item) {
          this.form.projectUserId = self.userId;
          this.form.projectCompany = self.userCompanyCh;
          this.form.projectCompanyEn = self.userCompanyEn;
        }
      });
    },
    selectregion(val) {
      this.form.projectArea = [];
      this.form.projectAreaEn = [];
      val.forEach(item => {
        for (let key in this.regionlist) {
          if (key === item) {
            this.form.projectArea.push(this.regionlist[key].countryZhname);
            this.form.projectAreaEn.push(this.regionlist[key].countryEnname);
          }
        }
      });

      // val.forEach(item => {
      //   this.regionlist.forEach(it => {
      //     if (it.countryCode === item) {
      //       this.form.projectArea.push(it.countryZhname);
      //       this.form.projectAreaEn.push(it.countryEnname);
      //     }
      //   });
      // });
      // console.log(this.form.projectArea);

      // this.form.bslAreaCode = val.countryCode;
      // this.form.projectArea = val.countryZhname;
      // this.form.projectAreaEn = val.countryEnname;
    },
    selectindustry(val) {
      // console.log(val);
      this.form.industryId = val;
      // console.log(this.industrylist);
      this.form.projectIndustry = [];
      this.form.projectIndustryEn = [];
      this.industrylist.forEach(item => {
        val.forEach(i => {
          if (item.industryId === i) {
            this.form.projectIndustry.push(item.industryNameCh);
            this.form.projectIndustryEn.push(item.industryNameEn);
          }
        });
      });
      // console.log();

      // this.form.industryId =val.industryId;
      // this.form.projectIndustry = val.industryNameCh;
      // this.form.projectIndustryEn =val.industryNameEn;
    },
    select_coin(val) {
      this.form.currencyType = val;
    },
    remoteMethod(query) {
      let type = typeof query;
      if (type == "string") {
        this.loading = true;
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getRelationCompany`,
            {
              searchKey: query
            }
          )
          .then(res => {
            this.loading = false;
            this.restaurants = res.data.data;
            if (this.restaurants.length <= 0) {
              this.form.projectCompany = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.loading = true;
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getRelationCompany`
          )
          .then(res => {
            this.loading = false;
            this.restaurants = res.data.data;
            console.log(this.restaurants);
            if (this.restaurants.length <= 0) {
              this.form.projectCompany = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // deepClone(source) {
    //   const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    //   for (let keys in source) {
    //     // 遍历目标
    //     if (source.hasOwnProperty(keys)) {
    //       if (source[keys] && typeof source[keys] === "object") {
    //         // 如果值是对象，就递归一下
    //         targetObj[keys] = source[keys].constructor === Array ? [] : {};
    //         targetObj[keys] = this.deepClone(source[keys]);
    //       } else {
    //         // 如果不是，就直接赋值
    //         targetObj[keys] = source[keys];
    //       }
    //     }
    //   }
    //   return targetObj;
    // },
    industy_submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.add_industry();
        } else {
          return false;
        }
      });
    },
    coin_submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.add_coin();
        } else {
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commit();
        } else {
          return false;
        }
      });
    },
    commit() {
      let cloneObj = this.$global.deepCopy(this.form);
      cloneObj.collectMoneyMax = cloneObj.collectMoneyMax.replace(/,/g, "") * 1;
      cloneObj.collectMoneyMin = cloneObj.collectMoneyMin.replace(/,/g, "") * 1;
      cloneObj.potentialInvestorsTags = JSON.stringify(
        cloneObj.potentialInvestorarr.map(item => {
          return item.potentialInvestorsTags;
        })
      );
      cloneObj.potentialInvestorsTagsEn = JSON.stringify(
        cloneObj.potentialInvestorarr.map(item => {
          return item.potentialInvestorsTagsEn;
        })
      );
      cloneObj.industryId = cloneObj.industryId[0];
      cloneObj.projectTags = JSON.stringify(cloneObj.projectTags);
      cloneObj.projectTagsEn = JSON.stringify(cloneObj.projectTagsEn);
      cloneObj.projectIndustry = JSON.stringify(cloneObj.projectIndustry);
      cloneObj.projectIndustryEn = JSON.stringify(cloneObj.projectIndustryEn);
      cloneObj.bslAreaCode = JSON.stringify(cloneObj.bslAreaCode);
      cloneObj.projectArea = JSON.stringify(cloneObj.projectArea);
      cloneObj.projectAreaEn = JSON.stringify(cloneObj.projectAreaEn);
      delete cloneObj.potentialInvestorarr;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/saveOrUpdateProject`,
          cloneObj
        )
        // this.$axios({
        //   method: "post",
        //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/project/saveOrUpdateProject`,
        //   data: this.$qs.stringify(cloneObj, { arrayFormat: "indices" }),
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   }
        // })
        .then(res => {
          // if (res.data.resultCode == 10000) {
          //   this.$store.dispatch("submit_formdata_action", res.data.data);
          // }
          this.warning(res.data.resultCode, res.data.resultDesc);
        });
    },
    warning(resultCode, reminder) {
      let self = this;
      this.$confirm(reminder, self.$t("project.Reminder"), {
        confirmButtonText: self.$t("project.Confirm"),
        type: "warning",
        center: true,
        showCancelButton: false
      }).then(() => {
        if (resultCode === 10000) {
          this.$routerto("tosignuproot");
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#addproject_ch {
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
.addproject_ch_bottom {
  text-align: center;
  padding-top: 30px;
  .el-button {
    width: 98px;
  }
}
</style>

<style lang='scss' scoped>
div.selected {
  color: #409eff;
  font-weight: 700;
}
#addproject_ch {
  width: 600px;
  margin: 0 auto;
  padding: 40px 0;
  header {
    text-align: center;
    margin: 50px 0;
    font-size: 26px;
  }
  .potentialInvestors {
    margin-bottom: 20px;
    > span {
      display: inline-block;
      width: 30px;
      margin-right: 30px;
    }

    section {
      display: flex;
      // margin-bottom: 20px;

      align-items: center;
      div.el-input {
        margin-right: 10px;
      }
      button.el-button--primary {
        width: 100px;
        height: 100%;
      }
    }
  }
  .industry {
    i {
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left: 90px;
      top: -38px;
      color: #606266;
    }
    i:hover {
      color: #00adef;
    }
  }
  .dialog-footer {
    /*padding-top: 20px;*/
    display: flex;
    justify-content: space-between;
    button {
      width: 40%;
      height: 40px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
      background-color: #edf1f4;
      border: 1px solid #dcdfe6;
    }
  }
  .currencyType {
    i {
      position: absolute;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      left: 90px;
      top: -38px;
      color: #606266;
    }
    i:hover {
      color: #00adef;
    }
  }
}
</style>