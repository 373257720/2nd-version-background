<template>
  <div class="contractItem">
    <el-main>
      <header class="tosignup_header">
        <el-button
          @click="$routerto('add_contract')"
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="addbtn block"
        >添加合同</el-button>
        <section>
          <el-input
            :placeholder="$t('project.ProjectName')"
            v-model="searchkey"
            class="block"
            clearable
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            class="block"
            @click="search(value,value1, 1, pagesize)"
          >{{$t('project.Search')}}</el-button>
        </section>
      </header>
      <el-table
        :data="tableData.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
        border
      >
        <el-table-column width="200" prop="createTime" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="fileName" show-overflow-tooltip label="合同名称" align="center"></el-table-column>
        <el-table-column prop="fileType" show-overflow-tooltip label="合同类型" align="center"></el-table-column>
        <el-table-column fixed="right" :label="$t('project.Operation')" width="200" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              @click="deleterow(scope.row)"
              type="text"
              size="small"
            >{{$t('project.Delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="pagesize"
        :pager-count="5"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentpage"
        @size-change="handleSizeChange"
        :total="tableData.length"
      ></el-pagination>
    </el-main>
  </div>
</template>

<script>
// import '@/components/eventBus'
import login from "../login";
export default {
  name: "contractItem",
  data() {
    return {
      centerDialogVisible: false,
      value1: [], //日期选择
      value: "", //项目状态
      searchkey: "",
      currentpage: 1,
      pagesize: 8,
      pagetotal: null,
      tableData: [],
      deleteType: 0,
      industryId: ""
    };
  },
  created() {},
  activated() {
    this.search();
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currentpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    deleterow(row) {
      console.log(row);
      let self = this;
      this.industryId = row.industryId;
      this.centerDialogVisible = true;
      this.$confirm(
        self.$t("project.Confirmdelect"),
        self.$t("project.Reminder"),
        {
          confirmButtonText: self.$t("project.Yes"),
          cancelButtonText: self.$t("project.No"),
          type: "warning",
          center: true,
          showCancelButton: true
        }
      )
        .then(() => {
          this.$global
            .get_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/getContractTemplateList`,
              {
                pageIndex: row.industryId,
                pageSize: null
                // fileName:
              }
            )
            .then(res => {
              if (res.data.resultCode == 10000) {
                this.$message({
                  message: res.data.resultDesc,
                  type: "success"
                });
                this.search();
              } else {
                this.$message({
                  message: res.data.resultDesc,
                  type: "warn"
                });
              }
            });
        })
        .catch(() => {});
    },

    handleClick(row) {
      this.$router.push({
        name: "contract_alter",
        query: {
          Id: row.id
        }
      });
    },
    fromchildren1(data) {
      this.currentpage = data.currentpage;
      this.pagesize = data.pagesize;
      this.search(
        this.value,
        this.value1[0] / 1000,
        this.value1[1] / 1000,
        this.currentpage,
        this.pagesize
      );
    },
    search() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_admin_web/contract/getContractTemplateList`,
          {
            pageIndex: this.currentpage,
            pageSize: this.pagesize,
            fileName: this.searchkey
          }
        )
        .then(res => {
          console.log(res);

          if (res.data.resultCode == 10000) {
            this.tableData=res.data.data.lists;
          }
        });
    }
  }
};
</script>

<style lang='scss' >
.contractItem {
  //   padding: 20px 0 0 0;
  .el-main {
    /*min-height: 580px;*/
    width: 80%;
  }
  .tosignup_header {
    // height: 40px;
    // width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // margin-bottom: 20px;
    padding: 0 0 0 20px;
    box-sizing: border-box;
    .block {
      margin-bottom: 20px;
    }
    .el-input--suffix {
      width: 200px;
      margin-right: 20px;
    }
  }
  .el-pagination {
    display: flex;
    justify-content: center;
  }
  .remote_control {
    .el-dialog__header {
      background: #edf1f4;
    }
    .el-dialog--center .el-dialog__body {
      padding: 30px 20px 10px 20px;
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
    .el-radio-group {
      width: 100%;
      .el-radio {
        width: 100%;
      }
      .el-radio__label {
        display: inline-block;
        word-wrap: break-word;
        white-space: normal;
        width: 100%;
      }
    }

    p.thick {
      color: black;
      font-size: 16px;
      margin-bottom: 30px;
    }
    .el-radio-group {
      > div {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
