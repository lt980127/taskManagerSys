<template>
    <div style="height:93%">
        <!-- 搜索表单 -->
        <div style="height:6.5%;margin-top: 0.2%">
            <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="padding-top:0.5%">
                <el-form-item label="项目类型：" prop="ProjectType" style="padding-left:1.7%">
                    <el-input v-model="searchMap.ProjectType" placeholder="项目类型" clearable style="width:150px"></el-input>
                </el-form-item>
                <el-form-item> 
                    <el-button type="primary" @click="SearchProjectTypeInfo" style="margin-left:25px">查 询</el-button>
                    <el-button type="primary" @click="AddProjectTypeInfo">新 增</el-button>
                    <el-button @click="resetForm('searchForm')">重 置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 数据表格 -->
        <div style="height:89.5%;margin-top: 0.2%">
            <el-table :data="dataList" border style="width: 100%" :height="tableHeight">
                <el-table-column type="index" label="序号" align="center" width="90" ></el-table-column>
                <el-table-column prop="Id" label="ID" align="center" v-if="false"></el-table-column>
                <el-table-column prop="ProjectType" label="项目类型" align="center"></el-table-column>
                <el-table-column prop="SortNumber" label="序号" align="center" ></el-table-column>
                <el-table-column prop="Description" label="描述" align="center" ></el-table-column>
                <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.row.Id)">编辑</el-button>
                    <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button> -->
                    <el-button size="mini" type="primary" @click="handleTaskTypeInfo(scope.row.Id,scope.row.ProjectType)">任务类型</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div> 
        <!-- <div style="height:2%;margin-top: 0.2%"> 
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
        </div> -->
        <div>
            <el-dialog :title="`${dialogTitle}`" :visible.sync="dialogFormVisible" width="500px" style="height:100%">
                <el-form  :rules="rules" ref="ProjectTypeForm" :model="ProjectTypeInfo" style="width:400px" label-width="100px" label-position="right">
                    <el-form-item label="ID" prop="ID" v-if="false">
                        <el-input v-model="ProjectTypeInfo.ID" autocomplete="off" :disabled="isEdit" ></el-input>
                    </el-form-item> 
                    <el-form-item label="项目类型" prop="ProjectType">
                        <el-input v-model="ProjectTypeInfo.ProjectType" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="序号" prop="SortNumber"> 
                        <el-input v-model="ProjectTypeInfo.SortNumber" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="Description"> 
                        <el-input type="textarea" v-model="ProjectTypeInfo.Description" autocomplete="off" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ProjectTypeInfo.Id === null ? addProjectTypeInfoClick('ProjectTypeForm') : UpdateProjectTypeInfo('ProjectTypeForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div> 
        <div>
            <el-dialog :title="`任务类型 | ${clickProjectType}`"  :visible.sync="dialogTaskTypeVisible" width="350px">
                <el-table ref="TaskTypeTable" :data="TaskTypeInfo" tooltip-effect="dark" style="width: 100%" border :header-cell-style="getRowClass">
                    <el-table-column type="index" label="序号" align="center" width="120"></el-table-column>
                    <el-table-column prop="TaskType" label="任务类型" show-overflow-tooltip align="center"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <!-- <el-button  @click="CancleProjectPersonalInfo">取 消</el-button> -->
                    <!-- <el-button type="primary" @click="UpdateProjectPersonal">确 定</el-button> -->
                </div>
            </el-dialog>
        </div>      
    </div>
</template>
<script>
import ApiProjectType from '../../api/projectType'
export default {
    data(){
        return{
            isEdit:false,
            tableHeight:window.innerHeight*0.76,
            searchMap:{
                ProjectType:''
            },
            dataList:[],
            TaskTypeInfo:[],
            dialogTitle:'',
            dialogFormVisible:false,
            dialogTaskTypeVisible:false,
            ProjectTypeInfo:{
                Id:null,
                ProjectType:'',
                SortNumber:'',
                Description:''
            },
            clickProjectType:'',
            TaskTypeInfo:[],
            rules:{
                ID:[
                    {required:true,message:'ID不能为空',trigger:'blur'}
                ],
                ProjectType:[
                    {required:true,message:'项目类型不能为空',trigger:'blur'}
                ],
                SortNumber:[
                    {required:true,message:'序号不能为空',trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.SearchProjectTypeInfo()
    },
    methods:{
        //查询项目类型
        SearchProjectTypeInfo(){
            ApiProjectType.GetProjectType(this.searchMap.ProjectType).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.dataList=resp.data
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //新增按钮
        AddProjectTypeInfo(){
            this.ProjectTypeInfo.Id=null;
            this.dialogTitle='新增项目类型'
            this.dialogFormVisible=true;
            this.$nextTick(()=>{
                this.$refs['ProjectTypeForm'].resetFields();
            })
        },
        //重置
        resetForm(searchForm){
            this.$refs[searchForm].resetFields();
            this.SearchProjectTypeInfo();
        },
        //编辑
        handleEdit(id){
            this.dialogTitle='编辑项目类型';
            this.dialogFormVisible=true;
            this.$nextTick(()=>{
                this.$refs['ProjectTypeForm'].resetFields();
            })
            ApiProjectType.GetProjectTypeInfoById(id).then(response=>{
                const resp=response.data;
                console.log(resp);
                if(resp.status==='success'){
                    this.ProjectTypeInfo=resp.data;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //任务类型
        handleTaskTypeInfo(Id,ProjectType){
            this.clickProjectType=ProjectType;
            ApiProjectType.GetTaskTypeInfoByProjecttypeId(Id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.TaskTypeInfo=resp.data;
                    this.dialogTaskTypeVisible=true;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //新增确认
        addProjectTypeInfoClick(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiProjectType.AddProjectType(this.ProjectTypeInfo).then(response=>{
                        const resp=response.data;
                        console.log(resp);
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'新增成功',
                                type:'success'
                            });
                            this.SearchProjectTypeInfo()
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
        //编辑确认
        UpdateProjectTypeInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiProjectType.UpdataProjectType(this.ProjectTypeInfo).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'编辑成功',
                                type:'success'
                            });
                            this.SearchProjectTypeInfo();
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
        getRowClass({row,column,rowIndex,columnIndex}){
            if(rowIndex==0){
                return 'background:#F5F5F5'
                
            }
            else{
                return ''
            }
        }
    }
}
</script>