<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <el-menu class="el-menu-vertical-demo" :default-active="$route.path">
          <el-submenu v-for="(item, i) in listData" :key="item.id" :index="item.link">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="(child, i) in item.children">
              <template v-if="child.children">
                <menuItem :father="child"></menuItem>
              </template>
              <template v-else>
                <el-menu-item :index="child.link" @click="go(child)">{{
                  child.title
                }}</el-menu-item>
              </template>
            </template>
          </el-submenu>
          <button @click="btn(1)">权限1</button>
          <button @click="btn(2)">权限2</button>
        </el-menu>
      </el-col>
      <el-col :span="19">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import menuItem from "./components/MenuItem.vue";
import {list,list1} from './utils/index';
export default {
  components: {
    menuItem,
  },
  computed: {
    listData() {
      return JSON.parse(sessionStorage.getItem("tranTree"));
    },
  },
  methods: {
    go(item) {
      this.$router.replace({ path: item.link });
    },
    btn(num) {
      if(num == 1){
        sessionStorage.setItem('list',JSON.stringify(list))
      }else{
        sessionStorage.setItem('list',JSON.stringify(list1))
      }
      this.$router.replace({path: '/'});
      this.$router.go(0);
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  height: 100vh;
}
</style>
