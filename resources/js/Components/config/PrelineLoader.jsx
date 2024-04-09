import React from 'react'
import { useEffect } from "react";

const isBrowser = typeof window !== undefined; // check if component is rendered in a browser

export default function PrelineLoader() {
    const path = window.location.pathname;

    useEffect(() => {
      if (isBrowser) {
        import("preline/preline").then((module) => {
              setTimeout(() => {
                window.HSStaticMethods.autoInit();
              }, 100);
          });
        }
    }, [])

  return (
    <></>
  )
}
