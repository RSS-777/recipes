<template>
  <button :type="type" @click="emit('button-click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const emit = defineEmits(["button-click"]);
defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset' | undefined >,
    default: "button",
  },
});
</script>

<style scoped>
button {
  border: none;
  box-shadow: 0.5px 0.5px 3px 0 black;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  background-color: #db9d47;
}

button:hover {
  box-shadow: 0.5px 0.5px 1px 0 rgb(111, 111, 111);
  transform: scale(0.98);
}
</style>
