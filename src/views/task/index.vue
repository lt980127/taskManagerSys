<template>
    <div style="height:93%">
        <!-- 搜索表单 -->
        <div style="height:6.5%;margin-top: 0.2%">
            <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="padding-top:0.5%">
                <el-form-item label="项目类型：" prop="ProjectTypeId" style="padding-left:1.7%">
                    <el-select v-model="searchMap.ProjectTypeId" clearable placeholder="请选择项目" style="width:150px">
                        <el-option v-for="item in projectTypeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目：" prop="ProjectId" style="padding-left:1.7%">
                    <el-select v-model="searchMap.ProjectId" clearable placeholder="请选择项目" style="width:150px">
                        <el-option v-for="item in projectList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" prop="StatusId">
                    <el-select v-model="searchMap.StatusId" clearable placeholder="请选择状态" style="width:150px">
                        <el-option v-for="item in statusList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item >
                <el-form-item prop="EmpName" label="经办人：">
                    <el-input v-model="searchMap.EmpName" placeholder="经办人" clearable style="width:150px"></el-input>
                </el-form-item>
                <el-form-item prop="StartTime" label="开始时间：">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.StartTime" type="date" placeholder="选择开始日期" style="width:150px"></el-date-picker>
                </el-form-item>
                <el-form-item prop="EndTime" label="结束时间：">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.EndTime" type="date" placeholder="选择结束日期" style="width:150px"></el-date-picker>
                </el-form-item>
                <el-form-item> 
                    <el-button type="primary" @click="SearchTaskInfo">查 询</el-button>
                    <!-- <el-button type="primary" @click="handAddTaskInfo">新 增</el-button> -->
                    <el-button @click="resetForm('searchForm')">重 置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 数据表格 -->
        <div style="height:89.5%;margin-top: 0.2%">
            <el-table :data="dataList" border style="width: 100%" :height="tableHeight">
                <el-table-column type="index" label="序号" align="center" width="90" ></el-table-column>
                <el-table-column prop="Id" label="ID" align="center" v-if="false"></el-table-column>
                <el-table-column prop="TaskTitle" label="任务名称" align="center" ></el-table-column>
                <el-table-column prop="ProjectName" label="所属项目" align="center" ></el-table-column>
                <el-table-column prop="ProjectType" label="项目类型" align="center" v-if="false"></el-table-column>
                <el-table-column prop="TaskType" label="任务类型" align="center" ></el-table-column>
                <el-table-column prop="PlannedDuration" label="预计工时" align="center" ></el-table-column>
                <el-table-column prop="ActualDurationTwo" label="实际工时" align="center" ></el-table-column>
                <el-table-column prop="StatusName" label="状态" align="center" ></el-table-column>
                <el-table-column prop="EmpName" label="经办人" align="center" ></el-table-column>
                <el-table-column prop="UpdateTime" label="更新时间" align="center" ></el-table-column>
                <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.row.Id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>       
        <!-- 分页 -->
        <div style="height:2%;margin-top: 0.2%"> 
            <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync ="currentPage"
                :page-sizes="[10,20,50,100]"
                :page-size="pageSize"
                :total="total"
                class="pagingbox">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="`${dialogTitle}`" :visible.sync="dialogFormVisible" width="500px" style="height:100%">
            <el-form  :rules="rules" ref="taskForm" :model="task" style="width:400px" label-width="100px" label-position="right">
                <el-form-item label="项目" prop="ProjectId">
                    <el-select v-model="task.ProjectId" clearable placeholder="请选择项目" style="width:300px" @change="GetInfoByProjectId(task.ProjectId)" :disabled="true">
                        <el-option v-for="item in projectList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务类型" prop="TaskTypeId">
                    <el-select v-model="task.TaskTypeId" clearable placeholder="请选择任务类型" style="width:300px" @change="GetTaskNodeIdNameByTypeId(task.TaskTypeId)" :disabled="this.taskStatueFlag===3">
                        <el-option v-for="item in TaskTypeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务节点" prop="CurrentNodeId">
                    <el-select v-model="task.CurrentNodeId" clearable placeholder="请选择任务节点" style="width:300px" :disabled="(task.TaskTypeId !== 1 && task.TaskTypeId !==21)||this.taskStatueFlag===3">
                        <el-option v-for="item in TaskNodeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="概要" prop="TaskTitle">
                    <el-input v-model="task.TaskTitle" autocomplete="off" :disabled="this.taskStatueFlag===3"></el-input>
                </el-form-item>
                <el-form-item label="任务状态" prop="StatusId" v-if="isOrEdit"> 
                    <el-select v-model="task.StatusId" clearable placeholder="请选择任务状态" style="width:300px" :disabled="this.taskStatueFlag!==2">
                        <el-option v-for="item in statusList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级" prop="PriorityId">
                    <el-select v-model="task.PriorityId" clearable placeholder="请选择优先级" style="width:300px" :disabled="true">
                        <el-option v-for="item in PriorityList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="难易度" prop="DifficultyId">
                    <el-select v-model="task.DifficultyId" clearable placeholder="请选择难易度" style="width:300px" :disabled="true">
                        <el-option v-for="item in DifficultyList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经办人" prop="Assignee">
                    <el-select v-model="task.Assignee" clearable placeholder="请选择经办人" style="width:300px" :disabled="this.taskStatueFlag!==1">
                        <el-option v-for="item in EssigneeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预计工时" prop="PlannedDuration">
                    <el-input v-model="task.PlannedDuration" autocomplete="off" oninput ="value=value.replace(/[^0-9.]/g,'')" :disabled="this.taskStatueFlag===3"></el-input>
                </el-form-item>
                <el-form-item label="详细描述" prop="Description">
                    <el-input type="textarea" v-model="task.Description" autocomplete="off" :disabled="this.taskStatueFlag===3"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="task.Id === null ? addTaskInfo('taskForm') : UpdateTaskInfo('taskForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ApiCommon from '../../api/common'
import ApiTask from '../../api/task'
export default {
    data(){
        return{
            tableHeight:window.innerHeight*0.76,
            dataList:[],
            total:0,
            pageSize:20,
            currentPage:1,
            searchMap:{
                ProjectTypeId:'',
                ProjectId:'',
                StatusId:'',
                EmpName:'',
                StartTime:'',
                EndTime:''
            },
            projectValue:'',
            statusValue:'',
            projectTypeList:{
                Id:'',
                Name:''
            },
            projectList:{
                Id:'',
                Name:''
            },
            statusList:{
                Id:'',
                Name:''
            },
            TaskTypeList:{
                Id:'',
                Name:''
            },
            TaskNodeList:{
                Id:'',
                Name:''
            },
            PriorityList:{
                Id:'',
                Name:''
            },
            DifficultyList:{
                Id:'',
                Name:''
            },
            EssigneeList:{
                Id:'',
                Name:''
            },
            qry:{
                CurrentPage:1,
                PageSize:20,
                ProjectId:null,
                StatusId:null,
                EmpName:'',
                StartTime:'',
                EndTime:''
            },
            dialogFormVisible:false,
            isOrEdit:false,
            dialogTitle:'',
            task:{
                Id:null,
                ProjectId:'',
                TaskTypeId:'',
                CurrentNodeId:'',
                TaskTitle:'',
                StatusId:null,
                PriorityId:3,
                DifficultyId:2,
                Assignee:'',
                PlannedDuration:'',
                Description:''
            },
            taskStatueFlag:'',
            taskTypeByProject:[],
            rules:{
                PlannedDuration:[
                    {required:true,message:'预计工时不能为空',trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.GetProTypeIdName(),
        this.getProjectInfo(),
        this.getStatusInfo(),
        this.SearchTaskInfo(),
        this.GetTaskTypeIdName(),
        this.GetTaskTypeNodeIdName(),
        this.GetEmpIdName()
    },
    methods:{
        //获取项目类型
        GetProTypeIdName(){
            ApiCommon.GetProTypeIdName().then(response=>{
                const resp = response.data;
                if(resp.status==='success'){
                    this.projectTypeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取项目信息
        getProjectInfo(){
            ApiCommon.GetProjectIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.projectList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取状态信息
        getStatusInfo(){
            ApiCommon.GetTaskStatusIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.statusList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //查询
        SearchTaskInfo(){
            this.qry.CurrentPage=this.currentPage;
            this.qry.PageSize=this.pageSize;
            this.qry.ProjectId=this.searchMap.ProjectId;
            this.qry.StatusId=this.searchMap.StatusId;
            this.qry.EmpName=this.searchMap.EmpName;
            this.qry.StartTime=this.searchMap.StartTime;
            this.qry.EndTime=this.searchMap.EndTime;
            this.qry.ProjectTypeId=this.searchMap.ProjectTypeId
            ApiTask.SearchTaskInfo(this.qry).then(response=>{
                const resp=response.data;
                console.log(resp);
                if(resp.status==='success'){
                    this.total=resp.data.TotalCount;
                    this.dataList=resp.data.TaskList;
                }
                else{
                    this.$message({
                        message:resp.msg,
                        type:'warning'
                    });
                    this.dataList=null;
                }
            })
        },
        //新增
        handAddTaskInfo(){
            this.task.Id=null;
            this.isOrEdit=false;
            this.dialogTitle='新增任务信息'
            this.dialogFormVisible=true;
            this.$nextTick(()=>{
                this.$refs['taskForm'].resetFields();
            })
            this.GetTaskPriorityIdName();
            this.GetTaskDifficultyIdName();
            

        },
        //重置
        resetForm(searchForm){
            this.$refs[searchForm].resetFields();
            this.SearchTaskInfo();
        },
        //编辑
        handleEdit(id){
            this.isOrEdit=true;
            this.dialogTitle='编辑任务信息';
            this.dialogFormVisible=true;
            this.$nextTick(()=>{
                this.$refs['taskForm'].resetFields();
            })
            ApiTask.GetTaskInfoById(id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    console.log(resp.data);
                    this.task=resp.data;
                    this.GetTaskTypeIdNameByProjectId(this.task.ProjectId);
                    if(resp.data.StatusId===1){
                        this.taskStatueFlag=1
                    }
                    else if(resp.data.StatusId===3){
                        this.taskStatueFlag=3
                    }
                    else if(resp.data.StatusId===2){
                        this.taskStatueFlag=2
                    }
                    else{
                        this.taskStatueFlag=0
                    }
                    if(this.task.CurrentNodeId===0){
                        this.task.CurrentNodeId=null;
                    }
                }
            });
            this.GetTaskPriorityIdName();
            this.GetTaskDifficultyIdName();
            
        },
        //新增后确定
        addTaskInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiTask.AddTaskInfo(this.task).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'新增成功',
                                type:'success'
                            });
                            this.SearchTaskInfo();
                        }
                        else{
                            this.$message({
                                message:resp.message,
                                type:'warning'
                            })
                        }
                    })
                }
                else{
                    return false;
                }
            })
        },
        //编辑后确认
        UpdateTaskInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiTask.UpdateTaskInfo(this.task).then(response=>{
                        const resp =response.data;
                        console.log(resp);
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'编辑成功',
                                type:'success'
                            });
                            this.SearchTaskInfo();
                        }else{
                            this.$message({
                                message:resp.message,
                                type:'warning'
                            })
                        }
                    })
                }
            })
        },
        //删除
        handleDelete(id){
            this.$confirm('确认要删除这条记录吗?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                ApiTask.DeleteTaskInfo(id).then(response=>{
                    const resp=response.data;
                    if(resp.status==='success'){
                        this.SearchTaskInfo();
                        this.$message({
                            message:'删除成功',
                            type:'success'
                        })
                    }
                    else{
                        this.$message({
                            message:resp.message,
                            type:'warning'
                        })
                    }
                })
            }).catch(()=>{
                console.log('取消')
            })
        },
        //改变每页显示条数
        handleSizeChange(val){
            this.pageSize=val;
            this.SearchTaskInfo();
        },
        //改变当前页
        handleCurrentChange(val){
            this.currentPage=val;
            this.SearchTaskInfo();
        },
        //根据项目ID获取信息
        GetInfoByProjectId(projectId){
            this.GetTaskTypeIdNameByProjectId(projectId);
            this.GetProjectEmpIdName(projectId);
        },
        // 根据项目ID获取项目所属项目类型所绑定的任务类型Id-Name键值对
        GetTaskTypeIdNameByProjectId(projectId){
            ApiCommon.GetTaskTypeIdNameByProjectId(projectId).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.TaskTypeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //根据项目ID获取项目人员Id-Name键值对
        GetProjectEmpIdName(projectId){
            ApiCommon.GetProjectEmpIdName(projectId).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.EssigneeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        // 根据任务类型ID获取绑定的任务节点Id-Name键值对
        GetTaskNodeIdNameByTypeId(taskTypeId){
            ApiCommon.GetTaskNodeIdNameByTypeId(taskTypeId).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.TaskNodeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
                console.log(this.task.CurrentNodeId)
            })
        },
        //获取任务优先级
        GetTaskPriorityIdName(){
            ApiCommon.GetTaskPriorityIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.PriorityList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取难易度
        GetTaskDifficultyIdName(){
            ApiCommon.GetTaskDifficultyIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.DifficultyList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取任务类型
        GetTaskTypeIdName(){
            ApiCommon.GetTaskTypeIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.TaskTypeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取任务节点
        GetTaskTypeNodeIdName(){
            ApiCommon.GetTaskTypeNodeIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.TaskNodeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取经办人信息
        GetEmpIdName(){
            ApiCommon.GetEmpIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.EssigneeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
/* .pagingbox{
    position: absolute;
    margin-top: 0.5%;
    height: 20% !important;
} */
</style>