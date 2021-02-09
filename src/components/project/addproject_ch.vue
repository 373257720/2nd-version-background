<template>
  <div id="addproject_ch">
    <button
      @click="testFun"
      class="test button"
      style="position: absolute; top: 0"
    >
      测试button
    </button>
    <header>
      <header>{{ $t("project.MyProjectInformation") }}</header>
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
          :remote-method="getRelationCompany"
        >
          <el-option
            v-for="item in restaurants"
            :key="item.userId"
            :label="
              $i18n.locale == 'zh_CN' ? item.userCompanyCh : item.userCompanyEn
            "
            :value="item.userId"
          >
            <div
              class="region_display"
              style="display: flex; justify-content: space-between"
            >
              <span>{{ item.userCompanyEn }}</span>
              <span>{{ item.userCompanyCh }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('project.Region')"
        class="region"
        prop="bslAreaCode"
      >
        <el-select
          :popper-append-to-body="false"
          @change="selectregion"
          v-model="form.bslAreaCode"
          :placeholder="$t('project.PleaseSelect')"
          remote
          multiple
          :remote-method="region_remoteMethod"
          filterable
        >
          <el-option
            v-for="item in regionlist"
            :key="item.countryCode"
            :label="
              $i18n.locale == 'zh_CN' ? item.countryZhname : item.countryEnname
            "
            :value="item.countryCode"
          >
            <div
              class="region_display"
              style="display: flex; justify-content: space-between"
            >
              <span>{{ item.countryEnname }}</span>
              <span>{{ item.countryZhname }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="industry" prop="projectIndustry">
        <slot name="label">
          <div class="label PotentialInvestors">
            <span>{{ $t("project.Industry") }}</span>
            <i
              @click="dialogFormVisible_industry = true"
              class="el-icon-circle-plus-outline"
            ></i>
          </div>
        </slot>
        <el-select
          :popper-append-to-body="false"
          v-model="industryId"
          filterable
          multiple
          @change="selectindustry"
          :placeholder="$t('project.PleaseSelect')"
        >
          <el-option
            v-for="item in industrylist"
            :key="item.industryId"
            :label="
              $i18n.locale == 'zh_CN'
                ? item.industryNameCh
                : item.industryNameEn
            "
            :value="item.industryId"
          >
            <span style="float: left">{{
              item.industryNameEn.length <= 50
                ? item.industryNameEn
                : item.industryNameEn.slice(0, 50) + "..."
            }}</span>
            <el-tooltip
              :disabled="item.industryNameCh.length <= 10 ? true : false"
              class="item"
              effect="dark"
              :content="item.industryNameCh"
              placement="top-start"
            >
              <span style="float: right">{{
                item.industryNameCh.length <= 10
                  ? item.industryNameCh
                  : item.industryNameCh.slice(0, 11) + "..."
              }}</span>
            </el-tooltip>
            <!--            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.industryNameEn}}</span>-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="projectNameEn"
        :label="$t('project.ProjectName') + '(' + $t('project.English') + ')'"
      >
        <el-input v-model="form.projectNameEn"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('project.ProjectName') + '(' + $t('project.Chinese') + ')'"
        prop="projectName"
      >
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item class="currencyType" prop="currencyType">
        <slot name="label">
          <div class="label PotentialInvestors">
            <span>{{ $t("project.FundingRange") }}</span>
            <i
              @click="dialogFormVisible_coin_add = true"
              class="el-icon-circle-plus-outline"
            ></i>
          </div>
        </slot>

        <el-select
          :popper-append-to-body="false"
          v-model="form.currencyType"
          filterable
          @change="select_coin"
          :placeholder="$t('project.PleaseSelect')"
        >
          <el-option
            v-for="item in getcoins"
            :key="item.currencyId"
            :label="item.industryNameCh"
            :value="item.currencyType"
          >
            <span style="float: left">{{ item.currencyType }}</span>
            <span style="float: right; color: #8492a6; font-size: 14px">{{
              item.currencyName
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <div class="money_range">
        <span>{{ $t("project.FundingRangeBewteen") }}</span>
        <div>
          <el-form-item prop="collectMoneyMin">
            <el-input
              @change="
                (val) => {
                  add_xiaoshudian(val, 1);
                }
              "
              v-model.trim="form.collectMoneyMin"
            ></el-input>
          </el-form-item>
          <i class="el-icon-minus"></i>
          <el-form-item prop="collectMoneyMax">
            <el-input
              @change="
                (val) => {
                  add_xiaoshudian(val, 2);
                }
              "
              v-model.trim="form.collectMoneyMax"
            ></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item>
        <slot name="label">
          <div class="label PotentialInvestors">
            <span>{{
              $t("project.PotentialInvestors") +
              "(" +
              $t("project.English") +
              ")"
            }}</span>
            <i
              @click="potentialInvestorarrFn"
              class="el-icon-circle-plus-outline"
            ></i>
          </div>
        </slot>
        <el-form-item
          class="potentialInvestors"
          v-for="(self, idx) in form.potentialInvestorarr"
          :prop="'potentialInvestorarr.' + idx + '.potentialInvestorsTagsEn'"
          :rules="{
            required: true,
            message: $t('UserManagement.PleaseEnter'),
            trigger: 'blur',
          }"
          :key="idx"
        >
          <div>
            <span>{{ idx + 1 }}.</span>
            <section>
              <el-input v-model="self.potentialInvestorsTagsEn"></el-input>
              <el-button
                v-show="form.potentialInvestorarr.length > 1"
                @click="deleteitem(idx)"
                type="primary"
                icon="el-icon-delete"
              ></el-button>
            </section>
          </div>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <slot name="label">
          <div class="label PotentialInvestors">
            <span>{{
              $t("project.PotentialInvestors") +
              "(" +
              $t("project.Chinese") +
              ")"
            }}</span>
          </div>
        </slot>
        <el-form-item
          class="potentialInvestors"
          v-for="(self, idx) in form.potentialInvestorarr"
          :key="idx"
          :rules="{
            required: true,
            message: $t('UserManagement.PleaseEnter'),
            trigger: 'blur',
          }"
          :prop="'potentialInvestorarr.' + idx + '.potentialInvestorsTags'"
        >
          <div>
            <span>{{ idx + 1 }}.</span>
            <section>
              <el-input v-model="self.potentialInvestorsTags"></el-input>
              <el-button
                v-show="form.potentialInvestorarr.length > 1"
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
            v-for="item in financingStageOption"
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
      <el-form-item
        prop="projectDescribeEn"
        :label="
          $t('project.ProjectDescription') + '(' + $t('project.English') + ')'
        "
      >
        <el-input
          type="textarea"
          maxlength="1500"
          show-word-limit
          v-model="form.projectDescribeEn"
          :autosize="{ minRows: 6, maxRows: 10 }"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="
          $t('project.ProjectDescription') + '(' + $t('project.Chinese') + ')'
        "
        prop="projectDescribe"
      >
        <el-input
          type="textarea"
          maxlength="300"
          show-word-limit
          v-model="form.projectDescribe"
          :autosize="{ minRows: 6, maxRows: 10 }"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="projectDetailEn"
        :label="
          $t('project.ProjectDetails') + '(' + $t('project.English') + ')'
        "
      >
        <el-input
          type="textarea"
          v-model="form.projectDetailEn"
          :autosize="{ minRows: 10, maxRows: 10 }"
        ></el-input>
      </el-form-item>

      <el-form-item
        :label="
          $t('project.ProjectDetails') + '(' + $t('project.Chinese') + ')'
        "
        prop="projectDetail"
      >
        <el-input
          type="textarea"
          v-model="form.projectDetail"
          :autosize="{ minRows: 10, maxRows: 10 }"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('project.Pleasetagtheitem')"
        class="region"
        prop="projectTags"
      >
        <el-select
          :popper-append-to-body="false"
          @change="selectTags"
          v-model="SelectedProjectTags"
          :placeholder="$t('project.PleaseSelect')"
          remote
          multiple
          :remote-method="region_remoteMethod"
          filterable
        >
          <el-option
            v-for="item in ProjectTags"
            :key="item.id"
            :label="$i18n.locale == 'zh_CN' ? item.tagsName : item.tagsNameEn"
            :value="item.id"
          >
            <div
              class="region_display"
              style="display: flex; justify-content: space-between"
            >
              <span>{{ item.tagsName }}</span>
              <span>{{ item.tagsNameEn }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="addproject_ch_bottom">
        <!--        <el-button type="primary" @click="$router.go(-1)">返回</el-button>-->
        <!--        <el-button type="primary" class="next" @click="submitForm('form')">提交</el-button>-->
        <p class="dialog-footer">
          <button @click="$router.go(-1)">{{ $t("project.Back") }}</button>
          <button @click="submitForm('form')">
            {{ $t("project.Submit") }}
          </button>
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
      <span slot="title" class="dialog-footer">{{
        $t("industry.Addindustry")
      }}</span>
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
        <button @click="dialogFormVisible_industry = false">
          {{ $t("project.Cancel") }}
        </button>
        <button @click="industy_submitForm('industy_submitForm')">
          {{ $t("project.Confirm") }}
        </button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormVisible_coin_add"
      width="30%"
      :modal="true"
      :close-on-click-modal="false"
      center
    >
      <span slot="title" class="dialog-footer">{{
        $t("CategoryOfCoin.Add")
      }}</span>
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
        <el-form-item
          :label="$t('CategoryOfCoin.Description')"
          prop="currencyName"
        >
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
        <button @click="dialogFormVisible_coin_add = false">
          {{ $t("project.Cancel") }}
        </button>
        <button @click="coin_submitForm('add_coin')">
          {{ $t("project.Confirm") }}
        </button>
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
      ProjectTags: [],
      industryId: [],
      SelectedProjectTags: [],
      industry_summit: {
        industryId: -1,
        industryNameEn: "",
        industryNameCh: "",
        industrySort: null,
      },
      coin_category_summit: {
        currencyId: -1,
        currencySort: null,
        currencyType: "",
        currencyName: "",
      },
      form: {
        potentialInvestorarr: [
          {
            potentialInvestorsTagsEn: "",
            potentialInvestorsTags: "",
          },
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
        sharingMechanism: 1,
      },
      coin_rules: {
        currencySort: [
          {
            required: true,
            message: this.$t("industry.Pleaseenterthanzero"),
            trigger: "blur",
          },
        ],
        currencyType: [
          {
            required: true,
            validator: valid_currencytype,
            trigger: "blur",
          },
        ],
        currencyName: [
          {
            required: true,
            validator: valid_currencyName,
            trigger: "blur",
          },
        ],
      },
      industry_rules: {
        industrySort: [
          {
            required: true,
            message: this.$t("industry.Pleaseenterthanzero"),
            trigger: "blur",
          },
        ],
        industryNameCh: [
          {
            required: true,
            validator: valid_industryNameCh,
            trigger: "blur",
          },
        ],
        industryNameEn: [
          {
            required: true,
            validator: valid_industryNameEn,
            trigger: "blur",
          },
        ],
      },
      rules: {
        potentialInvestorsTagsEn: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
        ],
        potentialInvestorsTags: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
        ],
        projectNameEn: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
          {
            min: 1,
            max: 500,
            message: this.$t("project.Between1and300charactersinlength"),
            trigger: "blur",
          },
        ],
        projectDescribeEn: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
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
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
          {
            min: 1,
            trigger: "blur",
          },
        ],
        collectMoneyMax: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        collectMoneyMin: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
        currencyType: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change",
          },
        ],
        projectCompany: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "change",
          },
        ],
        bslAreaCode: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change",
          },
        ],
        projectIndustry: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change",
          },
        ],
        projectDescribe: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
          {
            min: 1,
            max: 300,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
        ],
        projectName: [
          {
            required: true,
            message: this.$t("project.Between1and300charactersinlength"),
            trigger: "blur",
          },
          {
            min: 1,
            max: 300,
            message: this.$t("project.Between1and300charactersinlength"),
            trigger: "blur",
          },
        ],
        projectDetail: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
          {
            min: 1,
            trigger: "blur",
          },
        ],
        financingStage: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change",
          },
        ],
        projectMobile: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnter"),
            trigger: "blur",
          },
        ],
        projectEmail: [
          {
            required: true,
            message: this.$t("UserManagement.PleaseEnterEmail"),
            trigger: "blur",
          },
          {
            type: "email",
            message: this.$t("UserManagement.EmailFormatIsIncorrect"),
            trigger: ["blur"],
          },
        ],
        projectTags: [
          {
            required: true,
            message: this.$t("project.PleaseSelect"),
            trigger: "change",
          },
        ],
      },
      //融资阶段
      financingStageOption: [
        {
          value: 0,
          label: this.$t("project.AngelWheel"),
        },
        {
          value: 1,
          label: this.$t("project.ARound"),
        },
        {
          value: 2,
          label: this.$t("project.BRound"),
        },
        {
          value: 3,
          label: this.$t("project.CRound"),
        },
        {
          value: 4,
          label: this.$t("project.PreIPO"),
        },
        {
          value: 5,
          label: this.$t("project.DebtFinancing"),
        },
      ],
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
      immediate: true,
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
      immediate: true,
    },
  },
  created() {
    this.form.projectId = this.$route.query.projectId || null;
    this.get_coin();
    // this.getAllProjectTags();
    this.getRelationCompany();
    // this.region_remoteMethod();
    let axiosList = [
      // this.$axios.get(`${this.$axios.defaults.baseURL}/bsl_admin_web/base/countryList?searchKey=`),
      // this.$axios.get(`${this.$axios.defaults.baseURL}/bsl_admin_web/industry/getAllIndustry?searchKey=`),
      this.$global.get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/base/countryList`,
        {
          searchKey: "",
        }
      ),

      this.$global.get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/industry/getAllIndustry`,
        {
          searchKey: "",
        }
      ),
      this.$global.get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getAllProjectTags`
      ),
    ];
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2, res3) => {
        if (res1) {
          for (let i = 0; i < res1.data.data.length; i++) {
            this.regionlist[res1.data.data[i].countryCode] = res1.data.data[i];
          }
        }
        if (res2) {
          res2.data.data.forEach((item) => {
            if (item.industryStatus === false) {
              this.industrylist.push(item);
            }
          });
        }
        if (res3) {
          // if (res.data.resultCode === 10000) {
          this.ProjectTags = res3.data.data.projectTagsList;
          // }
        }
        if (this.$route.query.type == 0) {
        } else if (this.$route.query.type == 1) {
          this.get_formdata();
        }
      })
    );
    // 0 is add ,1 is edit
  },
  computed: {},
  mounted() {},
  methods: {
    testFun() {
      let result = {
        bslAreaCode: '["BEN"]',
        collectMoneyMax: 2,
        collectMoneyMin: 1,
        committedCount: 0,
        createTime: 1612171432,
        currencyType: "USD",
        docType: "bsl_project",
        financingStage: 0,
        interestProjectCount: 0,
        isSign: 1,
        optTime: 1612171432,
        potentialInvestorsTags: '["理想的投资人(中文)"]',
        potentialInvestorsTagsEn: '["理想的投资人(英语) "]',
        projectArea: '["贝宁"]',
        projectAreaEn: '["Benin"]',
        projectCompany: "测试公司",
        projectCompanyEn: "测试公司",
        projectDescribe: `Golden Moon（“公司”）是一家专注于癌症诊断的公司，现正致力于研发检测及鉴定实体瘤（包括前列腺癌，膀胱癌及胰腺癌）的新一代技术和实现其商品化。
        公司开发了一种用于发现早期前列腺癌的创新体外诊断检测技术（“产品X”）。产品X已在美国完成临床测试并准备商品化，预计在2021年初开始创收。中国的衔接测试及CE标志注册亦在进行中。
        公司计划在一至两年内根据第18A章在香港联合交易所上市。`,
        projectDescribeEn: `Golden Moon (“Company”) is a cancer-focused diagnostics company that is commercializing next-generation tests for detection and characterization of solid tumours, including those in the prostate, bladder and pancreas.
Company has developed a novel in-vitro diagnostic test for early detection of aggressive prostate cancer (“Product X”). Product X has completed a clinical trial in the United States and is ready for commercialisation, expecting to start generating revenue in early 2021. Bridging studies in the PRC and CE Mark registration are in progress.
Company is planning for listing on the Hong Kong Stock Exchange in accordance with Chapter 18A in one to two years.`,
        projectDetail: `地理位置
公司的总部位于澳洲，计划在美国、中国及澳洲将已开发的检测技术商品化。

核心产品说明
技术
• 产品X血液检测可区分患有侵略性前列腺癌的男性与非侵略性前列腺癌及无癌症的男性
• 使用独有的专利计算法为检测者评估侵略性前列腺癌的风险评分，该计算法结合了三种生物标志物
及一种临床因素
• 以符合FDA标准的临床测试方式在美国完成临床测试
• 在美国、欧洲、中国及其他司法管辖区已经取得多个知识产权或已提交相关注册申请
临床诊断途径及竞争优势
• 旨在帮助泌尿科医生决定是否建议患者进行活检或建议某种形式的主动监测

✓ 在相同的临床测试样本上
进行对比测试时，其表现
优于所有主要的竞争血液
检测技术（如PSA检测)
✓ 与PSA检测相比，检测侵略
性前列腺癌的特异性及敏
感性更高
✓ 有效减少40％以上的不必
要的前列腺活检

商品化
• 准备在美国商品化产品X ，并有望在2021年初开始产生收入
• 产品X将于公司在美国拥有的CLIA认证实验室中，以实验室自行研发检测（LDT）的形式提供。这
使公司可以获得检测的全部收入，而非通过外包专利技术的使用权来获取专利收入
• CE商标注册正在进行中，在中国的衔接性研究亦已准备就绪，在中国及澳洲亦已有明确推出计划。
已计划在美国建立检测后，开始在欧洲展开推广

产品X的市场潜力
• 但是，由于PSA检测对前列腺癌缺乏特异性，当男性的PSA水平升高而实际上没有癌症时，假阳性的
PSA检测结果便会出现。因此，关于将PSA检测用作筛查检测一直存在争议。
• 假阳性结果使检测者必须进行昂贵且痛苦的活检，并可能导致各种副作用包括严重感染，疼痛及出
血。目前大约60％的前列腺活检对前列腺癌呈阴性。产品X提高的特异性能大大减少不必要的活检。
• 产品X的优越性能将满足大量现行前列腺癌诊断及患者监测中未获满足的需求。
PSA 检测数量 (2020)
美国 71,100,000
欧洲 101,200,000
日本 37,400,000
中国内地 25,700,000
其他地区 22,300,000
全球 314,500,000
• 全球癌症诊断市场将以7.2％的复合年增长率增长，到2026年将达到2,503亿美元，全球前列腺癌诊
断市场预计在2025年达到184亿美元。
• 中国前列腺癌的高发病率及死亡个案；前列腺癌诊断检测技术的全球市场规模可与药品产品市场相
比
• 前列腺特异性抗原(PSA)检测多年来一直是用作检测血液中蛋白质特异性抗原水平升高的筛选试验
• 美国，欧洲，日本及中国对前列腺癌诊断检测有巨大市场需求

强大的管理团队及临床咨询小组
• 由三位世界著名泌尿科医生（包括前任LUGPA主席）设计的临床研究，旨在证明检测的性能及有效
性
• 团队成员在诊断产品的研发以及各种生物科技及医疗产品的商业化方面拥有丰富的经验：
• 首席执行官是享负盛名的澳洲尤里卡科学奖的获得者。他在产品商品化领域有多年实践经验，
多种产品已在各大公司有售，如Bio-Rad Laboratories，而其中Product X是他成立Golden Moon后
推出的第一个主要产品。
• 首席财务官/公司秘书是一位经验丰富的金融专业人士，曾在澳洲、英国及香港（包括Swire
Blanch Limited）担任过各种高级/董事会职位。
• 研究与开发主管在建立公司的知识产权及设计所有临床测试方面发挥了重要作用。他在生物医
学研究方面拥有近20年的经验，尤其专注于肿瘤学。
• 首席商品化总监曾在各跨国诊断公司（包括Roche, Becton Dickinson及Biorad）中管理数百万美元
的业务，拥有20年的相关经验。他在制定战略计划方面拥有良好的往绩，并全面承担损益责任，
创建了高效能的团队，并曾领导公司转型，使其实现远超市场水平的增长。
• 美国商品化主管是全球市场营销及销售策略师，在医疗保健行业拥有超过15年的经验，涉及临
床诊断、LDT、实时医疗设备、电子医疗及分销。在Focus Diagnostics推出了分子平台、3种FDA
批准的检测方法、8种CE试剂盒及20种用于开发LDT的分析物专用试剂(ASR)。

其他投资亮点
• 拥有大量正在研发的多项潜在产品，包括胰腺，膀胱及其他癌症诊断产品
• 凭借强大的知识产权地位（5个专利家族）有效降低商业风险状况
• 癌症诊断检测中类似的成功案例可供参考：
• Exact Sciences (NASDAQ: EXAS) – 2001年2月上市，IPO市值约为2.17亿美元；上市时正在研发大
肠癌筛查检测；最近一个财政年度的收入达到8.76亿美元；最新市值超过161亿美元。
• Genomic Health (NASDAQ: GHDX) – 于2005年9月上市，首次公开招股市值为5900万美元；上市
时已推出早期乳腺癌检测；由Exact Science于2019年11月以约28亿美元的价格收购.
• Myriad Genetics (NASDAQ: MYGN) – 1995年10月上市；上市时已开发及商品化四种癌症诊断产
品及拥有其他在研发阶段的药品及医疗产品；最近一个财政年度的收入达到6.39亿美元；最新市
值超过11亿美元。
• Guardant Health (NASDAQ: GH) – 于2018年10月上市，首次公开招股市值为16亿美元；上市时正
在研发用于选择疗法的基因检测及各类复发检测及早期检测；上市时收入约为4,200万美元，
2019年达到约2.14亿美元;最新市值超过104亿美元。`,
        projectDetailEn: `Geographic locations
Australia-based company planned commercialization of the developed test in the United States, the PRC and Australia.

Core product description
Technology
• A blood test which differentiates men with aggressive prostate cancer from non-aggressive and no cancer
• Assigns a risk score for aggressive prostate cancer using a proprietary and patented algorithm which
combines three biomarkers and one clinical factor
• Completed clinical trial in the United States using a clinical trial protocol designed to meet FDA standards
• Multiple intellectual property registrations have been filed or issued in USA, Europe, the PRC and other
jurisdictions

Clinical Diagnostic Pathway and Competitive Advantages
• Designed to assist urologists in making the decision to recommend a patient for a biopsy or to
recommend some form of active surveillance monitoring

✓ Outperformed all major
competing blood tests in
head-to-head testing on the
same clinical trial samples
✓ Higher specificity and
sensitivity to detect
aggressive prostate cancer
than PSA test
✓ Effectively reduces over 40%
of unnecessary prostate
biopsies

Commercialization
• Ready for commercialisation in the United States and expected to start generating revenue in 2021
• Product X will be offered as a laboratory developed test (LDT) in Company’s own CLIA-certified
laboratory in the United States, which allows Company to capture the entire revenue from the test as
compared to royalty fee only
• CE mark registration in progress, bridging study in the PRC ready to kick start, clear roll-out plan in the
PRC and Australia. Europe roll-out planned to commence once test established in the United States

Market potential for Product X
• The global cancer diagnostics market is growing at a CAGR of 7.2% to US$250.3 billion in 2026, and the
global prostate cancer diagnostics market is expected to reach US$18.4 billion in 2025.
• High incidence of prostate cancer and related deaths in China; global market size of prostate cancer
diagnostic test is comparable to a pharmaceutical type product market

Market potential for Product X 
• Prostate-specific antigen (PSA) test has for many years been used as a screening test to detect elevated
levels of a protein-specific antigen in the blood.

• Huge market demand for prostate cancer diagnostic test in the United States, Europe, Japan and China
PSA Testing Numbers (2020)
U.S. 71,100,000
Europe 101,200,000
Japan 37,400,000
PRC 25,700,000
Rest of the World 22,300,000
Global Market 314,500,000

• However, there are controversies about the use of PSA as a screening test due to its lack of specificity for
prostate cancer, resulting in expensive and painful, yet unnecessary prostate biopsies. Possible side effects
of biopsies include serious infections, pain, and bleeding.
• A false-positive test result occurs when a man’s PSA level is elevated but no cancer is actually present.
Currently around 60% of prostate biopsies are negative for prostate cancer. Product X’s improved
specificity will substantially reduce unnecessary biopsies.
• The advantageous performance of Company’s Product X would address a large unmet need in prostate
cancer diagnosis and patient monitoring

Strong management team and clinical advisory panel
• Clinical study designed by three world renowned urologists (including the past President of LUGPA) to
demonstrate test performance and validity
• Team members have extensive experience in research and development of diagnostic product and
commercialisation of various biotech and medical products:
• CEO is the winner of prestigious academic Australian Eureka Science Award. He founded Company to
commercialize Product X, its first major product. He has a long history of commercialization and his
products are being sold by major corporations, such as Bio-Rad Laboratories.
• CFO / Company Secretary is a seasoned financial professional who has held various senior / board
positions in Australia, the UK and Hong Kong, including Swire Blanch Limited.
• Head of Research and Development has been instrumental in building Company’s intellectual property
estate and designing all the clinical trials. He has nearly 20 years of experience in biomedical research
with a particular focus on oncology.
• Chief Commercialisation Officer has 20 years of experience in managing multi-million-dollar businesses
within multinational diagnostics corporations including Roche, Becton Dickinson and Biorad. He has a
strong track record in developing strategic plans and has had full P&L responsibility, created highperformance teams and led transformations to deliver growth well beyond market rates.
• US Commercialisation Lead is a global marketing and sales strategist with over 15 years of healthcare
experience, spanning clinical diagnostics, LDTs, point-of-care medical devices, e-health, and distribution.
At Focus Diagnostics launched a molecular platform along with 3 FDA cleared assays, 8 CE kits and 20
ASRs for the development of LDTs.

Other Investment Highlights
• Strong development pipeline of pancreatic, bladder and other cancer diagnostic products
• Strong intellectual property position (5 families of patents) and reduced commercial risk profile
• Similar successful cases in cancer diagnostic tests for reference:
• Exact Sciences (NASDAQ: EXAS) – Listed in February 2001 with IPO market cap of approximately
US$217 million; colorectal cancer screening tests under development at listing; revenue in latest
financial year reached US$876 million; latest market cap over US$16.1 billion.
• Genomic Health (NASDAQ: GHDX) – Listed in September 2005 with IPO market cap of US$59
million; early stage breast cancer test launched at listing; acquired by Exact Science in November 2019
at consideration of approximately US$2.8 billion.
• Myriad Genetics (NASDAQ: MYGN) – Listed in October 1995; developed and commercialised four
cancer diagnostic products at listing with other drugs and medical products in pipeline; revenue in
latest financial year reached US$639 million; latest market cap over US$1.1 billion.
• Guardant Health (NASDAQ: GH) – Listed in October 2018 with IPO market cap US$1.6 billion; gene
test for therapy selection; recurrence detection and early detection tests in development; revenue at
listing was approximately US$42 million and reached approximately US$214 million in 2019; latest
market cap over US$10.4 billion.`,
        projectEmail: "123@qq.com",
        projectIndustry: '["产业升级"]',
        projectIndustryEn: '["产业升级"]',
        projectLifeCycle: 0,
        projectMobile: "10086",
        projectName: "金月项目14",
        projectNameEn: "项目名称(英语)",
        projectStatus: 0,
        projectTags: '["区块链"]',
        projectTagsEn: '["Blockchain"]',
        projectUserId: "138178048",
        sharingMechanism: 50,
      };
      for (let i in result) {
        for (let j in this.form) {
          console.log(j);
          if (j == i) {
            console.log(i);
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
              this.form[j] = eval("(" + this.form[j] + ")");
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
      this.form.potentialInvestorsTags.forEach((item) => {
        this.form.potentialInvestorarr.push({
          potentialInvestorsTagsEn: "",
          potentialInvestorsTags: item,
        });
      });
      this.form.potentialInvestorsTagsEn.forEach((item, index) => {
        this.form.potentialInvestorarr[index].potentialInvestorsTagsEn = item;
      });

      this.form.projectIndustryEn.forEach((item) => {
        this.industrylist.forEach((self) => {
          if (self.industryNameEn == item) {
            this.industryId.push(self.industryId);
          }
        });
      });
      this.form.projectTagsEn.forEach((item) => {
        this.ProjectTags.forEach((self) => {
          if (self.tagsNameEn == item) {
            this.SelectedProjectTags.push(self.id);
          }
        });
      });
    },
    getAllProjectTags() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getAllProjectTags`
        )
        .then((res) => {
          console.log(res);
          if (res.data.resultCode === 10000) {
            this.ProjectTags = res.data.data.projectTagsList;
          }
        });
    },
    deleteitem(index) {
      // console.log(index);
      this.form.potentialInvestorarr.splice(index, 1);
    },

    potentialInvestorarrFn() {
      this.form.potentialInvestorarr.push({
        potentialInvestorsTagsEn: "",
        potentialInvestorsTags: "",
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
        .then((result) => {
          console.log(result);
          this.$confirm(result.data.resultDesc, self.$t("project.Reminder"), {
            confirmButtonText: self.$t("project.Confirm"),
            center: true,
            showCancelButton: false,
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
      // this.getRelationCompany();
      let {
        projectId: projectId,
        signStatus: signStatus,
        signId: signId,
      } = this.$route.query;
      let get_form = {
        projectId: projectId,
      };
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getProjectDetails`,
          get_form
        )
        .then((res) => {
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
                  // this.form[j] = JSON.parse(this.form[j]);
                  this.form[j] = eval("(" + this.form[j] + ")");
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
          this.form.potentialInvestorsTags.forEach((item) => {
            this.form.potentialInvestorarr.push({
              potentialInvestorsTagsEn: "",
              potentialInvestorsTags: item,
            });
          });
          this.form.potentialInvestorsTagsEn.forEach((item, index) => {
            this.form.potentialInvestorarr[
              index
            ].potentialInvestorsTagsEn = item;
          });

          this.form.projectIndustryEn.forEach((item) => {
            this.industrylist.forEach((self) => {
              if (self.industryNameEn == item) {
                this.industryId.push(self.industryId);
              }
            });
          });
          this.form.projectTagsEn.forEach((item) => {
            this.ProjectTags.forEach((self) => {
              if (self.tagsNameEn == item) {
                this.SelectedProjectTags.push(self.id);
              }
            });
          });
        });
    },
    get_coin() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/currency/getAllCurrency`
        )
        .then((res) => {
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
        .then((res) => {
          if (res.data.resultCode == 10000) {
            res.data.data.forEach((item) => {
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
            searchKey: searchKey,
          }
        )
        .then((res) => {
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
        .then((res) => {
          this.$confirm(res.data.resultDesc, self.$t("project.Reminder"), {
            confirmButtonText: self.$t("project.Confirm"),
            type: "warning",
            center: true,
            showCancelButton: false,
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
      this.restaurants.forEach((self) => {
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
      val.forEach((item) => {
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
      console.log(val);
      this.industryId = val;
      // console.log(this.industrylist);
      this.form.projectIndustry = [];
      this.form.projectIndustryEn = [];

      val.forEach((i) => {
        this.industrylist.forEach((item) => {
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
    selectTags(val) {
      this.form.projectTags = [];
      this.form.projectTagsEn = [];
      val.forEach((i) => {
        this.ProjectTags.forEach((item) => {
          if (item.id === i) {
            this.form.projectTags.push(item.tagsName);
            this.form.projectTagsEn.push(item.tagsNameEn);
          }
        });
        // for (let key in this.regionlist) {
        //   if (key === item) {
        //     this.form.projectTagsEn.push(this.regionlist[key].countryEnname);
        //   }
        // }
      });
      console.log(this.form.projectTags, this.form.projectTagsEn);
    },
    select_coin(val) {
      this.form.currencyType = val;
    },
    getRelationCompany(query) {
      let type = typeof query;
      if (type == "string") {
        this.loading = true;
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getRelationCompany`,
            {
              searchKey: query,
            }
          )
          .then((res) => {
            this.loading = false;
            this.restaurants = res.data.data;
            if (this.restaurants.length <= 0) {
              this.form.projectCompany = "";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.loading = true;
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getRelationCompany`
          )
          .then((res) => {
            this.loading = false;
            this.restaurants = res.data.data;
            console.log(this.restaurants);
            if (this.restaurants.length <= 0) {
              this.form.projectCompany = "";
            }
          })
          .catch((err) => {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add_industry();
        } else {
          return false;
        }
      });
    },
    coin_submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add_coin();
        } else {
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
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
        cloneObj.potentialInvestorarr.map((item) => {
          return item.potentialInvestorsTags;
        })
      );
      cloneObj.potentialInvestorsTagsEn = JSON.stringify(
        cloneObj.potentialInvestorarr.map((item) => {
          return item.potentialInvestorsTagsEn;
        })
      );
      // cloneObj.industryId = cloneObj.industryId[0];
      cloneObj.projectTags = JSON.stringify(cloneObj.projectTags);
      cloneObj.projectTagsEn = JSON.stringify(cloneObj.projectTagsEn);
      cloneObj.projectIndustry = JSON.stringify(cloneObj.projectIndustry);
      cloneObj.projectIndustryEn = JSON.stringify(cloneObj.projectIndustryEn);
      cloneObj.bslAreaCode = JSON.stringify(cloneObj.bslAreaCode);
      cloneObj.projectArea = JSON.stringify(cloneObj.projectArea);
      cloneObj.projectAreaEn = JSON.stringify(cloneObj.projectAreaEn);
      delete cloneObj.potentialInvestorarr;
      console.log(cloneObj);

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
        .then((res) => {
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
        showCancelButton: false,
      }).then(() => {
        if (resultCode === 10000) {
          this.$routerto("tosignuproot");
        }
      });
    },
  },
};
</script>

<style lang='scss'>
#addproject_ch {
  .label {
    color: #606266;
  }
  .PotentialInvestors {
    margin-bottom: 20px;
  }
  .el-form-item__content {
    line-height: initial;
  }
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
    // i {
    //   position: absolute;
    //   cursor: pointer;
    //   font-size: 16px;
    //   text-align: center;
    //   left: 90px;
    //   top: -38px;
    //   color: #606266;
    // }
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
    i:hover {
      color: #00adef;
    }
  }
}
</style>