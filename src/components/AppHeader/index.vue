<template>
    <div class="header">
        <img src="../../assets/logo.png" width="1.4%" class="logo"> 
        <span class="system" style="font-size:20px font-weight:bold">任务协作平台</span>
        <el-dropdown  class="dropdown" @command="clickon">
            <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item icon="el-icon-edit" command="a" >修改密码</el-dropdown-item> -->
                <el-dropdown-item icon="el-icon-s-fold" command="b" >退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        clickon(command){
            switch (command) {
                case 'a':
                    console.log('修改密码');
                    break;
                case 'b':
                    console.log('退出系统')
                    localStorage.removeItem('info');
                    this.$router.push('/');
                    break;
                default:
                    break;
            }
        },
    }
}
</script>

<style scoped>
.logo{
    vertical-align :middle;
    padding :0px 10px 0px 30px;
}
.system{
    position: absolute;
    color: white;
}
.dropdown{
    float: right;
    margin-right: 40px;
}
.el-dropdown-link{
    color: white;
    cursor: pointer;
}
</style>