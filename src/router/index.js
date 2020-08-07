import Vue from "vue";
import Router from "vue-router";
import Layout from '../components/layout';
import Home from '../views/home';
import Login from '../views/login';
import Project from '../views/project';
import Task from '../views/task';
import TaskType from '../views/taskType';
import ModuleList from '../views/ModuleList';
import Staff from '../views/staff';
import ProjectType from '../views/ProjectType';

Vue.use(Router);

export default new Router({
  // mode:'history',
  routes:[
    {
      path:'/',
      name:'login',  
      component:Login
    },
    {
      path:'/layout',
      name:'layout',
      component:Layout,
      redirect:'/home',
      children:[
        {
          path:'/home',
          component:Home,
          meta:{title:'首页'}
        }
      ]
    },
    {
      path:'/project',
      component:Layout,
      children:[
        {
          path:'/',
          component:Project,
          meta:{title:'项目列表'}
        }
      ]
    },
    {
      path:'/task',
      component:Layout,
      children:[
        {
          path:'/',
          component:Task,
          meta:{title:'任务列表'}
        }
      ]
    },
    {
      path:'/taskType',
      component:Layout,
      children:[
        {
          path:'/',
          component:TaskType,
          meta:{title:'任务类型'}
        }
      ]
    },
    {
      path:'/moduleList',
      component:Layout,
      children:[
        {
          path:'/',
          component:ModuleList,
          meta:{title:'项目模块'}
        }
      ]
    },
    {
      path:'/staff',
      component:Layout,
      children:[
        {
          path:'/',
          component:Staff,
          meta:{title:'人员列表'}
        }
      ]
    },
    {
      path:'/projectType',
      component:Layout,
      children:[
        {
          path:'/',
          component:ProjectType,
          meta:{title:'项目类型绑定'}
        }
      ]
    }
  ]
})
