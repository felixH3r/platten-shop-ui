<template>
  <div class="swiper mySwiper flex flex-col lg:gap-32 gap-16 w-full">
    <div class="swiper-wrapper">
      <slot/>
    </div>
    <div class="swiper-pagination lg:justify-start justify-center"></div>
  </div>
</template>

<script setup lang="ts">
  import Swiper from "swiper/bundle";
  import 'swiper/css/bundle';
  import SliderCard from "~/components/homepage/values-slider-section/SliderCard.vue";

  onMounted(() => {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 34,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  });
</script>

<style lang="scss">
  .swiper {
    display: flex !important;
  }

  .swiper-wrapper {
    height: fit-content !important;
    width: 100% !important;
  }

  .swiper-pagination {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 16px;
    position: relative;
  }

  .swiper-pagination-bullet {
    width: 42px;
    height: 42px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 26px;
    font-size: 16px;
    color: #6B7280;
    opacity: 1;
    background: #F9FAFB;
    border: 1px solid #E5E7EB;
  }

  .swiper-pagination-bullet-active {
    color: #fff;
    @apply bg-primary;
  }

  .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: var(--swiper-pagination-bottom, 0px);
  }
</style>
