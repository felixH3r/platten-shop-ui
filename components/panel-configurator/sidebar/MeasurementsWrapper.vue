<template>
  <div class="flex justify-between flex-col md:justify-start md:items-start md:w-full">
    <h4 class="text-xs text-cta text-opacity-90 md:text-lg md:text-black">{{ header }}</h4>
    <input-component :input-type="'Number'" :placeholder="props.inputPlaceholder" :onInput="getInput"
                     :is-required="true"
                     ref="measurementInput" class="w-full">
      <span class="">{{ TC.dimensions.MM }}</span>
    </input-component>
  </div>
</template>

<script lang="ts" setup>
  import InputComponent from "~/components/utils/InputComponent.vue";
  import {boolean} from "@oclif/parser/lib/flags";
  import {DEFAULT_LENGTH, DEFAULT_WIDTH, usePanelConfiguratorStore} from "~/store/panelConfiguratorStore";
  import {debounce} from "~/utils/helper";
  import {$fetch} from "ofetch";

  const props = defineProps<{
    header: string,
    inputPlaceholder: string,
    usage: 'length' | 'width'
    maxValue: number
  }>();

  const panelConfiguratorStore = usePanelConfiguratorStore();
  let timeout: NodeJS.Timeout | null = null;

  const measurementInput = ref<{
    inputEl: HTMLInputElement | null,
    validate: (customErrMsg?: string, customValidate?: (input: string) => boolean) => boolean
  }>({
    inputEl: null,
    validate: () => false
  });

  onMounted(async () => {
    // measurementInput.value;
    if (!panelConfiguratorStore.selectedVariant) {
      panelConfiguratorStore.setSelectedVariant(panelConfiguratorStore.selectedPanel.variants[0]);
    }
    await saveInput();
  });

  const getInput = (_event: InputEvent, inputFieldValue: string) => {
    debounce(timeout, saveInput, 500);
  };

  const saveInput = async (): Promise<void> => {
    console.log(measurementInput.value, 'saveInput');
    if (!measurementInput.value) {
      return;
    }
    if (props.usage === 'width') {
      if (!measurementInput.value.inputEl || measurementInput.value.inputEl.value === '') {
        panelConfiguratorStore.panelInputForm.width = DEFAULT_WIDTH;
      } else {
        panelConfiguratorStore.panelInputForm.width = (parseInt(measurementInput.value.inputEl.value));
      }
    } else if (props.usage === 'length') {
      if (!measurementInput.value.inputEl || measurementInput.value.inputEl.value === '') {
        panelConfiguratorStore.panelInputForm.length = DEFAULT_LENGTH;
      } else {
        panelConfiguratorStore.panelInputForm.length = (parseInt(measurementInput.value.inputEl.value));
      }
    }
    console.log(panelConfiguratorStore.panelInputForm, 'panelInputForm');
    console.log(panelConfiguratorStore.selectedVariant, 'selectedVariant');
    
    await panelConfiguratorStore.calculatePrice();
  };

  const validateInput = (customErrMsg: string, customValidate: (input: string) => boolean): boolean => {
    if (measurementInput.value.validate(customErrMsg, customValidate)) {
      return true;
    }
    return false;
  };

  defineExpose({
    validateInput
  });

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
