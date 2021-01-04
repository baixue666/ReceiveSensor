<template>
<div class="app-container">
    <el-row>
        <el-col :span="4">
            <div>原始密码:</div>
        </el-col>
        <el-col :span="20">
            <el-input :span="20" placeholder="原始密码" v-model="password" show-password></el-input>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="4">
            <div>新密码:</div>
        </el-col>
        <el-col :span="20">
            <el-input :span="20" placeholder="新密码" v-model="newPassword" show-password></el-input>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="4">
            <div>确认密码:</div>
        </el-col>
        <el-col :span="20">
            <el-input :span="20" placeholder="确认密码" v-model="confirmPassword" show-password></el-input>
        </el-col>
    </el-row>
</div>
</template>

<style scope>
  .el-row {
    margin-bottom: 20px;
    
  }
  .el-col {
    border-radius: 4px;
  }
</style>

<script>
  export default {
    data() {
      return {
        password:"",
        newPassword:"",
        confirmPassword:""
      }
    },
    methods:{
      
    }
  };
</script>