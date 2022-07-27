<template>
  <exception :status="500"></exception>
</template>

<script lang="ts">
export default {
  name: 'Exception500',
};
</script>

<script setup lang="ts">
import Exception from '@/components/Exception.vue';
</script>
