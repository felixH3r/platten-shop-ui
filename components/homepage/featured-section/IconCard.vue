<template>
  <div class="relative flex w-full h-auto " :class="{'md:col-span-2': imageUrl}">
    <div class="bg-base-200 rounded-2xl flex  justify-between flex-row flex-wrap w-full">
      <div class="p-6 w-full flex flex-col justify-between" :class="{'md:w-1/2': imageUrl}">
        <div>
          <div class="block">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z"
                  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
          <h3 class="text-lg font-bold xl:text-xl  py-5 w-full xl:w-64">
            {{ title }}
          </h3>
          <p class="text-xs font-normal w-full mb-8 xl:w-64">{{ subtitle }}</p>
        </div>
        <NuxtLink to="/shop-app"
                  class="btn btn-outline hover:bg-primary w-44">
          {{ ctaButton }}
          <IconsRightArrowSVG class="w-4 h-4"/>
        </NuxtLink>
      </div>

      <div v-if="imageUrl" class="relative hidden h-auto md:w-1/2 md:block">
        <NuxtImg :src="imageUrl" :alt="imageAlt"
                 class="h-full ml-auto object-cover rounded-br-xl rounded-tr-xl"></NuxtImg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  const props = defineProps<{
    title: string,
    subtitle: string,
    imageUrl: string | undefined,
    imageAlt: string | undefined,
    ctaButton: string,
  }>();

</script>

<style scoped lang="scss">

</style>
