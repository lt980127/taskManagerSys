import request from '../utils/request'

export default{
    //获取项目信息
    GetProject(qry){
        return request({
            url:'/Project/GetProject',
            method:'post',
            params:qry
        })
    },
    AddProject(project){
        return request({
            url:'/Project/AddProject',
            method:'post',
            params:project
        })
    },
    GetProjectInfoById(id){
        return request({
            url:'/Project/GetProjectInfoById',
            method:'post',
            params:{'ID':id}
        })
    },
    UpdateProject(project){
        return request({
            url:'/Project/UpdateProject',
            method:'post',
            params:project
        })
    },
    DeleteProject(id){
        return request({
            url:'/Project/DeleteProject',
            method:'post',
            params:{'id':id}
        })
    },
    UpdateProjectUser(info){
        return request({
            url:'/Project/UpdateProjectUser',
            method:'post',
            params:{'info':info}
        })
    },
    GetProjectUser(projectId){
        return request({
            url:'/Project/GetProjectUser',
            method:'post',
            params:{'projectId':projectId}
        })
    }
}