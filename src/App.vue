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
                <menuItem :father="child" @go="go"></menuItem>
              </template>
              <template v-else>
                <el-menu-item :index="child.link" @click="go(child)">{{
                  child.title
                }}</el-menu-item>
              </template>
            </template>
          </el-submenu>
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
      this.$router.push({ path: item.link });
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  height: 100vh;
}
</style>
