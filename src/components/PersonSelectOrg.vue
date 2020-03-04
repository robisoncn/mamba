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

      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
        <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
        <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
      </van-collapse>

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
              treeData: [
                { title: 'Expand to load', key: '0' },
                { title: 'Expand to load', key: '1' },
                { title: 'Tree Node', key: '2', isLeaf: true },
              ],
              activeName: '1',
          }
        },
        methods:{
          onNameInput(value){//搜索框输入人名
            this.searchResult.push({staffname:'jerrywhang',staffid:'1',dept:'人力资源平台部',imgUrl:"http://dayu.oa.com/avatars/jerrywzhang/profile.jpg?1542964334"})
              console.log(value);
              this.isResultShow = true;
          },

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
</style>
