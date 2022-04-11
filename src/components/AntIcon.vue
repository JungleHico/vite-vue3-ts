<template>
  <icon></icon>
</template>

<script setup lang="ts">
import * as Icons from '@ant-design/icons-vue';

const props = defineProps<{ icon: string }>();

const Icon = (Icons as any)[props.icon];
</script>

<style scoped></style>
