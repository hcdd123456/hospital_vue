<template>
    <div class="login">
        <h1>HIS医院管理系统</h1>
        <div class="w3ls-login box">
            <el-form :model="ruleForm" :rules="form" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import {HOST} from '../../common/js/config'
    export default {
        data(){
            return{
                ruleForm: {
                    username: '',
                    password: ''
                },
              form: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
//                        this.$router.push("/main")
                      let url = `${HOST}/user/login`
                      this.$ajax.post(url,this.ruleForm).then((res)=>{
                        console.log(res.data)
                        let user = res.data.object
                        switch (res.data.status){
                          case 0://登录成功
                            //调用vuex存入token
//                            this.$store.dispatch("setToken",res.data.token)
                            //调用vuex的action中的setUser存入用户对象
                            console.log(user)
                            this.$store.dispatch("setUser",user)
                            this.form.username = ''
                            this.form.password = ''
                            this.$router.push('/main/')
                            break;
                          case 1:
                            this.$message.error("用户名错误")
                            break;
                          case 2:
                            this.$message.error("密码错误")
                        }
                      })
                    }
                });
            },
        }

    }
</script>

<style scoped>
    @import "./style.css";
</style>
