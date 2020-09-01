<template>
    <div>
      <el-breadcrumb class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/main/user' }">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>用户编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="登录名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="ruleForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="用户类别" prop="usetype">
          <el-select v-model="ruleForm.usetype" placeholder="请选择用户类别">
            <el-option label="医院管理员" :value=1></el-option>
            <el-option label="挂号收费员" :value=2></el-option>
            <el-option label="门诊医生" :value=3></el-option>
            <el-option label="医技医生" :value=4></el-option>
            <el-option label="药房操作员" :value=5></el-option>
            <el-option label="财务管理员" :value=6></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="医生职称" prop="constantitem.constantname">
          <el-select v-model="ruleForm.doctitleid"  placeholder="请选择医生职称">
            <el-option
              v-for="item in constantitem"
              :key="item.id"
              :label="item.constantname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否参与排班">
          <el-switch v-model="ruleForm.isscheduling"
                     active-value="是"
                     inactive-value="否"></el-switch>
        </el-form-item>

        <el-form-item label="所在科室"  prop="department.deptname">
          <el-select v-model="ruleForm.deptid"  placeholder="请选择所在科室">
            <el-option
              v-for="item in department"
              :key="item.id"
              :label="item.deptname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="挂号级别"  prop="registleid">
          <el-select v-model="ruleForm.registleid"  placeholder="请选择挂号级别">
            <el-option
              v-for="item in registLevel"
              :key="item.id"
              :label="item.registname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="删除标记">
          <el-switch v-model="ruleForm.delmark"
                     :active-value=1
                     :inactive-value=0></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>
import {HOST} from '../../common/js/config'
  export default {
    data(){
      return{
        ruleForm:{
          username:'',
          password:'',
          realname:'',
          usetype: '',
          doctitleid:'',
          isscheduling:'',
          deptid:'',
          registleid:'',
          delmark:''
        },
        rules:{
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          usetype: [
            { required: true, message: '请选择用户类别', trigger: 'blur' },
          ],
          doctitleid: [
            { required: true, message: '请选择医生职称', trigger: 'blur' },
          ],
          isscheduling: [
            { required: true, message: '请选择是否参与排班', trigger: 'blur' },
          ],
          deptid: [
            { required: true, message: '请选择所在科室', trigger: 'blur' },
          ],
          registleid: [
            { required: true, message: '请选择挂号级别', trigger: 'blur' },
          ],
          delmark: [
            { required: true, message: '请选择删除标记', trigger: 'blur' },
          ],
        },
        //医生职称
        constantitem:[],
        //所在科室
        department:[],
        //挂号级别
        registLevel:[]
      }
    },
    created(){
      //取出路由传递的参数id
      let id = this.$route.params.id
      this.selById(id)
      this.selDocTitleID()
      this.selDeptID()
      this.selRegistLeID()
    },
    methods:{
      //根据主键加载记录
      selById(id){
        let url = `${HOST}/user/selById/${id}`
        this.$ajax.get(url).then((res)=>{
          this.ruleForm = res.data.object
        })
      },
      selDocTitleID(){
        let url = `${HOST}/constantitem/selByUserDocTitleID`
        this.$ajax.get(url).then((res)=>{
          this.constantitem = res.data.obj
        })
      },
      selDeptID(){
        let url = `${HOST}/department/selAll`
        this.$ajax.get(url).then((res)=>{
          this.department = res.data.obj
        })
      },
      selRegistLeID(){
        let url = `${HOST}/registlevel/selAll`
        this.$ajax.get(url).then((res)=>{
          this.registLevel = res.data.obj
        })
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //提交服务器
            let url = `${HOST}/user/userUpdate`
            this.$ajax.post(url,this.ruleForm).then(res=>{
              if(res.data.status === 200){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            })
          }
        });
      }
    }
  }
</script>

<style scoped>
  .el-icon-arrow-right {
    margin-bottom: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 146px;
    height: 146px;
    line-height: 146px;
  }
  .avatar {
    width: 146px;
    height: 146px;
    display: block;
  }
</style>
