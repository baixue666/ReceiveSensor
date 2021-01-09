<template>
<el-container style="height: 100vh;">
  
    <el-menu
      :default-active="activeIndex"
      class="aside-menu"
      ref="asideMenu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      width="210px"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse="isCollapse"
      :unique-opened="true">
      <el-menu-item index="1" @click="changePath('home')">
        <i class="el-icon-odometer"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2"> 
        <template slot="title" class="aside-submenu"> 
          <i class="el-icon-office-building"></i>
          <span>中国铁道科学研究院铁道建筑研究所</span>
        </template>
<el-submenu :index="indexPositionMenu[index].parantIndex" class="aside-submenu" v-for="(item,index) in positionMenu" :key="index">
    <template slot="title">{{item.position}}</template>
    <!-- <span slot="title">{{item.position}}</span> -->
    <el-menu-item :index="indexPositionMenu[index].childIndexList[InnerIndex].index" v-for="(innerItem,InnerIndex) in item.names" :key="InnerIndex" @click="changePath('testPosition',innerItem.code,innerItem.name,item.position)">
        {{innerItem.name}}
    </el-menu-item>
</el-submenu>
</el-submenu>
<el-submenu index="3">
    <template slot="title" class="aside-submenu"> 
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
    <el-menu-item-group class="aside-submenu">
        <el-menu-item index="3-1" @click="changePath('editPassword')">
            <span>修改密码</span>
        </el-menu-item>
        <el-menu-item index="3-2" @click="changePath('nodePosition')">
            <span>节点位置</span>
        </el-menu-item>
    </el-menu-item-group>
</el-submenu>
<el-submenu index="4">
    <template slot="title" class="aside-submenu"> 
                <i class="el-icon-tickets"></i>
                <span>日志管理</span>
              </template>
    <el-menu-item-group class="aside-submenu">
        <el-menu-item index="4-1" @click="changePath('adminLog')">
            <span>管理员日志</span>
        </el-menu-item>
        <el-menu-item index="4-2" @click="changePath('signInOutLog')">
            <span>登陆登出日志</span>
        </el-menu-item>
    </el-menu-item-group>
</el-submenu>
</el-menu>


<el-container>
    <el-header style="text-align: right; font-size: 12px;height:50px">
        <div class="header-left">
            <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in $route.name" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>


        <el-dropdown trigger="click" @command="handleCommand">
            <div>
                <el-avatar icon="el-icon-user-solid" type="primary"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>

    <el-main>
        <router-view></router-view>
    </el-main>
</el-container>
</el-container>
</template>

<style scope>
    .el-container {
        position: relative;
    }
    
    .el-header {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        vertical-align: center;
    }
    
    .el-breadcrumb {
        line-height: 3.6;
    }
    
    .el-main {
        padding: 0;
    }
    
    .el-menu {
        width: 210px;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        transition: .1s;
    }
    
    .el-menu.el-menu--collapse {
        width: 64px;
        transition: .1s;
    }
    
    .el-menu .el-menu {
        overflow: hidden;
    }
    
    .aside-submenu,
    .aside-submenu div,
    .aside-submenu ul li {
        background-color: #000810!important;
    }
    
    .el-submenu__title {
        font-size: 14px;
        color: #303133;
        padding: 0 20px;
        cursor: pointer;
        box-sizing: border-box;
    }
    
    .aside-menu span {
        width: 120px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        font-weight: 300;
    }
    
    .el-menu {
        border-right: none;
    }
    
    .aside-menu a {
        text-decoration: none;
        color: rgb(191, 203, 217);
    }
    
    a.router-link-active {
        color: rgb(64, 158, 255);
    }
    
    .app-container {
        padding: 20px;
        margin: 20px;
        background: #fff;
    }
    
    .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .el-header .el-dropdown-selfdefine {
        display: flex;
        align-items: center;
    }
    
    .el-dropdown {
        cursor: pointer;
    }
    
    .el-avatar {
        background: rgb(35, 163, 248);
    }
    
    .header-left {
        display: flex;
        align-items: center;
    }
    
    .header-left i {
        margin-right: 10px;
        font-size: 20px;
        cursor: pointer;
    }
</style>

<script>
    export default {
        data() {
            return {
                Authorization_usertoken: "",
                positionMenu: [],
                indexPositionMenu: [],
                isCollapse: false,
                activeIndex: "1"
            }
        },
        mounted() {
            this.Authorization_usertoken = this.getCookie("Authorization_usertoken");
            this.indexPositionMenu = [];
            this.getPositionMenu();
        },
        watch: {
            isCollapse: {
                handler(newVal) {
                    if (newVal) {
                        //debugger;
                        //this.$refs.asideMenu.width = "64px!important";
                        //this.$refs.asideMenu.$el.style.width = "64px!important";
                    } else {
                        //this.$refs.asideMenu.width = "210px!important";
                        //this.$refs.asideMenu.$el.style.width = "210px!important";
                    }

                },
                deep: true
            }

        },
        methods: {
            changePath(path, code, name, position) {
                if (path == 'home') {
                    if (this.$route.path !== '/home') {
                        this.$router.push('/home')
                    }
                }
                if (path == 'testPosition') {
                    var positionPath = '/testPosition?code=' + code + '&position=' + position + '&name=' + name;
                    if (this.$route.path !== '/testPosition') {
                        this.$router.push(positionPath);

                    } else {
                        if (this.$route.query.code !== code) {
                            // this.$route.query.code = code;
                            // this.$route.query.position = position;
                            this.$router.push({
                                path: '/testPosition',
                                query: {
                                    code: code,
                                    position: position
                                }
                            });
                        }
                    }
                    this.$route.name[1] = position;
                    this.$route.name[2] = name;
                }
                if (path == 'editPassword') {
                    if (this.$route.path !== '/setting/editPassword') {
                        this.$router.push('/setting/editPassword')
                    }
                }
                if (path == 'nodePosition') {
                    if (this.$route.path !== '/setting/nodePosition') {
                        this.$router.push('/setting/nodePosition')
                    }
                }
                if (path == 'adminLog') {
                    if (this.$route.path !== '/log/adminLog') {
                        this.$router.push('/log/adminLog')
                    }
                }
                if (path == 'signInOutLog') {
                    if (this.$route.path !== '/log/signInOutLog') {
                        this.$router.push('/log/signInOutLog');
                    }
                }
                //debugger;


            },
            handleCommand(command) {
                if (command == "editPassword") {
                    this.$router.push('/setting/editPassword')
                }
                if (command == "logout") {
                    this.$router.push('/login')
                    this.$root.displayLogin = true;
                    this.setCookie("Authorization_usertoken", "");
                }
            },
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
                //debugger;
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            },
            getPositionMenu() {
                var that = this;
                this.$axios
                    .get('/api/Home/AggsPosition', {
                        headers: {
                            Authorization: this.Authorization_usertoken
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.positionMenu = response.data.result
                            for (var i = 0; i < that.positionMenu.length; i++) {
                                that.indexPositionMenu.push({
                                    parantIndex: "2-" + (i + 1).toString(),
                                    childIndexList: []
                                });
                                for (var c = 0; c < that.positionMenu[i].names.length; c++) {
                                    that.indexPositionMenu[i].childIndexList.push({
                                        index: "2-" + (i + 1).toString() + "-" + (c + 1).toString()
                                    })
                                }

                            }

                            if (that.$route.path == '/testPosition') {
                                if (typeof that.$route.name != 'undefined') {
                                    that.$route.name[1] = that.$route.query.position;
                                    that.$route.name[2] = that.$route.query.name;
                                }
                                that.activeIndex = "2";
                                for (var i = 0; i < that.positionMenu.length; i++) {
                                    if (that.$route.query.position == that.positionMenu[i].position) {
                                        that.activeIndex += '-' + (i + 1);
                                        for (var n = 0; n < that.positionMenu[i].names.length; n++) {
                                            if (that.$route.query.code == that.positionMenu[i].names[n].code) {
                                                that.activeIndex += '-' + (n + 1);
                                            }
                                        }
                                    }
                                }
                            }
                            if (that.$route.path == '/setting/editPassword') {
                                that.activeIndex = "3-1"
                            }
                            if (that.$route.path == '/setting/nodePosition') {
                                that.activeIndex = "3-2"
                            }
                            if (that.$route.path == '/log/adminLog') {
                                that.activeIndex = "4-1"
                            }
                            if (that.$route.path == '/log/signInOutLog') {
                                that.activeIndex = "4-2"
                            }
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
            setCookie(cname,  cvalue,  exdays)  {    
                var  cookies  =  cname  +  "="  +  cvalue  +  ";path=/";    
                if  (exdays)  {        
                    var  d  =  new  Date();        
                    d.setTime(d.getTime()  +  (exdays  *  24  *  60  *  60  *  1000));        
                    cookies  +=  ";expires="  +  d.toGMTString();    
                }    
                document.cookie  =  cookies;
            }
        }
    };
</script>