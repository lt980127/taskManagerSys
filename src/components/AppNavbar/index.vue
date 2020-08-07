<template>
    <div class="navbar">
         <!-- default-active : 默认选中的菜单 
             :router="true" true表示开启路由模式，开启之后，index的值代表的就是路由地址
         -->
        <el-menu
        :router="true"
        :default-active="$route.path"  
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/project/">
                <i class="el-icon-s-operation"></i>
                <span slot="title">项目列表</span>
            </el-menu-item>
            <el-menu-item index="/moduleList/">
                <i class="el-icon-present" ></i>
                <span slot="title">项目模块</span>
            </el-menu-item>
            <el-menu-item index="/projectType/">
                <i class="el-icon-copy-document" ></i>
                <span slot="title">项目类型绑定</span>
            </el-menu-item>
            <el-menu-item index="/task/">
                <i class="el-icon-s-cooperation" ></i>
                <span slot="title">任务列表</span>
            </el-menu-item>
            <el-menu-item index="/taskType/">
                <i class="el-icon-menu" ></i>
                <span slot="title">任务类型</span>
            </el-menu-item>
            <el-menu-item index="/staff/">
                <i class="el-icon-user" ></i>
                <span slot="title">人员列表</span>
            </el-menu-item>
        </el-menu>
    </div>
</template> 

<style scoped>
.el-menu-vertical{
    border-right:none
}
</style>