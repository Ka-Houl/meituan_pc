<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <side-menu />
      </el-col>
      <el-col :span="19">
        <life />
      </el-col>
    </el-row>
    <el-row :span="24">
      <has-style />
    </el-row>
  </div>
</template>

<script>
import sideMenu from '@/components/index/menu.vue';
import life from '@/components/index/life.vue';
import hasStyle from '@/components/index/hasStyle.vue';

export default {
  components: {
    sideMenu,
    life,
    hasStyle
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>