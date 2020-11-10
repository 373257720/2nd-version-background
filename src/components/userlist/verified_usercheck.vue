<template>
  <div id="verified_usercheck">
    <header>{{$t('project.Userinformation')}}</header>
    <div class="nationality">
      <p>{{$t('project.registerTime')}}</p>
      <el-input placeholder="-" v-model="createTime" :disabled="true"></el-input>
    </div>
    <div class="idcard_num">
      <p>{{$t('project.Type')}}</p>
      <el-input placeholder="-" v-model="userType" :disabled="true"></el-input>
    </div>
    <div class="userIdentityType">
      <p>{{$t('project.Identity')}}</p>
      <el-input placeholder="-" v-model="userIdentityType_tag[userIdentityType]" :disabled="true"></el-input>
    </div>
    <div class="email">
      <p>{{$t('project.Email')}}</p>
      <el-input placeholder="-" v-model="email" :disabled="true"></el-input>
    </div>
    <div class="bslName">
      <p>{{$t('project.Nationality')}}</p>
      <el-input placeholder="-" v-model="userCountry" :disabled="true"></el-input>
    </div>
    <div class="bslName2" v-if="userIdentityType==1">
      <p>{{$t('project.Username')}}</p>
      <el-input placeholder="-" v-model="userName" :disabled="true"></el-input>
    </div>
    <div class="id_back" v-if="userIdentityType==2">
      <p>{{$t('project.CompanyName')}}</p>
      <el-input placeholder="-" v-model="userCompany" :disabled="true"></el-input>
    </div>
    <div class="id_back" v-if="userIdentityType==2">
      <p>{{$t('project.companyAddress')}}</p>
      <el-input placeholder="-" v-model="userAddressCh" :disabled="true"></el-input>
    </div>
    <div class="id_front">
      <p>{{$t('project.Verificationtime')}}</p>
      <el-input placeholder="-" v-model="optTime" :disabled="true"></el-input>
    </div>
    <div class="companycheck" v-if="userIdentityType==1">
      <p>{{$t('project.CertificateNumber')}}</p>
      <el-input placeholder="-" v-model="userIdentity" :disabled="true"></el-input>
    </div>
    <div class="optStatus">
      <p>{{$t('project.Verifystatus')}}</p>
      <el-input placeholder="-" v-model="optStatus_tag[optStatus]" :disabled="true"></el-input>
    </div>
    <div class="failure_reasons" v-if="optStatus==2">
      <p>{{$t('project.ReasonsOfFailure')}}</p>
      <el-input placeholder="-" v-model="failure_reasons" :disabled="true"></el-input>
    </div>
    <div class="project_details" v-if="userIdentityType==1 && identityPicOne && identityPicTwo">
      <p>{{$t('project.IDcard')}}</p>
      <section>
        <el-popover
          popper-class="identityPicOne"
          placement="top"
          trigger="click">
          <img class="pic"  style="width: 500px;height: 420px" :src="$axios.defaults.baseURL+identityPicOne" alt />
          <img slot="reference" :src="$axios.defaults.baseURL+identityPicOne" alt />
        </el-popover>
        <el-popover
          placement="top"
          trigger="click">
          <img class="pic"  style="width: 500px;height: 420px" :src="$axios.defaults.baseURL+identityPicTwo" alt />
          <img slot="reference" :src="$axios.defaults.baseURL+identityPicTwo" alt />
        </el-popover>
      </section>
    </div>
    <div class="project_details" v-else-if="userIdentityType==1 && identityPicOne && !identityPicTwo">
      <p>{{$t('project.passport')}}</p>
      <section>
        <el-popover
          placement="top"
          trigger="click">
          <img class="pic"  style="width: 500px;height: 420px" :src="$axios.defaults.baseURL+identityPicOne" alt />
          <img slot="reference" :src="$axios.defaults.baseURL+identityPicOne" alt />
        </el-popover>
      </section>
    </div>
    <div class="project_details" v-else-if="userIdentityType==2 && userCompanyPic">
      <p>{{$t('project.Certificate')}}</p>
      <section>
        <el-popover
          popper-class="Certificate"
          placement="top"
          trigger="click">
          <img style="width: 500px;height: 420px" :src="$axios.defaults.baseURL+userCompanyPic" alt />
          <img class="picture" slot="reference" :src="$axios.defaults.baseURL+userCompanyPic" alt />
        </el-popover>
      </section>
    </div>
    <div class="commit">
      <button @click="$router.back(-1)">
        {{$t('project.Back')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createTime: "",
      userType: "",
      userCountry: "",
      userName: "",
      email: "",
      optTime: "",
      userCompany: "",
      userIdentity: "",
      optStatus: "",
      optStatus_tag: [this.$t('project.Notaudited'), this.$t('project.Approve'), this.$t('project.Disapprove')],
      identityPicOne: "",
      userAddressCh: "",
      identityPicTwo: "",
      userCompanyPic: "",
      userIdentityType: "",
      userIdentityType_tag: { "1": this.$t('project.individual'), "2": this.$t('project.company') },
      failure_reasons: ""
    };
  },
  created() {
    let self=this;
    var idx = this.$route.query.idx;
    this.userIdentityType = this.$route.query.userIdentityType;
    console.log(idx);
    // if (
    //   this.$route.query.country == "Macau" ||
    //   this.$route.query.country == "China" ||
    //   this.$route.query.country == "Hongkong"
    // ){

    // }
    // this.$axios({
    //   method: "get",
    //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthDetail?userId=${idx}`,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // })
    this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthDetail`,{
     userId:idx
      })
    .then(res => {
      var arr = res.data.data;
      this.email = arr.bslEmail;
      this.createTime = arr.createTime
        ? this.$global.timestampToTime(arr.createTime)
        : "-";
      this.failure_reasons = arr.optRemark ? arr.optRemark : "";
      if(arr.userType==1){
       this.userType= self.$t('project.ProjectParty')
      }else if(arr.userType==3){
        this.userType= self.$t('project.Investor')
      }else if(arr.userType==4){
        this.userType=  self.$t('project.Middleman')
      }
      if(arr.lan == "zh_CN"){
        this.userAddressCh = arr.userAddressCh ? arr.userAddressCh : "-";
        this.userCompany = arr.userCompanyCh ? arr.userCompanyCh : "-";
        this.userCountry =  arr.userCountryCh ? arr.userCountryCh:'-';

      }else if(arr.lan == "en_US"){
        this.userAddressCh = arr.userAddressEn ? arr.userAddressEn  : "-";
        this.userCompany = arr.userCompanyEn ?  arr.userCompanyEn : "-";
        this.userCountry =  arr.userCountryEn ? arr.userCountryEn:'-';
      }
      this.userName = arr.userName;
      // this.userCountry = arr.lan == "zh_CN" ? arr.userCountryCh : arr.userCountryEn;
      // this.userName = arr.userName;
      this.optTime = arr.optTime ? this.$global.timestampToTime(arr.optTime) : "-";
      // this.userAddressCh = arr.userAddressCh ? arr.userAddressCh : "-";
      // this.userCompany = arr.userCompanyCh ? arr.userCompanyCh : "-";
      this.userIdentity = arr.userIdentity;
      this.optStatus = arr.optStatus;
      // if (arr.optStatus === 0) {
      //   this.optStatus = "未审核";
      // } else if (arr.optStatus === 1) {
      //   this.optStatus = "审核通过";
      // } else if (arr.optStatus === 2) {
      //   this.optStatus = "审核不通过";
      // }
      this.identityPicOne =  arr.identityPicOne;
      this.userCompanyPic =  arr.userCompanyPic;
      if (arr.identityPicTwo) {
        this.identityPicTwo = arr.identityPicTwo;
      }
    });
  }
};
</script>

<<style lang='scss' scoped>
#verified_usercheck{

  width: 700px;
  margin: 50px auto;
  header{
    text-align: center;
    font-size: 26px;
    margin:20px;
  }
  >div{
    margin-bottom:30px;
    >p{
      font-size:16px;
    margin-bottom:20px;
    }
  }
  .project_details{
    section{
      width:100%;
      height:230px;
      display:flex;
      justify-content:space-between;

    }
     .el-popover__reference{
        width:300px;
       height: 200px;
        border-radius:5px;
       display: inline-block;
        border:1px solid #E4E7ED;
        background:#F5F7FA;
      }


  }
  .commit{
    text-align: center;
    margin-top: 50px;
    button{
      cursor:pointer;
      width: 40%;
      height: 40px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 5px;
      background-color: #EDF1F4;
      border:1px solid #DCDFE6;
    }
  }
}
</style>
