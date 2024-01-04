<template>
  <Checkbox :label="'Abweichende Rechnungsadresse'" :on-checked="handleChange"/>
  <form class="flex flex-col gap-5" v-if="showInvoiceForm">
    <!--    <InputComponent :placeholder="'company'" v-model="company" class="w-full"/>-->
    <InputComponent :placeholder="'Vorname'" v-model="first_name" class="w-full"/>
    <InputComponent :placeholder="'Nachname'" v-model="last_name" class="w-full"/>

    <InputComponent :placeholder="'E-Mail'" :input-type="'email'" v-model="address_1" class="w-full"/>
    <SelectComponent :values="['Österreich', 'Deutschland']" :on-select="handleCountryChange"/>
    <InputComponent :placeholder="'Straße und Hausnummer'" v-model="city" class="w-full"/>
    <div class="flex gap-5">
      <InputComponent :placeholder="'Stadt'" v-model="city" class="w-2/3"/>
      <InputComponent :placeholder="'PLZ'" v-model="postal_code" class="w-1/3"/>
    </div>
    <InputComponent :placeholder="'Telefon Nr.:'" :input-type="'tel'" v-model="phone" class="w-full"/>
  </form>
</template>

<script setup lang="ts">
  import InputComponent from "~/components/utils/InputComponent.vue";
  import SelectComponent from "~/components/utils/SelectComponent.vue";
  import Checkbox from "~/components/utils/Checkbox.vue";

  const country_code = ref('');
  const first_name = ref('');
  const last_name = ref('');
  const address_1 = ref('');
  const city = ref('');
  const postal_code = ref('');
  const phone = ref('');

  const showInvoiceForm = ref(false);

  const handleCountryChange = (selectedValue: string): void => {
    if (selectedValue === 'Österreich') {
      country_code.value = 'at';
    }
    if (selectedValue === 'Deutschland') {
      country_code.value = 'de';
    }
  };

  const handleChange = (checked: boolean): void => {
    showInvoiceForm.value = checked;
  };
</script>

<style scoped lang="scss">

</style>
