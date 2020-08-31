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
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="user">用户列表</el-menu-item>
                    <el-menu-item index="1-2" @click="orders">订单管理</el-menu-item>
                    <el-menu-item index="1-3" @click="collect">查询统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统运维</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-5" @click="maintain">数据维护</el-menu-item>
                    <el-menu-item index="1-6" @click="service">在线客服</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统测试</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-5" @click="multi">添加富文本</el-menu-item>
                    <el-menu-item index="1-5" @click="view">查看富文本</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="5">
                <i class="el-icon-s-release"></i>
                <span slot="title" @click="logout">退出</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                active: "1"
            }
        },
        methods: {
          index(){
            this.$router.push("/main")
          },
          user(){
            this.$router.push('/main/user')
          }
        }
    }
</script>

<style scoped>
    .el-menu-vertical {
        min-height: 600px;
    }
</style>
