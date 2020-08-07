<template>
    <div style="height:93%">
        <!-- 搜索表单 -->
        <div style="height:6.5%;margin-top: 0.2%">
            <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="padding-top:10px">
                <el-form-item label="项目类型：" prop="ProjectTypeId" style="padding-left:20px">
                    <el-select v-model="searchMap.ProjectTypeId" clearable placeholder="请选择项目类型" style="width:150px">
                        <el-option v-for="item in ProjectTypeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目负责人：" prop="LeaderId" style="padding-left:20px">
                    <el-select v-model="searchMap.LeaderId" clearable placeholder="请选择项目" style="width:150px">
                        <el-option v-for="item in LeaderList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目集负责人：" prop="ProgramLeaderId" style="margin-left:40px">
                    <el-select v-model="searchMap.ProgramLeaderId" clearable placeholder="请选择状态" style="width:150px">
                        <el-option v-for="item in ProgramLeaderList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item> 
                    <el-button type="primary" @click="SearchProjectInfo" style="margin-left:40px">查 询</el-button>
                    <el-button type="primary" @click="AddProjectInfo" style="margin-left:20px">新 增</el-button>
                    <el-button @click="resetForm('searchForm')" style="margin-left:20px">重 置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <!-- 数据表格 -->
        <div style="height:88%;margin-top: 0.5%">
            <el-table :data="dataList" border style="width: 100%" :height="tableHeight">
                <el-table-column type="index" label="序号" align="center" width="90" ></el-table-column>
                <el-table-column prop="Id" label="ID" align="center" v-if="false"></el-table-column>
                <el-table-column prop="ProjectName" label="项目名称" align="center" ></el-table-column>
                <el-table-column prop="StatusName" label="项目状态" align="center" ></el-table-column>
                <el-table-column prop="ProjectType" label="项目类型" align="center" ></el-table-column>
                <el-table-column prop="LeaderName" label="项目负责人" align="center" ></el-table-column>
                <el-table-column prop="ProgramLeaderName" label="项目集负责人" align="center" ></el-table-column>
                <el-table-column prop="UpdateTime" label="更新时间" align="center" ></el-table-column>
                <el-table-column label="操作" align="center" width="280%">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.row.Id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
                    <el-button size="mini" type="primary" @click="handleProjectInfo(scope.row.Id,scope.row.ProjectName)">项目人员</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div style="height:3%;margin-top: 0.2%">
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
        <el-dialog :title="`${dialogTitle}`" :visible.sync="dialogFormVisible" width="500px" style="height:950px">
            <el-form  :rules="rules" ref="projectForm" :model="proj" style="width:400px" label-width="100px" label-position="right">
                <el-form-item label="项目名称" prop="ProjectName">
                    <el-input v-model="proj.ProjectName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目代码" prop="ProjectCode">
                    <el-input v-model="proj.ProjectCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="ProjectTypeID">
                    <el-select v-model="proj.ProjectTypeID" clearable placeholder="请选择项目类型" style="width:300px">
                        <el-option v-for="item in ProjectTypeList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目状态" prop="ProjectStatusID">
                    <el-select v-model="proj.ProjectStatusID" clearable placeholder="请选择项目状态" style="width:300px">
                        <el-option v-for="item in ProjectStatusList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目负责人" prop="Leader">
                    <el-select v-model="proj.Leader" clearable placeholder="请选择项目负责人" style="width:300px">
                        <el-option v-for="item in LeaderNameList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目集负责人" prop="ProgramLeader">
                    <el-select v-model="proj.ProgramLeader" clearable placeholder="请选择项目集负责人" style="width:300px">
                        <el-option v-for="item in ProgromLeaderNameList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细描述" prop="ProjectDesc">
                    <el-input type="textarea" v-model="proj.ProjectDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="proj.Id === null ? addProjectInfo('projectForm') : UpdateProjectInfo('projectForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="`编辑项目人员信息 | ${clickProjectNameInfo}`"  :visible.sync="dialogProjectPersonalVisible" width="500px">
            <el-table ref="multipleTable" :data="ProjectPersonalInfoData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="150" align="center"> </el-table-column>
                <el-table-column prop="Id" label="ID" show-overflow-tooltip v-if="false"></el-table-column>
                <el-table-column prop="Name" label="人员姓名" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="CancleProjectPersonalInfo">取 消</el-button>
                <el-button type="primary" @click="UpdateProjectPersonal">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ApiCommon from '../../api/common'
import ApiProject from '../../api/project'
export default {
    data(){
        return{
            tableHeight:window.innerHeight*0.76,
            dataList:[],
            total:0,
            currentPage:1,
            pageSize:20,
            dialogFormVisible:false,
            dialogProjectPersonalVisible:false,
            dialogTitle:'',
            clickProjectNameInfo:'',
            multipleSelection:[],
            updateProjectUser:{
                projectId:'',
                userIds:[],
            },
            LeaderList:{
                Id:'',
                Name:''
            },
            ProgramLeaderList:{
                Id:'',
                Name:''
            },
            ProjectTypeList:{
                Id:'',
                Name:''
            },
            ProjectStatusList:{
                Id:'',
                Name:''
            },
            LeaderNameList:{
                Id:'',
                Name:''
            },
            ProgromLeaderNameList:{
                Id:'',
                Name:''
            },
            ProjectPersonalInfoData:[],
            searchMap:{
                ProjectTypeId:'',
                LeaderId:'',
                ProgramLeaderId:''
            },
            qry:{
                CurrentPage:null,
                PageSize:null,
                Leader:null,
                ProgramLeader:null,
            },
            proj:{
                Id:null,
                ProjectName:'',
                ProjectCode:'',
                ProjectTypeID:'',
                ProjectStatusID:'',
                Leader:'',
                ProgramLeader:'',
                ProjectDesc:''
            },
            selectedProjectEmpID:[],
            rules:{
                ProjectName:[
                    {required:true,message:'项目名称不能为空',trigger:'blur'}
                ],
                ProjectCode:[
                    {required:true,message:'项目编码不能为空',trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.GetEmpIdName(),
        this.SearchProjectInfo(),
        this.GetProTypeIdName(),
        this.GetProStatusIdName()
    },
    methods:{
        //改变每页显示条数
        handleSizeChange(val){
            this.pageSize=val;
            this.SearchProjectInfo();
        },
        //改变当前页
        handleCurrentChange(val){
            this.currentPage=val;
            this.SearchProjectInfo();
        },
        //获取人员姓名ID
        GetEmpIdName(){
            ApiCommon.GetEmpIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.LeaderList=resp.data;
                    this.ProgramLeaderList=resp.data;
                    this.LeaderNameList=resp.data;
                    this.ProgromLeaderNameList=resp.data;
                    this.ProjectPersonalInfoData=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取项目类型
        GetProTypeIdName(){
            ApiCommon.GetProTypeIdName().then(response=>{
                const resp = response.data;
                if(resp.status==='success'){
                    this.ProjectTypeList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //获取项目状态
        GetProStatusIdName(){
            ApiCommon.GetProStatusIdName().then(response=>{
                const resp = response.data;
                if(resp.status==='success'){
                    this.ProjectStatusList=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //查询
        SearchProjectInfo(){
            this.qry.CurrentPage=this.currentPage;
            this.qry.PageSize=this.pageSize;
            this.qry.Leader=this.searchMap.LeaderId;
            this.qry.ProgramLeader=this.searchMap.ProgramLeaderId;
            this.qry.ProjectTypeId=this.searchMap.ProjectTypeId;
            ApiProject.GetProject(this.qry).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.total=resp.data.TotalCount;
                    this.dataList=resp.data.ProjectList;
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
        AddProjectInfo(){
            this.proj.Id=null;
            this.dialogFormVisible=true;
            this.dialogTitle='新增项目信息';
            this.$nextTick(()=>{
                this.$refs['projectForm'].resetFields();
            })
        },
        //新增后确认
        addProjectInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    console.log(this.proj);
                    ApiProject.AddProject(this.proj).then(response=>{
                        const resp=response.data;
                        console.log(resp);
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'新增成功',
                                type:'success'
                            });
                            this.SearchProjectInfo();
                        }
                        else{
                            this.$message({
                                message:resp.message,
                                type:'warning'
                            })
                        }
                    })
                }else{
                    return false;
                }
            })
        },
        //重置
        resetForm(searchForm){
            this.$refs[searchForm].resetFields();
            this.SearchProjectInfo();
        },
        //编辑
        handleEdit(id){
            this.dialogFormVisible=true;
            this.dialogTitle='编辑项目列表';
            ApiProject.GetProjectInfoById(id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.proj=resp.data;
                }
            });
            
        },
        UpdateProjectInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiProject.UpdateProject(this.proj).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'编辑成功',
                                type:'success'
                            });
                            this.SearchProjectInfo();
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
        //删除
        handleDelete(id){
            this.$confirm('确认要删除这条记录吗?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                ApiProject.DeleteProject(id).then(response=>{
                    const resp=response.data;
                    if(resp.status==='success'){
                        this.$message({
                            message:'删除成功',
                            type:'success'
                        });
                        this.SearchProjectInfo();
                    }
                    else{
                        this.$message({
                            message:resp.message,
                            type:'warning'
                        })
                    }
                })
            }).catch(()=>{
                console.log('取消');
            })
        },
        //项目人员
        handleProjectInfo(id,ProjectName){
            this.dialogProjectPersonalVisible=true;
            this.clickProjectNameInfo=ProjectName;
            this.updateProjectUser.projectId=id;
            ApiProject.GetProjectUser(id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.selectedProjectEmpID=resp.data;
                    for(let a=0;a<this.selectedProjectEmpID.length;a++){
                        for(let b=0;b<this.ProjectPersonalInfoData.length;b++){
                            if(this.ProjectPersonalInfoData[b].Id === (this.selectedProjectEmpID[a])){
                                this.$refs.multipleTable.toggleRowSelection(this.ProjectPersonalInfoData[b],true);
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
        //选择项目人员
        handleSelectionChange(val){
            this.multipleSelection = val;
            this.updateProjectUser.userIds.length=0;
            for(var i=0;i<this.multipleSelection.length;i++){
                this.updateProjectUser.userIds.push(this.multipleSelection[i].Id)
            }
        },
        //更新项目人员确认 
        UpdateProjectPersonal(){
            var info=JSON.stringify(this.updateProjectUser);
            ApiProject.UpdateProjectUser(info).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    });
                    this.dialogProjectPersonalVisible=false;
                    this.SearchProjectInfo();
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
        //项目人员弹窗取消
        CancleProjectPersonalInfo(){
            this.dialogProjectPersonalVisible=false;
            this.$refs.multipleTable.clearSelection();
        }
    }
}
</script>
<style scoped>
.pagingbar{
    position: absolute;
    margin-top: 0.5%;
}
</style>
