import { toast } from "sonner";

export const ToastSuccess = (text) => {
  toast.success(text, {
    icon: "✅",
    duration: 2000, // ⬅️ reemplaza autoClose
    position: "top-center",
  });
};

export const ToastSuccessFirma = (text) => {
  toast.success(text, {
    duration: 2000,
  });
};

export const ToastError = (text) => {
  toast.error(text, {
    icon: "❌",
    duration: 3000,
    position: "top-center",
  });
};

export const ToastWarning = (text) => {
  toast.warning(text, {
    duration: 10000,
  });
};

export const ToastWarningConfirm = (text) => {
  toast.warning(text, {
    duration: Infinity, // no se cierra solo
    position: "top-center",
    style: {
      borderColor: "red",
      borderWidth: "1px",
    },
    action: {
      label: "OK",
      onClick: () => {
        toast.dismiss(); // cierra el toast
      },
    },
  });
};
