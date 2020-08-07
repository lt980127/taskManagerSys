import request from '../utils/request'

export default{
    GetProjectType(info){
        return request({
            url:'/ProjectType/GetProjectType',
            method:'post',
            params:{'info':info}
        })
    },
    AddProjectType(info){
        return request({
            url:'/ProjectType/AddProjectType',
            method:'post',
            params:info
        })
    },
    GetProjectTypeInfoById(Id){
        return request({
            url:'/ProjectType/GetProjectTypeInfoById',
            method:'post',
            params:{'Id':Id}
        })
    },
    UpdataProjectType(info){
        return request({
            url:'/ProjectType/UpdataProjectType',
            method:'post',
            params:info
        })
    },
    GetTaskTypeInfoByProjecttypeId(Id){
        return request({
            url:'/ProjectType/GetTaskTypeInfoByProjecttypeId',
            method:'post',
            params:{'Id':Id}
        })
    }
}