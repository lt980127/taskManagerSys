<template>
    <div style="height:93%">
        <!-- 搜索表单 -->
        <div class="qryForm">
            <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="padding-top:0.5%">
                <el-form-item label="项目名称：" prop="ProjectId" style="padding-left:1.7%">
                    <el-select v-model="searchMap.ProjectId" clearable placeholder="请选择项目" style="width:150px">
                        <el-option v-for="item in projectList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="ModuleNumber" label="模块编号：">
                    <el-input v-model="searchMap.ModuleNumber" placeholder="模块编号" clearable style="width:150px"></el-input>
                </el-form-item>
                
                <el-form-item prop="ModuleName" label="模块名称：">
                    <el-input v-model="searchMap.ModuleName" placeholder="模块名称" clearable style="width:150px"></el-input>
                </el-form-item>
                <el-form-item prop="Levels" label="级别：">
                    <!-- <el-input v-model="searchMap.Levels" placeholder="级别" clearable style="width:150px"></el-input> -->
                    <el-select v-model="searchMap.Levels" clearable placeholder="级别" style="width:150px">
                        <el-option v-for="item in levleList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item> 
                    <el-button type="primary" @click="SearchModuleInfo">查 询</el-button>
                    <el-button type="primary" @click="AddModuleInfo">新 增</el-button>
                    <el-button @click="resetForm('searchForm')">重 置</el-button>
                    <el-button type="primary" @click="exportTable(dataList)">导出当前数据</el-button>
                    <el-upload
                    style="float:right;margin-left:10px"
                        class="upload-demo"
                        action=""
                        :on-change="handleChange"
                        :file-list="fileListUpload"
                        :show-file-list="false"
                        accept=".xls,.xlsx"
                        :auto-upload="false">
                        <el-button :loading="disbtn"  type="primary">导入 Excel</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <!-- 数据表格 -->
        <div class="datatable" style="height:89.5%;margin-top: 0.2%">
            <el-table :data="dataList" border style="width: 100%" :height="tableHeight">
                <el-table-column type="index" label="序号" align="center" width="120px"></el-table-column>
                <el-table-column prop="Id" label="ID" align="center" v-if="false"></el-table-column>
                <el-table-column prop="ProjectName" label="项目名称" align="center" ></el-table-column>
                <el-table-column prop="ModuleNumber" label="模块编号" align="center" ></el-table-column>
                <el-table-column prop="ModuleName" label="模块名称" align="center" ></el-table-column>
                <el-table-column prop="Levels" label="级别" align="center" ></el-table-column>
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
        <div>
            <el-dialog :title="`${dialogTitle}`" :visible.sync="dialogFormVisible" width="500px" style="height:100%">
                <el-form  :rules="rules" ref="moduleListForm" :model="moduleInfo" style="width:400px" label-width="100px" label-position="right">
                    <el-form-item label="项目" prop="ProjectId">
                        <el-select v-model="moduleInfo.ProjectId" clearable placeholder="请选择项目" style="width:300px">
                            <el-option v-for="item in projectList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模块名称" prop="ModuleName">
                        <el-input v-model="moduleInfo.ModuleName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="模块编号" prop="ModuleNumber">
                        <el-input v-model="moduleInfo.ModuleNumber" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="等级" prop="Levels"> 
                        <el-select v-model="moduleInfo.Levels" clearable placeholder="请选择等级" style="width:300px">
                            <el-option v-for="item in levleList" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="moduleInfo.Id === null ? addModuleListInfo('moduleListForm') : UpdateModuleListInfo('moduleListForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import ApiCommon from '../../api/common';
import ApiModuleList from '../../api/moduleList';
export default {
    data(){
        return{
            tableHeight:window.innerHeight*0.76,
            limitUpload : 1,
            fileTemp :[],
            fileListUpload:[],
            importList:[],
            disbtn: false,
            dialogTitle:'',
            searchMap:{
                ProjectId:'',
                ModuleName:'',
                Levels:'',
                ModuleNumber:''
            },
            projectList:{
                Id:'',
                Name:''
            },
            levleList:[
                {
                    Id:'1',
                    Name:'1'
                },
                {
                    Id:'2',
                    Name:'2'
                },
                {
                    Id:'3',
                    Name:'3'
                },
                {
                    Id:'4',
                    Name:'4'
                },
                {
                    Id:'5',
                    Name:'5'
                }
            ],
            dataList:[],
            total:0,
            pageSize:20,
            currentPage:1,
            ModuleListQry:{
                CurrentPage:'',
                PageSize:'',
                ModuleList:{
                    ProjectId:'',
                    ModuleName:'',
                    Levels:'',
                    ModuleNumber:''
                }
            },
            dialogFormVisible:false,
            moduleInfo:{
                Id:null,
                ProjectId:'',
                ModuleName:'',
                ModuleNumber:'',
                Levels:''
            },
            rules:{
                ProjectId:[
                    {required:true,message:'项目不能为空',trigger:'blur'}
                ],
                ModuleName:[
                    {required:true,message:'模块名称不能为空',trigger:'blur'}
                ],
                ModuleNumber:[
                    {required:true,message:'模块编号不能为空',trigger:'blur'}
                ],
                Levels:[
                    {required:true,message:'等级不能为空',trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.GetProjectIdName(),
        this.SearchModuleInfo()
    },
    methods:{
        //获取项目列表信息
        GetProjectIdName(){
            ApiCommon.GetProjectIdName().then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.projectList=resp.data;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                }
            })
        },
        //改变每页显示
        handleSizeChange(val){
            this.pageSize=val;
            this.SearchModuleInfo();
        },
        //改变当前页
        handleCurrentChange(val){
            this.currentPage=val;
            this.SearchModuleInfo();
        },
        //查询项目模块信息
        SearchModuleInfo(){
            this.ModuleListQry.CurrentPage=this.currentPage;
            this.ModuleListQry.PageSize=this.pageSize;
            this.ModuleListQry.ModuleList.ProjectId=this.searchMap.ProjectId;
            this.ModuleListQry.ModuleList.ModuleName=this.searchMap.ModuleName;
            this.ModuleListQry.ModuleList.Levels=this.searchMap.Levels;
            this.ModuleListQry.ModuleList.ModuleNumber=this.searchMap.ModuleNumber;
            const info=JSON.stringify(this.ModuleListQry);
            ApiModuleList.SearchModuleInfo(info).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.total=resp.data.Total;
                    this.dataList=resp.data.ModuleLists;
                }
                else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })
                    this.dataList=null;
                }
            })
        },
        //新增项目模块信息
        AddModuleInfo(){
            this.moduleInfo.Id=null;
            this.dialogTitle='新增项目模块信息'
            this.dialogFormVisible=true;
            this.$nextTick(()=>{
                this.$refs['moduleListForm'].resetFields();
            })
        },
        //重置
        resetForm(searchForm){
            this.$refs[searchForm].resetFields();
            this.SearchModuleInfo();
        },
        //新增模块信息
        addModuleListInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    const info=JSON.stringify(this.moduleInfo);
                    console.log(info);
                    ApiModuleList.AddModuleInfo(info).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.dialogFormVisible=false;
                            this.$message({
                                message:'新增成功',
                                type:'success'
                            });
                            this.SearchModuleInfo();
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
        //根据ID获取模块列表信息
        handleEdit(id){
            this.dialogTitle='编辑项目模块信息';
            this.dialogFormVisible=true;
            ApiModuleList.GetModuleListInfoById(id).then(response=>{
                const resp=response.data;
                if(resp.status==='success'){
                    this.moduleInfo=resp.data;
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
        UpdateModuleListInfo(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    const info=JSON.stringify(this.moduleInfo);
                    ApiModuleList.UpdateModuleList(info).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            this.$message({
                                message:'编辑成功',
                                type:'success'
                            });
                            this.dialogFormVisible=false;
                            this.SearchModuleInfo();
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
        //删除
        handleDelete(id){
            this.$confirm('确认要删除这条记录吗?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                ApiModuleList.DeleteModuleList(id).then(response=>{
                    const resp=response.data;
                    if(resp.status==='success'){
                        this.SearchModuleInfo();
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
        //导出
        exportTable(res){
            require.ensure([],()=>{
                const { export_json_to_excel } = require('../../utils/Export2Excel');
                const tHeader = [ '项目名称', '模块编号', '模块名称', '级别', '更新时间'];
                const filterVal = ['ProjectName', 'ModuleNumber', 'ModuleName', 'Levels','UpdateTime'];
                const list = res;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '模块列表');
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        // 上传附件
        handleChange (file, fileList) {
            this.fileTemp = file.raw
            this.doBegin()
        },
        doBegin(){
            if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')) {
                this.disbtn = true
                this.importfData(this.fileTemp)
            } 
            else {
                this.$message({
                type: 'warning',
                message: '附件格式错误，请删除后重新上传！'
                })
            }
        },
        // Excel 转化
        importfData (obj) {
            let _this = this
            // 通过DOM取文件数据
            this.file = obj
            var rABS = false // 是否将文件读取为二进制字符串
            var f = this.file
            var reader = new FileReader()
            // if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function (f) {
                var binary = ''
                var rABS = false // 是否将文件读取为二进制字符串
                var pt = this
                var wb // 读取完成的数据
                var outdata
                var reader = new FileReader()
                reader.onload = function (e) {
                    var bytes = new Uint8Array(reader.result)
                    var length = bytes.byteLength
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i])
                    }
                    var XLSX = require('xlsx')
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
                        type: 'base64'
                        })
                    } else {
                        wb = XLSX.read(binary, {
                        type: 'binary'
                        })
                    }
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                    this.da = [...outdata]
                    let arr = []
                    this.da.map(v => {
                        let obj = {}
                        obj.ProjectName = v['项目名称']
                        obj.ModuleNumber = v['模块编号']
                        obj.ModuleName = v['模块名称']
                        obj.Levels = v['级别']
                        obj.UpdateTime = v['更新时间']
                        arr.push(obj)
                        _this.importList = [...arr]
                        _this.disbtn = false
                    })
                    // const info =JSON.stringify(_this.importList)
                    // console.log('info',info)
                    ApiModuleList.ImportModuleInfo(_this.importList).then(response=>{
                        const resp=response.data;
                        if(resp.status==='success'){
                            console.log(this.$message)
                            _this.$message({
                                message:'导入成功',
                                type:'success'
                            });
                            this.SearchModuleInfo();
                        }
                        else{
                            _this.$message({
                                message:resp.message,
                                type:'warning'
                            })
                        }
                    })
                    
                }
                reader.readAsArrayBuffer(f)
            }
            if (rABS) {
                reader.readAsArrayBuffer(f)
            } 
            else {
                reader.readAsBinaryString(f)
            }
        }
    }
}
</script>
<style  scoped>
.qryForm{
    height: 6.5%;
    margin-top: 0.2%;
}

</style>