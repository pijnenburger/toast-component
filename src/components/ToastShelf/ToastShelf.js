import React from "react";

import { ToastContext } from "../ToastProvider/ToastProvider";
import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ removeToast, toasts }) {
  // const { toasts } = React.useContext(ToastContext);
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ variant, message, id }) => {
        return (
          <li className={styles.toastWrapper} key={id}>
            <Toast id={id} removeToast={removeToast} variant={variant}>
              {message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
