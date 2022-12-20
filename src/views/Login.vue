<template>
  <el-form class="box login-container" ref="form" :rules="rules" :model="form" label-width="80px">
    <p>系统登录</p>
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="margin-left: 40px" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from "js-cookie";
import {getMenu} from '@/api/index'
import router from "@/router";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules:{
        username:[
            {
              required:true,trigger:'blur',message:'请输入用户名'
        }
        ],
        password:[
            {
              required:true,trigger:'blur',message:'请输入密码'
        }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(isok=>{
        if (isok){
          // console.log(this.form)
          getMenu(this.form).then(({data})=>{
            // console.log(data)
            if (data.code===20000){
              console.log(data)
              Cookie.set('token',data.data.token)
              this.$store.commit('setMenu',data.data.menu)
              this.$store.commit('addMenu',this.$router)
              this.$router.push('/home')
              console.log(router,12)
            }else {
              this.$message.error(data.data.message)
            }
          });

        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .box{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    padding: 20px;
    width: 350px;
    height: 315px;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    p{
      margin-bottom: 40px;
      text-align: center;
      font-weight: 700;
    }
    .el-input{
      width: 198px;
    }

  }

</style>
