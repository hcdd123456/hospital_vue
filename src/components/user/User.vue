<template>
    <div>

      <el-breadcrumb class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" icon="el-icon-edit" circle @click="handleAdd"></el-button>
      <el-table
        v-loading="loading"
        :data="pageInfo.list"
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          label="登录名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="100">
        </el-table-column>
        <el-table-column
          label="用户类别"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.usetype | formatUseType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="constantitem.constantname"
          label="医生职称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="isscheduling"
          label="是否参与排班"
          width="120">
        </el-table-column>
        <el-table-column
          prop="department.deptname"
          label="所在科室"
          width="120">
        </el-table-column>
        <el-table-column
          prop="registlevel.registname"
          label="挂号级别"
          width="120">
        </el-table-column>
        <el-table-column
          label="删除标记"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.delmark | formatDelMark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="handleUpdate(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total,prev, pager, next"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total">
      </el-pagination>
    </div>
</template>

<script>
import {HOST} from '../../common/js/config'
  export default {
    data(){
      return{
        loading: false,
        currPage: 1,
        pageInfo: {
        },
        form:{
          id:''
        },
      }
    },
    created(){
      this.getData()
    },
    methods:{
      //加载服务器端数据，取出列表
      getData(){
        this.loading = true
        let url = `${HOST}/user/selAll/${this.currPage}`
        this.$ajax.post(url,this.form).then((res)=>{
          this.pageInfo = res.data
          console.log(this.pageInfo)
        }).finally(()=>{
          this.loading = false
        })
      },
      //页面跳转
      handleCurrentChange(val){
        this.currPage = val
        //加载数据
        this.getData()
      },
      //跳转用户新增页面
      handleAdd(){
        this.$router.push('/main/userAdd')
      },
      //删除用户
      handleDelete(id){
        let url = `${HOST}/user/delById/${id}`
        this.$ajax.get(url).then((res)=>{
          if(res.data.status === 200){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }else {
            this.$message({
              message: '删除失败',
              type: 'fail'
            });
          }
          //重新加载数据
          this.currPage = 1
          this.getData()
        })
      },
      //编辑用户
      handleUpdate(id){
        this.$router.push(`/main/userUpdate/${id}`)
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
