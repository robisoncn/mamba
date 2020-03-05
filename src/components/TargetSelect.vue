<template>
  <div>
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
              <van-checkbox slot="right-icon" :name="item.targetId" ref="checkboxes" />
            </van-cell>
          <!--</van-cell-group>-->
        </van-checkbox-group>
      </van-collapse-item>
    </van-collapse>
    <div class="footer">
      <van-button type="default">清空</van-button>
      <van-button type="info">保存</van-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TargetSelect",
        data (){
          return {
            activeNames:[],//默认展开项目
            targetsModel:[],
            targetInfos:[
              {
                classId:'A',
                className:'TBI指标库',
                targets:[
                  {
                    targetId:'A1',
                    targetName:'人才离职风险指标',
                    targetUrl:'http://www.baidu.com'
                  },
                  {
                    targetId:'A2',
                    targetName:'高潜力人才指标',
                    targetUrl:'http://www.baidu.com'
                  }
                ]
              },
              {
                classId:'B',
                className:'数据指标库',
                targets:[
                  {
                    targetId:'B1',
                    targetName:'人才离职风险指标B',
                    targetUrl:'http://www.baidu.com'
                  },
                  {
                    targetId:'B2',
                    targetName:'高潜力人才指标B',
                    targetUrl:'http://www.baidu.com'
                  }
                ]
              }
            ],
          }
        },
        methods: {
          toggle(index,item) {
            console.log(item.targetName);
            // this.$refs.checkboxes[index].toggle();
          }
        },
    }
</script>

<style scoped>


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
</style>
