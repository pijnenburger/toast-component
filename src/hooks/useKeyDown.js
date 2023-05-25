import React from "react";
/**
 * Custom hook to handle keydown events.
 * @param {string} key - The keyboard key to listen for.
 * @param {function} action - The function to execute when the key is fired.
 */

function useKeyDown(key, action) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === key) {
        action();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, action]);
}

export default useKeyDown;
