<template>
    <div class="app-container">
        <el-row :gutter="10" class="search-wrap"> 
            <el-col :span="6">
                <el-date-picker
                    v-model="search"
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
<el-table-column label="手机号">
    <template slot-scope="scope">
        <span></span>
      </template>
</el-table-column>
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
                search: "",
                Authorization_usertoken: "",
                logList: [],
                currentPage: 1,
                pageSizes: [10, 20, 30, 50],
                pageSize: 10,
                total: 0,
            }
        },
        mounted() {
            this.Authorization_usertoken = this.getCookie("Authorization_usertoken");
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
                this.getLogList(1, 10, this.search);
            },
            getLogList(pageIndex, pageSize, searchValue) {
                var that = this;
                var param = {
                    pageIndex: pageIndex || 1,
                    pageSize: pageSize || 10,
                    content: searchValue || ""
                };
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
                            that.setCookie("Authorization_usertoken", "");
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

            },
            getCookie(cname)  {    
                var  name  =  cname  +  "=";    
                var  ca  =  document.cookie.split(';');    
                for  (var  i  =  0;  i  <  ca.length;  i++)  {        
                    var  c  =  ca[i].trim();        
                    if  (c.indexOf(name)  ==  0)  {            
                        return  c.substring(name.length,  c.length);        
                    }    
                }    
                return  "";
            },


        }
    };
</script>