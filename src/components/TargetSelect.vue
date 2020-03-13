<template>
  <div class="container">
    <div class="title">指标选择</div>

    <div class="selectContainer">
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="targetInfo.className" :name="targetInfo.classId"
                           :key="targetInfo.classId"  v-for="targetInfo in targetInfos">

          <van-checkbox-group v-model="targetsModel">
            <!--<van-cell-group>-->
            <van-cell
              v-for="(item, index) in targetInfo.targets"
              clickable
              :key="item.targetId"
              :title="item.targetName"
              @click="toggle(index,item)"
            >
              <van-checkbox slot="right-icon" :name="item.targetId" @click="onCheckBoxClicked(item)" ref="checkboxes" />
            </van-cell>
            <!--</van-cell-group>-->
          </van-checkbox-group>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="footer">
      <van-button type="default" v-on:click="onBtnClear" >清空</van-button>
      <van-button type="info" v-on:click="onBtnSave">保存</van-button>
    </div>
  </div>
</template>

<script>
  import httpService from '../http/httpService'
  export default {
    name: "TargetSelect",
    props:{
        targetsModelInput:{
          type:Array,
          default:()=> []
        }
      },
    data (){
      return {
        activeNames:[],//默认展开项目
        targetsModel:this.targetsModelInput,
        targetSelected:[],
        targetInfos:[],
      }
    },
    methods: {
      toggle(index,item) {
      },
      onBtnSave(){
        this.$emit('save',this.targetSelected);
      },
      onBtnClear(){
        this.targetsModel = [];
        this.targetSelected = [];
        this.$emit('clear');
      },
      onCheckBoxClicked(item) {
        if (this.targetSelected == undefined || this.targetSelected.length == 0) {
          this.targetSelected.push(item);
        } else {
          let push =true;
          this.targetSelected.forEach(p => {
            if (p.targetId == item.targetId) {
              this.targetSelected = this.targetSelected.filter(d => d.targetId !== item.targetId)
              push = false;
            }
          });
          if(push){
              this.targetSelected.push(item);
          }
        }
      }
    },
    created() {
      //初始化组织信息
      httpService.get("/api/imia/target/searchAllTargets").then( res =>{
        this.targetInfos = res.data;
      }).catch( err =>{
        Toast.error("初始化异常，请稍后再试")
      })
    }
  }
</script>

<style scoped>

  .selectContainer{
    background: #ffffff;
    overflow: auto;
    height: 0;
    padding-bottom: 85vh;
  }
  .footer{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: #FFFFFF;
    min-height: 50px;
    line-height: 50px;
  }
  .footer button{
    min-width: 150px;
    height: 40px;
  }
  .title{
    min-height: 40px;
    text-align: center;
    line-height: 40px;
    background: cornflowerblue;
    color: #ffffff;
    font-size: larger;
  }
</style>
