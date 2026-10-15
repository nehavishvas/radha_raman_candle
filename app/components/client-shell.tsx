"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { 
  initializeCart, 
  closeLoginModal, 
  closeCheckoutModal, 
  openCheckoutModal, 
  openLoginModal 
} from "../store/cartSlice";
import Header from "./header";
import Footer from "./footer";
import CartSidebar from "./cart-sidebar";
import CheckoutModal from "./checkout-modal";
import LoginModal from "./login-modal";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isLoginOpen, loginMessage, isCheckoutOpen } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <Footer />

      {/* Global Modals & Sidebars */}
      <CartSidebar
        onCheckout={() => dispatch(openCheckoutModal())}
        onRequireLogin={(msg) => dispatch(openLoginModal(msg))}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => dispatch(closeCheckoutModal())}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => dispatch(closeLoginModal())}
        message={loginMessage}
      />
    </div>
  );
}
