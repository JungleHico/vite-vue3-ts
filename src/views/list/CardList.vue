<template>
  <a-row :gutter="16">
    <a-col :span="8">
      <a-button class="new-btn" type="dashed">
        <plus-outlined></plus-outlined>
        新增卡片
      </a-button>
    </a-col>
    <a-col v-for="card in cardList" :key="card.title" :span="8">
      <a-card class="card" hoverable>
        <a-card-meta :title="card.title">
          <template #avatar>
            <a-avatar :src="card.logo" shape="square" />
          </template>
          <template #description>
            <div class="card-desc">{{ card.desc }}</div>
          </template>
        </a-card-meta>
        <template #actions>
          <a-tooltip title="编辑">
            <edit-outlined></edit-outlined>
          </a-tooltip>
          <a-tooltip title="删除">
            <delete-outlined></delete-outlined>
          </a-tooltip>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts" name="CardList">
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

interface Card {
  title: string;
  desc: string;
  logo: string;
}

const cardList = reactive<Card[]>([
  {
    title: 'Vue',
    desc: 'Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。',
    logo: 'https://v3.cn.vuejs.org/logo.png',
  },
  {
    title: 'Vite',
    desc: 'Vite 是一种新型前端构建工具，能够显著提升前端开发体验。',
    logo: 'https://cn.vitejs.dev/logo.svg',
  },
  {
    title: 'TypeScript',
    desc: 'TypeScript 是 JavaScript 类型的超集，它可以编译成纯 JavaScript。',
    logo: 'https://www.runoob.com/wp-content/uploads/2019/01/typescript-logo.jpg',
  },
  {
    title: 'Ant Design Vue',
    desc: 'ant-design-vue 为 Web 应用提供了丰富的基础 UI 组件。',
    logo: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
  },
  {
    title: 'Pinia',
    desc: 'Pinia 是一个 Vue 状态管理工具。',
    logo: 'https://pinia.vuejs.org/logo.svg',
  },
]);
</script>

<style scoped lang="less">
.new-btn {
  width: 100%;
  height: calc(100% - 16px);
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.45);
  &:hover {
    color: #40a9ff;
  }
}
.card {
  margin-bottom: 16px;
  .card-desc {
    height: 44px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    overflow: hidden;
  }
}
</style>
