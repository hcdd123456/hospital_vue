<template>
    <div class="con">
        <span class="title" >HIS医院管理系统</span>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span class="operate"></span>
        <el-button type="info" icon="el-icon-switch-button" circle ></el-button>
    </div>
</template>

<script>

    export default {

    }
</script>

<style scoped>
    .el-avatar--circle {
        border-radius: 50%;
        /* display: inline-block; */
        position: absolute;
        right: 150px;
        top: 15px;
    }
    .el-button{
        position: absolute;
        right: 80px;
        top: 15px;
    }
    .operate{
        color: #fff;
        position: absolute;
        right: 200px;
        font-size: 0.8em;
        font-weight: bold;
    }
    .con .title{
        font-weight: bold;
        font-size: 1.5em;
        color: #fff;
    }
</style>
