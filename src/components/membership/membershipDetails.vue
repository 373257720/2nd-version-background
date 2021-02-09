<template>
  <div id="verified_usercheck">
    <!-- <header>{{$t('project.Userinformation')}}</header> -->
    <header>会员制度详情</header>

    <div class="nationality">
      <p>{{$t('Member.MembershipLevel')}}</p>
      <el-input placeholder="-" v-model="MembershipLevel" :disabled="true"></el-input>
    </div>
    <div class="idcard_num">
      <p>会员等级中文名称</p>
      <el-input placeholder="-" v-model="memberLevelName" :disabled="true"></el-input>
    </div>
    <div class="userIdentityType">
      <p>会员等级英文名称</p>
      <el-input placeholder="-" v-model="memberLevelNameEn" :disabled="true"></el-input>
    </div>
    <div class="email">
      <p>{{$t('Membership.Colour')}}</p>
      <el-input placeholder="-" v-model="memberColour" :disabled="true"></el-input>
    </div>
    <div class="bslName">
      <p>{{$t('Membership.Totalrecommendedtimes')}}</p>
      <el-input placeholder="-" v-model="memberRecommendCount" :disabled="true"></el-input>
    </div>
   
    <div class="id_back">
      <p>{{$t('Membership.PriorityTToRecommendInvestorTime')}}</p>
      <el-input placeholder="-" v-model="recommendInvestorTime" :disabled="true"></el-input>
    </div>
    <div class="id_back" >
      <p>{{$t('Membership.PriorityTToRecommendInvestorTime')}}</p>
      <el-input placeholder="-" v-model="recommendMiddlemanTime" :disabled="true"></el-input>
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
      MembershipLevel:'',//会员等级
      memberLevelName:'',//会员等级中文名称
      memberLevelNameEn:'',//会员等级英文名称
      memberColour:'',//会员等级颜色
      memberRecommendCount:'',//总共可推荐次数
      recommendInvestorTime:'',//优先推荐投资人时间
      recommendMiddlemanTime:'',//优先推荐中间人时间
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
    var Id = this.$route.query.Id;
    // this.userIdentityType = this.$route.query.userIdentityType;
    console.log(Id);
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
    this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/member/detailsBslMemberSystem`,{
     id:Id
      })
    .then(res => {
      var arr = res.data.data.bslMemberSystem;
      console.log(arr)
      this.MembershipLevel=arr.memberLevel;
      this.memberLevelName=arr.memberLevelName;
      this.memberLevelNameEn=arr.memberLevelNameEn;
      this.memberColour=arr.memberColour;
      this.memberRecommendCount=arr.memberRecommendCount;
      this.recommendInvestorTime=arr.recommendInvestorTime;
      this.recommendMiddlemanTime=arr.recommendMiddlemanTime;

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
