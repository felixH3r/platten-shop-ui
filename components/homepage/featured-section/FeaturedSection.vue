<template>
  <section class="pt-12 pb-24">
    <div class="mx-auto max-w-screen-xl">
      <!--      Header -->
      <div class="mb-14 text-center">
        <h2 class="text-2xl md:text-4xl text-center font-bold leading-[2.5rem] md:leading-[3.25rem] mb-6 max-w-max lg:max-w-3xl lg:mx-auto">
          {{ TC.featuredSection.header }}
        </h2>
        <p class="text-base font-normal text-gray-500 lg:max-w-2xl lg:mx-auto mb-8">
          {{ TC.featuredSection.subHeader }} </p>

        <!--        buttons -->
        <div class="flex flex-col justify-center md:flex-row gap-5 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
          <NuxtLink to="/shop-app"
                    class="btn btn-primary">
            {{ TC.featuredSection.ctaButton }}
          </NuxtLink>
        </div>
      </div>


      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">

        <IconCard :title="TC.featuredSection.card_1.title" :subtitle="TC.featuredSection.card_1.content"
                  :image-url="'https://plattenshop-uploads.s3.eu-central-1.amazonaws.com/Holzzuschnitte.jpg'"
                  :image-alt="'Möbelteile auf Maß Bespiele übereinander gelegt.'"
                  :cta-button="TC.featuredSection.card_1.ctaButton"/>
        <IconCard :title="TC.featuredSection.card_2.title" :subtitle="TC.featuredSection.card_2.content"
                  :cta-button="TC.featuredSection.card_2.ctaButton" :image-url="undefined"/>
        <IconCard :title="TC.featuredSection.card_3.title" :subtitle="TC.featuredSection.card_3.content"
                  :cta-button="TC.featuredSection.card_3.ctaButton" :image-url="undefined"/>

        <!--        <div class="relative w-full h-auto md:col-span-2">-->
        <!--          <div class="bg-primary rounded-2xl flex  justify-between flex-row flex-wrap">-->
        <!--            <div class="p-5  xl:p-8 w-full md:w-1/2 ">-->
        <!--              <div class="block">-->
        <!--                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--                  <path-->
        <!--                      d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z"-->
        <!--                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--                </svg>-->
        <!--              </div>-->
        <!--              <h3 class="text-lg font-bold xl:text-xl text-white py-5 w-full xl:w-64">-->
        <!--                Accomplish tasks swiftly with online tools.-->
        <!--              </h3>-->
        <!--              <p class="text-xs font-normal text-gray-300 w-full mb-8 xl:w-64">Get quoted and covered in under 10-->
        <!--                minutes online. no paperwork or waiting any more </p>-->
        <!--              <button-->
        <!--                  class="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">-->
        <!--                View More-->
        <!--                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--                  <path-->
        <!--                      d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"-->
        <!--                      stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--                </svg>-->
        <!--              </button>-->
        <!--            </div>-->
        <!--            <div class="relative hidden h-auto md:w-1/2 md:block">-->
        <!--              <img src="https://pagedone.io/asset/uploads/1695028873.png" alt="Header tailwind Section"-->
        <!--                   class="h-full ml-auto object-cover">-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="relative w-full h-auto">-->
        <!--          <div class="bg-primary rounded-2xl p-5  xl:p-8 h-full">-->
        <!--            <div class="block">-->
        <!--              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--                <path-->
        <!--                    d="M24.6429 11.4286C24.6429 14.3872 20.2457 16.7857 14.8214 16.7857C9.3972 16.7857 5 14.3872 5 11.4286M24.6429 16.7857C24.6429 19.7444 20.2457 22.1429 14.8214 22.1429C9.3972 22.1429 5 19.7444 5 16.7857M24.6429 22.1429C24.6429 25.1015 20.2457 27.5 14.8214 27.5C9.3972 27.5 5 25.1015 5 22.1429M24.6429 6.96429C24.6429 9.42984 20.2457 11.4286 14.8214 11.4286C9.3972 11.4286 5 9.42984 5 6.96429C5 4.49873 9.3972 2.5 14.8214 2.5C20.2457 2.5 24.6429 4.49873 24.6429 6.96429Z"-->
        <!--                    stroke="white" stroke-width="2" stroke-linecap="round"></path>-->
        <!--              </svg>-->
        <!--            </div>-->
        <!--            <h3 class="py-5 text-white text-lg font-bold xl:text-xl">Improved technology yields greater value</h3>-->
        <!--            <p class="text-xs font-normal text-white mb-8">We’ve eliminated old analogue process with state-of-the art-->
        <!--              tech </p>-->
        <!--            <button-->
        <!--                class="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">-->
        <!--              View More-->
        <!--              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--                <path-->
        <!--                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"-->
        <!--                    stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--              </svg>-->

        <!--            </button>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="relative w-full h-auto">-->
        <!--
        <div class="bg-primary rounded-2xl p-5 xl:p-8 h-full">-->
        <!--            <div class="block">-->
        <!--              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--                <path-->
        <!--                    d="M26.7301 15.661C26.7301 22.1995 21.306 27.5 14.6151 27.5C7.9241 27.5 2.5 22.1995 2.5 15.661C2.5 9.1225 7.9241 3.822 14.6151 3.822M18.1313 10.1507L18.1313 4.85383C18.1313 3.22503 19.6455 2.00299 21.1519 2.70013C23.7608 3.90751 26.6177 6.25557 27.456 10.2563C27.7542 11.6798 26.4931 12.8563 25.0064 12.8368L20.7873 12.7814C19.3147 12.762 18.1313 11.5899 18.1313 10.1507Z"-->
        <!--                    stroke="white" stroke-width="2" stroke-linecap="round"></path>-->
        <!--              </svg>-->

        <!--            </div>-->
        <!--            <h3 class="py-5 text-white text-lg font-bold xl:text-xl">Build wealth with insurance planning</h3>-->
        <!--            <p class="text-xs font-normal text-white mb-8">Every life plan policy has a built-in wealth bonus, and we-->
        <!--              contribute too </p>-->
        <!--            <button-->
        <!--                class="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">-->
        <!--              View More-->
        <!--              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--                <path-->
        <!--                    d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"-->
        <!--                    stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>-->
        <!--              </svg>-->

        <!--            </button>-->
        <!--          </div>-->
        <!--        </div>-->

      </div>
    </div>
  </section>

</template>

<script setup lang="ts">

  import IconCard from "~/components/homepage/featured-section/IconCard.vue";
</script>

<style scoped lang="scss">

</style>
