import { create } from "zustand"

export const useCartStore = create((set) => ({
  carts: [],
  setCarts: (cart) => set({ carts }),
  createCart: async (newCart) => {

    if (!newCart._id || !newCart.color || !newCart.size || !newCart.amount) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("/api/users/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCart),
    });

    const data = await res.json();
    console.log(data)
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({ carts: [...state.carts, data.cart] }));
    return { success: true, message: "Item added to cart" };
  },
  fetchCarts: async () => {
    const res = await fetch("/api/users/cart");
    const data = await res.json();
    console.log(data);
    set({ carts: data.cart });
  },
  deleteCartItem: async (cartId, cartColor, cartSize) => {
    const res = await fetch(`/api/users/cart`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: cartId, color: cartColor, size: cartSize }),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      carts: state.carts.filter((cart) => cart._id !== cartId || cart.color !== cartColor || cart.size !== cartSize),
    }));
    return { success: true, message: data.message };
  },
  updateCartItem: async (updatedCart) => {
    const res = await fetch(`/api/users/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCart),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };



    set((state) => ({
      cart: state.cart.map((cart) => (cart._id === _id ? data.cart : cart)),
    }));

    return { success: true, message: data.message };
  },
}))