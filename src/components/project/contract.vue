<template>
    <div id="contract_component">
    <div class="contract_component">
      <div class="top">合约</div>
      <main>
        <div class="middle" v-html="contract.article"></div>
      <div class="footer">
        <ul>
          <li>
            <nav>For and on behalf of:</nav>
            <h3>{{contract.owner_behalf}}</h3>
          </li>
          <li>
            <p><span>
              <img v-if="contract.owner_sign" :src="contract.owner_sign" alt="">
            </span></p>
            <p>Signature</p>
          </li>
          <li>
            <p><span>{{contract.owner_name}}</span></p>
            <p>Name</p>
          </li>
          <li>
            <p><span>{{contract.owner_title}}</span></p>
            <p>Title</p>
          </li>
          <li>
            <p><span>{{contract.owner_signdate}}</span></p>
            <p>Date</p>
          </li>
        </ul>
        <ul>
          <li>
            <nav>For and on behalf of:</nav>
            <h3>{{contract.agent_behalf}}</h3>
          </li>
          <li>
            <p><span><img v-if="contract.agent_sign"  :src="contract.agent_sign" alt=""></span></p>
            <p>Signature</p>
          </li>
          <li>
            <p><span>{{contract.agent_name}}</span></p>
            <p>Name</p>
          </li>
          <li>
            <p><span>{{contract.agent_title}}</span></p>
            <p>Title</p>
          </li>
          <li>
            <p><span>{{contract.agent_signdate}}</span></p>
            <p>Date</p>
          </li>
        </ul>
      </div>
       <footer>
        <button @click="goback">返回</button>
      </footer>
      </main>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
      signId:'',
        contract: {
          article:'',
          owner_sign:'',
          owner_behalf:'',
          owner_name:'',
          owner_title:'',
          owner_signdate:'',
          agent_sign:'',
          agent_behalf:'',
          agent_name:'',
          agent_title:'',
          agent_signdate:'',
        },
        }
    },
    created(){
        this.signId=this.$route.query.signId?this.$route.query.signId:'';
        // this.$axios({
        //     method: "get",
        //     url: `${this.$axios.defaults.baseURL}/bsl_admin_web/projectSign/getSignAgreement?signId=${this.signId}`,
        // })
          this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_admin_web/projectSign/getSignAgreement`,{
            signId:this.signId,
          })
        .then(res=>{
            if(res.data.resultCode==10000){
                  let str = JSON.parse(res.data.data.signAgreement);
                // //   this.agent_title=
                // console.log(str);
                    for(let i in this.contract){
                    if(str.hasOwnProperty(i)){
                        if(i=="owner_signdate" ||i=="agent_signdate" ){
                          this.contract[i]=str[i]?this.$global.stamptodate(str[i]):'';
                        }else{
                              this.contract[i]=str[i]?str[i]:'';
                        }
                    }
                 }

            }

        })
    },
    methods:{
        goback(){
             this.$router.go(-1);
        }
    }

}
</script>

<style lang="scss" scoped>
#contract_component {
  width: 100%;
  height: 100%;
  position: absolute;
  .contract_component {
    margin: 50px auto;
    width: 800px;
    // text-align: center;
    div.top{
      border-bottom: 1px solid black;
      font-size: 30px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-weight: 500;
      margin-bottom: 30px;
    }
    main{
      min-height: 30px;
      padding: 20px;
      font-size: 22px;
      box-sizing: border-box;
      word-break: break-all;
      line-height: 30px;
      /*border: 1px solid black;*/

      .middle{
        min-height: 200px;
      }
        div.footer{
            display: flex;
          width: 100%;
          justify-content: space-between;
            ul{
            width: 40%;
                li:nth-child(1){
                    margin: 30px 0 20px 0;
                    /*min-height: 100px;*/
                    height: 160px;
                    h3{
                         font-size: 18px;
                    }
                }
                img{
                    width: auto;
                    height: auto;
                    max-height: 80px;
                    max-width: 300px;
                }
                li{
                    margin-bottom: 20px;
                    p:nth-of-type(1){
                        position: relative;
                        border-bottom: 1px solid;
                        height: 80px;
                        span{
                        position: absolute;
                        bottom: 0;

                        line-height: 24px;

                        }
                    }
                     p:nth-of-type(2){
                            font-size: 18px;
                    }
                }
            }
        }
          footer {
      /*width: 800px;*/
      display: flex;
      height: 100px;
      justify-content: space-around;
      margin: 0 auto;
      align-items: center;
      button {
        background: #409EFF;
        width: 400px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        color: white;
        border-radius: 2px;
      }
    }
    }
  }


}
</style>
