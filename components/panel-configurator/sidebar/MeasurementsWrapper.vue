<template>
  <h4>{{ header }}</h4>
  <input :placeholder="props.inputPlaceholder" class="measurement-input" @input="getInput" ref="measurementInput">
</template>

<script lang="ts" setup>
  import {DEFAULT_LENGTH, DEFAULT_WIDTH, useMainStore} from "~/store/mainStore";

  const measurementInput = ref<HTMLInputElement | null>(null);
  let timeout: NodeJS.Timeout | null = null;
  const debounce = (fnc: () => void, delayMs?: number) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fnc();
    }, delayMs || 500);
  };

  const props = defineProps({
    header: String,
    inputPlaceholder: String,
    usage: {
      type: String,
      required: true,
      validator(value: string) {
        return ['length', 'width'].includes(value);
      }
    }
  });

  onMounted(() => {
    measurementInput.value;
  });

  const mainStore = useMainStore();
  const getInput = (_event: InputEvent) => {
    debounce(saveInput);
  };

  const saveInput = () => {
    if (!measurementInput.value) {
      return;
    }
    if (props.usage === 'width') {
      if (!(!measurementInput.value.value || measurementInput.value.value === '')) {
      } else {
        mainStore.setWidth(DEFAULT_WIDTH);
      }
      mainStore.setWidth(parseInt(measurementInput.value.value));
    } else if (props.usage === 'length') {
      if (!measurementInput.value.value || measurementInput.value.value === '') {
        mainStore.setWidth(DEFAULT_LENGTH);
      }
      mainStore.setLength(parseInt(measurementInput.value.value));
    }
  };

</script>

<style scoped lang="scss">
  $input-padding: 1.5rem;
  .measurement-input {
    width: calc(100% - 2 * $input-padding);
    padding: 0 $input-padding;
    height: 2.5rem;
    font-family: $font-family-body;
    border: none;
    border-radius: $le_ri_fully_rounded;
  }
</style>
