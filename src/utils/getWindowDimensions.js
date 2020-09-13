/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

// return action window dimensions
function getWindowDimensions() {
  // const window = {};
  const dimensions = { height: window.innerHeight, width: window.innerWidth };
  return dimensions;
}

// get current window dimensions
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
