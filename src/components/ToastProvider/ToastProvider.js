import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = React.useState("This is a toast message");
  const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);

  return (
    <ToastContext.Provider value={{ toasts }}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
