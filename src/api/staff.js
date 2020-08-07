import request from '../utils/request'

export default{
    GetStaff(qry){
        return request({
            url:'/Staff/GetStaff',
            method:'post',
            params:qry
        })
    },
    AddStaff(info){
        return request({
            url:'/Staff/AddStaff',
            method:'post',
            params:info
        })
    },
    GetStaffInfoById(Id){
        return request({
            url:'/Staff/GetStaffInfoById',
            method:'post',
            params:{'Id':Id}
        })
    },
    UpdataStaff(info){
        return request({
            url:'/Staff/UpdataStaff',
            method:'post',
            params:info
        })
    },
    GetProjectInfoByUserId(empId){
        return request({
            url:'/Staff/GetProjectInfoByUserId',
            method:'post',
            params:{'empId':empId}
        })
    }
}