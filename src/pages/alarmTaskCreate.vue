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

          <van-cell title="提醒时间"
                    :value="taskDetailInfo.runTimeLabel" @click="isShowTimeSelect = true" is-link
                      />

          <van-popup
            v-model="isShowTimeSelect"
            position="bottom"
            :style="{ height: '30%' }">
                <van-picker show-toolbar title="请选择时间" :columns="timeColumns" @cancel="isShowTimeSelect = false"
                            @confirm="onTimeConfirm" />
          </van-popup>



          <!--重复提醒选择器 begin -->
          <van-cell title="重复提醒" v-on:click="isShowtrunkType=true" :value="taskDetailInfo.trunkTypeValue" :label="taskDetailInfo.trunkTypeLabel" is-link  />
          <van-popup
            v-model="isShowtrunkType"
            position="bottom"
            :style="{ height: '30%' }">
          <van-picker :columns="columns" :default-index="1" @change="ontrunkTypeSelect" />
          </van-popup>
          <!--重复提醒选择器 end -->

          <!--周选择器 begin -->
          <van-popup v-model="isShowWeekDays" :style="{ height: '380px', width:'70%'}" class="weekdays-select">
            <van-checkbox-group v-model="weekSelectResult">
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in weekList "
                  clickable
                  :key="item"
                  :title="item"
                  @click="onToggleWeekdays(index)"
                >
                  <van-checkbox slot="right-icon" :name="item" ref="checkboxes" shape="square" />
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>

            <div class="weekdays-select-btn-bar">
              <van-button type="info" size="small" v-on:click="onWeekdaysConfrim">确定</van-button>
              <van-button type="info" size="small" v-on:click="onWeekdaysCancel">取消</van-button>
            </div>
          </van-popup>
          <!--周选择器 end-->

          <van-cell title="提前提醒设置" v-on:click="isShowBeforeTime=true" :value="taskDetailInfo.beforTimeTypeLabel" is-link  />
          <van-popup
            v-model="isShowBeforeTime"
            position="bottom"
            :style="{ height: '30%' }">
            <van-picker :columns="beforeTimeColumns" :default-index="1" @change="onBeforeTimeSelect" />
          </van-popup>



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
            message:'',
            runTime:'',
            runTimeLabel:'',
            trunkType:'',
            trunkTypeLabel:'',//副标题
            trunkTypeValue:'',//主内容
            weekdayResult:[],
            beforTimeType:'',
            beforTimeTypeLabel:''

           },
          columns: [ '仅提醒一次' ,'每日提醒' , '自定义'  ],
          show:true,
          isShowtrunkType:false,
          isShowTimeSelect:false,
          isShowWeekDays:false,
          timeColumns: [
            // 第一列
            {
              values: ['上午', '下午'],
              defaultIndex: 1
            },
            // 第二列
            {
              values: ['1', '2', '3','4','5','6','7','8','9','10','11','12'],
              defaultIndex: 1
            },
            // 第三列
            {
              values: ['00','15', '30','45'],
              defaultIndex: 1
            }
          ],
          weekList:['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
          weekSelectResult:[],
          beforeTimeColumns:[
            '开始时','提前5分钟','提前15分钟','提前30分钟','提前1小时','提前1天'
          ],
          isShowBeforeTime:false,
        }
      },
      methods:{
        onclickAdd(){
          console.log('add Clicked!')
        },
        onTimeConfirm(picker,value,index){//时间选择器选择确定
          console.log("picker"+picker)
          console.log("value"+value)
          const label = picker[0]+' '+picker[1]+':'+picker[2];

          this.taskDetailInfo.runTimeLabel=label;



          this.isShowTimeSelect=false;
        },
        ontrunkTypeSelect (picker,value, index) {
          this.isShowtrunkType = false;
          this.taskDetailInfo.trunkType=index
          this.taskDetailInfo.trunkTypeValue=value;
          if(index == 2){
          this.isShowWeekDays = true

          }else{
            this.taskDetailInfo.trunkTypeLabel='';
          }
        },
        onClick(){
          console.log('sssssssss')
        },
        onToggleWeekdays(index){//点击选择周
          // console.log('onToggleWeekdays')
          // this.$refs.checkboxes[index].toggle();
        },
        onWeekdaysConfrim(){//自定义周选择确定

          this.isShowWeekDays = false
          console.log('weekSelectResult：'+this.weekSelectResult)

        //   this.taskDetailInfo.weekdayResult = JSON.parse(weekSelectResult)
          var lable = '';

          this.weekSelectResult.forEach(p=>{
            lable = lable+p+','
          })

          console.log('lable：'+lable)


        //
        //   console.log('weeklable'+lable)
          this.taskDetailInfo.trunkTypeLabel = this.$options.filters['ellipsis'](lable)
          this.taskDetailInfo.weekdayResult = lable;
        //
        },
        onWeekdaysCancel(){//自定义周选择取消
          this.isShowWeekDays = false
          this.weekdayResult = []
        },
        onBeforeTimeSelect(picker,value, index){//提前提醒类型选择
          this.taskDetailInfo.beforTimeType = index;
          this.taskDetailInfo.beforTimeTypeLabel = value;
          this.isShowBeforeTime = false;
        }
      },
      filters: {
        ellipsis (value) {
          if (!value) return ''
          if (value.length > 13) {
            return value.slice(0,13) + '...'
          }
          return value
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

  .weekdays-select .weekdays-select-btn-bar{
    text-align: center;
    margin-top: 30px;

  }
</style>
