<template>
  <div class="sidebar-thickness">
    <h4>Material Dicke:</h4>
    <div class="thickness-options">
      <toggle-button v-for="(value, index) in thicknessValues" :value="value" :onSelect="onSelect"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ToggleButton from "~/components/panel-configurator/ToggleButton.vue";
  import {useMainStore} from "~/store/mainStore";

  const mainStore = useMainStore();

  const thicknessValues = ref([8, 19, 25, 32]);
  mainStore.setThickness(thicknessValues.value[0]);
  const onSelect = (value: number) => {
    mainStore.setThickness(value);
  }

</script>

<style scoped lang="scss">
  .thickness-options {
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em 2rem;
  }
</style>
