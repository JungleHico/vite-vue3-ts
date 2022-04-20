<template>
  <a-modal
    :visible="visible"
    :title="title"
    :confirm-loading="loading"
    @ok="onOk"
  >
    <a-form v-bind="formItemLayout">
      <a-form-item v-if="action === 'edit'" label="ID">
        <a-input v-model:value="modelRef.id" disabled />
      </a-form-item>
      <a-form-item label="父节点">
        <a-tree-select
          v-model:value="modelRef.parentId"
          :tree-data="menuTree"
          :field-names="menuTreeFieldNames"
          :disabled="action === 'create'"
        />
      </a-form-item>
      <a-form-item label="路由name" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.name" placeholder="唯一英文字符串" />
      </a-form-item>
      <a-form-item label="路径" v-bind="validateInfos.path">
        <a-input v-model:value="modelRef.path" />
      </a-form-item>
      <a-form-item label="重定向">
        <a-input v-model:value="modelRef.redirect" />
      </a-form-item>
      <a-form-item label="菜单名称" v-bind="validateInfos.title">
        <a-input v-model:value="modelRef.title" />
      </a-form-item>
      <a-form-item label="图标">
        <a-auto-complete
          v-model:value="modelRef.icon"
          :options="iconOptions"
          :filter-option="iconFilterOption"
        >
          <template #option="{ value }">
            <a-space>
              <ant-icon :icon="value"></ant-icon>
              <span class="icon-name">{{ value }}</span>
            </a-space>
          </template>
        </a-auto-complete>
      </a-form-item>
      <a-form-item label="是否隐藏">
        <a-switch
          v-model:checked="modelRef.hidden"
          checked-children="是"
          un-checked-children="否"
        />
      </a-form-item>
      <a-form-item label="排序值">
        <a-input-number
          v-model:value="modelRef.sort"
          :min="0"
          :max="10000"
          :formatter="integerFormatter"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import AntIcon from '@/components/AntIcon.vue';
import * as Icons from '@ant-design/icons-vue';
import { Form } from 'ant-design-vue';
import { integerFormatter } from '@/utils/form';

type Props = {
  visible: boolean;
  action: Action;
  data?: MenuItem | null;
  menuList: MenuItem[];
};
type Emits = {
  (event: 'update:visible', value: boolean): void;
  (event: 'ok'): void;
};
type FormState = {
  id?: number;
  parentId: number;
  name: string;
  path: string;
  redirect: string;
  title: string;
  icon: string;
  hidden: boolean;
  sort: number | undefined;
};
type MenuTreeItem = {
  id: number;
  name: string;
  children?: MenuTreeItem[];
};
type Option = {
  value: string;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

// 标题
const title = computed(() => {
  return props.action === 'create'
    ? props.data
      ? '新增子菜单'
      : '新增根菜单'
    : '编辑菜单';
});
const loading = ref<boolean>(false);
// 表单布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
// 表单数据
const modelRef = reactive<FormState>({
  parentId: 0,
  name: '',
  path: '',
  redirect: '',
  title: '',
  icon: '',
  hidden: false,
  sort: undefined
});
// 表单验证规则
const rulesRef = reactive({
  name: [{ required: true, message: '请输入路由name' }],
  path: [{ required: true, message: '请输入路径' }],
  title: [{ required: true, message: '请输入菜单名称' }]
});
const { resetFields, validate, validateInfos } = Form.useForm(
  modelRef,
  rulesRef
);
const menuTree = computed(() => {
  const menuTree = getFormattedMenuTree(props.menuList);
  // 追加根节点
  menuTree.unshift({
    id: 0,
    name: '根节点'
  });
  return menuTree;
});
// 图标列表
const iconOptions = Object.keys(Icons).map((iconName: string) => ({
  value: iconName
}));

// 格式化父节点树形选择器（只保留id,name,children）
const getFormattedMenuTree = (menuList: MenuItem[]) => {
  const menuTree = [];
  for (const menuItem of menuList) {
    const menuTreeItem: MenuTreeItem = {
      id: menuItem.id,
      name: menuItem.name
    };
    if (menuItem.children) {
      menuTreeItem.children = getFormattedMenuTree(menuItem.children);
    }
    menuTree.push(menuTreeItem);
  }
  return menuTree;
};
// 父节点树形选择器自定义字段
const menuTreeFieldNames = {
  children: 'children',
  label: 'name',
  // key: 'id',
  value: 'id'
};
// 图标搜索
const iconFilterOption = (input: string, option: Option) => {
  return option.value.toUpperCase().includes(input.toUpperCase());
};

watch(
  () => props.visible,
  async (visible: boolean) => {
    if (visible) {
      // 编辑，初始化表单
      if (props.action === 'edit' && props.data) {
        modelRef.id = props.data.id;
        modelRef.parentId = props.data.parentId;
        modelRef.name = props.data.name;
        modelRef.path = props.data.path;
        modelRef.redirect = props.data.redirect || '';
        modelRef.title = props.data.meta.title;
        modelRef.icon = props.data.meta.icon;
        modelRef.hidden = props.data.meta.hidden;
      }
      // 新增子菜单，设置父节点为当前节点
      if (props.action === 'create' && props.data) {
        modelRef.parentId = props.data.parentId;
      }
    } else {
      // 关闭弹窗，重置表单
      resetFields();
    }
  }
);

const onOk = () => {
  validate().then(() => {
    console.log(toRaw(modelRef));
    if (props.action === 'create') {
      // TODO 新增接口
    } else {
      // TODO 更新接口
    }

    // 模拟接口
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      emits('ok');
    }, 1000);
  });
};
</script>

<style scoped></style>
