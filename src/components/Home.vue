<template>
<div> 
    <div class="machine_wrap">
      <div class="flex title flex-center">
        <p class="fang"></p> 
        <p class="txt">设备总数</p>
      </div> 
      <ul class="flex allstation">
        <li class="flex-center-center">
          0
          <p class="line"></p> 
          <p class="banyuan_l"></p> 
          <p class="banyuan_r"></p>
        </li> 
        <li class="flex-center-center">
          0
          <p  class="line"></p> 
          <p  class="banyuan_l"></p> 
          <p  class="banyuan_r"></p>
        </li> 
        <li class="flex-center-center">
          0
          <p  class="line"></p> 
          <p  class="banyuan_l"></p> 
          <p  class="banyuan_r"></p>
        </li> 
        <li class="flex-center-center">
          0
          <p  class="line"></p> 
          <p  class="banyuan_l"></p> 
          <p  class="banyuan_r"></p>
        </li>
        <li class="flex-center-center">
          2
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
          <div style="transform: translate(0px, -1187px); transition: all 0ms ease-in 0s; overflow: hidden;">
            <div style="overflow: hidden;">
              <ul  class="item">
                <li  class="flex">
                  <span >2020-10-11 20:20:51</span> 
                  <span >2</span> 
                  <span >测点2</span> 
                  <span >加速度告警</span>
                </li>
                <li  class="flex">
                  <span >2020-10-11 20:20:07</span> 
                  <span >1</span> 
                  <span >测点1</span> 
                  <span >加速度告警</span>
                </li>
                <li  class="flex">
                  <span >2020-10-11 20:19:33</span> 
                  <span >2</span> 
                  <span >测点2</span> 
                  <span >加速度告警</span>
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
  html,body{
    margin:0;
    padding:0;
    list-style: none;
    text-decoration: none;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
    font-size: 14px;
  }
  .machine_wrap{
    position:absolute;
    top:80px;
    left:50px;
    z-index: 99;
  }
  .machine_wrap .title{
    font-size:30px;
    font-weight:700;
    margin-bottom:40px;
    color: #364251;
    justify-content: flex-start;
  }
  .machine_wrap .title .fang{
    width:10px;
    height:10px;
    margin-right:20px;
    background: #4572d1;
  }
  
  p{
    display: block;
  }
  .flex{
    display: flex;
  }
  .machine_wrap .allstation li{
    position:relative;
    overflow:hidden;
    width:98px;
    height:138px;
    color:#4572d1;
    font-size: 80px;
    font-weight: 700;
    border:1px solid #4572d1;
    background: rgba(38,51,67,.9);
    margin-right:10px;
    display: flex;

  }
  .flex-center, .flex-center-center{
    align-items: center;
    justify-content: center;
  }
  .machine_wrap .line{
    position:absolute;
    width: 100px;
    height: 0;
    border-bottom: 1px dashed #4572d1;
  }
  .banyuan_l, .banyuan_r{
    width:10px;
    height:10px;
    border-radius:50%;
    background:#fff;
    border:1px solid #4572d1;
    position:absolute;
  }
  .banyuan_l{
    left: -5px;
  }
  .banyuan_r{
    right: -5px;
  }
  .baojing{
    width:540px;
    height: 290px;
    margin-top: 10px;
    background: rgba(38,51,67,.9);
  }
  .baojing div{
    color: #4572d1;
    padding:15px 0;
  }
  .baojing div p, .baojing li span{
    width:25%;
    text-align:center;
    display:block
  }
  .seamless-warp{
    height:233px;
    color:#9acaeb;
    overflow:hidden;
  }

  .map {
    width: 100%;
    height: calc(100vh - 50px);
  }
</style>

<script>
  export default {
        name: "demo",
        data: () => ({
            map:{
                show: false,
                dragging: true,
                points:[
                  {lng:116.83221, lat:39.947442},
                  {lng:116.344205, lat:39.959884},
                ]
                
            },
        }),
        methods: {
            handler ({BMap, map}) {
                let me = this;
                //console.log(BMap, map)

                // 初始化地图,设置中心点坐标和地图级别
                map.centerAndZoom('拉萨', 5); 
                // 鼠标缩放
                map.enableScrollWheelZoom(true);
                //普通地图
                map.setMapType(BMAP_NORMAL_MAP); 
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP] }));          

                // 创建点标记 & 添加点标记
                for(var i=0;i<this.map.points.length;i++){
                  // 创建点标记
                  var maker=new BMap.Marker(new BMap.Point(this.map.points[i].lng, this.map.points[i].lat));
                  // 在地图上添加点标记
                  map.addOverlay(maker);
                }
            }
        }
    }
</script>