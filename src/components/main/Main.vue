<template>
    <div>
        <el-container>
            <el-header>
                <Top />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Menu />
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Top from '../top/Top'
    import Menu from '../menu/Menu'
    export default {
        components: {
            Top,
            Menu
        }
    }
</script>

<style scoped>
    .el-container {
        height: 100vh;
        min-height: 600px;
    }

    .el-header {
        background-color: #314057;
        line-height: 75px;
        height: 75px !important;
    }
    .el-aside{
        width: 220px !important;
        height: 100%;
        background-color: #545c64;
    }

    .el-main{
        padding: 10px !important;
    }
</style>