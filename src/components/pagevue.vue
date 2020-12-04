<template>
  <div class="pagemodel">
    <div class="pagevue">
      <el-pagination
        v-if="pagenum!=0"
        :current-page="currentpages"
        :page-size="pagesizes"
        layout="prev,pager,next"
        :total="pagenum"
        @prev-click="prevclick"
        @next-click="nextclick"
      ></el-pagination>
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
    </div>
  </div>
  <!-- @current-change="handleCurrentChange" -->
</template>
<script>
export default {
  props: {
    pagenum: {
      type: Number,
      default: 1
    },
    currentpages: {
      type: Number,
      default: 0
    },
    pagesizes: {
      type: null,
      default: 8
    }
  },
  name: "pagevue",
  data() {
    return {
      // currentPage: 1,
      // pagesize: 1,
    };
  },
  created() {
    // console.log(this.pagenum);
  },
  watch: {
    //  pagenum:function(addd,oldd){
    //    console.log(addd,oldd);
    //  }
  },
  methods: {
    prevclick(num) {},
    nextclick(num) {
      console.log(this.pagenum);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(val);
      // this.currentPag = val;
      // var obj = {};
      // obj.pagesize = this.pagesizes;
      // obj.currentpage = val;
      // this.$emit("fromchildren", obj);
    }
  }
};
</script>

<style lang='scss' scoped>
.pagemodel {
  // margin-top: 50px;
  width: 100%;
  height: 50px;
  position: relative;
}
.pagevue {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
