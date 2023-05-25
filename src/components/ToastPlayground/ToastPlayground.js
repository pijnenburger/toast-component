import React from "react";

import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { addToast } = React.useContext(ToastContext);

  const [message, setMessage] = React.useState("This is a toast message");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  function variantHandler(event) {
    setVariant(event.target.value);
    // console.log(event.target.value);
  }

  function messageHandler(event) {
    setMessage(event.target.value);
    // console.log(event.target.value);
  }

  function submitForm(event) {
    if (message === "") {
      return;
    }
    event.preventDefault();
    addToast(message, variant);
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  const dynamicColor = React.useMemo(() => {
    const minValue = 0;
    const maxValue = 100;
    const minColor = [153, 153, 153]; // [R, G, B]
    const maxColor = [255, 0, 0]; // [R, G, B]

    // Map the message.length value to the corresponding color
    const proportionalValue =
      (message.length - minValue) / (maxValue - minValue);

    // Interpolate between the minColor and maxColor
    const interpolatedColor = minColor.map((channel, index) =>
      Math.floor(channel + proportionalValue * (maxColor[index] - channel))
    );

    return `rgba(${interpolatedColor.join(", ")})`;
  }, [message]);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />

      {/* {viewToast && (
        <Toast toggleToast={toggleToast} variant={variant} />
      )} */}
      <form className={styles.controlsWrapper} onSubmit={submitForm}>
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
              maxLength={100}
              value={message}
              className={styles.messageInput}
            />
            <p
              className={styles.counter}
              style={{ fontSize: "12px", color: dynamicColor }}
            >
              {message.length}/100
            </p>
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
            <Button onClick={submitForm}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
