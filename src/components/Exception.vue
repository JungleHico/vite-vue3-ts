<template>
  <a-result
    v-if="result"
    :status="result.status"
    :title="result.title"
    :sub-title="result.subTitle"
  >
    <template #extra>
      <a-button type="primary" @click="onBackHome">首页</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  interface Props {
    status: number;
  }
  interface Result {
    status: number;
    title: string;
    subTitle: string;
  }

  const resultList: Result[] = [
    {
      status: 403,
      title: '403',
      subTitle: '对不起，您没有访问权限',
    },
    {
      status: 404,
      title: '404',
      subTitle: '对不起，您访问的页面不存在',
    },
    {
      status: 500,
      title: '500',
      subTitle: '对不起，服务器出错了',
    },
  ];
  const props = defineProps<Props>();
  const result = resultList.find((item) => item.status === props.status);

  const router = useRouter();
  const onBackHome = () => {
    router.push('/');
  };
</script>

<style scoped></style>
