import router from './router/index';

router.beforeEach((to,from,next)=>{
    const info =localStorage.getItem('info');
    if(!info){
        if(to.path!=='/'){
            next({path:'/'})
        }
        else{
            next()
        }
    }
    else{
        next();
    }
})