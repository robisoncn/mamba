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
              @click="toggle(index,item,$event)"
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
        targetInfos:[{
          "classId": "1",
          "className": "1-2",
          "targets":[
            {
              "targetId": "89cd8aa46ececbd1016eced7e5ac0002",
              "targetName": "sayok",
              "targetType": "text",
              "targetResult": "23423432a,,+++",
              "title": "1-2-sayok",
              "className": "1-2"
            },
            {
              "targetId": "89cd8aa46ed537e7016ed5829ed20006",
              "targetName": "测试PC_URL1",
              "targetType": "url_pc",
              "targetResult": "https://oa.m.tencent.com/an:HrTalentPerspective/HrTalentPerspective/redirectModule.html?orgid={orgid}&staffid={staffid}&jumpfrom={jumpfrom}&module=staffContributiont",
              "title": "测试PC_URL1",
              "className": "1-2"
            },
            {
              "targetId": "89cd8aa46ed537e7016ed583166b0008",
              "targetName": "测试PC_URL2",
              "targetType": "url",
              "targetResult": "https://oa.m.tencent.com/an:HrTalentPerspective/HrTalentPerspective/redirectModule.html?orgid={orgid}&staffid={staffid}&jumpfrom={jumpfrom}&module=staffContributiont",
              "title": "测试PC_URL2",
              "className": "1-2"
            }
          ]
        },
          {
            "classId": "3",
            "className": "2--二级分类测试2y+",
            "targets":[
              {
                "targetId": "89cd8aa46ef939d6016ef9f7af8f0000",
                "targetName": "tbi网址？",
                "targetType": "text",
                "targetResult": "tbi.oa.com",
                "title": "tbi网址？",
                "className": "2--二级分类测试2y+"
              }
            ]
          }
        ],
      }
    },
    methods: {
      toggle(index,item,event) {
        // console.log(item.targetName);
        // console.log(index);
        // console.log(event.target);
        // console.log(event.$ref);
        //
        //
        // this.$refs.checkboxes[index].toggle();

        // this.targetsModel.push(item.targetId);

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

        if (this.targetsModel == undefined || this.targetsModel.length == 0) {
          this.targetsModel.push(item.targetId);
        } else {
          let push =true;
          this.targetsModel.forEach(p => {
            if (p == item.targetId) {
              this.targetsModel = this.targetsModel.filter(d => d !== item.targetId)
              push = false;
            }
          });
          if(push){
            this.targetsModel.push(item.targetId);
          }
        }
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
        // if (this.targetSelected == undefined || this.targetSelected.length == 0) {
        //   this.targetSelected.push(item);
        // } else {
        //   let push =true;
        //   this.targetSelected.forEach(p => {
        //     if (p.targetId == item.targetId) {
        //       this.targetSelected = this.targetSelected.filter(d => d.targetId !== item.targetId)
        //       push = false;
        //     }
        //   });
        //   if(push){
        //       this.targetSelected.push(item);
        //   }
        // }
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
