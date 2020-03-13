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
      <van-checkbox-group v-model="selectedPersonModel">
        <van-cell-group>
          <van-cell
            v-for="item in searchResult "
            clickable
            :key="item.staffid"
            :title="item.staffFullName"
            :icon="'http://r.hrc.oa.com/photo/48/'+item.staffname+'.png'"
            :label="item.dept"
          >
            <van-checkbox slot="right-icon" :name="item" ref="checkboxes" shape="square" @click="addSelectUser(item)" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>

    <div class="personListOrg">
      <van-collapse v-model="activeName"  accordion @change="onOrgChange1($event)" >
        <van-checkbox-group v-model="selectedPersonModel">
        <van-collapse-item :key="orgPersonInfo.orgid"
                           :name="orgPersonInfo.orgid" v-for="orgPersonInfo in orgPersonInfos">

          <div slot="title"><van-icon name="cluster-o" /> {{orgPersonInfo.orgName}} </div>
          <van-cell
            v-for="item in orgPersonInfo.staffInfos "
            clickable
            :key="item.staffid"
            :title="item.staffFullName"
            :icon="'http://r.hrc.oa.com/photo/48/'+item.staffname+'.png'"
          >
            <van-checkbox slot="right-icon" :name="item.staffid" ref="checkboxes" shape="square" @click="addSelectUser(item)" />
          </van-cell>


          <van-collapse v-model="activeName1" class="personListOrg" accordion v-if="childOrgShow" @change="onOrgChange2($event)">
<!--            <van-checkbox-group v-model="selectedPerson">-->
            <van-collapse-item :key="child.orgFullPath"
                               :name="child.orgFullPath" v-for="child in orgPersonInfo.children">
              <div slot="title"><van-icon name="cluster-o" /> {{child.orgName}} </div>
              <van-cell
                v-for="childItem in child.staffInfos "
                clickable
                :key="childItem.staffid"
                :title="childItem.staffFullName"
                :icon="'http://r.hrc.oa.com/photo/48/'+childItem.staffname+'.png'"
              >
                <van-checkbox slot="right-icon" :name="childItem.staffid" ref="checkboxes" shape="square" @click="addSelectUser(childItem)" />
              </van-cell>
            </van-collapse-item>
<!--           </van-checkbox-group>-->
          </van-collapse>


        </van-collapse-item>
        </van-checkbox-group>
      </van-collapse>
    </div>

    <pre>{{orgPersonInfos}}</pre>

    <div class="footer">
      <div class="selectedStaff">

        <a-badge  v-for="(item) in selectedPerson"  :key="item.staffid">
          <a-icon slot="count" type="minus-circle" style="color: #f5222d" @click="onclickDelete(item)" />
          <a-avatar size="large" :src="'http://r.hrc.oa.com/photo/48/'+item.staffname+'.png'" />

        </a-badge>


        <van-button plain type="info" size="mini" @click="onclickOK">确定</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import httpService from '../http/httpService'
  export default {
    name: "PersonSelectOrg",
    props:{selectPersonIn:{
        type:Array,
        default:()=> []
      },
    },
    data () {
      return {
        isResultShow:false,
        childOrgShow:false,
        searchResult:[],
        value:'',
        activeName:[],
        activeName1:[],
        orgPersonInfos:[
        ],
        selectedPerson: this.selectPersonIn,
        selectedPersonModel:[],
        isSearchFinish:true,
      }
    },
    methods:{
      onNameInput(value){//搜索框输入人名

        console.log(value);

        if(value.length > 3 && this.isSearchFinish){
          this.isSearchFinish=false;
          httpService.get("/api/mia/staff/searchStaffInfoByName?name="+value).then(
            res=>{
              this.searchResult = res.data;
              this.isSearchFinish=true;
            }
          ).catch(err=>{

          });
          this.isResultShow = true;
        }else{
          this.isResultShow = false;
        }

      },
      onclickDelete(item){
        this.selectedPerson = this.selectedPerson.filter(d => d.staffid !== item.staffid)
        this.selectedPersonModel = this.selectedPersonModel.filter(d => d !== item.staffid)
      },
      onclickOK(){
        this.$emit('ok',this.selectedPerson);
      },
      addSelectUser(item){
        if(this.selectedPerson == undefined ||this.selectedPerson.length==0 ){
          this.selectedPerson.push(item);
        }else {
          let push =true;
          this.selectedPerson.forEach(p => {
            if (p.staffid == item.staffid) {
              this.selectedPerson = this.selectedPerson.filter(d => d.staffid !== item.staffid)
              push = false;
            }
          });
          if(push){
            this.selectedPerson.push(item);
          }
        }
      },
      onOrgChange1(event){
        if(event !== undefined && event !==''){
          let orgid_in = event;
          httpService.get("/api/mia/org/getOrgsAngStaffByParentId?parentId="+orgid_in).then( res =>{
            // this.orgPersonInfos. = res.data;
            this.orgPersonInfos.forEach(p=>{
              if(p.orgid==orgid_in){
                p.children=res.data.orgs;
                p.staffInfos=res.data.staffs;
              }
            })
            this.childOrgShow = true;
          }).catch( err =>{
            Toast.error("初始化异常，请稍后再试")
          })
        }else{
          this.childOrgShow = false;
        }

        console.log("event"+event);
        console.log(this.activeName);
      },
      onOrgChange2(event){
        if(event !== undefined && event !==''){
          let orgid_in = event;
          httpService.get("/api/mia/org/getOrgsAngStaffByParent?fullPath="+orgid_in).then( res =>{
            // this.orgPersonInfos.forEach(p=>{
            //       p.children.forEach(d=>{
            //         if(d.orgFullPath == orgid_in){
            //           d.staffInfos=res.data.staffs;
            //         }
            //       })
            // })
            this.orgPersonInfos.forEach(p=>{
              if(p.children !== undefined){
                p.children.forEach(d=>{
                  if(d.orgFullPath == orgid_in){
                    d.staffInfos=res.data.staffs;
                  }
                });
              }
            })

            this.childOrgShow = true;
          }).catch( err =>{
            console.log(err)
          })
        }else{
          this.childOrgShow = false;
        }
      }
    },
    created() {
      //初始化组织信息
      httpService.get("/api/mia/org/getOrgsByRoot").then( res =>{
        this.orgPersonInfos = res.data;
      }).catch( err =>{
        Toast.error("初始化异常，请稍后再试")
      })
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
