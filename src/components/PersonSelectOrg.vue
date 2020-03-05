<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#6495ED"
      placeholder="请输入要查找的人名"
      @input="onNameInput"
    />
    <div class="searchResult" v-if="isResultShow">
      <van-checkbox-group v-model="searchResult">
        <van-cell-group>
          <van-cell
            v-for="item in searchResult "
            clickable
            :key="item.staffid"
            :title="item.staffname"
            :icon="item.imgUrl"
            :label="item.dept"
          >
            <van-checkbox slot="right-icon" :name="item" ref="checkboxes" shape="square" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>

    <div class="personListOrg">
      <van-collapse v-model="activeName"  accordion>
        <van-collapse-item :key="orgPersonInfo.orgid"
                           :name="orgPersonInfo.orgid" v-for="orgPersonInfo in orgPersonInfos">

          <div slot="title"><van-icon name="cluster-o" /> {{orgPersonInfo.orgName}} </div>
          <van-cell
            v-for="item in orgPersonInfo.staffInfos "
            clickable
            :key="item.staffid"
            :title="item.staffname"
            :icon="item.imgUrl"
          >
            <van-checkbox slot="right-icon" :name="item.isselected" ref="checkboxes" shape="square" />
          </van-cell>


          <van-collapse v-model="activeName1" class="personListOrg" accordion>
            <van-collapse-item :key="child.orgid"
                               :name="child.orgid" v-for="child in orgPersonInfo.children">
              <div slot="title"><van-icon name="cluster-o" /> {{child.orgName}} </div>
              <van-cell
                v-for="childItem in child.staffInfos "
                clickable
                :key="childItem.staffid"
                :title="childItem.staffname"
                :icon="childItem.imgUrl"
              >
                <van-checkbox slot="right-icon" :name="childItem.isselected" ref="checkboxes" shape="square" />
              </van-cell>
            </van-collapse-item>
          </van-collapse>


        </van-collapse-item>
        <van-collapse-item title="PCG平台与内容事业群" name="3">内容</van-collapse-item>
      </van-collapse>
    </div>

    <div class="footer">
      <div class="selectedStaff">
        <a-badge>
          <a-icon slot="count" type="minus-circle" style="color: #f5222d" @click="onclickDelete" />
          <a-avatar size="large" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </a-badge>
        <a-badge>
          <a-icon slot="count" type="minus-circle" style="color: #f5222d" @click="onclickDelete" />
          <a-avatar size="large" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </a-badge>

        <van-button plain type="info" size="mini">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonSelectOrg",
    data () {
      return {
        isResultShow:false,
        searchResult:[
          {staffname:'jerrywhang',staffid:'1',dept:'人力资源平台部',imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334"},
          {staffname:'lululu',staffid:'2',dept:'人力资源平台部',imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334"},
          {staffname:'jerrywhang',staffid:'3',dept:'人力资源平台部',imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334"}
        ],
        value:'',
        activeName:[],
        activeName1:[],

        orgPersonInfos:[
          {
            orgid:'1',
            orgName:'S3职能系统－HR与管理线',
            children:[
              {
                orgid:'1-1',
                orgName:'招聘活水部',
                staffInfos:[
                  {
                    staffname:'jerrywhang(张伟)',
                    staffid:'000014421',
                    imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                    isselected:false
                  },
                  {
                    staffname:'leelu(鲁力)',
                    staffid:'000014422',
                    imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                    isselected:false
                  }
                ]
              },
              {
                orgid:'1-2',
                orgName:'人力资源平台部',
              }
            ],
            staffInfos:[
              {
                staffname:'jerrywhang(张伟)',
                staffid:'000014421',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'leelu(鲁力)',
                staffid:'000014422',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'jerrywhang(张伟)',
                staffid:'000014421',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'leelu(鲁力)',
                staffid:'000014422',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'jerrywhang(张伟)',
                staffid:'000014421',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'leelu(鲁力)',
                staffid:'000014422',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'jerrywhang(张伟)',
                staffid:'000014421',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'leelu(鲁力)',
                staffid:'000014422',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'jerrywhang(张伟)',
                staffid:'000014421',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'leelu(鲁力)',
                staffid:'000014422',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              }
            ]

          },
          {
            orgid:'2',
            orgName:'S2职能系统－财经线',
            children:[
              {
                orgid:'2-1',
                orgName:'招聘活水部',
              },
              {
                orgid:'2-2',
                orgName:'人力资源平台部',
              }
            ],
            staffInfos:[
              {
                staffname:'jerrywhang(张伟)',
                staffid:'000014421',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              },
              {
                staffname:'leelu(鲁力)',
                staffid:'000014422',
                imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334",
                isselected:false
              }
            ]

          }
        ]
      }
    },
    methods:{
      onNameInput(value){//搜索框输入人名
        this.searchResult.push({staffname:'jerrywhang',staffid:'1',dept:'人力资源平台部',imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334"})
        console.log(value);
        if(value.length > 3){
          this.isResultShow = true;
        }else{
          this.isResultShow = false;
        }

      },
      onclickDelete(){
        console.log('delete');
      }

    }
  }
</script>

<style scoped>

  .searchResult{
    position: absolute;
    background: aliceblue;
    width: 100%;
    box-sizing: border-box;
    z-index: 999;
  }

  /*.personListOrg{*/
  /*position:relative;*/
  /*min-height:100vh;*/
  /*padding-bottom:40px;    //将padding-bottom大小设置为底部内容的高度*/
  /*box-sizing:border-box;*/
  /*}*/
  .personListOrg i {
    min-width: 1em;
    height: 25px;
    font-size: 25px;
    line-height: 25px;
  }

  .personListOrg i img{
    width: 1em;
    height: 1em;
    object-fit: contain;
    border-radius: 50%;
  }

  .van-cell__left-icon, .van-cell__right-icon {
    min-width: 1em;
    height: 32px;
    font-size: 44px;
    line-height: 25px;
  }

  .van-icon__image {
    width: 1em;
    height: 1em;
    object-fit: contain;
    border-radius: 50%;
  }

  .ant-badge-count, .ant-badge-dot, .ant-badge .ant-scroll-number-custom-component {
    position: absolute;
    top: 5px;
    right: 2px;
    -webkit-transform: translate(50%, -50%);
    transform: translate(50%, -50%);
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
  }
  .footer .selectedStaff{
    overflow:visible;
    white-space:nowrap;
    overflow:auto;
    background: #ffffff;
    z-index:998;
  }
  .footer .button-bar{
    /*z-index:999;*/
  }
  .footer{
    /*z-index:998;*/
    position:absolute;
    bottom:0;
    left:0;
    height:45px;
    line-height:45px;
    width:100%;
    text-align:left;
    /*_position:absolute;*/
    /*_top: expression_r(documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight) ;*/
  }
</style>
