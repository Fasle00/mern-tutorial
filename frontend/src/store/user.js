import { create } from "zustand";

export const useUserStore = create((set) => ({
  users: [],
  setUsers: (user) => set({ user }),
  fetchUsers: async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    console.log("data", data);
    console.log("data.data", data.data);
    set({ users: data.data });
    
  },
  updateUsers: async (pid, updatedUser) => {
    

    const res = await fetch(`/api/users/${pid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    
    

    set((state) => ({
        Users: state.Users.map((User) => (User._id === pid ? data.data : User)),
    }));

    return { success: true, message: data.message };
  },
}));
