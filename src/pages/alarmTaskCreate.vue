<template>

  <div class="main_form">
    <van-form @submit="onSubmit($event)" ref="form">
      <van-field v-model="taskDetailInfo.taskName" label="提醒主题" :rules="[{ required: true, message: '请填写提醒主题' }]" />

      <van-field
        v-model="taskDetailInfo.taskMessage"
        rows="4"
        autosize
        label="提醒内容"
        type="textarea"
        maxlength="50"
        placeholder="请输入提醒内容"
        show-word-limit
        :rules="[{ required: true, message: '请填写提醒内容' }]"
      />


      <van-cell title="订阅内容选择" is-link @click="isShowTarget=true" />

      <div class="targetDiv">
        <van-tag
          v-for="(item,index) in taskDetailInfo.targetsModel"
          :key="index"
          closeable
          size="medium"
          type="primary"
          @close="tagClose(item)"
        >
          {{item.targetName}}
        </van-tag>
      </div>


      <van-cell title="提醒时间"
                :value="taskDetailInfo.runTimeLabel" @click="isShowTimeSelect = true" is-link
      />





      <!--重复提醒选择器 begin -->
      <van-cell title="重复提醒" v-on:click="isShowtrunkType=true" :value="taskDetailInfo.trunkTypeValue" :label="taskDetailInfo.trunkTypeLabel" is-link  />
      <van-popup
        v-model="isShowtrunkType"
        position="bottom"
        :style="{ height: '30%' }">
        <van-picker :columns="columns" :default-index="0" @change="ontrunkTypeSelect" />
      </van-popup>
      <!--重复提醒选择器 end -->



      <van-cell title="提前提醒设置" v-on:click="isShowBeforeTime=true" :value="taskDetailInfo.beforTimeTypeLabel" is-link  />
      <van-popup
        v-model="isShowBeforeTime"
        position="bottom"
        :style="{ height: '30%' }">
        <van-picker :columns="beforeTimeColumns" :default-index="0" @change="onBeforeTimeSelect" />
      </van-popup>



      <van-cell title="提醒对象"  :value="taskDetailInfo.personSelectedLable" is-link  @click="isShowPerson=true" />



    </van-form>
    <div class="button-bar">
      <van-button class="button" native-type="submit" type="info" v-if="pageStatus=='create'" @click="onSubmit"> 添加提醒</van-button>
      <van-button class="button"  native-type="delete" type="danger" v-if="pageStatus=='edit'" @click="deleteAlarm">删除提醒</van-button>
      <van-button class="button" native-type="submit" type="info" v-if="pageStatus=='edit'" @click="onSubmit">保存提醒</van-button>
    </div>

    <!--周选择器 begin -->
    <van-popup v-model="isShowWeekDays" :style="{ height: '380px', width:'70%'}" class="weekdays-select">
      <van-checkbox-group v-model="taskDetailInfo.weekdayResult">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in weekList "
            clickable
            :key="item.indexKey"
            :title="item.chnLabel"
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

    <!-- 指标选择-->
    <van-popup
      v-model="isShowTarget"
      position="top"
      :style="{ width: '100%',height: '100%' }"
    >
      <TargetSelect @save="onTargetOK" @clear="onTargetClear" :targetsModelInput="targetsModelOut"/>
    </van-popup>

    <!-- 时间选择-->
    <van-popup
      v-model="isShowTimeSelect"
      position="bottom"
      :style="{ height: '30%' }">
      <van-picker show-toolbar title="请选择时间" :columns="timeColumns" @cancel="isShowTimeSelect = false"
                  @confirm="onTimeConfirm" />
    </van-popup>

    <!-- 人员选择器-->
    <van-popup
      v-model="isShowPerson"
      position="top"
      :style="{ width: '100%',height: '100%' }"
    >
<!--      <PersonSelectOrg @ok="onPersonOK" :selectPersonIn="taskDetailInfo.personSelected" />-->
      <mia-org-staff-selecter @ok="onPersonOK" :selectPersonIn="taskDetailInfo.personSelected"></mia-org-staff-selecter>
    </van-popup>
  </div>


</template>

<script>

  import TargetSelect from '@/components/TargetSelect';

  import httpService from '../http/httpService'
  import PersonSelectOrg from "../components/PersonSelectOrg";
  import {Toast,Dialog} from 'vant';
  import MiaOrgStaffSelecter from "../components/MiaOrgStaffSelecter";
  export default {
    name: "alarmTaskCreate",
    components:{MiaOrgStaffSelecter, PersonSelectOrg, TargetSelect,},
    data () {
      return {
        taskDetailInfo:{
          taskName:'',
          taskMessage:'',
          runTime:'',
          runTimeLabel:'',
          trunkType:'0',
          trunkTypeLabel:'',//副标题
          trunkTypeValue:'仅提醒一次',//主内容
          weekdayResult:[],
          beforTimeType:'0',
          beforTimeTypeLabel:'开始时',
          status:'create',
          targetsModel:[],
          personSelected:[],
          personSelectedLable:'',
        },
        targetsModelOut:[],
        pageStatus:'create',
        tagShow: {
          primary: true,
        },
        columns: ['仅提醒一次','每日提醒','自定义'],
        show:true,
        isShowtrunkType:false,
        isShowTimeSelect:false,
        isShowWeekDays:false,
        isShowTarget:false,
        isShowPerson:false,
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
        weekList:[{chnLabel:'星期一',indexKey:1},
          {chnLabel:'星期二',indexKey:1},
          {chnLabel:'星期三',indexKey:1},
          {chnLabel:'星期四',indexKey:1},
          {chnLabel:'星期五',indexKey:1},
          {chnLabel:'星期六',indexKey:1},
          {chnLabel:'星期天',indexKey:1},
          ],
        beforeTimeColumns:[
          '开始时','提前5分钟','提前15分钟','提前30分钟','提前1小时','提前1天'
        ],
        isShowBeforeTime:false,
      }
    },
    methods:{
      onSubmit(){
        const promise = this.$refs.form.validate();
        let pass = true;
        promise.then(ret =>{
          httpService.post("/api/miaAlarmTaskInfo/saveTaskInfo",this.taskDetailInfo).then(
            (res)=>{
              if(res.status==200){
                Toast.success("保存成功");
                this.taskDetailInfo = res.data;
                this.$router.back()
              }
            }
          ).catch((error)=>{
            console.log(error)
          });
        }).catch(
          reject=>{
            console.log('reject: '+reject)
            pass = false;
          }
        )



      },
      onTimeConfirm(picker,value,index){//时间选择器选择确定
        console.log("picker"+picker)
        console.log("value"+value);
        let hour = picker[1];
        if(value[0]==1){
          hour = parseInt(hour)+12;
          if(hour == 24){
            hour = '00';
          }
        }
        const label = picker[0]+' '+picker[1]+':'+picker[2];

        this.taskDetailInfo.runTimeLabel=label;
        this.taskDetailInfo.runTime=hour+':'+picker[2];


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
        //   this.taskDetailInfo.weekdayResult = JSON.parse(weekSelectResult)
        var lable = '';

        this.taskDetailInfo.weekdayResult.forEach(p=>{
          lable = lable+p.chnLabel+','
        })

        console.log('lable：'+lable)


        //
        //   console.log('weeklable'+lable)
        this.taskDetailInfo.trunkTypeLabel = this.$options.filters['ellipsis'](lable)
        // this.taskDetailInfo.weekdayResult = lable;
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
      },
      onTargetOK(value){//指标选择OK
        // console.log(value);
        this.taskDetailInfo.targetsModel=value;
        this.isShowTarget=false;
      },
      onTargetClear(){//指标清除

      },
      tagClose(item){//指标标签删除
        console.log(item.targetId);
        this.taskDetailInfo.targetsModel = this.taskDetailInfo.targetsModel.filter(d => d.targetId !== item.targetId);
      },
      onPersonOK(values){//点击选中人员
        this.taskDetailInfo.personSelected = values;

        if(this.taskDetailInfo.personSelected !== undefined && this.taskDetailInfo.personSelected.length>0){
          this.taskDetailInfo.personSelected.forEach(p=>{this.taskDetailInfo.personSelectedLable+=p.staffname})
        }
        this.taskDetailInfo.personSelectedLable = this.$options.filters['ellipsis'](this.taskDetailInfo.personSelectedLable);
        this.isShowPerson = false;
      },
      deleteAlarm(){
        Dialog.confirm({
          title: 'MIA提示',
          message: '删除后不可恢复，请确认是否删除'
        }).then(() => {
          httpService.post("/api/miaAlarmTaskInfo/deleteTask",this.taskDetailInfo).then(res=>{
            this.$router.push({path:'/alarmTaskList'})
          }).catch(err=>{
            Toast.fail("删除失败")
          });
        }).catch(() => {
          // on cancel
        });
      },
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 13) {
          return value.slice(0,13) + '...'
        }
        return value
      }
    },
    created() {
      let id = this.$route.query.id;
      if(id !== undefined){
        this.pageStatus='edit';

        httpService.post("/api/miaAlarmTaskInfo/searchById?id="+id).then(res=>{
          this.taskDetailInfo=res.data;
          if(this.taskDetailInfo.targetsModel !== undefined &&this.taskDetailInfo.targetsModel.length>0 ){
            this.taskDetailInfo.targetsModel.forEach(p=>{this.targetsModelOut.push(p.taskId)});
          }
          // this.pageStatus='edit';
        }).catch(err=>{
          Toast.fail("查询失败")
        });
      }
    }
  }
</script>

<style scoped>

  .main_form{
    margin: 8px 8px 8px 8px;
    background: #ffffff;
  }

  .button-bar{
    background: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    height: 45px;
    width: 100%;
  }

  .weekdays-select .weekdays-select-btn-bar{
    text-align: center;
    margin-top: 30px;
  }

  .targetDiv{
    background: #ffffff;
  }
  .van-tag--medium {
    font-size: 12px;
    line-height: 20px;
    margin-left: 8px;
  }
</style>
