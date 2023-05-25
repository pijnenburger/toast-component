import React from "react";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  // const [message, setMessage] = React.useState("This is a toast message");
  // const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: "It works!",
      variant: "success",
    },
  ]);

  function addToast(message, variant) {
    const newToast = { message, variant, id: crypto.randomUUID() };
    const nextToasts = [...toasts, newToast];
    setToasts(nextToasts);
  }

  function removeToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  // On 'escape' reset the toasts to
  useKeyDown("Escape", () => {
    setToasts([]);
  });

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
