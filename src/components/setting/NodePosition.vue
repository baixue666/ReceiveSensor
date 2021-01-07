<template>
<div class="app-container">
    <el-row :gutter="10" class="search-wrap"> 
        <el-col :span="6">
            <el-input
                placeholder="请输入关键字"
                prefix-icon="el-icon-search"
                v-model="search"
                class="set-search">
            </el-input>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="searchPosition">搜索</el-button>
        </el-col>
    </el-row>
    
    <el-table :data="positions" border style="width: 100%">
<el-table-column label="公司名称">
      <template slot-scope="scope">
        <span>{{ scope.row.company_name }}</span>
      </template>
</el-table-column>
<el-table-column label="安装位置">
    <template slot-scope="scope">
    <span>{{ scope.row.position }}</span>
  </template>
</el-table-column>
<el-table-column label="精度">
    <template slot-scope="scope">
    <span>{{ scope.row.lng }}</span>
  </template>
</el-table-column>
<el-table-column label="纬度">
    <template slot-scope="scope">
    <span>{{ scope.row.lat }}</span>
  </template>
</el-table-column>
<el-table-column label="状态">
    <template slot-scope="scope">
      <el-switch
      v-model="scope.row.show"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="changeSwitch(scope.row)">
    </el-switch>
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
<div class="block table-pagination">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</div>
<el-dialog title="编辑节点位置" :visible.sync="dialogVisible" width="100%" class="editPositionDialog">
    <div>
        <div class="editLngLat">
            <div class="editLngLat-item">
                <label>精度</label>
                <el-input placeholder="精度" v-model="lng" :disabled="true">
                </el-input>
            </div>
            <div class="editLngLat-item">
                <label>纬度</label>
                <el-input placeholder="纬度" v-model="lat" :disabled="true">
                </el-input>
            </div>
        </div>
        <!-- <div class="map" id="map"></div> -->
        <baidu-map class="mapPosition" @ready="handler"></baidu-map>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关闭</el-button>
    <el-button type="primary" @click="saveLngLat">保存</el-button>
  </span>
</el-dialog>
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
    
    .editPositionDialog .el-dialog {
        margin: 0!important;
    }
    
    .editPositionDialog .el-dialog__body {
        height: calc(100vh - 184px)!important;
        min-height: 500px!important;
    }
    
    .editLngLat,
    .editLngLat-item {
        display: flex;
        align-items: center;
    }
    
    .editLngLat-item {
        margin: 20px 50px;
    }
    
    .editLngLat-item label {
        display: block;
        width: 60px;
        margin-right: 15px;
    }
    
    .mapPosition {
        width: 100%;
        height: 500px;
    }
</style>

<script>
    export default {
        data() {
            return {
                search: "",
                Authorization_usertoken: "",
                positions: [],
                currentPage: 1,
                pageSizes: [10, 20, 30, 50],
                pageSize: 10,
                total: 0,
                dialogVisible: false,
                lng: "",
                lat: "",
                map: {
                    show: false,
                    dragging: true,
                },
                maker: null,
                positionId: ""
            }
        },
        mounted() {
            this.Authorization_usertoken = this.getCookie("Authorization_usertoken");
            this.positionList();
        },
        methods: {
            handleEdit(index, row) {
                //console.log(index, row);
                this.lng = row.lng;
                this.lat = row.lat;
                this.positionId = row._id;
                this.dialogVisible = true;
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                var that = this;
                this.pageSize = val;
                this.positionList(1, val);
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                var that = this;
                this.currentPage = val;
                this.indexList(val, this.pageSize);
            },
            changeSwitch(row) {
                var curData = {
                    id: row._id,
                    show: row.show,
                }
                this.$confirm('此操作将改变此位置的状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updatePosition(curData);
                }).catch(() => {
                    row.show = !row.show
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            searchPosition() {
                if (this.search == "") {
                    this.pageSize = 10;
                } else {
                    this.currentPage = 1;
                }
                this.positionList(this.currentPage, this.pageSize, this.search);
            },
            positionList(pageIndex, pageSize, position) {
                var that = this;
                var param = {
                    pageIndex: pageIndex || 1,
                    pageSize: pageSize || 10,
                    position: position || ""
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
                            that.total = response.data.count;

                        } else if (response.data.code == 401 && response.data.message == "authorize_fault") {
                            alert("没有权限，请先登录")
                        } else {
                            alert("请稍后再试")
                        }
                    })
                    .catch(function(error) { // 请求失败处理
                        alert("请求超时，请稍后再重新登录")
                        console.log(error);
                    });

            },
            updatePosition(param, callback) {
                var that = this;
                this.$axios
                    .post('/api/Home/UpdatePosition', param, {
                        headers: {
                            Authorization: this.Authorization_usertoken
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            if (callback) {
                                callback.call(that);
                            }
                        } else {
                            alert("没有权限，请先登录")
                        }
                    })
                    .catch(function(error) { // 请求失败处理
                        alert("请求超时，请稍后再重新登录")
                        console.log(error);
                    });

            },
            saveLngLat() {
                var that = this;
                var curData = {
                    id: this.positionId,
                    lng: this.lng,
                    lat: this.lat
                }
                this.updatePosition(curData, function() {
                    for (var i = 0; i < that.positions.length; i++) {
                        if (that.positions[i]._id == this.positionId) {
                            that.positions[i].lng = that.lng;
                            that.positions[i].lat = that.lat;
                        }
                    }
                });
            },
            handler({
                BMap,
                map
            }) {
                var that = this;
                //console.log(BMap, map)

                // 初始化地图,设置中心点坐标和地图级别
                map.centerAndZoom('拉萨', 5);
                // 鼠标缩放
                map.enableScrollWheelZoom(true);
                //普通地图
                map.setMapType(BMAP_NORMAL_MAP);
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
                    anchor: BMAP_ANCHOR_TOP_LEFT
                }));

                map.addControl(new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_RIGHT
                }));

                // 创建点标记
                that.maker = new BMap.Marker(new BMap.Point(this.lng, this.lat));
                // 在地图上添加点标记
                map.addOverlay(that.maker);
                map.addEventListener('click', function(e) {
                    that.lng = e.point.lng;
                    that.lat = e.point.lat;
                    map.removeOverlay(that.maker);
                    // 创建点标记
                    that.maker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
                    // 在地图上添加点标记
                    map.addOverlay(that.maker);
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