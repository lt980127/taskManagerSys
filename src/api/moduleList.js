import request from '../utils/request';

export default{
    SearchModuleInfo(info){
        return request({
            url:'/ModuleList/GetModuleListInfo',
            method:'post',
            params:{'info':info}
        })
    },
    AddModuleInfo(info){
        return request({
            url:'/ModuleList/AddModuleList',
            method:'post',
            params:{'info':info}
        })
    },
    GetModuleListInfoById(info){
        return request({
            url:'/ModuleList/GetModuleListInfoById',
            method:'post',
            params:{'info':info}
        })
    },
    UpdateModuleList(info){
        return request({
            url:'/ModuleList/UpdateModuleList',
            method:'post',
            params:{'info':info}
        })
    },
    DeleteModuleList(info){
        return request({
            url:'/ModuleList/DeleteModuleList',
            method:'post',
            params:{'info':info}
        })
    },
    ImportModuleInfo(info){
        return request({
            url:'/ModuleList/ImportModuleInfo',
            method:'post',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            data:info
        })
    }
}