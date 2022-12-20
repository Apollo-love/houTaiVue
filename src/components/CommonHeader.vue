<template>
  <div class="head">
    <div class="left">
      <el-button @click="close" style="margin:0 20px" size="mini" icon="el-icon-menu" ></el-button>
      <el-breadcrumb separator="/"  >
        <el-breadcrumb-item v-for="(obj,index) in tag" :key="index" :to="{ path: obj.path }">{{obj.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img  src="../assets/images/user.png" style="height: 40px;border-radius: 50%;margin-right: 20px" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">个人中心</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from "js-cookie";
export default {
  name: "CommonHeader",
  computed:{
      ...mapState({tag:state => state.tab.tabsList})
  },
  created() {
    console.log(this.tag,'1111')
  },
  methods: {
    handleCommand(command) {
      if (command==='home'){
        this.$router.push({
          name:'home'
        })
      }else if (command==='out'){
        Cookie.remove('token');
        Cookie.remove('menu')
        this.$router.push({
          name:'login'
        })
      }
    },
    close(){
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style lang="less" scoped>
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  background-color: #333333;

}
.left{
  display: flex;
  align-items: center;
  height: 100%;
  vertical-align: middle;
}
button{
  width: 44px;
  height: 25px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.left{
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      color: #666666;
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: white;
      }
    }
  }
}





</style>
