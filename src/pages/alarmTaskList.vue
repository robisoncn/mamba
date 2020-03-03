<template>

  <div class="component">
    <div class="main-container">

      <van-cell-group>
        <van-row v-for="alarmTask in alarmTaskList" v-bind:key="alarmTask.taskid"  class="ran_row">
          <van-col  span="4" v-if="pageStates=='update'" class="inco-delete-bar">
            <van-icon name="delete" color="#EE0A24" size="1.8rem" style="margin-top: 10px;" />
          </van-col>
          <van-col span="20" >
            <van-cell v-if="pageStates=='update'" v-bind:title="alarmTask.taskName"
                              v-bind:value="alarmTask.taskInfo" v-bind:label="alarmTask.label"
                              is-link v-bind:to="{name:'AlarmTaskCreate',query:{id:alarmTask.taskId}}"
            />
            <van-cell v-if="pageStates=='view'" v-bind:title="alarmTask.taskName"
                      v-bind:value="alarmTask.taskInfo" v-bind:label="alarmTask.label" v-on:click="onclickCell(alarmTask)"
            />
          </van-col>

          <van-col   span="4" class="switch-bar" v-if="pageStates=='view'" >
              <van-switch v-model="alarmTask.checked" active-color="#07c160" inactive-color="#f0f0f0"  size="24"/>
          </van-col>

        </van-row>
      </van-cell-group>

    </div>
    <div class="button-bar">
      <van-button class="button" v-on:click="onclickUpdate" type="info" v-if="pageStates=='view'">编辑</van-button>
      <van-button class="button" v-on:click="onclickCancelUpdate" type="info" v-if="pageStates=='update'">取消编辑</van-button>
      <van-button class="button" type="info" v-if="pageStates=='update'">编辑完成</van-button>
      <van-button class="button" type="info" v-if="pageStates=='view'">创建提醒</van-button>
    </div>
  </div>
</template>

<script>


    export default {
        name: "alarmTaskList",
        data () {
          return {
            alarmTaskList:[
              {
                taskName:'监控打卡',
                taskInfo:'周一、周三 12:00',
                taskId:'1',
                checked:true,
                label:''
              },
              {
                taskName:'监控打卡',
                taskInfo:'周二、周三 12:00',
                taskId:'2',
                checked:true
              },
              {
                taskName:'监控打卡',
                taskInfo:'周一、周三 12:00',
                taskId:'3',
                checked:false,
                label:"来自小于于的提醒"
              }

            ],
            pageStates:'view'

          }
        },
      methods: {
        onclickUpdate(){
          this.$data.pageStates='update'
          console.log('update clicked!')
        },

        onclickCancelUpdate(){
          this.$data.pageStates='view'
          console.log('CancelUpdate clicked!')
        },

        onclickCell(alarmTask){
          console.log(alarmTask.taskId)

        }
      }

    }
</script>

<style scoped>
.component{
  background: #ffffff;
}
.main-container{
  margin: 0px 8px 8px 8px;
  background: #ffffff;
}
.button-bar{
  margin: 8px 8px 8px 8px;
  text-align: center;
  position: absolute;
  bottom: 0;
  font-size: 16px;
  margin: 25px 0;
  width: 335px;
  height: 45px;
  line-height: 35px;
  border-radius: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.button{
  min-width: 88px;
}
.switch-bar{
  text-align: center;
  padding-top: 10px;

}
.inco-delete-bar{
  text-align: center;
}
.ran_row{
  border-bottom: 1px #f0f0f0 solid;
}
</style>
