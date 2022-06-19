<template>
  <div>
    <!-- <router-link :to="item.link || item.path">{{item.title}}</router-link> |
    <ul v-if="item.children">
      <li v-for="el of item.children">
        <menuItem :item="el"/>
      </li>
    </ul> -->
    <template v-if="father.children">
      <el-submenu :index="father.link">
        <span slot="title">{{ father.title }}</span>
        <template v-for="(child, j) in father.children">
          <menuItem :father="child" />
        </template>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="father.link" @click="go(father)">{{
        father.title
      }}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    father: Object,
  },
  methods: {
    go(child) {
      this.$router.replace({ path: child.link });
    },
  },
};
</script>

<style></style>
