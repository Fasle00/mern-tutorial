import { create } from "zustand"

export const useCartStore = create((set) => ({
    carts: [],
    setCarts: (cart) => set({ carts }),
    createCart: async (newCart) => {
        if (!newCart.id || !newCart.color || !newCart.size || !newCart.quantity) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/carts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCart),
        });
        const data = await res.json();
        set((state) => ({ carts: [...state.carts, data.data] }));
        return { success: true, message: "Cart created successfully" };
 },
 fetchCarts: async () => {
    const res = await fetch("/api/carts");
    const data = await res.json();
    set({ carts: data.data });
  },
  deleteCart: async (pid) => {
    const res = await fetch(`/api/carts/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
     carts: state.carts.filter((cart) => cart._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateCart: async (pid, updatedCart) => {
    const res = await fetch(`/api/carts/${pid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCart),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    
    

    set((state) => ({
        carts: state.carts.map((cart) => (cart._id === pid ? data.data : cart)),
    }));

    return { success: true, message: data.message };
  },
}))