<template>
    <div>
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
            <el-option label="医院管理员" value="1"></el-option>
            <el-option label="挂号收费员" value="2"></el-option>
            <el-option label="门诊医生" value="3"></el-option>
            <el-option label="医技医生" value="4"></el-option>
            <el-option label="药房操作员" value="5"></el-option>
            <el-option label="财务管理员" value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="医生职称" prop="doctitleid">
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

        <el-form-item label="所在科室"  prop="deptid">
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
                     active-value="1"
                     inactive-value="0"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      this.selDocTitleID()
      this.selDeptID()
      this.selRegistLeID()
    },
    methods:{
      selDocTitleID(){
        let url = `${HOST}/constantitem/selAll`
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
            console.log(this.ruleForm)
            //提交服务器
            let url = `${HOST}/user/userAdd`
            this.$ajax.post(url,this.ruleForm).then(res=>{
              if(res.data.status === 200){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }
            })
          }
        });
      }
    },
    filters:{
      formatUseType(row){
        switch(row){
          case 1:
            return '医院管理员'
          case 2:
            return '挂号收费员'
          case 3:
            return '门诊医生'
          case 4:
            return '医技医生'
          case 5:
            return '药房操作员'
          case 6:
            return '财务管理员'
        }
      },
      formatDelMark(row){
        switch (row){
          case 0:
            return '已删除'
          case 1:
            return '正常'
        }
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
