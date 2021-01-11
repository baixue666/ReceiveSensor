<template>
<div class="app-container">
    <el-row :gutter="10" class="search-wrap"> 
        <el-col :span="6">
            <el-date-picker
                v-model="searchValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="searchLog">搜索</el-button>
        </el-col>
    </el-row>
    
<el-table :data="logList" border style="width: 100%">
<el-table-column label="用户名">
  <template slot-scope="scope">
    <span>{{ scope.row.username }}</span>
  </template>
</el-table-column>
<!-- <el-table-column label="手机号">
    <template slot-scope="scope">
    <span></span>
  </template>
</el-table-column> -->
<el-table-column label="IP">
    <template slot-scope="scope">
    <span>{{ scope.row.ip }}</span>
  </template>
</el-table-column>
<el-table-column label="描述">
    <template slot-scope="scope">
    <span>{{ scope.row.content }}</span>
  </template>
</el-table-column>
<el-table-column label="创建时间">
    <template slot-scope="scope">
    <span>{{ scope.row.create_time }}</span>
  </template>
</el-table-column>
</el-table>
<div class="block  table-pagination">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</div>
</div>
</template>

<style scope>
    .set-search {
        margin-right: 10px;
    }
    
    .search-wrap {
        margin-bottom: 20px;
    }
    
    .table-pagination {
        margin-top: 20px;
    }
</style>

<script>
    export default {
        data() {
            return {
                searchValue: "",
                Authorization_usertoken: "",
                logList: [],
                currentPage: 1,
                pageSizes: [10, 20, 30, 50],
                pageSize: 10,
                total: 0,
            }
        },
        mounted() {
            this.Authorization_usertoken = this.$root.getCookie("Authorization_usertoken");
            this.getLogList();
        },
        methods: {
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.currentPage = 1;
                this.getLogList(this.currentPage, this.pageSize);
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getLogList(this.currentPage, this.pageSize);
            },
            searchLog() {
                var that = this;
                if (this.searchValue == "" || this.searchValue == null || this.searchValue.length == 0) {
                    this.pageSize = 10;
                    this.getLogList(this.currentPage, this.pageSize)
                } else {
                    var startLocalYear = new Date(this.searchValue[0]).getFullYear();
                    var startLocalMonth = new Date(this.searchValue[0]).getMonth() + 1;
                    var startLocalDate = new Date(this.searchValue[0]).getDate();
                    var startLocal = startLocalYear + "-" + startLocalMonth + "-" + startLocalDate;

                    var endLocalYear = new Date(this.searchValue[1]).getFullYear();
                    var endLocalMonth = new Date(this.searchValue[1]).getMonth() + 1;
                    var endLocalDate = new Date(this.searchValue[1]).getDate();
                    var endLocal = endLocalYear + "-" + endLocalMonth + "-" + endLocalDate;
                    this.currentPage = 1;
                    this.getLogList(this.currentPage, this.pageSize, startLocal, endLocal)
                }
            },
            getLogList(pageIndex, pageSize, startDate, endDate) {
                var that = this;
                var param = {
                    type: "login",
                    pageIndex: pageIndex || 1,
                    pageSize: pageSize || 10,

                };
                if (typeof startDate != "undefined" && typeof endDate != "undefined") {
                    param.start_time = startDate;
                    param.end_time = endDate;
                }
                this.$axios
                    .get('/api/Home/LogList', {
                        params: param,
                        headers: {
                            Authorization: this.Authorization_usertoken
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.logList = response.data.result
                            that.total = response.data.count;

                        } else if (response.data.code == 401 && response.data.message == "authorize_fault") {
                            if (that.$route.path !== '/login') {
                                that.$router.push('/login')
                            }
                            that.$root.displayLogin = true;
                            that.$root.setCookie("Authorization_usertoken", "");
                        } else {
                            that.$message({
                                showClose: true,
                                message: response.data.message,
                                type: 'warning'
                            });
                        }
                    })
                    .catch(function(error) { // 请求失败处理
                        that.$message({
                            showClose: true,
                            message: error,
                            type: 'error'
                        });
                        console.log(error);
                    });

            }
        }
    };
</script>