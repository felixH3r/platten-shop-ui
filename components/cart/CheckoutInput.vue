<template>
  <form class="flex flex-col gap-5">
    <InputComponent :placeholder="'First Name'" class="w-full"/>
    <InputComponent :placeholder="'Second Name'" class="w-full"/>
  </form>
</template>

<script setup lang="ts">

  import InputComponent from "~/components/utils/InputComponent.vue";
</script>

<style scoped lang="scss">

</style>
