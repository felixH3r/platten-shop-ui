<template>
  <div class="panel-configurator-wrapper">
    <Sidebar/>
    <PanelContentWrapper/>
  </div>
</template>

<script lang="ts" setup>
  import Sidebar from "~/components/panel-configurator/sidebar/Sidebar.vue";
  import {useMainStore} from "~/store/mainStore";
  import {usePostStore} from "~/store/posts";

  // const postStore = usePostStore();
  //
  // const addToCart = async () => await postStore.addToCart(24, 2000, 3000);

</script>

<style scoped lang="scss">
  .panel-configurator-wrapper {
    display: flex;
  }
</style>
