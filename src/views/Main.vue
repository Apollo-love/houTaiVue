<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header height="70px">
        <common-header></common-header>
      </el-header>
      <common-tag></common-tag>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside'
import CommonTag from '@/components/CommonTag'
import CommonHeader from '@/components/CommonHeader'
import routes from '@/router'
export default {
  name: "Main",
  created() {
  console.log(routes,"232")
  },
  // mounted() {
  //   this.$router.push({
  //     name:'home'
  //   })
  // },
  components:{
    CommonAside,CommonTag,CommonHeader
  }
}
</script>

<style lang="less" scoped>
*{
  padding: 0;
  margin: 0;
}
body{
  margin: 0 !important;
}

.el-header, .el-footer {
  color: #333;

}
.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  //text-align: center;
  width: 202px;
  height: 935.5px;


}

.el-main {
  color: #333;
  //text-align: center;
  //line-height: 160px;
}


</style>
