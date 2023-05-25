import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState("notice");

  function variantHandler(event) {
    setSelectedVariant(event.target.value);
    console.log(event.target.value);
  }

  function messageHandler(event) {
    setMessage(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <div className={styles.controlsWrapper}>
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
              onChange={messageHandler}
              id="message"
              value={message}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((type) => {
              return (
                <label htmlFor={`variant-${type}`} key={type}>
                  <input
                    id={`variant-${type}`}
                    type="radio"
                    name="variant"
                    value={type}
                    checked={selectedVariant === type}
                    onChange={variantHandler}
                  />
                  {type}
                </label>
              );
            })}

            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
