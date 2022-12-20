<template>
  <el-row>
    <el-col :span="8">
      <el-card style="margin-top: 20px" body-style="width:447px;height:286px;padding:0" class="el-card">
        <div class="user">
          <img  src="../assets/images/user.png" alt="">
          <div>
          <p>Admin</p>
          <p>超级管理员</p>
          </div>
        </div>
        <div class="userInfo">
          <p><span>上级登录时间:</span><span>2021-7-19</span></p>
          <p><span>上级登录地点:</span><span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;height: 460px">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column v-for="(obj,index) in tableLabel"
              :prop="index"
              :label="obj"
              >
          </el-table-column>

        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" >
      <div class="num" style="margin-left: 10px">
        <el-card v-for="(obj,index) in countData" :key="index" style="margin-left:10px ;width: 291px;height: 80px" class="el-card" :body-style="{padding:0}">
          <div class="box">
          <div class="left" :style="`background-color:${obj.color}`">
            <i :class="`el-icon-${obj.icon}`" ></i>
          </div>
          <div class="right">
            <p>￥{{obj.value}}</p>
            <p>{{obj.name}}</p>
          </div>

          </div>
        </el-card>
      </div>
      <el-card style="margin-left: 20px;width: 908px;height: 300px;">
        <div ref="eCharts1" style="width: 868px;height: 280px"></div>
      </el-card>
      <div class="bottom" style="display: flex;margin-left: 20px;margin-top: 20px">
        <el-card style="width: 437px;height: 300px;" class="el-card">
          <div ref="eCharts2" style="margin-left: -25px;width: 437px;height: 300px"></div>
        </el-card>
        <el-card style="width: 437px;height: 300px;margin-left: 20px" class="el-card">
          <div ref="eCharts3" style="width: 437px;height: 280px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '@/api/index'
import * as ECharts from 'echarts'
export default {
  name: "home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ]
    }
  },
  mounted() {
    getData().then(({data})=>{
      const {videoData,userData,orderData,tableData}=data.data;
      this.tableData=tableData;
      var option = {
        // xAxis: {
        //   type: 'category',
        //   data: [],
        // },
        // yAxis: {
        //   type: 'value',
        // },
        // series: [
        //   {
        //     data: [],
        //     type: 'line',
        //   },
        //
        // ]
      };

      let xaxis=Object.keys(orderData.data[0]);
      option.series=[]
      const ty={
        data:xaxis
      }
      option.xAxis=ty;
      option.yAxis={};
      option.legend=ty;
      xaxis.forEach(item=>{
        option.series.push({
          name:item,
          data:orderData.data.map(it=>it[item]),
          type:'line'
        })
      })
      let eCharts1=ECharts.init(this.$refs.eCharts1);
      eCharts1.setOption(option);

      var option1={
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
            type: 'category',
            data: userData.map(it=>it.date),
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:'新增用户',
              data: userData.map(it=>it.new),
              type: 'bar'
            },
            {
              name:'活跃用户',
              data: userData.map(it=>it.active),
              type: 'bar'
            }
          ]

      };


      let eCharts2=ECharts.init(this.$refs.eCharts2);
      eCharts2.setOption(option1);


      let option3 = {
        series: [
          {
            type: 'pie',
            data: videoData
          },
        ],
      };
      let eCharts3=ECharts.init(this.$refs.eCharts3);
      eCharts3.setOption(option3);

    })

  }
}
</script>

<style lang="less" scoped>
  .user{
    display: flex;

    //justify-content: space-around;
    align-items: center;
    width: 408px;
    margin-left: 20px;
    margin-top: 20px;
    border-bottom: 1px solid #666666;
    padding-bottom: 20px;
    div{
      margin-left: 50px;
      p:first-child{
        font-size: 30px;
        margin-bottom: 10px;
      }
      p:last-child{
        font-weight: 100;
      }
    }
    img{
      //margin-left: -55px;
      width: 150px;
      border-radius: 50%;
    }
  }
  .userInfo{
    margin-top: 20px;
    margin-left: 20px;
    p{
      font-size: 14px;
      span:first-child{
        font-size: 18px;
        font-weight: 300;
        margin-right: 50px;
      }
    }
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    width: 910px;
    height: 203px;
    //background-color: yellow;
    i{
      display: inline-block;
      width: 80px;
      height: 80px;
      font-size: 30px;
      color: white;
      text-align: center;
      line-height: 80px;
    }
    .box{
      display: flex;
      .right{
        p:first-child{
          font-size: 30px;
          margin-left: -4px;
        }
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .bottom{
      display: flex;
      width: 600px;
    }
  }

</style>
