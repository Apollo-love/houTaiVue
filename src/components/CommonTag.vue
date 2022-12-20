<template>
  <div>
    <el-tag
        v-for="tag in tags"
        :key="tag.name"
        :closable="tag.name!='home'"
        :effect="$route.name===tag.name?'dark':'plain'"
        @close="handleClose(tag)"
        @click="changeRouter(tag)"
        style="margin-right: 5px"
        >
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "CommonTag",
  updated() {
    console.log(this.$route.name,'name')
  },
  data() {
    return {
    };
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabsList
    })
  },
  methods:{
    handleClose(value){
      console.log(value,'123');
      this.$store.commit('closeTag',value)
    },
    changeRouter(value){
      this.$router.push({
        name:value.name
      })
    }
  }
}
</script>

<style scoped>
  div{
    margin-left: 20px;
  }
</style>
