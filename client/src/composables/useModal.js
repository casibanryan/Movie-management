import { ref, nextTick } from "vue";
import { Modal } from "bootstrap";

export default function useModal() {
  const modalRef = ref(null);
  const modalInstance = ref(null);

  const modalConfig = ref({
    title: "Modal title",
    body: "",
    primaryText: "Save",
    secondaryText: "Close",
    size: "", 
    primaryClass: "btn-primary",
    secondaryClass: "btn-secondary",
  });

  let resolvePromise;

  function showModal(config = {}) {
    // Merge default config
    Object.assign(modalConfig.value, config);

    return new Promise((resolve) => {
      resolvePromise = resolve;

      nextTick(() => {
        if (!modalInstance.value) {
          modalInstance.value = new Modal(modalRef.value);
          // Make sure cancel also resolves as false
          modalRef.value.addEventListener("hidden.bs.modal", () => {
            resolvePromise?.(false);
          });
        }
        modalInstance.value.show();
      });
    });
  }

  function handleConfirm() {
    resolvePromise?.(true);
    modalInstance.value?.hide();
  }

  function handleCancel() {
    resolvePromise?.(false); 
    modalInstance.value?.hide();
  }

  return {
    modalRef,
    modalConfig,
    showModal,
    handleConfirm,
    handleCancel,
  };
}
