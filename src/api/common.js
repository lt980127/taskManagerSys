import request from '../utils/request'

export default{
    //获取所有项目Id-Name键值对
    GetProjectIdName(){
        return request({
            url:'/Common/GetALLProjectIdName',
            method:'post'
        })
    },
    //获取任务状态Id-Name键值对
    GetTaskStatusIdName(){
        return request({
            url:'/Common/GetTaskStatusIdName',
            method:'post'
        })
    },
    //获取任务优先级
    GetTaskPriorityIdName(){
        return request({
            url:'/Common/GetTaskPriorityIdName',
            method:'post'
        })
    },
    //获取任务难易度Id-Name键值对
    GetTaskDifficultyIdName(){
        return request({
            url:'/Common/GetTaskDifficultyIdName',
            method:'post'
        })
    },
    //获取所有人员Id-Name键值对
    GetEmpIdName(){
        return request({
            url:'/Common/GetEmpIdName',
            method:'post'
        })
    },
    //获取任务类型Id-Name键值对
    GetTaskTypeIdName(){
        return request({
            url:'/Common/GetTaskTypeIdName',
            method:'post'
        })
    },
    //获取任务节点
    GetTaskTypeNodeIdName(){
        return request({
            url:'/Common/GetTaskTypeNodeIdName',
            method:'post'
        })
    },
    //根据项目ID获取项目人员Id-Name键值对
    GetProjectEmpIdName(projectId){
        return request({
            url:'/Common/GetProjectEmpIdName',
            method:'post',
            params:{'projectId':projectId}
        })
    },
    //根据任务类型ID获取绑定的任务节点Id-Name键值对
    GetTaskNodeIdNameByTypeId(taskTypeId){
        return request({
            url:'/Common/GetTaskNodeIdNameByTypeId',
            method:'post',
            params:{'taskTypeId':taskTypeId}
        })
    },
    //根据项目ID获取项目所属项目类型所绑定的任务类型Id-Name键值对
    GetTaskTypeIdNameByProjectId(projectId){
        return request({
            url:'/Common/GetTaskTypeIdNameByProjectId',
            method:'post',
            params:{'projectId':projectId}
        })
    },
    //获取项目类型
    GetProTypeIdName(){
        return request({
            url:'/Common/GetProTypeIdName',
            method:'post'
        })
    },
    //获取项目状态
    GetProStatusIdName(){
        return request({
            url:'/Common/GetProStatusIdName',
            method:'post'
        })
    }
}