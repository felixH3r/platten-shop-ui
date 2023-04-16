<template>
  <div class="toggle-button flex-center" :class="{'toggled': toggled}" @click="props.onSelect(value)">
    <span>{{ props.value }}</span>
    <span>{{ TC.dimensions.MM }}</span>
  </div>
</template>

<script lang="ts" setup>
  import {TC} from "../utils/text-content";
  import {useMainStore} from "~/store/mainStore";

  const mainStore = useMainStore();
  const props = defineProps({
    value: Number,
    onSelect: Function
  });

  const toggled = computed(() => {
    return mainStore.panelConfigurator.thickness === props.value
  })

</script>

<style scoped lang="scss">
  .toggle-button {
    background-color: white;
    border-radius: $le_ri_fully_rounded;
    width: 5.5rem;
    height: 2.5rem;
    gap: 0.5rem;
    cursor: pointer;
  }

  .toggled {
    border: solid 1px black;
    font-weight: $font-thicker;
  }

</style>
