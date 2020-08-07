module.exports={
    devServer:{
        port:10087,    //端口号，如果端口号被占用  会自动加一
        host:'localhost',   //主机名
        https:false,        //协议
        open:true,          //启动服务时自动昂打开浏览器访问     
        // proxy: {
        //     '/': {
        //         target: 'http://localhost:4347/', //
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    },
    lintOnSave:false,       //关闭格式检查
    productionSourceMap:false,    //打包时不会生成.map文件   加快打包速度
}


'http://localhost:4347/'