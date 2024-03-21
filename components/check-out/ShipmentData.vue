<template>
  <form class="flex flex-col gap-4">
    <!--    <InputComponent :placeholder="'company'" v-model="company" class="w-full"/>-->
    <InputComponent :identifier="'first_name'" :placeholder="'Vorname'" v-model="first_name" class="w-full"
                    ref="first_name"
                    :is-required="true"/>
    <InputComponent :identifier="'second_name'" :placeholder="'Nachname'" v-model="last_name" class="w-full"
                    ref="last_name"
                    :is-required="true"/>

    <InputComponent :identifier="'email'" :placeholder="'E-Mail'" :input-type="'email'" class="w-full" ref="email"
                    :is-required="true"/>
    <SelectComponent :identifier="'country_code'" :values="['Österreich', 'Deutschland']"
                     :on-select="handleCountryChange"
                     class="mt-1 mb-1"
    />
    <InputComponent :identifier="'address'" :placeholder="'Straße und Hausnummer'" class="w-full" ref="address_1"
                    :is-required="true"/>
    <div class="flex gap-5">
      <InputComponent :identifier="'city'" :placeholder="'Stadt'" class="w-2/3" ref="city" :is-required="true"/>
      <InputComponent :identifier="'postal_code'" :placeholder="'PLZ'" class="w-1/3" ref="postal_code"
                      :is-required="true"/>
    </div>
    <InputComponent :identifier="'phone'" :placeholder="'Telefon Nr.:'" :input-type="'tel'" class="w-full" ref="phone"/>
  </form>
  <CTAButton :content="'Zur Bezahlung'" :on-click="addShipmentData" class="fixed bottom-5 right-5"
             :is-loading="isLoading"/>
</template>

<script setup lang="ts">
  import InputComponent from "~/components/utils/InputComponent.vue";
  import SelectComponent from "~/components/utils/SelectComponent.vue";
  import {useMedusaClient} from "#imports";
  import {useBackendDataStore} from "~/store/backendData";
  import CTAButton from "~/components/utils/CTAButton.vue";
  import {navigateTo} from "#app";

  const client = useMedusaClient();
  const backendData = useBackendDataStore();

  const country_code = ref('at');
  const first_name = ref<InstanceType<typeof InputComponent> | null>(null);
  const last_name = ref<InstanceType<typeof InputComponent> | null>(null);
  const email = ref<InstanceType<typeof InputComponent> | null>(null);
  const address_1 = ref<InstanceType<typeof InputComponent> | null>(null);
  const city = ref<InstanceType<typeof InputComponent> | null>(null);
  const postal_code = ref<InstanceType<typeof InputComponent> | null>(null);
  const phone = ref<InstanceType<typeof InputComponent> | null>(null);

  const isLoading = ref(false);

  const wrapRefs = () => {
    return [
      first_name,
      last_name,
      email,
      address_1,
      city,
      postal_code,
      phone
    ];
  };

  const validateFields = (): boolean => {
    let valid = true;
    wrapRefs().forEach((inputField) => {
      if (!inputField.value || !inputField.value.validate()) {
        valid = false;
      }
    });
    return valid;
  };

  const handleCountryChange = (selectedValue: string): void => {
    if (selectedValue === 'Österreich') {
      country_code.value = 'at';
    }
    if (selectedValue === 'Deutschland') {
      country_code.value = 'de';
    }
  };


  const addShipmentData = async () => {
    if (!validateFields()) {
      return;
    }

    isLoading.value = true;
    const regions = await client.regions.list();
    if (!backendData.cart) {
      return;
    }
    // ATTENTION!! Hardcoded because only one region for this shop
    // await client.carts.update(backendData.cart.id, {region_id: regions.regions[0].id});
    await backendData.changeCartRegionId(regions.regions[0].id);
    await backendData.addShipmentData({
      company: '',
      first_name: first_name.value.inputVal,
      last_name: last_name.value.inputVal,
      address_1: address_1.value.inputVal,
      address_2: '',
      city: city.value.inputVal,
      country_code: country_code.value,
      province: '',
      postal_code: postal_code.value.inputVal,
      phone: phone.value.inputVal,
    });
    await backendData.loadShipmentOptions();
    if (!backendData.shipmentOptions) {
      console.warn('no shipment options available');
      return;
    }
    // ATTENTION!! Hardcoded because only one region for this shop
    await backendData.addShipmentMethod(backendData.shipmentOptions.shipping_options[0].id!);
    if (!email.value) {
      console.warn('no email in input field');
      return;
    }
    await backendData.addGuestUser(email.value.inputVal);

    isLoading.value = false;
    navigateTo('/payment');
  };


</script>

<style scoped lang="scss">

</style>
