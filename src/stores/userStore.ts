import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (stuffToAdd: any) => set(() => ({ currentUser: stuffToAdd })),
}));

export default useUserStore;
