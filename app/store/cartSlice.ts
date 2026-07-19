import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  fragranceNotes?: string[];
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
  isLoggedIn: false,
  user: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("radharaman_cart");
          state.items = stored ? JSON.parse(stored) : [];
          
          const loggedIn = localStorage.getItem("radharaman_loggedIn") === "true";
          const userStr = localStorage.getItem("radharaman_user");
          state.isLoggedIn = loggedIn;
          state.user = userStr ? JSON.parse(userStr) : null;
        } catch (e) {
          console.error("Failed to initialize cart from localStorage", e);
        }
      }
    },
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const quantityToAdd = action.payload.quantity ?? 1;

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.items.push({
          ...action.payload,
          quantity: quantityToAdd,
        });
      }
      
      if (typeof window !== "undefined") {
        localStorage.setItem("radharaman_cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("radharaman_cart", JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("radharaman_cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("radharaman_cart");
      }
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("radharaman_loggedIn", "true");
        localStorage.setItem("radharaman_user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("radharaman_loggedIn");
        localStorage.removeItem("radharaman_user");
      }
    },
  },
});

export const {
  initializeCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  login,
  logout,
} = cartSlice.actions;

export default cartSlice.reducer;
