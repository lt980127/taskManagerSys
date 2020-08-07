import axios from 'axios'
import {Message,Loading} from 'element-ui'

const loading={
    loadingInstance:null,
    open(){
        //创建实例 ,而且会打开加载窗口
        if(this.loadingInstance===null){
            //如果实例为空 则创建
            this.loadingInstance= Loading.service(
                {
                    target:'.main',
                    text:'拼命加载中...',
                    background:'rgba(0,0,0,0.5)'
                }
            );
        }
        
    },
    //关闭加载
    close(){
        //不为空时，则关闭加载窗口
        if(this.loadingInstance!==null){
            this.loadingInstance.close()
        }
        this.loadingInstance=null;
    }
}
const request=axios.create({
    // baseURL:'http://localhost:4347/',
    baseURL:'http://106.52.172.159:4434/',
    timeout:5000
})

//请求拦截器
request.interceptors.request.use(function(config){
    loading.open();
    return config;
},function(error){
    loading.close();
    return Promise.reject(error);
})

//响应拦截器
request.interceptors.response.use(response=>{
    // response.data
    loading.close();
    return response;
},error=>{
    loading.close();
    Message({
        message:error.message,
        type:'warning',
        duration:5*1000
    })
    return Promise.reject(error);
})

export default request