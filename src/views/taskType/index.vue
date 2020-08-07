<template>
    <div style="height:92%">
        <!-- 搜索表单 -->
        <div style="height:6.5%;margin-top: 0.1%">
            <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="margin-top:10px">
                <el-form-item prop="taskType" label="任务类型：">
                    <el-input v-model="searchMap.taskType" placeholder="请输入任务类型" clearable style="width:180px"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status" style="padding-left:20px">
                    <el-select v-model="searchMap.status" clearable placeholder="请选择状态" style="width:180px">
                        <el-option v-for="item in statusList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item> 
                    <el-button type="primary" @click="SearchTaskTypeInfo">查 询</el-button>
                    <el-button type="primary" @click="handAddTaskTypeInfo">新 增</el-button>
                    <el-button @click="resetForm('searchForm')">重 置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 数据表格 -->
        <!-- <div style="height:89.5%;margin-top:0.8%"> -->
        <div style="margin-top:2px">
            <el-table :data="dataList"  :height="tableHeight" border style="width: 100%" >
                <el-table-column type="index" label="序号" align="center" width="150" ></el-table-column>
                <el-table-column prop="Id" label="ID" align="center" v-if="false"></el-table-column>
                <el-table-column prop="TaskType" label="任务类型" align="center" ></el-table-column>
                <!-- <el-table-column prop="ProjectType" label="项目类型" align="center" ></el-table-column> -->
                <el-table-column prop="Flag" label="状态" align="center" ></el-table-column>
                <el-table-column prop="TypeDesc" label="类型描述" align="center" ></el-table-column>
                <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.row.Id)">编 辑</el-button>
                    <el-button size="mini" type="primary" @click="handleTaskTypeEdit(scope.row.Id,scope.row.TaskType)">项目类型</el-button>
                    <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button> -->
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div style="height:2%">
        <!-- <div> -->
            <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync ="currentPage"
                :page-sizes="[10,20,50,100]"
                :page-size="pageSize"
                :total="total"
                class="pagingbar">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="`${dialogTitle}`" :visible.sync="dialogFormVisible" width="500px" style="height:950px;font-family:'微软雅黑'">
            <el-form  :rules="rules" ref="taskTypeForm" :model="taskType" style="width:400px" label-width="100px" label-position="right">
                <el-form-item label="任务类型" prop="TaskType">
                    <el-input v-model="taskType.TaskType" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="项目类型" prop="ProjectTypeID">
                    <el-select v-model="taskType.ProjectTypeID" clearable placeholder="请选择项目类型" style="width:300px" >
                        <el-option v-for="item in projectTypeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="状态" prop="Flag"> 
                    <el-select v-model="taskType.Flag" clearable placeholder="请选择状态" style="width:300px">
                        <el-option v-for="item in statusList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型描述" prop="TypeDesc">
                    <el-input type="textarea" v-model="taskType.TypeDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="taskType.Id === null ? addTaskTypeInfo('taskTypeForm') : UpdateTaskTypeInfo('taskTypeForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="`编辑项目类型 | ${clickTasktypeInfo}`"  :visible.sync="dialogProjectTypeVisible" width="400px">
            <el-table ref="multipleTable" :data="projectTypeList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="150" align="center"> </el-table-column>
                <el-table-column prop="Id" label="ID" show-overflow-tooltip v-if="false"></el-table-column>
                <el-table-column prop="Name" label="项目类型" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="CancleProjectTypeInfo">取 消</el-button>
                <el-button type="primary" @click="UpdateProjectTypeInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ApiCommon from '../../api/common';
import ApiTaskType from '../../api/tasktype'
export default {
    data(){
        return{
            clickTasktypeInfo:'',
            tableHeight:window.innerHeight*0.76,
            currentPage:1,
            pageSize:20,
            total:0,
            dataList:[],
            searchMap:{
                taskType:'',
                status:''
            },
            dialogFormVisible:false,
            dialogProjectTypeVisible:false,
            dialogTitle:'',
            taskType:{
                Id:null,
                TaskType:'',
                // ProjectTypeID:'',
                Flag:'',
                TypeDesc:''
            },
            projectTypeList:{
                Id:'',
                Name:''
            },
            statusList:[
                {
                    Id:'有效',
                    Name:'有效'
                },
                {
                    Id:'无效',
                    Name:'无效'
                },
            ],
            qry:{
                CurrentPage:1,
                PageSize:20,
                taskType:'',
                projectTypeId:""
            },
            projectTypeList:[],
            selectProjectType:[],
            multipleSelection:[],
            updateProjectType:{
                taskTypeId:'',
                projectTypeId:[]
            },
            rules:{
                TaskType:[
                    {required:true,message:'任务类型不能为空',trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.GetProTypeIdName(),
        this.SearchTaskTypeInfo()
    },
    methods:{
        handleSizeChange(val){
            this.pageSize=val;
            this.SearchTaskTypeInfo()
        },
        handleCurrentChange(val){
            this.currentPage=val;
            this.SearchTaskTypeInfo()
        },
        //查询项目类型
        GetProTypeIdName(){
            ApiCommon.GetProTypeIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.projectTypeList=resp.data;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //查询
        SearchTaskTypeInfo(){
            this.qry.CurrentPage=this.currentPage;
            this.qry.PageSize=this.pageSize;
            this.qry.taskType=this.searchMap.taskType;
            this.qry.status=this.searchMap.status;
            ApiTaskType.GetTaskType(this.qry).then(response=>{
                const resp=response.data;
                if(resp.status === 'success'){
                    this.total=resp.data.TotalCount;
                    this.dataList=resp.data.TaskTypeList;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    });
                    this.dataList=null;
                }
            })
        },
        //新增
        handAddTaskTypeInfo(){
            this.dialogFormVisible=true;
            this.dialogTitle='新增任务类型';
            this.taskType.Id=null;
            this.$nextTick(()=>{
                this.$refs['taskTypeForm'].resetFields();
            })
        },
        //新增后确认
        addTaskTypeInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiTaskType.AddTaskType(this.taskType).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.$message({
                                message:'新增成功',
                                type:'success'
                            });
                            this.dialogFormVisible=false;
                            this.SearchTaskTypeInfo();
                        }else{
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
        //重置
        resetForm(searchForm){
            this.$refs[searchForm].resetFields();
            this.SearchTaskTypeInfo();
        },
        //编辑
        handleEdit(id){
            this.dialogFormVisible=true;
            this.dialogTitle='编辑任务类型';
            ApiTaskType.GetTaskTypeById(id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.taskType=resp.data;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //编辑后确认
        UpdateTaskTypeInfo(formName){
            console.log(this.taskType)
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiTaskType.UpdateTaskType(this.taskType).then(response=>{
                        const resp=response.data;
                        if(resp.status='success'){
                            this.$message({
                                message:'编辑成功',
                                type:'success'
                            });
                            this.dialogFormVisible=false;
                            this.SearchTaskTypeInfo();
                        }
                        else{
                            this.$message({
                                message:resp.message,
                                type:'warning'
                            })
                        }
                    })
                }
            })
        },
        handleTaskTypeEdit(Id,taskType){
            this.clickTasktypeInfo=taskType;
            this.updateProjectType.taskTypeId=Id;
            this.dialogProjectTypeVisible=true;
            ApiTaskType.GetProjectTypeByTaskTypeId(Id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.selectProjectType=resp.data;
                    for(let a=0;a<this.selectProjectType.length;a++){
                        for(let b=0;b<this.projectTypeList.length;b++){
                            if(this.projectTypeList[b].Id===(this.selectProjectType[a].Id)){
                                this.$refs.multipleTable.toggleRowSelection(this.projectTypeList[b],true);
                            }
                        }
                    }
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
            this.updateProjectType.projectTypeId.length=0;
            for(var i=0;i<this.multipleSelection.length;i++){
                this.updateProjectType.projectTypeId.push(this.multipleSelection[i].Id)
            }
        },
        UpdateProjectTypeInfo(){
            const info=JSON.stringify(this.updateProjectType)
            ApiTaskType.UpdateTaskTypeProjectTypeBind(info).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    });
                    this.dialogProjectTypeVisible=false;
                    this.SearchTaskTypeInfo();
                    this.$refs.multipleTable.clearSelection();
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        CancleProjectTypeInfo(){
            this.dialogProjectTypeVisible=false;
            this.$refs.multipleTable.clearSelection();
        }
    }
}
</script>
