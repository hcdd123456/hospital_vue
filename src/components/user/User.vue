<template>
    <div>
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
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageInfo.total"
        :page-size="pageInfo.pageSize"
        @current-change="handlePage"
      >
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
