<template>

        <div class="main_form">
          <van-field v-model="taskDetailInfo.title" label="提醒主题" />

          <van-field
            v-model="taskDetailInfo.message"
            rows="4"
            autosize
            label="提醒内容"
            type="textarea"
            maxlength="50"
            placeholder="请输入提醒内容"
            show-word-limit
          />

          <van-cell title="订阅内容选择" is-link />

          <!--<van-cell title="提醒时间"-->
                    <!--:value="runTime" @click="isShowTimeSelect = true"-->
                      <!--/>-->

          <!--<van-popup v-model="isShowTimeSelect" position="bottom">-->
            <!--   <van-datetime-picker-->
                <!--v-model="runTime"-->
                <!--type="datetime"-->
                <!--:min-date="8"-->
                <!--:max-date="24"-->
              <!--/>-->
          <!--</van-popup>-->



          <van-cell title="重复提醒" v-on:click="isShowtrunkType=true" :value="taskDetailInfo.trunkType" is-link  />
          <van-action-sheet v-model="isShowtrunkType" :actions="actions" @select="ontrunkTypeSelect" />
          <van-cell title="提前提醒设置" is-link  />

          <van-cell title="提醒对象" is-link />

          <div class="button-bar">
            <van-button class="button" v-on:click="onclickAdd" type="info">添加提醒</van-button>
          </div>

        </div>


</template>

<script>

    export default {
      name: "alarmTaskCreate",
      data () {
        return {
          taskDetailInfo:{
            title:'',
            message:'AAAA',
            runTime:'',
            isShowTimeSelect:false,
            isShowtrunkType:false

           },
            actions: [
              { name: '一周一次' },
              { name: '一月一次' },
              { name: '一天一次', subname: '描述信息' }
            ],
          show:true,
          isShowtrunkType:false
        }
      },
      methods:{
        onclickAdd(){
          console.log('add Clicked!')
        },
        onSelectTime(){

        },
        ontrunkTypeSelect (item) {
          this.isShowtrunkType = false;
          this.taskDetailInfo.trunkType=item.name
          console.log('ontrunkTypeSelect')

        },
        onClick(){
          console.log('sssssssss')
        }
      }
    }
</script>

<style scoped>

  .main_form{
    margin: 8px 8px 8px 8px;
    height: 100vh;
  }

  .button-bar{
    text-align: center;
    padding-top: 15px;
    background: #ffffff;
  }
</style>
