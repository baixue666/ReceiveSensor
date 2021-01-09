<template>
  <div class="app-container"> 
    <div class="echart-wrap">
      <div class="echart-header">
        <div class="title">{{echartValue+`特征值`}}</div>
        <div class="echart-pannal">
          <el-select v-model="echartValue" placeholder="请选择" class="echart-select" @change="echartChange($event)">
            <el-option
              v-for="item in echartOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-download">下载数据</el-button>
        </div>
      </div>
      <div ref="chart" class="echart"></div>
    </div>
    
    <div>
      <el-row :gutter="10" class="search-date"> 
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
              <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-col>
      </el-row>  
<el-table :data="topTenTableData" border style="width: 100%">
<el-table-column label="时间">
  <template slot-scope="scope">
    <span>{{ scope.row.create_time }}</span>
  </template>
</el-table-column>
<el-table-column label="采样率/Hz">
    <template slot-scope="scope">
    <span>{{ scope.row.sampling_rate }}</span>
  </template>
</el-table-column>

<el-table-column label="温度/℃">
    <template slot-scope="scope">
    <span>{{ scope.row.temperature }}</span>
  </template>
</el-table-column>

<el-table-column label="电量/%">
    <template slot-scope="scope">
    <span>{{ scope.row.electric_quantity }}</span>
  </template>
</el-table-column>
<el-table-column label="报警信息">
    <template slot-scope="scope">
    <span>{{ scope.row.alarm_information }}</span>
  </template>
</el-table-column>
<el-table-column label="报警阈值">
    <template slot-scope="scope">
    <span>{{ scope.row.alarm_threshold }}</span>
  </template>
</el-table-column>
<el-table-column label="操作" width="80px">
    <template slot-scope="scope">
      <el-button 
          type="warning"
          icon="el-icon-document" 
          circle
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"></el-button>
      </template>
</el-table-column>
</el-table>

<div class="block table-pagination">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</div>
</div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                searchValue: '',
                currentPage: 1,
                pageSizes: [10, 20, 30, 50],
                pageSize: 10,
                total: 0,
                echartOptions: [{
                    value: '加速度',
                    label: '加速度'
                }, {
                    value: '速度',
                    label: '速度'
                }, {
                    value: '角度',
                    label: '角度'
                }],
                echartValue: '加速度',
                Authorization_usertoken: "",
                echartData: [],
                topTenTableData: []
            }
        },
        mounted() {
            this.Authorization_usertoken = this.getCookie("Authorization_usertoken");
            this.indexList(1, 50, this.initCharts);
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            search($event) {
                var that = this;
                if (this.searchValue == "" || this.searchValue == null || this.searchValue.length == 0) {
                    this.pageSize = 10;
                    this.indexList(this.currentPage, this.pageSize, function(data) {
                        that.topTenTableData = data;
                    })
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
                    this.indexList(this.currentPage, this.pageSize, function(data) {
                        that.topTenTableData = data;
                    }, startLocal, endLocal)
                }
            },
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                var that = this;
                this.pageSize = val;
                this.currentPage = 1;
                this.indexList(this.currentPage, this.pageSize, function(data) {
                    that.topTenTableData = data;
                })
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                var that = this;
                this.currentPage = val;
                this.indexList(this.currentPage, this.pageSize, function(data) {
                    that.topTenTableData = data;
                })
            },
            initCharts(echartData, type) {　
                let myChart = this.$echarts.init(this.$refs.chart);
                this.echartData = echartData;
                var dataX = [],
                    dataY = [],
                    dataZ = [];
                if (typeof type == "undefined" || type == "加速度") {
                    if (typeof type == "undefined") this.topTenTableData = this.echartData.slice(0, 10);
                    for (var i = 0; i < this.echartData.length; i++) {
                        dataX.push([this.echartData[i].create_time, this.echartData[i].G_X]);
                        dataY.push([this.echartData[i].create_time, this.echartData[i].G_Y]);
                        dataZ.push([this.echartData[i].create_time, this.echartData[i].G_Z]);
                    }
                }
                if (type == "速度") {
                    for (var i = 0; i < this.echartData.length; i++) {
                        dataX.push([this.echartData[i].create_time, this.echartData[i].V_X]);
                        dataY.push([this.echartData[i].create_time, this.echartData[i].V_Y]);
                        dataZ.push([this.echartData[i].create_time, this.echartData[i].V_Z]);
                    }
                }
                if (type == "角度") {
                    for (var i = 0; i < this.echartData.length; i++) {
                        dataX.push([this.echartData[i].create_time, this.echartData[i].D_X]);
                        dataY.push([this.echartData[i].create_time, this.echartData[i].D_Y]);
                        dataZ.push([this.echartData[i].create_time, this.echartData[i].D_Z]);
                    }
                }

                myChart.setOption({
                    legend: {
                        show: true,
                        left: 40,
                        selectedMode: true,
                        data: ["X轴", "Y轴", "Z轴"]
                    },
                    color: ['#0972D1', '#FFD247', '#FF514D'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [{
                        type: "category",
                        data: dataX.map(function(item) {
                            return item[0];
                        }),
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#e2e2e2"
                            }
                        },
                        axisTick: {
                            show: true,
                            alignWithLabel: true,
                            lineStyle: {
                                color: "rgba(75, 70, 70, 1)",
                                color: "#e2e2e2"
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: "rgba(75, 70, 70, 1)",
                            rotate: 70,
                        },
                        axisPointer: {
                            type: "line",
                            show: true
                        }

                    }],
                    yAxis: [{
                        type: "value",
                        show: true,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true
                        },
                        axisTick: {
                            show: true,
                            alignWithLabel: false
                        },
                        formatter: '{value} g',
                        // formatter: function (value, index) {

                        //     var texts = value+'g';

                        //     return texts;
                        // }
                    }],
                    grid: {
                        bottom: "180px"
                    },
                    dataZoom: [{
                        startValue: '2014-06-01',
                        type: "inside",
                    }, {
                        type: "slider",
                        startValue: '2014-06-01',
                        height: 30,
                        dataBackground: {
                            lineStyle: {
                                color: "rgba(94, 59, 166, 0.4)",
                                width: 0.5,
                            },
                            areaStyle: {
                                color: "rgba(94, 59, 166, 0.4)",
                                opacity: 0.2
                            }
                        },
                        fillerColor: "rgba(94, 59, 166, 0.4)",
                        handleSize: "100%",
                        handleStyle: {
                            color: "rgba(94, 59, 166, 1)",
                            borderColor: null,
                        },
                        handleIcon: "M0,0 v10h3 v-10h-3 Z",
                        borderColor: "rgba(94, 59, 166, 0.3)",
                        textStyle: {
                            color: "rgba(94, 59, 166, 0.4)"
                        }
                    }],
                    series: [{
                        name: 'X轴',
                        type: 'line',
                        symbol: 'circle',
                        data: dataX.map(function(item) {
                            return item[1];
                        }),
                    }, {
                        name: 'Y轴',
                        type: 'line',
                        symbol: 'circle',
                        data: dataY.map(function(item) {
                            return item[1];
                        }),
                    }, {
                        name: 'Z轴',
                        type: 'line',
                        symbol: 'circle',
                        data: dataZ.map(function(item) {
                            return item[1];
                        }),
                    }]
                });
            },
            indexList(pageIndex, pageSize, callback, startDate, endDate) {
                var that = this;
                if (typeof pageIndex == "undefined") pageIndex = 1;
                if (typeof pageSize == "undefined") pageIndex = 50;
                var param = {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    position: this.$route.query.position,
                    code: this.$route.query.code,
                };
                if (typeof startDate != "undefined" && typeof endDate != "undefined") {
                    param.start_time = startDate;
                    param.end_time = endDate;
                }
                this.$axios
                    .get('/api/Home/Index', {
                        params: param,
                        headers: {
                            Authorization: this.Authorization_usertoken
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.total = response.data.count;
                            if (callback) {
                                callback.call(that, response.data.result)
                            };
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
            echartChange($event) {
                this.initCharts(this.echartData, $event)
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
            getUrlQueryValue(paras) {
                var url = location.href;
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var paraObj = {}
                for (var i = 0; i < paraString.length; i++) {
                    var j = paraString[i];
                    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
                }
                var returnValue = paraObj[paras.toLowerCase()];
                if (typeof(returnValue) == "undefined") {
                    return "";
                } else {
                    return returnValue;
                }
            }

        }
    };
</script>

<style scope>
    .echart-wrap {
        width: 100%;
        height: 500px;
        padding: 20px 0;
        margin-bottom: 50px;
        -webkit-box-shadow: 0 0 10px 0 #ddd;
        box-shadow: 0 0 10px 0 #ddd;
        position: relative;
        overflow: hidden;
    }
    
    .echart {
        width: 100%;
        height: calc(100% - 40px);
    }
    
    .echart-header {
        display: flex;
        padding: 0px 20px;
        justify-content: space-between;
        z-index: 999;
    }
    
    .title {
        font-size: 22px;
        color: #464a53;
        /* position: absolute; */
        /* top: 15px;
  left: 20px; */
        /* z-index: 9; */
    }
    
    .echart-select {
        width: 100px;
    }
    
    .search-date {
        margin-bottom: 20px;
    }
    
    .table-pagination {
        margin-top: 20px;
    }
</style>