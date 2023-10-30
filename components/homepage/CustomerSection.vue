<template>
  <section>
    <h2>{{ TC.customerSection.header }}</h2>
    <div class="flex flex-col md:flex-row justify-between md:gap-8">
      <CustomerCard
          :image-src="'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
          :name="TC.customerSection.name_1"
          :content="TC.customerSection.content_1"/>
      <CustomerCard
          :image-src="'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
          :name="TC.customerSection.name_2"
          :content="TC.customerSection.content_2"/>
      <CustomerCard
          :image-src="'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
          :name="TC.customerSection.name_3"
          :content="TC.customerSection.content_3"/>
    </div>
  </section>
</template>

<script setup lang="ts">

  import CustomerCard from "~/components/utils/CustomerCard.vue";
  import {TC} from "../../utils/text-content";
</script>

<style scoped lang="scss">

</style>
