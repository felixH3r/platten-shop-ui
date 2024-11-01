// stores/useFormStore.js
import {defineStore} from 'pinia';
import {computed, reactive} from 'vue';
import type {ShipmentData} from "~/store/backendData";

export const useFormStore = defineStore('form', () => {
  // Form data
  const shipmentFormData: ShipmentData = reactive({
    company: '',
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    country_code: '',
    province: '',
    postal_code: '',
    phone: '',
  });

  const userEmail = ref('');
  const gdpr = ref(false);
  const submitted = ref(false);

  const $reset = () => {
    submitted.value = false;
    gdpr.value = false;
    userEmail.value = '';
    shipmentFormData.company = '';
    shipmentFormData.first_name = '';
    shipmentFormData.last_name = '';
    shipmentFormData.address_1 = '';
    shipmentFormData.address_2 = '';
    shipmentFormData.city = '';
    shipmentFormData.country_code = '';
    shipmentFormData.province = '';
    shipmentFormData.postal_code = '';
    shipmentFormData.phone = '';
  };

  // Validation rules: form should not be empty and email should be valid
  const isValidEmail = computed(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(userEmail.value);
  });

  // Computed property to check if a field is empty
  const checkShipmentForm = computed(() => {
    return {
      firstName: shipmentFormData.first_name.trim() === '' && submitted.value,
      lastName: shipmentFormData.last_name.trim() === '' && submitted.value,
      email: userEmail.value.trim() === '' && submitted.value,
      street: shipmentFormData.address_1.trim() === '' && submitted.value,
      city: shipmentFormData.city.trim() === '' && submitted.value,
      postalCode: shipmentFormData.postal_code.trim() === '' && submitted.value,
      shipmentFormData: shipmentFormData.phone.trim() === '' && submitted.value
    };
  });

  // Computed property to check if the form is empty
  const isShipmentFormEmpty = computed(() => {
    return !shipmentFormData.first_name.trim() ||
        !shipmentFormData.last_name.trim() ||
        !userEmail.value.trim() ||
        !shipmentFormData.address_1.trim() ||
        !shipmentFormData.city.trim() ||
        !shipmentFormData.postal_code.trim() ||
        !shipmentFormData.phone.trim();
  });

  // Computed property to check if the form is valid
  const isShipmentFormValid = computed(() => {
    return !isShipmentFormEmpty.value && isValidEmail.value;
  });

  // Action to submit form (can add your API call here)
  const checkForm = (): boolean => {
    submitted.value = true;
    if (isShipmentFormEmpty.value) {
      return false;
    } else {
      return true;
    }


    // if (!isFormValid.value) {
    //   alert('Bitte alle Felder ausfüllen und auf gültige Email-Adresse prüfen!');
    //   return;
    // }
    // if (!gdpr.value) {
    //   alert('Bitte Datenschutzerklärung akzeptieren!');
    //   return;
    //   // You can clear the form or handle the success case here
    // }
  };

  return {
    gdpr,
    submitted,
    isValidEmail,
    $reset,
    checkShipmentForm,
    isShipmentFormEmpty,
    isShipmentFormValid,
    checkForm,
    shipmentFormData,
    userEmail,
  };
});
