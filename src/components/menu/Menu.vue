<template>
    <div>
        <el-menu
                :default-active="active"
                class="el-menu-vertical"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
        >
            <el-menu-item index="1">
                <i class="el-icon-s-home"></i>
                <span slot="title" @click="index">首页</span>
            </el-menu-item>
            <el-submenu index="2" v-if="role===1">
                <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="user1" >用户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" v-if="role===1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>科室管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" @click="department">科室列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>挂号级别管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="registlevel">挂号级别列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          <el-submenu index="5" v-if="role===1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>排班管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="Rule">排班列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

            <el-menu-item index="6">
                <i class="el-icon-s-release"></i>
                <span slot="title" @click="logout">退出</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
  import {HOST} from '../../common/js/config'
  import {mapGetters} from 'vuex'
    export default {
        data() {
            return{
                active: "1",
                role: ''
            }
        },
        created(){
          this.role = this.user.usetype
        },
        methods: {
          index(){
            console.log(this.role)
            this.$router.push("/main")
          },
          user1(){
            this.$router.push('/main/user')
          },
          department(){
            this.$router.push('/main/department')
          },
          registlevel(){
            this.$router.push('/main/registlevel')
          },
          Rule(){
            this.$router.push('/main/rule')
          },
          logout(){
            this.$router.push('/')
          }
        },
      computed: {
        ...mapGetters([
          'user'
        ])
      }
    }
</script>

<style scoped>
    .el-menu-vertical {
        min-height: 600px;
    }
</style>
