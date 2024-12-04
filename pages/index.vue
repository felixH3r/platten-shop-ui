<template>
  <section class="h-[100vh] bg-base-200 md:bg-white flex items-center">
    <div class="w-full max-w-7xl md:px-5 lg:px-5 mx-auto">
      <div
          class="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 md:bg-base-200 rounded-2xl flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex md:shadow-xl">
        <div class="flex-col justify-end items-center lg:gap-16 gap-10 flex">
          <LogoInclTextSVG class="w-[300px]"/>
          <div class="flex-col justify-center items-center gap-10 flex">
            <div class="flex-col justify-start items-center gap-2.5 flex">
              <h2 class="text-center  md:text-6xl text-5xl font-bold font-manrope leading-normal">
                Coming Soon
              </h2>
              <p class="text-center text-gray-500 text-base font-normal leading-relaxed">
                Nur noch wenige Tage bis FurnTune erscheint!
              </p>
            </div>
            <div class="flex items-start justify-center w-full gap-2 count-down-main">
              <div class="timer flex flex-col gap-0.5">
                <div>
                  <h3 class="text-center  text-2xl font-bold font-manrope leading-9">{{ days }}</h3>
                </div>
                <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">TAGE</p>
              </div>
              <h3 class="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">:</h3>
              <div class="timer flex flex-col gap-0.5">
                <div>
                  <h3 class="text-center text-2xl font-bold font-manrope leading-9">{{ hours }}</h3>
                </div>
                <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">H</p>
              </div>
              <h3 class="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">:</h3>
              <div class="timer flex flex-col gap-0.5">
                <div>
                  <h3 class="text-center text-2xl font-bold font-manrope leading-9">{{ minutes }}</h3>
                </div>
                <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">MIN</p>
              </div>
              <h3 class="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">:</h3>
              <div class="timer flex flex-col gap-0.5">
                <div>
                  <h3 class="text-center  text-2xl font-bold font-manrope leading-9">{{ seconds }}</h3>
                </div>
                <p class="text-center text-gray-500 text-xs font-normal leading-normal w-full">SEK</p>
              </div>
            </div>
          </div>
          <div class="w-full flex-col justify-center items-center gap-5 flex">
            <h6 class="text-center text-base font-semibold leading-relaxed">Erscheinungsdatum:
              04.01.2025</h6>
          </div>
        </div>
        <p class="text-center text-gray-500 text-sm font-normal leading-snug">
          Gerne kannst du uns eine Mail schreiben: <a href="mailto:felix@furntune.at"
                                                      class="hover:text-gray-100 transition-all duration-700 ease-in-out">
          felix@furntune.at</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import {ref, onMounted, onUnmounted} from "vue";
  import LogoInclTextSVG from "~/components/icons/LogoInclTextSVG.vue";

  // Ziel-Datum
  const dest = ref<number>(new Date("2025-01-04T23:59:59").getTime());

  // Reactive Variablen für den Countdown
  const days = ref<string>("00");
  const hours = ref<string>("00");
  const minutes = ref<string>("00");
  const seconds = ref<string>("00");

  const updateCountdown = () => {
    const now: number = new Date().getTime();
    let diff: number = dest.value - now;

    if (diff <= 0) {
      const nextMonthDate: Date = new Date();
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

      if (nextMonthDate.getMonth() === 0) {
        nextMonthDate.setFullYear(nextMonthDate.getFullYear() + 1);
      }

      dest.value = nextMonthDate.getTime();
      return;
    }

    days.value = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
    hours.value = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
    minutes.value = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    seconds.value = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");
  };

  let intervalId: number | undefined;

  onMounted(() => {
    intervalId = window.setInterval(updateCountdown, 1000);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<style scoped>
  /* Optional SCSS Styling */
</style>
