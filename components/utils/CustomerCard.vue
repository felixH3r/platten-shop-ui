<template>
  <div class="
    pr-3 my-5 gap-10 w-full md:w-80
    flex flex-col items-center justify-between">
    <NuxtImg alt="customer-image" :src="imageSrc" class="w-36 h-36 object-cover object-top rounded-full block"/>
    <div>
      <h3>{{ name }}</h3>
      <span class="w-2/4 md:w-full md:self-start">{{ content }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {onMounted} from "#imports";

  const props = defineProps({
    imageSrc: String,
    name: String,
    content: String,
  });

  onMounted(() => console.log(props.imageSrc));

</script>

<style scoped lang="scss">

</style>
