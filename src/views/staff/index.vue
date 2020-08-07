<template>
    <div style="height:93%">
        <!-- 搜索表单 -->
        <div style="height:6.5%;margin-top: 0.2%">
            <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="padding-top:0.5%">
                <el-form-item label="姓名：" prop="EmpName" style="padding-left:1.7%">
                    <el-input v-model="searchMap.EmpName" placeholder="姓名" clearable style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="工号：" prop="EmpNo" style="padding-left:1.7%">
                    <el-input v-model="searchMap.EmpNo" placeholder="工号" clearable style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="Status">
                    <el-select v-model="searchMap.Status" clearable placeholder="级别" style="width:150px">
                        <el-option v-for="item in StatusList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item >
                <el-form-item> 
                    <el-button type="primary" @click="SearchStaffInfo">查 询</el-button>
                    <el-button type="primary" @click="AddStaffInfo">新 增</el-button>
                    <el-button @click="resetForm('searchForm')">重 置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 数据表格 -->
        <div style="height:89.5%;margin-top: 0.2%">
            <el-table :data="dataList" border style="width: 100%" :height="tableHeight">
                <el-table-column type="index" label="序号" align="center" width="90" ></el-table-column>
                <el-table-column prop="Id" label="ID" align="center" v-if="false"></el-table-column>
                <el-table-column prop="EmpID" label="EmpID" align="center" v-if="false"></el-table-column>
                <el-table-column prop="EmpNo" label="工号" align="center" ></el-table-column>
                <el-table-column prop="EmpName" label="姓名" align="center" ></el-table-column>
                <el-table-column prop="LeaderNo" label="上级" align="center" v-if="false"></el-table-column>
                <el-table-column prop="GroupCode" label="组别" align="center" ></el-table-column>
                <el-table-column prop="Status" label="状态" align="center" ></el-table-column>
                <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.row.Id)">编辑</el-button>
                    <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button> -->
                    <el-button size="mini" type="primary" @click="handleProjectInfo(scope.row.EmpID,scope.row.EmpName)">项目详情</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div> 
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
        <div>
            <el-dialog :title="`${dialogTitle}`" :visible.sync="dialogFormVisible" width="500px" style="height:100%">
                <el-form  :rules="rules" ref="staffListForm" :model="staffInfo" style="width:400px" label-width="100px" label-position="right">
                    <el-form-item label="姓名" prop="EmpName">
                        <el-input v-model="staffInfo.EmpName" autocomplete="off" :disabled="editAble"></el-input>
                    </el-form-item> 
                    <el-form-item label="工号" prop="EmpNo">
                        <el-input v-model="staffInfo.EmpNo" autocomplete="off" :disabled="editAble"></el-input>
                    </el-form-item>
                    <el-form-item label="上级" prop="LeaderNoId"> 
                        <el-select v-model="staffInfo.LeaderNoId" clearable placeholder="请选择上级" style="width:300px" >
                            <el-option v-for="item in UserInfo" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组别" prop="GroupCodeId"> 
                        <el-select v-model="staffInfo.GroupCodeId" clearable placeholder="请选择组别" style="width:300px" >
                            <el-option v-for="item in GroupList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="Status"> 
                        <el-select v-model="staffInfo.Status" clearable placeholder="请选择状态" style="width:300px" >
                            <el-option v-for="item in StatusList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="staffInfo.Id === null ? addStaffListInfo('staffListForm') : UpdateStaffListInfo('staffListForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div> 
        <div>
            <el-dialog :title="`人员项目信息 | ${clickEmpName}`"  :visible.sync="dialogProjectPersonalVisible" width="350px">
            <el-table ref="projectTable" :data="projectInfo" tooltip-effect="dark" style="width: 100%" border :header-cell-style="getRowClass">
                <el-table-column type="index" label="序号" align="center" width="120"></el-table-column>
                <el-table-column prop="ProjectName" label="项目" show-overflow-tooltip align="center"></el-table-column>
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
import ApiStaff from '../../api/staff';
import ApiCommon from '../../api/common';
export default{
    data(){
        return{
            dialogTitle:'',
            dialogFormVisible:false,
            dialogProjectPersonalVisible:false,
            clickEmpName:'',
            editAble:true,
            tableHeight:window.innerHeight*0.76,
            pageSize:20,
            total:0,
            currentPage:1,
            searchMap:{
                EmpName:'',
                EmpNo:'',
                Status:''
            },
            StatusList:[
                {Id:"在职在岗",Name:"在职在岗"},
                {Id:"在职离岗",Name:"在职离岗"},
                {Id:"离职离岗",Name:"离职离岗"}
            ],
            qry:{
                CurrentPage:null,
                PageSize:null,
                EmpName:null,
                EmpNo:null,
                Status:null
            },
            dataList:[],
            GroupList:[
                {Id:0,Name:"默认"},
                {Id:1,Name:"MES组"},
                {Id:3,Name:"ERP组"},
            ],
            UserInfo:[],
            staffInfo:{
                Id:null,
                EmpName:'',
                EmpNo:'',
                LeaderNoId:'',
                GroupCodeId:'',
                Status:''
            },
            projectInfo:[],
            rules:{
                EmpName:[
                    {required:true,message:'姓名不能为空',trigger:'blur'}
                ],
                EmpNo:[
                    {required:true,message:'工号不能为空',trigger:'blur'}
                ],
                Status:[
                    {required:true,message:'状态不能为空',trigger:'blur'}
                ],
                GroupNo:[
                    {required:true,message:'组别不能为空',trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.SearchStaffInfo(),
        this.GetEmpIdName()
    },
    methods:{
        handleSizeChange(val){
            this.pageSize=val;
            this.SearchStaffInfo();
        },
        handleCurrentChange(val){
            this.currentPage=val;
            this.SearchStaffInfo();
        },
        //获取经办人信息
        GetEmpIdName(){
            ApiCommon.GetEmpIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.UserInfo=resp.data;
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        SearchStaffInfo(){
            this.qry.CurrentPage=this.currentPage;
            this.qry.PageSize=this.pageSize;
            this.qry.EmpName=this.searchMap.EmpName;
            this.qry.EmpNo=this.searchMap.EmpNo;
            this.qry.Status=this.searchMap.Status;
            ApiStaff.GetStaff(this.qry).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.total=resp.data.TotalCount;
                    this.dataList=resp.data.StaffList;
                }
                else{
                        this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        AddStaffInfo(){
            this.staffInfo.Id=null;
            this.editAble=false;
            this.dialogTitle='新增人员信息'
            this.dialogFormVisible=true;
            this.$nextTick(()=>{
                this.$refs['staffListForm'].resetFields();
            })
        },
        resetForm(searchForm){
            this.$refs[searchForm].resetFields();
            this.SearchStaffInfo();
        },
        //新增人员信息
        addStaffListInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    ApiStaff.AddStaff(this.staffInfo).then(response=>{
                        console.log(this.staffInfo)
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'新增成功',
                                type:'success'
                            });
                            this.SearchStaffInfo();
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
        handleEdit(Id){
            this.dialogTitle='编辑人员信息';
            this.dialogFormVisible=true;
            this.$nextTick(()=>{
                this.$refs['staffListForm'].resetFields();
            })
            ApiStaff.GetStaffInfoById(Id).then(response=>{
                const resp=response.data;
                console.log(resp);
                if(resp.status==='success'){
                    this.staffInfo=resp.data;
                    this.editAble=true;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        UpdateStaffListInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    console.log(this.staffInfo)
                    ApiStaff.UpdataStaff(this.staffInfo).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'编辑成功',
                                type:'success'
                            });
                            this.SearchStaffInfo();
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
        handleProjectInfo(Id,empName){
            this.clickEmpName=empName;
            ApiStaff.GetProjectInfoByUserId(Id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.projectInfo=resp.data;
                    this.dialogProjectPersonalVisible=true;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
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
