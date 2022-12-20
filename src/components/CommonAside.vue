<template>
  <div>
    <h3>{{isCollapse?'后台':'通用后台管理系统'}}</h3>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose">
      <el-menu-item :index="obj.name" v-for="(obj,index) in noChildren" @click="pash(obj)" :key="index">
        <i :class="`el-icon-${obj.icon}`"></i>
        <span slot="title">{{obj.label}}</span>
      </el-menu-item>
      <el-submenu :index="obj.name" v-for="(obj,index) in hasChildren"  :key="index">
        <template slot="title">
          <i :class="`el-icon-${obj.icon}`"></i>
          <span>{{obj.label}}</span>
        </template>
        <el-menu-item-group v-for="(item,num) in obj.children"  :key="num">
          <el-menu-item @click="pash(item)" index="1-1">{{item.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    </div>
</template>

<script>
import Cookie from "js-cookie";
import {mapState} from 'vuex'
export default {
  name: "CommonAside",

  computed:{
    dataMenu(){
      return JSON.parse(Cookie.get('menu'))||this.$store.state.tab.menu;
    },
    noChildren(){
      return this.dataMenu.filter(item=>item.children==null);
    },
    hasChildren(){
      return this.dataMenu.filter(item=>item.children!=null);
    },
    ...mapState({
      isCollapse:state => state.tab.isCollapse
    })
  },
  data(){
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath,'2');
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    pash(value){
      // console.log(this.hasChildren)
      this.$router.push({
        path:value.path
      });
      this.$store.commit('selectMenu',value)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
h3 {
  text-align: center;
  margin-top: 30px;
}
    .el-menu{
      background-color: rgb(84, 92, 100);
      border-right: none;
    }
    span,h3{
      //background-color: rgb(84, 92, 100);
      color: white;
    }

</style>
