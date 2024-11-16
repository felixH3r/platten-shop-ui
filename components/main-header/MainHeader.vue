<template>
  <div :class="[
      'flex justify-between navbar bg-base-100 fixed top-5 w-[94vw] md:w-[98%] rounded-2xl shadow-lg left-1/2 -translate-x-1/2 transition-transform duration-500 ease-in-out',
      isHidden || isConfigurator ? '-translate-y-16 opacity-0' : 'translate-y-0 opacity-100'
    ]">
    <div class="">
      <div class="dropdown">
        <button tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"/>
          </svg>
        </button>
        <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            v-on-click-outside="closeDropdown"
        >
          <li><a>Item 1</a></li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <NuxtLink :to="'/'" class="btn btn-ghost text-xl">FurnTune</NuxtLink>
    </div>
    <div class="hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Item 1</a></li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="p-2 w-56">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div class="flex-none">
      <NuxtLink :to="'/shop-app'" v-if="useMainStore().isDesktop" class="btn">Konfigurator</NuxtLink>
      <CartButton/>
      <!--      <div class="dropdown dropdown-end">-->
      <!--        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">-->
      <!--          <div class="w-10 rounded-full">-->
      <!--            <img-->
      <!--                alt="Tailwind CSS Navbar component"-->
      <!--                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <ul-->
      <!--            tabindex="0"-->
      <!--            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">-->
      <!--          <li>-->
      <!--            <a class="justify-between">-->
      <!--              Profile-->
      <!--              <span class="badge">New</span>-->
      <!--            </a>-->
      <!--          </li>-->
      <!--          <li><a>Settings</a></li>-->
      <!--          <li><a>Logout</a></li>-->
      <!--        </ul>-->
      <!--      </div>-->
    </div>
  </div>
  <div v-if="isConfigurator" class=" flex items-center justify-center fixed top-5 right-5">
    <NuxtLink :to="'/'" class="btn">Home</NuxtLink>
    <CartButton/>
  </div>
</template>

<script lang="ts" setup>
  import {TC} from "~/utils/text-content";
  import {useMainStore} from "~/store/mainStore";
  import CartButton from "~/components/main-header/CartButton.vue";
  import {vOnClickOutside} from '@vueuse/components';

  const props = defineProps({
    showToConfigurator: Boolean,
  });
  const routingTo = computed((): string => props.showToConfigurator ? TC.mainHeader.configurator : TC.mainHeader.home);


  const isHidden = ref(false);
  let lastScrollTop = 0;

  // Set a threshold for hiding the navbar (e.g., 100 pixels)
  const scrollThreshold = 300;

  const handleScroll = () => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
      // Scrolling down
      isHidden.value = true;
    } else {
      // Scrolling up
      isHidden.value = false;
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
  };

  const isConfigurator = computed((): boolean => {
    return useRoute().path === '/shop-app';
  });

  const closeDropdown = () => {
    const dropdowns = document.querySelectorAll('.menu-link-item details[open]');
    dropdowns.forEach((dropdown) => {
      dropdown.removeAttribute('open');
    });
  };


  // Lifecycle hooks to add and remove the scroll event listener
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped lang="scss">
  .navbar-hidden {
    transform: translateY(-100%);
    opacity: 0;
  }

  //.main-header {
  //  display: flex;
  //  align-items: center;
  //  justify-content: flex-end;
  //  position: fixed;
  //  top: 0;
  //  right: 0;
  //  width: 100%;
  //  height: 3rem;
  //  padding: 0 3rem;
  //}
  //
  //.header-content {
  //  gap: 2rem;
  //}
</style>
