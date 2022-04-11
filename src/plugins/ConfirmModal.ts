import { Modal, ModalFuncProps } from 'ant-design-vue';
import 'ant-design-vue/es/modal/style/css';
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const ConfirmModal = {
  info(options: ModalFuncProps) {
    return Modal.confirm({
      icon: createVNode(ExclamationCircleOutlined),
      okType: 'primary',
      autoFocusButton: 'cancel',
      ...options
    });
  },
  error(options: ModalFuncProps) {
    return Modal.confirm({
      icon: createVNode(ExclamationCircleOutlined, {
        style: { color: '#ff4d4f' }
      }),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelButtonProps: { danger: true },
      autoFocusButton: 'cancel',
      ...options
    });
  }
};

export default ConfirmModal;
