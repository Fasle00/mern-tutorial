import { create } from "zustand"

export const useCartStore = create((set) => ({
  carts: [],
  setCarts: (cart) => set({ carts }),
  createCart: async (newCart) => {
    if (!newCart.id || !newCart.color || !newCart.size || !newCart.quantity) {
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
    set((state) => ({ carts: [...state.carts, data.cart] }));
    return { success: true, message: "Cart created successfully" };
  }, 
  fetchCarts: async () => {
    const res = await fetch("/api/users/cart");
    const data = await res.json();
    console.log(data);
    set({ carts: data.cart });
  },
  deleteCartItem: async () => {
    const res = await fetch(`/api/users/cart`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      carts: state.carts.filter((cart) => cart._id !== pid),
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