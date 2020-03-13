<template>
  <div class="container">
    <div class="title">人员选择</div>
    <van-search
      v-model="value"
      shape="round"
      background="#6495ED"
      placeholder="请输入要查找的人名"
      @input="onNameInput"
    />
    <div class="searchResult" v-if="isResultShow">
      <van-checkbox-group v-model="selectedPerson">
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
    <div class="tree-container">
      <a-tree :loadData="onLoadData" :treeData="treeData" checkable @check="onCheckBoxSelectd" showIcon>
        <a-avatar slot="meh" slot-scope="{title}" size="small" :src="'http://r.hrc.oa.com/photo/48/'+getStaffName(title)+'.png'" />
        <template slot="title" slot-scope="{title}">

          <span >{{title}}</span>
        </template>
      </a-tree>
    </div>
   <div class="selectBar">
     <div class="staffSelectDiv">
       <a-badge  v-for="(item) in selectedPerson"  :key="item.staffid">
         <a-icon slot="count" type="minus-circle" style="color: #f5222d" @click="onclickDelete(item)" />
         <a-avatar size="large" :src="'http://r.hrc.oa.com/photo/48/'+item.staffname+'.png'" />
       </a-badge>
     </div>
     <div class="btnDiv" @click="onclickOK">
<!--     <van-button plain type="info" size="mini" @click="onclickOK">确定</van-button>-->
       确定
     </div>
   </div>

  </div>
</template>

<script>
    import httpService from '../http/httpService'
    export default {
        name: "MiaOrgStaffSelecter",
        props:{selectPersonIn:{
            type:Array,
            default:()=> []
          },
        },
        data() {
          return {
            isResultShow:false,
            treeData: [],
            selectedPerson:this.selectPersonIn,
            searchResult:[],
            value:'',
            isSearchFinish:true,
          };
        },
        methods: {
          onclickOK(){
            this.$emit('ok',this.selectedPerson);
          },
          onclickDelete(item){
            this.selectedPerson = this.selectedPerson.filter(d => d.staffid !== item.staffid)
          },
          onLoadData(treeNode) {
            return new Promise(resolve => {
              if (treeNode.dataRef.children) {
                resolve();
                return;
              }
              setTimeout(() => {
                httpService.get("/api/mia/org/getOrgsByParentsTree?parentsid="+treeNode.dataRef.key).
                then( res =>{
                  treeNode.dataRef.children = res.data;

                  if(res.data != undefined && res.data.length>0){
                    treeNode.dataRef.children.forEach(p=>{
                      if(p.staffname !==undefined){
                        p.scopedSlots = { title: 'title',icon:'meh' };
                      }
                    })
                  }

                  console.log(treeNode.dataRef.selectable);
                  // treeNode.dataRef.children[0].selectable=false;
                  this.treeData = [...this.treeData];
                });
                resolve();
              }, 1000);
            });
          },
          onCheckBoxSelectd(checkedKeys, e){
            //checkedKeys, e:{checked: bool, checkedNodes, node, even
            console.log("checkedKeys:"+checkedKeys);
            console.log("e:"+e.checked)
            this.selectedPerson = [];
            if(e.checkedNodes !== undefined && e.checkedNodes.length>0){
                  console.log(e.checkedNodes[0].data.props.staffid)
              e.checkedNodes.forEach(p=>{
                if(p.data.props.staffid !==undefined){
                  this.selectedPerson.push({staffid:p.data.props.staffid,staffFullName:p.data.props.staffFullName,staffname:p.data.props.staffname})
                }
              })
            }

          },
          getStaffName(value){
            return value.split('(')[0];
          },
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
        },
        created() {
          //初始化组织信息
          httpService.get("/api/mia/org/getOrgsByRootTree").then( res =>{
            this.treeData = res.data;
          }).catch( err =>{
            Toast.error("初始化异常，请稍后再试")
          })
        },


    }
</script>

<style scoped>
  .container{
  }
  .title{
    min-height: 40px;
    text-align: center;
    line-height: 40px;
    background: cornflowerblue;
    color: #ffffff;
    font-size: larger;
  }
  .tree-container{
    background: #ffffff;
    overflow: auto;
    height: 0;
    padding-bottom: 85vh;
    overflow-y: auto;
  }
  .selectBar{
    border-top:1px solid lavender;
    background: #ffffff;
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    height: 55px;
    line-height: 55px;
  }
  .staffSelectDiv{
    float: left;
    width: 80%;
    height: 50px;
    display: inline;
    white-space: nowrap;
    overflow-x:auto;
    overflow-y:hidden
  }
  .btnDiv{
    float: right;
    background-color: #6495ED;
    width: 20%;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
  }
</style>
