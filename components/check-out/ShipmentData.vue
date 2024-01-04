<template>
  <form class="flex flex-col gap-5">
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
  import {useMedusaClient} from "#imports";
  import {useBackendDataStore} from "~/store/backendData";

  const client = useMedusaClient();
  const backendData = useBackendDataStore();
  const country_code = ref('');
  const first_name = ref('');
  const last_name = ref('');
  const address_1 = ref('');
  const city = ref('');
  const postal_code = ref('');
  const phone = ref('');

  const handleCountryChange = (selectedValue: string): void => {
    if (selectedValue === 'Österreich') {
      country_code.value = 'at';
    }
    if (selectedValue === 'Deutschland') {
      country_code.value = 'de';
    }
  };

  const addShipmentData = async () => {
    const regions = await client.regions.list();
    console.log(regions, 'regions');
    if (!backendData.cart) {
      return;
    }
    await client.carts.update(backendData.cart.id, {region_id: regions.regions[0].id});
    await backendData.addShipmentData({
      company: '',
      first_name: first_name.value,
      last_name: last_name.value,
      address_1: address_1.value,
      address_2: '',
      city: city.value,
      country_code: country_code.value,
      province: '',
      postal_code: postal_code.value,
      phone: phone.value,
    });
    console.log('added');
    console.log(await backendData.listShipmentOptions(), 'shipment options');
    if (!backendData.shipmentOptions) {
      return;
    }
    await client.carts.addShippingMethod(backendData.cart.id, {option_id: backendData.shipmentOptions.shipping_options[0].id!});
  };


</script>

<style scoped lang="scss">

</style>
