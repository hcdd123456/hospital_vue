<template>
  <div>
    <el-breadcrumb class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/main/registlevel' }">挂号级别列表</el-breadcrumb-item>
      <el-breadcrumb-item>挂号级别修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="号别编码" prop="registcode" >
        <el-col :span="5">
          <el-input v-model="ruleForm.registcode"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="号别名称" prop="registname">
        <el-col :span="5">
          <el-input v-model="ruleForm.registname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="挂号限额" prop="registquota">
        <el-col :span="5">
          <el-input v-model="ruleForm.registquota"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="显示顺序号" prop="sequenceno">
        <el-col :span="5">
          <el-input v-model="ruleForm.sequenceno"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="挂号费" prop="registfee">
        <el-col :span="5">
          <el-input v-model="ruleForm.registfee"></el-input>
        </el-col>
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
          registcode:'',
          registname:'',
          registquota:'',
          sequenceno: '',
          registfee:''
        },
        rules:{
          registcode: [
            { required: true, message: '请输入号别编码', trigger: 'blur' },
          ],
          registname: [
            { required: true, message: '请输入号别名称', trigger: 'blur' },
          ],
          registquota: [
            { required: true, message: '请输入挂号限额', trigger: 'blur' },
          ],
          sequenceno: [
            { required: true, message: '请输入显示顺序号', trigger: 'blur' },
          ],
          registfee: [
            { required: true, message: '请输入挂号费', trigger: 'blur' },
          ]
        },
      }
    },
    created(){
      //取出路由传递的参数id
      let id = this.$route.params.id
      this.selById(id)
      this.seldeptcategoryid()
    },
    methods:{
      //根据主键加载记录
      selById(id){
        let url = `${HOST}/registlevel/selById/${id}`
        this.$ajax.get(url).then((res)=>{
          this.ruleForm = res.data.object
        })
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            //提交服务器
            let url = `${HOST}/registlevel/update`
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
