<template>
<el-container style="height: 100vh;">
  <el-aside class="aside-menu-contaniner">
    <el-menu
      default-active="1"
      class="aside-menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#409eff">
      <el-menu-item index="1">
        <i class="el-icon-odometer"></i>
        <span slot="title"><router-link to="/home">首页</router-link></span>
      </el-menu-item>
      <el-submenu index="2"> 
        <template slot="title" class="aside-submenu"> 
          <i class="el-icon-office-building"></i>
          <span>中国铁道科学研究院铁道建筑研究所</span>
        </template>
        <el-submenu index="2-1" class="aside-submenu">
          <template slot="title">1</template>
          <el-menu-item index="2-1-1"><router-link to="/testPosition">测点1</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="2-2" class="aside-submenu">
          <template slot="title">2</template>
          <el-menu-item index="2-2-1"><router-link to="/testPosition">测点2</router-link></el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title" class="aside-submenu"> 
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item-group class="aside-submenu"> 
          <el-menu-item index="3-1"><router-link to="/setting/editPassword">修改密码</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link to="/setting/nodePosition">节点位置</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title" class="aside-submenu"> 
          <i class="el-icon-tickets"></i>
          <span>日志管理</span>
        </template>
        <el-menu-item-group class="aside-submenu"> 
          <el-menu-item index="4-1"><router-link to="/log/adminLog">管理员日志</router-link></el-menu-item>
          <el-menu-item index="4-2"><router-link to="/log/signInOutLog">登陆登出日志</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px;height:50px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    
    <el-main>
      <router-view></router-view>
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table> -->
    </el-main>
  </el-container>
</el-container>
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
  a, article, aside, body, button, dd, details, div, dl, dt, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, img, input, li, menu, nav, ol, p, section, select, table, tbody, td, textarea, th, tr, ul{
    padding: 0;
    margin:0;
    border:0;
  }
  .el-container{
    position: relative;
  }
  .el-header {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    vertical-align: center;
  }
  .el-breadcrumb {
      line-height: 3.6;
  }

  .el-main{
    padding:0;
  }
  

  .aside-menu-contaniner{
    
    width: 210px!important;
    background-color: #001529;
    height: 100%;

    overflow: hidden;
    overflow-y: auto;
  }
  .aside-submenu,.aside-submenu div,.aside-submenu ul li{
    background-color: #000810!important;
  }

  .el-submenu__title {
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .aside-menu-contaniner span{
    width: 120px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    font-weight: 300;
  } 
  .aside-menu-contaniner a{
    text-decoration: none;
    color:rgb(191, 203, 217);
  }
  a.router-link-active{
    color:rgb(64, 158, 255);
  }

  .app-container{
    padding: 20px;
    margin: 20px;
    background: #fff;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

    }
  };
</script>