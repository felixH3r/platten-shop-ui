<template>
  <div class="flex gap-5 items-center p-3 bg-white rounded-xl shadow-sm cursor-pointer"
       :class="{border: checked}" @click="onClick"
  >
    <div class="flex flex-col justify-center gap-2 h-10 w-10">
      <slot></slot>
    </div>
    <span>{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    paymentKey: string,
    content: string,
    checked: boolean,
    selectPayment: (paymentKey: string) => void
  }>();

  const onClick = () => {
    props.selectPayment(props.paymentKey);
  };
</script>

<style scoped lang="scss">

</style>
