<template>
  <exception :status="404"></exception>
</template>

<script lang="ts">
export default {
  name: 'Exception404',
};
</script>

<script setup lang="ts">
import Exception from '@/components/Exception.vue';
</script>
