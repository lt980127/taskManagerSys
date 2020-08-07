<template>
    <div class="login-contain">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">任 务 协 作 平 台</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>   
</template>

<script>
export default {
    data(){
        return{
            form: {
                    username: '',
                    password:''
                },
            rules:{
                username:[
                    {required:true,message:'账号不能为空',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    if(this.form.username==='admin'&&this.form.password==='yhwins@123'){
                        localStorage.setItem('info',JSON.stringify(this.form));
                        this.$router.push('/layout')
                    }
                    else{
                        this.$message({
                            message:'用户名或密码不正确',
                            type:'warning'
                        })
                    }
                }
                else{
                    return false;
                }
            })
            
        }
    }
}
</script>

<style scoped>
.login-form{
    width:350px;
    /* margin:212px auto; */
    background-color: rgba(255,255,255,0.8);
    padding: 30px;
    border-radius: 20px;
    margin: auto;
}
.login-contain{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    background: url('../../assets/login.jpg');
    background-repeat:no-repeat;
    background-size:cover;
    -webkit-background-size:cover;
    -webkit-background-size:cover;
    background-position:center0;
    
}
.login-title{
    color: #303133;
    text-align: center;
}
</style>