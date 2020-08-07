<template>
    <div>
        <app-header></app-header>
        <app-navbar></app-navbar>
        <app-main></app-main>        
    </div>
</template>

<script>
import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';
import AppMain from './AppMain';
export default {
    data(){
        return{
            
        }
    },
    components:{AppHeader,AppNavbar,AppMain}
}
</script>

<style scoped>
/* 头部区域 */
.header{
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: slategray;
}
.navbar{
    position: absolute;
    width: 250px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    background-color: #545c64;
    overflow-y: auto;
}
.main{
    position: absolute;
    top: 50px;
    left: 250px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
    /* background-color: tomato; */
}
</style>