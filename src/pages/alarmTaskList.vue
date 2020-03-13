<template>

  <div class="component">
    <div class="main-container">

      <van-cell-group>
        <van-row v-for="alarmTask in alarmTaskList" v-bind:key="alarmTask.id"  class="ran_row">
          <van-col  span="4" v-if="pageStates=='update'" class="inco-delete-bar">
            <van-icon name="delete" color="#EE0A24" size="1.8rem" style="margin-top: 10px;" @click="onItemDelete(alarmTask)"/>
          </van-col>
          <van-col span="20" >
            <van-cell v-if="pageStates=='update'" v-bind:title="alarmTask.taskName"
                              v-bind:value="alarmTask.taskInfo" v-bind:label="alarmTask.label"
                              is-link v-bind:to="{name:'AlarmTaskCreate',query:{id:alarmTask.id}}"
            />
            <van-cell v-if="pageStates=='view'" v-bind:title="alarmTask.taskName"
                      v-bind:value="alarmTask.taskInfo" v-bind:label="alarmTask.label"
            />
          </van-col>

          <van-col   span="4" class="switch-bar" v-if="pageStates=='view'" >
              <van-switch v-model="alarmTask.openStatus" active-color="#07c160" inactive-color="#f0f0f0" @change="onSwitchChange(alarmTask)" size="24"/>
          </van-col>

        </van-row>
      </van-cell-group>

    </div>
    <div class="button-bar">
      <van-button class="button" v-on:click="onclickUpdate" type="info" v-if="pageStates=='view'&&alarmTaskList !==undefined && alarmTaskList.length>0">编辑</van-button>
      <van-button class="button" v-on:click="onclickCancelUpdate" type="info" v-if="pageStates=='update'">取消编辑</van-button>
      <van-button class="button" type="info" v-if="pageStates=='update'" v-on:click="onclickFinnish">编辑完成</van-button>
      <van-button class="button" type="info" v-if="pageStates=='view'" v-on:click="onclickCreate">创建提醒</van-button>
    </div>
  </div>
</template>

<script>

    import httpService from '../http/httpService'
    import {Toast,Dialog} from 'vant';

    export default {
        name: "alarmTaskList",
        data () {
          return {
            alarmTaskList:[],
            pageStates:'view'

          }
        },
      methods: {
        onclickUpdate(){
          this.pageStates='update'
          console.log('update clicked!')
        },

        onclickCancelUpdate(){
          this.pageStates='view'
        },
        onclickFinnish(){
          this.pageStates='view'
        },
        onclickCell(alarmTask){
          console.log('onclickCell clicked!'+this.pageStates)
          console.log(alarmTask.taskId)
          if(this.pageStates !=='view'){
            this.$router.push({path:'/alarmTaskCreate',query:{taskId:alarmTask.taskId}})
          }

        },
        onclickCreate(){
          this.$router.push({path:'/alarmTaskCreate'})
        },
        onSwitchChange(item){//开关任务状态
          httpService.post("/api/miaAlarmTaskInfo/updateOpenStatus",item).then(res=>{
          }).catch(err=>{
            Toast.fail("更新失败")
          })
        },
        onItemDelete(item){

          Dialog.confirm({
            title: 'MIA提示',
            message: '删除后不可恢复，请确认是否删除'
          }).then(() => {
            httpService.post("/api/miaAlarmTaskInfo/deleteTask",item).then(res=>{
              this.alarmTaskList = this.alarmTaskList.filter(d => d.id !== item.id);
            }).catch(err=>{
              Toast.fail("删除失败")
            });
          }).catch(() => {
            // on cancel
          });



        },
      },
      created() {
        httpService.post("/api/miaAlarmTaskInfo/searchExt",{}).then(res=>{
            this.alarmTaskList  = res.data.data;
        }).catch(err=>{

        })
      },

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
