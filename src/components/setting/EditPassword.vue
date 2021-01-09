<template>
<div class="app-container">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原始密码" prop="currentPass">
      <el-input type="password" v-model="ruleForm.currentPass" autocomplete="off" :show-password="true"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" :show-password="true"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" :show-password="true"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<style scope>

</style>

<script>
    export default {
        data() {
            var checkCurrentPass = (rule, value, callback) => {
                if (!/^[^\s]*$/.test(value)) {
                    return callback(new Error('不能输入空格,请再次输入密码'));
                } else {
                    callback();
                }

            };
            var validatePass = (rule, value, callback) => {
                if (!/^[a-zA-Z0-9]{6,12}$/.test(value)) {
                    callback(new Error('密码为6~12位,可以含有字母和数字'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (!/^[^\s]*$/.test(value)) {
                    callback(new Error('不能输入空格,请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                password: "",
                newPassword: "",
                confirmPassword: "",
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    currentPass: ''
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                    currentPass: [{
                        validator: checkCurrentPass,
                        trigger: 'blur'
                    }]
                },
                Authorization_usertoken: "",
            }
        },
        mounted() {
            this.Authorization_usertoken = this.getCookie("Authorization_usertoken");
        },
        methods: {
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.changePassword();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            changePassword() {
                var that = this;
                this.$axios
                    .post('/api/Home/ChangePassword', {
                        "OldPwd": this.ruleForm.currentPass,
                        "NewPwd": this.ruleForm.pass,
                        "ConfirmPwd": this.ruleForm.checkPass
                    }, {
                        headers: {
                            Authorization: this.Authorization_usertoken
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 0 && response.data.message == "success") {
                            that.$message({
                                showClose: true,
                                type: 'success',
                                message: '密码修改成功!'
                            });
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