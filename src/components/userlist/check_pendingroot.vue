<template>
  <div class="check_pendingroot">
    <el-main>
      <header class="tosignup_header">
        <el-input
          :placeholder="$t('project.ProjectName')"
          v-model="keywords"
          class="block"
          clearable
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="block"
          @click="
            () => {
              search(null,pagesize);
            }
          "
          >{{ $t("project.Search") }}</el-button
        >
      </header>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          fixed
          prop="registrationTime"
          width="200"
          :label="$t('project.registerTime')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userType"
          :label="$t('project.Type')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bslEmail"
          show-overflow-tooltip
          :label="$t('project.Email')"
          min-width
          align="center"
        ></el-table-column>
        <el-table-column
          prop="submitTime"
          width="200"
          :label="$t('project.Submissiontime')"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('project.Operation')"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >{{ $t("project.View") }}</el-button
            >
            <!-- <el-button type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagevue
        :pagenum="pagetotal"
        :currentpages="currentpage"
        :pagesizes="pagesize"
        v-on:fromchildren="fromchildren1"
      ></pagevue>-->
      <el-pagination :page-size="pagesize" layout="slot">
        <span class="finger" @click="changePage('previous')">{{
          $t("project.Previous")
        }}</span>
        <span class="finger" @click="changePage('next')">{{
          $t("project.Next")
        }}</span>
      </el-pagination>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'check_pendingroot',
  data () {
    return {
      ischeck: false,
      currentpage: null,
      bookmark: null,
      pagesize: 8,
      // pagetotal: null,
      tableData: [],
      keywords: '',
      pageArr: [null],
      currentpageSerial: 0,
      projectStatus: 0
    }
  },
  created () {
    this.search(this.pageArr[this.currentpageSerial], this.pagesize)
  },
  activated () {},
  methods: {
    search (currentpage, pagesize) {
      let self = this
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/user/getUserAuthList`,
          {
            keywords: self.keywords,
            optStatus: self.projectStatus,
            bookmark: currentpage,
            pageSize: pagesize
          }
        )
        .then((res) => {
          if (res.status === 200) {
            let a = this.pageArr.every((item) => {
              return item !== res.data.data.bookmark
            })
            if (a) {
              this.pageArr.push(res.data.data.bookmark)
            }
            console.log(this.pageArr)
            this.bookmark = res.data.data.bookmark
            // this.currentpage = this.pageArr.indexOf(res.data.data.lastBookmark);
            // this.pagetotal =
            //   (this.pageArr.length - 1) * this.pagesize +
            //   res.data.data.data.length;
            this.tableData = res.data.data.data.map((item) => {
              let userType
              if (item.record.userType) {
                if (item.record.userType === 1) {
                  userType = self.$t('project.ProjectParty')
                } else if (item.record.userType === 4) {
                  userType = self.$t('project.Middleman')
                } else if (item.record.userType === 3) {
                  userType = self.$t('project.Investor')
                }
              }
              return {
                userId: item.id,
                userIdentityType: item.record.userIdentityType,
                registrationTime: item.record.registrationTime
                  ? this.$global.timestampToTime(item.record.registrationTime)
                  : '',
                userType: userType,
                bslEmail: item.record.bslEmail,
                submitTime: item.record.submitTime
                  ? this.$global.timestampToTime(item.record.submitTime)
                  : ''
              }
            })

            // this.pagetotal = res.data.data.pageTotal;
          }
        })
    },

    changePage (num) {
      if (num === 'previous') {
        if (this.currentpageSerial > 0) {
          this.currentpageSerial--
          // this.currentpage = this.bookmark;
          this.search(this.pageArr[this.currentpageSerial], this.pagesize)
        }
      } else if (num === 'next') {
        if (this.currentpageSerial < this.pageArr.length - 1) {
          this.currentpageSerial++
          // this.currentpage = this.bookmark;
          this.search(this.pageArr[this.currentpageSerial], this.pagesize)
        }
      }
    },

    handleClick (row) {
      this.$router.push({
        name: 'check',
        query: {
          idx: row.userId,
          userIdentityType: row.userIdentityType
          // pagenum: this.currentpage
        }
      })
    },
    fromchildren1 (data) {
      console.log(data)

      this.currentpage = data.currentpage
      this.changepage(data.currentpage, data.pagesize)
    }
  },
  watch: {
    $route (to, from) {
      if (to.name == 'check') {
        this.ischeck = !this.ischeck
      } else {
        this.ischeck = false
      }
    }
  }
}
</script>

<style lang='scss'>
.check_pendingroot {
  .el-pagination {
    text-align: center;
    color: #606266;
    cursor: pointer;
  }
  .el-main {
    /*min-height: 570px;*/
    width: 80%;
  }
  .tosignup_header {
    // height: 40px;
    // width: 100%;
    // width: 968px;
    display: flex;
    flex-wrap: wrap;
    // padding: 0 20px 0 20px;

    box-sizing: border-box;
    .block {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .el-select {
      width: 200px;
      .el-input--suffix {
        width: 100%;
        /*margin-right: 20px;*/
      }
    }
    .el-input--suffix {
      width: 150px;
      /*margin-right: 20px;*/
    }
    // el-button block
    // button.block2 {
    //   margin-right: 450px;
    // }
  }
}
</style>
