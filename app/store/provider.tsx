"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { initializeCart } from "./cartSlice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeCart());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
