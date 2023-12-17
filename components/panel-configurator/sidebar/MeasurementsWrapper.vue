<template>
  <div class="flex justify-between items-center gap-3 md:flex-col md:justify-start md:items-start">
    <h4>{{ header }}</h4>
    <input-component :placeholder="props.inputPlaceholder" :onInput="getInput" ref="measurementInput" class="w-full"/>
  </div>

</template>

<script lang="ts" setup>
  import {DEFAULT_LENGTH, DEFAULT_WIDTH, useMainStore} from "~/store/mainStore";
  import InputComponent from "~/components/utils/InputComponent.vue";

  const measurementInput = ref<{ inputEl: HTMLInputElement | null }>({inputEl: null});
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
  const getInput = (_event: InputEvent, inputFieldValue: string) => {
    debounce(saveInput);
  };

  const saveInput = () => {
    if (!measurementInput.value) {
      return;
    }
    if (props.usage === 'width') {
      if (!measurementInput.value.inputEl || measurementInput.value.inputEl.value === '') {
        mainStore.setWidth(DEFAULT_WIDTH);
      } else {
        mainStore.setWidth(parseInt(measurementInput.value.inputEl.value));
      }
    } else if (props.usage === 'length') {
      if (!measurementInput.value.inputEl || measurementInput.value.inputEl.value === '') {
        mainStore.setWidth(DEFAULT_LENGTH);
      } else {
        mainStore.setLength(parseInt(measurementInput.value.inputEl.value));
      }
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
