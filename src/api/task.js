import request from '../utils/request'

export default{
    //获取分页查询数据
    SearchTaskInfo(qry){
        return request({
            url:'/Task/GetTask',
            method:'post',
            params:qry
        })
    },
    //新增任务表单提交
    AddTaskInfo(task){
        return request({
            url:'/Task/Add',
            method:'post',
            params:task
        })
    },
    //根据任务ID查询任务详细信息
    GetTaskInfoById(id){
        return request({
            url:'/Task/GetTaskInfoById',
            method:'post',
            params:{'taskId':id}
        })
    },
    //修改任务表单提交
    UpdateTaskInfo(task){
        return request({
            url:'/Task/UpdateTask',
            method:'post',
            params:task
        })
    },
    //删除任务
    DeleteTaskInfo(id){
        return request({
            url:'/Task/DeleteTask',
            method:'post',
            params:{'id':id}
        })
    }
}