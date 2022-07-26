import { ref } from 'vue';

interface getValue {
  value: any;
}

const getValue = (value: getValue): any => value.value;
export const useModalPromise = (node: Node): any => {
  const modalInstance = getValue(ref(<Node>node));
  const onHandleShow = (onClose: () => void) => {
    console.log(modalInstance);
  };
  return {
    onHandleShow
  };
};
