import axios from "axios";
import Vue from "vue";
import qs from "qs";
import MD5 from "../../md5";
var appid = "20200615000495980";
var key = "ioT1P2UGZoGv7tkUu0lE";
import store from "../store/store";
const global = {
  async translateL(str) {
    var salt = new Date().getTime();
    var query = str;
    //     // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = "zh";
    var to = "en";
    var str1 = appid + query + salt + key;
    var sign = MD5(str1);
    let result = await $.ajax({
      url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
      type: "get",
      dataType: "jsonp",
      data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      },
      success: function(data) {
        // return data.trans_result[0].dst;
        // console.log(callback)
        // console.log(data.trans_result[0].dst);
        // return   data.trans_result[0].dst;
      }
    });
    // console.log(result)
    return result;
  },
  // format num
  formatNum: function(num) {
    let value = Math.round(num * 100) / 100;
    let s = value.toString().split(".");
    let format_num;
    if (s.length == 1) {
      format_num = value.toLocaleString().toString() + ".00";
    } else if (s.length > 1) {
      if (s[1].length < 2) {
        format_num = value.toLocaleString().toString() + "0";
      }
    }
    return format_num;
  },
  //深复制
  deepCopy: function(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  // 时间戳转日期
  stamptodate: function(stamp) {
    if (stamp == "") {
      return "";
    }
    var date = new Date(stamp);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    return Y + M + D;
  },
  //时间戳转具体时间
  timestampToTime: function(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为1
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  // 换页
  changepage: function(url, num, currpage, pagesize, arr) {
    axios({
      method: "get",
      url: `${url}/bsl_web/projectSign/project`,
      params: {
        projectStatus: num,
        pageIndex: currpage,
        pageSize: pagesize
      }
    }).then(res => {
      arr = [...res.data.data.lists];
      arr.forEach((item, idx) => {
        item.projectStartTime = this.timestampToTime(item.projectStartTime);
        item.signTime = this.timestampToTime(item.signTime);
        arr = Vue.set(arr, idx, item);
        console.log(arr);
      });
    });
  },
  comdify: function(n) {
    if (!n) return n;
    let str = n.split(".");
    let re = /\d{1,3}(?=(\d{3})+$)/g;
    let n1 = str[0].replace(re, "$&,");
    return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`;
  },
  //去除千分位中的‘，'
  delcommafy: function(num) {
    if (!num) return num;
    num = num.toString();
    num = num.replace(/,/gi, "");
    return num;
  },
  // get请求封装
  get_encapsulation: function(url, datas) {
    if (Object.prototype.toString.call(datas) !== "[object Object]") {
      datas = {};
    }
    // console.log(store.state.X_Token)
    if (store.state.X_Token) {
      datas.Ad_Token = store.state.X_Token;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(
          url,
          {
            params: datas
          }
          // { headers:{
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // }}
        )
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  // post请求封装
  post_encapsulation: function(url, datas) {
    if (Object.prototype.toString.call(datas) !== "[object Object]") {
      datas = {};
    }
    if (store.state.X_Token) {
      datas.Ad_Token = store.state.X_Token;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(datas), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  // 获取输入框的值
  getInputValue: function(el) {
    let inputVal = el.target.value || "";
    console.log(inputVal);
    return this.comdify(this.delcommafy(inputVal));
  },
  cleanall() {
    this.$routerto("login");
    sessionStorage.clear();
  }

  // abc:async function(url, num, currpage, pagesize){
  //   let a = await this.getdata(url, num, currpage, pagesize);
  //   console.log(a);
  // }
};

export default global;
