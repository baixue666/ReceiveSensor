<template>
<div class="login-container">
    <el-form 
    :model="ruleForm" 
    :rules="rules" 
    ref="ruleForm" 
    class="login-form">
        <div class="login-title-container">
            <h3 class="login-title">设 备 设 施 振 动 分 析 平 台</h3> 
            <div class="login-hx"></div>
        </div>
        <el-form-item prop="name" class="login-form-item">
            <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="login-form-item">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码" :show-password="true" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="login-form-Login">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<style scope>
    .login-container {
        min-height: 500px;
        height: 100vh;
        width: 100vw;
        background: #f0f2f5;
        background-image: url(../assets/login_bg.png);
        background-repeat: no-repeat;
        background-size: cover;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .login-form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        /* position: relative; */
        width: 570px;
        height: 495px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        padding: 0;
        background: url(../assets/login_form.png) 50% no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    
    .login-form-item,
    .login-form-Login {
        width: 480px;
        height: 55px;
        margin-bottom: 25px;
    }
    
    .login-form .el-button {
        width: 100%;
    }
    /* .login-form-item .el-input__inner {
        height: 50px;
        line-height: 50px;
    } */
    
    .login-title-container {
        margin-bottom: 80px;
    }
    
    .login-title {
        font-size: 24px;
        color: #0076fe;
        margin: 10px auto 0 auto;
        text-align: center;
        font-weight: 700;
    }
    
    .login-hx {
        width: 305px;
        height: 6px;
        background: rgba(0, 118, 254, .2);
        margin: auto;
        margin-top: -5px;
    }
</style>

<script>
    export default {
        name: "demo",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback()
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    name: ''
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    name: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }],
                },
                userToken: ""
            };
        },
        mounted() {

        },
        methods: {
            login() {
                var that = this;
                this.$axios
                    .post('/api/Home/Login', {
                        "Username": this.ruleForm.name,
                        "UserPwd": this.ruleForm.pass
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.userToken = response.data.result
                            that.setCookie("Authorization_usertoken", that.userToken);
                            that.$root.displayLogin = false;
                            that.$router.push('/home')
                        } else {
                            that.$message({
                                showClose: true,
                                message: '账户或密码不正确，请重新输入再登录',
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
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate(function(valid) {
                    if (valid) {
                        that.login()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
    }
</script>