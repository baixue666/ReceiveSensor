<template>
  <div class="app-container"> 
    <div class="echart-wrap">
      <div class="echart-header">
        <div class="title">{{echartValue+`特征值`}}</div>
        <div class="echart-pannal">
          <el-select v-model="echartValue" placeholder="请选择" class="echart-select">
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
      <el-row :gutter="10"> 
          <el-col :span="6">
              <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                  </el-date-picker>
              <!-- <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
          </el-col>
          <el-col :span="2">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
      </el-row>  
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button 
                type="warning"
                icon="el-icon-edit" 
                circle
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button 
                type="danger" 
                icon="el-icon-delete" 
                circle
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style scope>
  .echart-wrap{
    width: 100%;
    height: 500px;
    padding: 20px 0;
    margin-bottom: 50px;
    -webkit-box-shadow: 0 0 10px 0 #ddd;
    box-shadow: 0 0 10px 0 #ddd;
    position: relative;
    overflow: hidden;
  }

  .echart{
    width: 100%;
    height: calc(100% - 40px);
  }

  .echart-header{
    display: flex;
    padding: 0px 20px;
    justify-content: space-between;
    z-index: 999;
  }
  .title{
    font-size: 22px;
    color: #464a53;
    /* position: absolute; */
    /* top: 15px;
    left: 20px; */
    /* z-index: 9; */
  }

  .echart-select{
    width:100px;
  }
</style>

<script>
  export default {
    data() {
      return {
        search:"",
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentPage4: 4,
        value1: '',
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
        echartValue: '加速度'
      }
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      initCharts () {
    　  let myChart = this.$echarts.init(this.$refs.chart);
    　　//console.log(this.$refs.chart)
        var dataX=[["2000-06-05 08:21:56",6],["2000-06-06 08:21:56",29],["2000-06-07 08:21:56",135],["2000-06-08 08:21:56",86]];
        var dataY=[["2000-06-05 08:21:56",116],["2000-06-06 08:21:56",128],["2000-06-07 08:21:56",15],["2000-06-08 08:21:56",186]];
        var dataZ=[["2000-06-05 08:21:56",287],["2000-06-06 08:21:56",99],["2000-06-07 08:21:56",341],["2000-06-08 08:21:56",206]];
        myChart.setOption({
            legend: {
              show:true,
              left:40,
              selectedMode: true,
              data:["X轴","Y轴","Z轴"]
            },
            color:['#0972D1','#FFD247', '#FF514D'],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                type: "category",
                data: dataX.map(function (item) {
                    return item[0];
                }),
                axisLine: {
                  show: true,
                  lineStyle:{
                    color:"#e2e2e2"
                  }
                },
                axisTick: {
                  show: true,
                  alignWithLabel: true,
                  lineStyle:{
                    color: "rgba(75, 70, 70, 1)",
                    color:"#e2e2e2"
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
            grid:{
              bottom: "180px"
            },
            dataZoom: [
                {
                  startValue: '2014-06-01',
                  type:"inside",
                }, 
                {
                  type:"slider",
                  startValue: '2014-06-01',
                  height:30,
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
                }
            ]
            ,
            series: [
              {
                name: 'X轴',
                type: 'line',
                symbol: 'circle',
                data: dataX.map(function (item) {
                    return item[1];
                }),
              },
              {
                name: 'Y轴',
                type: 'line',
                symbol: 'circle',
                data: dataY.map(function (item) {
                    return item[1];
                }),
              },
              {
                name: 'Z轴',
                type: 'line',
                symbol: 'circle',
                data: dataZ.map(function (item) {
                    return item[1];
                }),
              }
            ]
        });
      }
　  },
　  mounted () {
  　　 this.initCharts();
  　}
  };
</script>