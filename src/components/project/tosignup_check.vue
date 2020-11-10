<template>
  <div id="project_check">
    <main>
      <header>{{title}}</header>
      <h1>{{projectname}}</h1>
      <div class="invest_infro" v-if="status>5">
        <h2>{{$t('project.InvestorInformation')}}</h2>
        <ul>
          <!--          <li v-for="(item,key)  in investors_lists">-->
          <!--            <div v-if="key!=='investorsCompany' && item.investorsType=='Company'">-->
          <!--              <span class="row1">{{item.title}}</span>-->
          <!--              <span class="row2">{{item.content}}</span>-->
          <!--            </div>-->
          <!--            <div v-else-if="key=='investorsName'">-->
          <!--              <span class="row1">{{item.title}}</span>-->
          <!--              <span class="row2">{{item.content}}</span>-->
          <!--            </div>-->
          <!--            <div else>-->
          <!--              <span class="row1">{{item.title}}</span>-->
          <!--              <span class="row2">{{item.content}}</span>-->
          <!--            </div>-->
          <!--          </li>-->
          <li>
            <div>
              <span class="row1">{{investors_lists.investorsType.title}}:</span>
              <span class="row2">{{investors_lists.investorsType.content}}</span>
            </div>
          </li>
          <li>
            <div v-if="investors_lists.Type==1">
              <span class="row1">{{investors_lists.investorsName.title}}:</span>
              <span class="row2">{{investors_lists.investorsName.content}}</span>
            </div>
          </li>
          <li v-if="investors_lists.Type==2">
            <div>
              <span class="row1">{{investors_lists.investorsCompany.title}}:</span>
              <span class="row2">{{investors_lists.investorsCompany.content}}</span>
            </div>
          </li>
          <li>
            <div>
              <span class="row1">{{investors_lists.investorsArea.title}}:</span>
              <span class="row2">{{investors_lists.investorsArea.content}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="agent_infro" v-if=" status>1">
        <h2>{{$t('project.IntermediaryInformation')}}</h2>
        <ul>
          <li v-for="(item,key) in agent_lists">
            <div v-if="key!='investorsCompany' && (key='investorsCompany' && item.response!='')">
              <span class="row1">{{item.title}}</span>
              <span class="row2">{{item.content}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="projectdetails">
        <h2>{{$t('project.ProjectDetails')}}</h2>
        <ul>
          <li v-for="(item,key,index) in projectdetails" class="box">
            <div>
              <span>{{item.title}}</span>
              <span>{{item.content}}</span>
            </div>
          </li>
        </ul>
      </div>
      <article>
        <aside>
          <ul>
            <li v-for="(item,key) in details_lists">
              <div
                class="pro_content"
                v-if="key=='projectDescribe' || key=='projectDetail' || key=='potentialInvestorsTags'"
              >
                <div>
                  <p>{{item.title}}</p>
                  <p v-html="item.content"></p>
                </div>
                <!--                <span>{{item.title}}</span>-->
                <!--                <span  class="row2" v-if="key=='projectStatus'">{{project_status[item.content]}}</span>-->
                <!--                <span  class="row2" v-else-if="key=='collectMoney'" ><p>{{item.max}}-&#45;&#45;{{item.min}}</p>-->
                <!--              </span>-->
              </div>
              <div class="pro_item" v-else>
                <span>{{item.title}}</span>
                <span class="row2" v-if="key=='collectMoney'">
                  <p>{{item.min}}--{{item.max}}</p>
                </span>
                <span class="row2" v-else>
                  <p>{{item.content}}</p>
                </span>
              </div>
              <!--              <span class="row2" v-else  v-html="item.content"></span>-->
            </li>
          </ul>
        </aside>
      </article>
      <footer>
        <p v-if="status>1" class="dialog-footer">
          <button @click="$router.go(-1)">{{$t('project.Back')}}</button>
          <button
            v-if="status>1 && status<5"
            @click="$routerto('contract',{signId:signId})"
          >{{$t('project.CheckContract')}}</button>
          <button v-else-if="status>=5" @click="check_contract">{{$t('project.CheckContract')}}</button>
        </p>
        <p v-else class="dialog-footer-back">
          <button @click="$router.go(-1)">{{$t('project.Back')}}</button>
        </p>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      status: "",
      signId: "",
      investors_lists: {
        investorsType: {
          title: this.$t("project.typeofinvestor"),
          content: ""
        },
        investorsCompany: {
          title: this.$t("project.InvestorCompany"),
          content: ""
        },
        investorsName: {
          title: this.$t("project.InvestorName"),
          content: ""
        },
        investorsArea: {
          title: this.$t("project.InvestorRegion"),
          content: ""
        }
      },
      agent_lists: {},
      projectdetails: {
        financingStage: {
          title: this.$t("project.FinancingStage"),
          content: ""
        },
        committedCount: {
          title: this.$t("project.NumberOfinvestorsHaveSubmitted"),
          content: ""
        },
        interestProjectCount: {
          title: this.$t("project.Numberofprojectsinterested"),
          content: ""
        }
      },
      details_lists: {
        projectIndustry: {
          title: this.$t("project.Industry"),
          content: ""
        },
        projectArea: {
          title: this.$t("project.Region"),
          content: ""
        },
        projectCompany: {
          title: this.$t("project.CompanyName"),
          content: ""
        },
        currencyType: {
          title: this.$t("project.Currency"),
          content: ""
        },
        collectMoney: {
          title: this.$t("project.FundingAmount"),
          max: "",
          min: ""
        },

        // projectStatus: {
        //   title: "项目状态:",
        //   content: ""
        // },
        projectMobile: {
          title: this.$t("project.ContactNumber"),
          content: ""
        },
        projectEmail: {
          title: this.$t("project.Email"),
          content: ""
        },
        projectDescribe: {
          title: this.$t("project.ProjectDescription"),
          content: ""
        },
        projectDetail: {
          title: this.$t("project.ProjectDetails"),
          content: ""
        },
        potentialInvestorsTags: {
          title: this.$t("project.Potential"),
          content: ""
        }
      },
      financingStage: {
        "0": this.$t("project.SeedRound"),
        "1": this.$t("project.AngelWheel"),
        "2": this.$t("project.ARound"),
        "3": this.$t("project.BRound"),
        "4": this.$t("project.CRound"),
        "5": "PRE-IPO",
        "6": "IPO"
      },
      project_status: {
        "0": this.$t("project.UnPendingItems"),
        "1": this.$t("project.PendingItems"),
        "2": this.$t("project.ToBeSignedProject"),
        "3": this.$t("project.InvestmentBankHasRejected"),
        "4": this.$t("project.SignedForChain"),
        "5": this.$t("project.ChainedForRecommendation"),
        "6": this.$t("project.PendingReview"),
        "7": this.$t("project.InvestmentBankHasRejectedinvestors"),
        "8": this.$t("project.ReviewedPending"),
        "9": this.$t("project.ProjectsToBeConfirmedByInvestors"),
        "10": this.$t("project.SignedContract"),
        "11": this.$t("project.InvestorHasRejected")
      },
      projectid: "",
      projectname: ""
      // projectStartTime: "",
      // picurl: ""
    };
  },
  created() {
    let self = this;
    // if(this.$route.query.status){
    console.log(this.$route.query.status);
    this.status = this.$route.query.status;
    this.title = this.project_status[this.status];
    // }
    this.projectid = this.$route.query.projectid;
    // 1	签约状态默认为-1(-1即查询所有状态);未签约->0等待投行审核资料->1 等待中间人签约  ->2 投行拒绝签约 ->3  中间人签约待上链 ->4  中间人上链待发送  ->5 等待投资者确认 ->6 投资人拒绝签约 ->7 签约成功 ->8
    this.signId = this.$route.query.signId ? this.$route.query.signId * 1 : -1;
    console.log(this.signId);
    // this.$axios({
    //   method: "get",
    //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getProjectDetails?projectId=${this.projectid}&signStatus=${this.status}&signId=${this.signId}`,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // })

    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_admin_web/project/getProjectDetails`,
        {
          projectId: this.projectid,
          signStatus: this.status,
          signId: this.signId
        }
      )
      .then(res => {
        console.log(res);
        if (res.data.resultCode == 10000) {
          this.projectname = res.data.data.projectName;
          this.details_lists.collectMoney.max = this.$global.formatNum(
            res.data.data.collectMoneyMax
          );
          this.details_lists.collectMoney.min = this.$global.formatNum(
            res.data.data.collectMoneyMin
          );
          let a = res.data.data.userIdentityType;
          let projectLan = res.data.data.projectLan;
          if (a == 1) {
            if (res.data.data.projectLan == "zh_CN") {
              this.agent_lists = {
                userIdentityType: {
                  title: self.$t("project.MiddlemanType"),
                  content: ""
                },
                userName: {
                  title: self.$t("project.MiddlemanName"),
                  content: ""
                },
                userCountryCh: {
                  title: self.$t("project.Region"),
                  content: ""
                }
              };
            } else if (res.data.data.projectLan == "en_US") {
              this.agent_lists = {
                userIdentityType: {
                  title: self.$t("project.MiddlemanType"),
                  content: ""
                },
                userName: {
                  title: self.$t("project.MiddlemanName"),
                  content: ""
                },
                userCountryEn: {
                  title: self.$t("project.Region"),
                  content: ""
                }
              };
            }
          } else if (a == 2) {
            if (res.data.data.projectLan == "zh_CN") {
              this.agent_lists = {
                userIdentityType: {
                  title: self.$t("project.MiddlemanType"),
                  content: ""
                },
                userCompanyCh: {
                  title: self.$t("project.MiddlemanCountryName"),
                  content: ""
                },
                userCountryCh: {
                  title: self.$t("project.Region"),
                  content: ""
                }
              };
            } else if (res.data.data.projectLan == "en_US") {
              this.agent_lists = {
                userIdentityType: {
                  title: self.$t("project.MiddlemanType"),
                  content: ""
                },
                userCompanyEn: {
                  title: self.$t("project.MiddlemanCountryName"),
                  content: ""
                },
                userCountryEn: {
                  title: self.$t("project.Region"),
                  content: ""
                }
              };
            }
          }

          for (var i in res.data.data) {
            if (this.agent_lists.hasOwnProperty(i)) {
              if (i == "userIdentityType") {
                this.agent_lists[i].content =
                  res.data.data[i] == 1
                    ? self.$t("project.individual")
                    : res.data.data[i] == 2
                    ? self.$t("project.company")
                    : "-";
              } else {
                this.agent_lists[i].content = res.data.data[i];
              }
            }

            if (this.details_lists.hasOwnProperty(i)) {
              this.details_lists[i].content = res.data.data[i];
            }
            if (this.investors_lists.hasOwnProperty(i)) {
              if (i == "investorsType") {
                this.investors_lists.Type = res.data.data[i];
                this.investors_lists[i].content =
                  res.data.data[i] == 1
                    ? self.$t("project.individual")
                    : res.data.data[i] == 2
                    ? self.$t("project.company")
                    : "";
              } else if (i == "investorsArea") {
                console.log(res.data.data.investorsArea);
                // let difang=
                if (projectLan == "zh_CN") {
                  this.investors_lists[i].content = res.data.data.investorsArea;
                } else {
                  this.investors_lists[i].content =
                    res.data.data.investorsAreaEn;
                }
              } else if (i == "interestedIndustries") {
                if (projectLan == "zh_CN") {
                  this.investors_lists[i].content =
                    res.data.data.interestedIndustries;
                } else {
                  this.investors_lists[i].content =
                    res.data.data.interestedIndustriesEn;
                }
              } else if (i == "investorsCompany") {
                if (projectLan == "zh_CN") {
                  this.investors_lists[i].content =
                    res.data.data.investorsCompany;
                } else {
                  this.investors_lists[i].content =
                    res.data.data.investorsCompanyEn;
                }
              } else {
                this.investors_lists[i].content = res.data.data[i];
              }
            }
            if (this.projectdetails.hasOwnProperty(i)) {
              if (i == "financingStage") {
                this.projectdetails[i].content = this.financingStage[
                  res.data.data[i]
                ];
              } else {
                this.projectdetails[i].content = res.data.data[i];
              }
            }
          }
          // console.log(this.agent_lists)
        }
      });
  },
  methods: {
    check_contract() {
      let newWindow = window.open();
      // this.$axios({
      //   method: "get",
      //   url: `${this.$axios.defaults.baseURL}/bsl_admin_web/projectSign/getPdf?signId=${this.signId}`
      // })
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/projectSign/getPdf`,
          {
            signId: this.signId
          }
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            newWindow.location.href = res.data.data.pdfPath;
          }
        });
    }
    // handleClick() {
    //   let data = JSON.stringify(this.datalist.userRespList);
    //   this.$router.push({
    //     name: "investor_infor",
    //     query: {
    //       userRespList: data
    //     }
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
#project_check {
  width: 100%;
  height: 100%;
  position: absolute;
  main {
    margin: 80px auto;
    width: 800px;
    text-align: center;
    header {
      border-bottom: 1px solid black;
      font-size: 30px;
      height: 60px;
      text-align: center;
      font-weight: 500;
    }
    h1 {
      text-align: initial;
      min-height: 30px;
      padding: 40px;
      font-size: 24px;
      box-sizing: border-box;
      /*word-break: break-all;*/
      display: flex;
      justify-content: center;
      /*align-content: center;*/
      /*flex-wrap:  wrap;*/
      color: #0f6ebe;
      line-height: 30px;
      /*border: 1px solid black;*/
    }
    .invest_infro,
    .agent_infro {
      overflow: hidden;
      h2 {
        height: 30px;
        color: #9c9c9c;
        line-height: 30px;
        background: #e8e8e8;
        font-size: 18px;
        border-radius: 5px;
      }
      ul {
        margin: 12px auto;
        width: 80%;
        /*height: 100px ;*/
        display: flex;
        line-height: 26px;
        flex-direction: column;
        li {
          width: 100%;
          div {
            margin-bottom: 5px;
            display: flex;
            /*justify-content: center;  */
            span:nth-of-type(1) {
              flex: 1;
              /*width: 20%;*/
              /*display: inline-block;*/
              font-size: 16px;
              font-weight: 600;
            }
            span:nth-of-type(2) {
              flex: 3;
              /*flex:1;*/
              /*width: 80%;*/
              /*display: inline-block;*/
            }
          }
        }
      }
    }
    .projectdetails {
      overflow: hidden;
      h2 {
        height: 30px;
        color: #9c9c9c;
        font-size: 18px;
        line-height: 30px;
        background: #e8e8e8;
        border-radius: 5px;
      }
      ul {
        /*width: 80%;*/
        border-bottom: 10px solid #e8e8e8;
        display: flex;
        border-radius: 5px;
        li.box {
          flex: 1;
          display: flex;
          height: 100px;
          align-items: center;
          div {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 80%;
            border-right: 5px solid #e8e8e8;
            span:nth-of-type(2) {
              color: #447db2;
              font-size: 20px;
            }
          }
        }
        li.box:nth-of-type(3) {
          div {
            border: none;
          }
        }
      }
    }

    article {
      margin: 20px auto;
      /*display: flex;*/
      justify-content: center;
      width: 80%;
      text-align: left;
      aside {
        li {
          width: 100%;
          margin-bottom: 20px;
          /*display: flex;*/
          word-wrap: break-word;
          .pro_item {
            display: flex;
            span:nth-of-type(1) {
              width: 200px;
              display: inline-block;
              margin-bottom: 5px;
              font-size: 16px;
              font-weight: 600;
            }
            span:nth-of-type(2) {
              /*flex:1;*/

              width: 80%;
              display: inline-block;
            }
          }
          .pro_content {
            p:nth-of-type(1) {
              font-size: 16px;
              margin-bottom: 10px;
              font-weight: 600;
            }
            p:nth-of-type(2) {
              white-space: pre-wrap; /* css-3 */
              white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
              /*white-space: -pre-wrap;      !* Opera 4-6 *!*/
              white-space: -o-pre-wrap;
            }
          }
        }
      }
    }
    .dialog-footer {
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
    }
    .dialog-footer-back {
      padding-top: 20px;
      display: flex;
      justify-content: center;
    }
    .dialog-footer,
    .dialog-footer-back {
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
  }
}
</style>
