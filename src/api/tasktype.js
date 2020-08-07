import request from '../utils/request';

export default{
    GetTaskType(qry){
        return request({
            url:'/TaskType/GetTaskType',
            method:'post',
            params:qry
        })
    },
    AddTaskType(addInfo){
        return request({
            url:'/TaskType/AddTaskType',
            method:'post',
            params:addInfo
        })
    },
    GetTaskTypeById(id){
        return request({
            url:'/TaskType/GetTaskTypeById',
            method:'post',
            params:{'id':id}
        })
    },
    UpdateTaskType(updateInfo){
        return request({
            url:'/TaskType/UpdateTaskType',
            method:'post',
            params:updateInfo
        })
    },
    GetProjectTypeByTaskTypeId(taskTypeId){
        return request({
            url:'/TaskType/GetProjectTypeByTaskTypeId',
            method:'post',
            params:{'taskTypeId':taskTypeId}
        })
    },
    UpdateTaskTypeProjectTypeBind(info){
        return request({
            url:'/TaskType/UpdateTaskTypeProjectTypeBind',
            method:'post',
            params:{'info':info}
        })
    }
}