<template>
<div> 
    <div class="machine_wrap">
      <div class="flex title flex-center">
        <p class="fang"></p> 
        <p class="txt">设备总数</p>
      </div> 
      <ul class="flex allstation">
        <li class="flex-center-center">
          {{fiveNum}}
          <p class="line"></p> 
          <p class="banyuan_l"></p> 
          <p class="banyuan_r"></p>
        </li> 
        <li class="flex-center-center">
          {{fourNum}}
          <p  class="line"></p> 
          <p  class="banyuan_l"></p> 
          <p  class="banyuan_r"></p>
        </li> 
        <li class="flex-center-center">
          {{thirdNum}}
          <p  class="line"></p> 
          <p  class="banyuan_l"></p> 
          <p  class="banyuan_r"></p>
        </li> 
        <li class="flex-center-center">
          {{secondNum}}
          <p  class="line"></p> 
          <p  class="banyuan_l"></p> 
          <p  class="banyuan_r"></p>
        </li>
        <li class="flex-center-center">
          {{firstNum}}
          <p  class="line"></p> 
          <p  class="banyuan_l"></p> 
          <p  class="banyuan_r"></p>
        </li>
      </ul>
      <div class="baojing">
        <div  class="flex">
          <p >时间</p> 
          <p >安装位置</p> 
          <p >测点名称</p> 
          <p >报警信息</p>
        </div> 
        <div  class="seamless-warp">
            <!----> <!----> 
          <div>
            <div style="overflow: hidden;">
              <ul  class="item">
                <li class="flex" v-for="(item,index) in indexData" :key=index>
                  <span>{{item.create_time}}</span> 
                  <span >{{item.position}}</span> 
                  <span >{{item.name}}</span> 
                  <span >{{item.alarm_information}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <baidu-map class="map" @ready="handler"></baidu-map>
</div>
</template>

<style scope>
    .machine_wrap {
        position: absolute;
        top: 80px;
        left: 50px;
        /* left: 250px; */
        z-index: 99;
    }
    
    .machine_wrap .title {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 40px;
        color: #364251;
        justify-content: flex-start;
    }
    
    .machine_wrap .title .fang {
        width: 10px;
        height: 10px;
        margin-right: 20px;
        background: #4572d1;
    }
    
    p {
        display: block;
    }
    
    .flex {
        display: flex;
    }
    
    .machine_wrap .allstation li {
        position: relative;
        overflow: hidden;
        width: 98px;
        height: 138px;
        color: #4572d1;
        font-size: 80px;
        font-weight: 700;
        border: 1px solid #4572d1;
        background: rgba(38, 51, 67, .9);
        margin-right: 10px;
        display: flex;
    }
    
    .flex-center,
    .flex-center-center {
        align-items: center;
        justify-content: center;
    }
    
    .machine_wrap .line {
        position: absolute;
        width: 100px;
        height: 0;
        border-bottom: 1px dashed #4572d1;
    }
    
    .banyuan_l,
    .banyuan_r {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #4572d1;
        position: absolute;
    }
    
    .banyuan_l {
        left: -5px;
    }
    
    .banyuan_r {
        right: -5px;
    }
    
    .baojing {
        width: 540px;
        height: 290px;
        margin-top: 10px;
        background: rgba(38, 51, 67, .9);
    }
    
    .baojing>div {
        color: #4572d1;
        padding: 15px 0;
        font-size: 15px;
    }
    
    .baojing div p,
    .baojing li span {
        width: 25%;
        text-align: center;
        display: block
    }
    
    .seamless-warp {
        height: 200px;
        color: #9acaeb;
        overflow: hidden;
    }
    
    .seamless-warp li {
        color: #9acaeb;
        padding-bottom: 20px;
        font-size: 15px;
    }
    
    .map {
        width: 100%;
        height: calc(100vh - 50px);
    }
    
    .item {
        animation: rolling 20s infinite linear;
    }
    
    .item:hover {
        animation-play-state: paused;
    }
    
    @keyframes rolling {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-1200px);
        }
    }
</style>

<script>
    export default {
        name: "demo",
        data: () => ({
            map: {
                show: false,
                dragging: true,
            },
            Authorization_usertoken: "",
            firstNum: 0,
            secondNum: 0,
            thirdNum: 0,
            fourNum: 0,
            fiveNum: 0,
            positions: [],
            indexData: [],
            timer: null

        }),
        mounted() {
            this.Authorization_usertoken = this.$root.getCookie("Authorization_usertoken");
            this.positionList();
            this.indexList();
        },
        methods: {
            handler({
                BMap,
                map
            }) {
                let that = this;
                //console.log(BMap, map)

                // 初始化地图,设置中心点坐标和地图级别
                map.centerAndZoom('拉萨', 5);
                // 鼠标缩放
                map.enableScrollWheelZoom(true);
                //普通地图
                map.setMapType(BMAP_NORMAL_MAP);
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
                }));
                clearInterval(this.timer);
                this.timer = setInterval(function() {
                    if (that.positions.length > 0) {
                        clearInterval(that.timer);
                        // 创建点标记 & 添加点标记
                        for (var i = 0; i < that.positions.length; i++) {
                            // 创建点标记
                            var maker = new BMap.Marker(new BMap.Point(that.positions[i].lng, that.positions[i].lat));
                            // 在地图上添加点标记
                            map.addOverlay(maker);
                        }
                    }
                }, 300)

            },
            positionList() {
                var that = this;
                var param = {
                    pageSize: 10000
                };
                this.$axios
                    .get('/api/Home/Positions', {
                        params: param,
                        headers: {
                            Authorization: this.Authorization_usertoken
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.positions = response.data.result
                            var count = response.data.count;
                            count = count.toString().split('');
                            if (count.length == 1) {
                                that.firstNum = count[0];
                                that.secondNum = 0;
                                that.thirdNum = 0;
                                that.fourNum = 0;
                                that.fiveNum = 0;
                            }
                            if (count.length == 2) {
                                that.firstNum = count[1];
                                that.secondNum = count[0];
                                that.thirdNum = 0;
                                that.fourNum = 0;
                                that.fiveNum = 0;
                            }
                            if (count.length == 3) {
                                that.firstNum = count[2];
                                that.secondNum = count[1];
                                that.thirdNum = count[0];
                                that.fourNum = 0;
                                that.fiveNum = 0;
                            }
                            if (count.length == 4) {
                                that.firstNum = count[3];
                                that.secondNum = count[2];
                                that.thirdNum = count[1];
                                that.fourNum = count[0];
                                that.fiveNum = 0;
                            }
                            if (count.length == 5) {
                                that.firstNum = count[4];
                                that.secondNum = count[3];
                                that.thirdNum = count[2];
                                that.fourNum = count[1];
                                that.fiveNum = count[0];
                            }


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

            },
            indexList() {
                var that = this;
                var param = {
                    pageSize: 30
                };
                this.$axios
                    .get('/api/Home/Index', {
                        params: param,
                        headers: {
                            Authorization: this.Authorization_usertoken
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.indexData = response.data.result

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
    }
</script>