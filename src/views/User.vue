<template>
  <div class="user">
    <el-dialog
        :title="biaozhi?'修改':'新增'"
        :visible.sync="dialogVisible"
        width="790px"
        :before-close="handleClose">

        <el-form ref="form" style="margin-left: 30px" :inline="true" :model="form" :rules="rules" class="demo-form-inline">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请输入性别">
              <el-option label="男" :value="0"></el-option>
              <el-option label="女" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="请输入出生日期" value-format="yyyy-MM-DD" v-model="form.birth" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
          <br/>
        </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
      </span>

    </el-dialog>
    <div class="header">
      <el-button type="primary" style="height: 40px;width: 80px;margin-top: 10px" @click="add1">+新增</el-button>
      <el-form style="display: flex;padding-top: 10px" ref="form" :model="formInline" label-width="80px">
        <el-form-item style="margin-right: -60px">
          <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="130">
          <template slot-scope="scope">
            {{scope.row.sex==0?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="130">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="出生日期">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="地址">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="200">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getUser, addUser, editUser,delUser} from '@/api/index'
export default {
  name: "User",
  data(){
    return{
      formInline:{
        name:''
      },
      tableData: [],
      pageDate:{
        page:1,
        limit:10
      },
      dialogVisible: false,
      form: {
        name:'',
        age:'',
        sex:'',
        birth:'',
        addr:''
      },
      biaozhi:'',
      rules: {
        name: [
          { required: true, message: '姓名不能为空'},
        ],
        age: [
          { required: true, message: '年龄不能为空'}
        ],
        sex: [
          {  required: true, message: '性别不能为空' }
        ],
        birth: [
          {  required: true, message: '出生不能为空' }
        ],
        addr: [
          { required: true, message: '地址不能为空' }
        ]
      }
    }
  },
  methods: {
    handleEdit( row) {
      this.dialogVisible=true
      this.biaozhi=row.id;
      this.form = JSON.parse(JSON.stringify(row));

    },
     handleDelete(index, row) {
      console.log(row)
      this.$confirm('确认删除？')
          .then(async config => {
            if (config){
              const {data}=await delUser({id:row.id});
              if (data.code==20000){
                this.$message.success(data.message)
              }else {
                this.$message.error(data.message)
              }
              this.getList()
            }


          })
          .catch(_ => {});

    },
    getList(){
      try {
        getUser({params:{...this.formInline,...this.pageDate}}).then(({data})=>{
          this.tableData=data.list;
          this.pageDate.total=data.count;
          console.log(data,'list')
        })
      }catch (e){
        console.log(e,'错误')
      }
    },
    handleCurrentChange(val){
      // alert(val)
      this.pageDate.page=val;

      this.getList()
    },
    onSubmit(){
      this.getList()
    },
    add(){
      this.dialogVisible=true;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // alert(valid)
          if (this.biaozhi===''){
            const {data}=await addUser(this.form);
            if (data.code===20000){
              this.$message.success(data.data.message)
            }else {
              this.$message.error('添加失败')
            }
          }else {
            try {
              const {data}=await editUser(this.form);
              if (data.code==20000){
                this.$message.success(data.data.message)
              }else {
                this.$message.error('修改失败')
              }
            }catch (e){
              console.log(e,'error')
            }


          }

          this.biaozhi='';
          this.form={
            name:'',
            age:'',
            sex:'',
            birth:'',
            addr:''
          };
          this.$refs.form.resetFields();
          this.getList();
          this.dialogVisible=false;
        }
      });
    },
    add1(){
      this.dialogVisible = true;
      this.biaozhi='';
      this.$refs.form.resetFields();
      this.form={
        name:'',
        age:'',
        sex:'',
        birth:'',
        addr:''
      };
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
  .header{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    //background-color: yellow;
    //width: 1400px;
    height: 62px;
  }
  .foot{
    float: right;
    margin-top: 20px;
  }
</style>
