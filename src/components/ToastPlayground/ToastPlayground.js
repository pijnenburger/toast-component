import React from "react";

import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("This is a toast message");
  const [variant, setVariant] = React.useState("notice");
  // const [viewToast, setViewToast] = React.useState(false);

  const [toasts, setToasts] = React.useState([]);

  function variantHandler(event) {
    setVariant(event.target.value);
    // console.log(event.target.value);
  }

  function messageHandler(event) {
    setMessage(event.target.value);
    // console.log(event.target.value);
  }

  function resetForm() {
    setMessage("");
    setVariant("notice");
  }

  function addToast(event) {
    if (message === "") {
      return;
    }
    event.preventDefault();
    const newToast = { message, variant, id: crypto.randomUUID() };
    const nextToasts = [...toasts, newToast];
    setToasts(nextToasts);

    resetForm();
  }

  function removeToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toasts={toasts} removeToast={removeToast} />

      {/* {viewToast && (
        <Toast toggleToast={toggleToast} variant={variant} />
      )} */}
      <form className={styles.controlsWrapper} onSubmit={addToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              required={true}
              onChange={messageHandler}
              id="message"
              minLength={1}
              maxLength={100}
              value={message}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;

              return (
                <label htmlFor={id} key={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={variantHandler}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={addToast}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
