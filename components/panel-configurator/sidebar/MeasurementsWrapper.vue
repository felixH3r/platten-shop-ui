<template>
  <h4>{{ header }}</h4>
  <input :placeholder="props.inputPlaceholder" class="measurement-input" @input="saveInput" ref="measurementInput">
</template>

<script lang="ts" setup>
  import {useMainStore} from "~/store/mainStore";
  import {usage} from "browserslist";

  const measurementInput = ref<HTMLInputElement | null>(null);

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
  })

  const mainStore = useMainStore();
  const saveInput = (_event: InputEvent) => {
    if (!measurementInput.value) {
      return
    }
    if (props.usage === 'width') {
      mainStore.setWidth(parseInt(measurementInput.value.value));
    } else if (props.usage === 'length') {
      mainStore.setLength(parseInt(measurementInput.value.value));
    }
  }

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
