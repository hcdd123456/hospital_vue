<template>
    <div>
      <el-breadcrumb class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/main/department' }">科室列表</el-breadcrumb-item>
        <el-breadcrumb-item>科室新增</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="科室编码" prop="deptcode" >
          <el-col :span="5">
          <el-input v-model="ruleForm.deptcode"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="科室名称" prop="deptname">
          <el-col :span="5">
          <el-input v-model="ruleForm.deptname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="科室分类" prop="deptcategoryid">
          <el-select v-model="ruleForm.deptcategoryid"  placeholder="请选择医生职称">
            <el-option
              v-for="item in constantitem"
              :key="item.id"
              :label="item.constantname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="科室类型" prop="depttype">-->
          <!--<el-select v-model="depttype" placeholder="请选择用户类别">-->
            <!--<el-option-->
              <!--v-for="item in depttype"-->
             <!--:key="item.value"-->
             <!--:label="item.label"-->
             <!--:value="item.value"-->
            <!--&gt;-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="科室类型" prop="depttype">
          <el-select v-model="ruleForm.depttype" value-key="label" placeholder="请选择用户类别">
            <el-option label="临床" :value=1 ></el-option>
            <el-option label="医技" :value=2></el-option>
            <el-option label="财务" :value=3></el-option>
            <el-option label="行政" :value=4></el-option>
            <el-option label="其它" :value=5></el-option>
          </el-select>
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
          deptcode:'',
          deptname:'',
          deptcategoryid:'',
          depttype: '',
          delmark:''
        },
        rules:{
          deptcode: [
            { required: true, message: '请输入科室编码', trigger: 'blur' },
          ],
          deptname: [
            { required: true, message: '请输入科室名称', trigger: 'blur' },
          ],
          deptcategoryid: [
            { required: true, message: '请选择科室分类', trigger: 'blur' },
          ],
          depttype: [
            { required: true, message: '请选择科室类型', trigger: 'blur' },
          ],
          delmark: [
            { required: true, message: '请选择删除标记', trigger: 'blur' },
          ]
        },
        //医生职称
        constantitem:[],
        // 下拉框数据
        depttype: [
          {value: '1', label: '发起解析'},
          {value: '2', label: '下载'},
          {value: '3', label: '删除'}
        ]
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
        let url = `${HOST}/department/selById/${id}`
        this.$ajax.get(url).then((res)=>{
          this.ruleForm = res.data.object
//          if(this.ruleForm.depttype ===1){
//            this.ruleForm.depttype = '临床'
//          }
//          switch(this.ruleForm.depttype){
//            case 1:
//              return '临床'
//            case 2:
//              return '医技'
//            case 3:
//              return '财务'
//            case 4:
//              return '行政'
//            case 5:
//              return '其它'
//          }
        })
      },
      seldeptcategoryid(){
        let url = `${HOST}/constantitem/selByDepartmentDeptcategoryid`
        this.$ajax.get(url).then((res)=>{
          this.constantitem = res.data.obj
        })
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            //提交服务器
            let url = `${HOST}/department/update`
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
