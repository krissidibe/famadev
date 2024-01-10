import { create } from "zustand";

interface useGlobalProp {
  isOpen: boolean;
  type: string;
  search?: string;
  name?: string;
  onOpen: () => void;
  setSearch: (i:string) => void;
  setType: (i:string) => void;
  onClose: () => void;
 
}

export const useCompetitionStore = create<useGlobalProp>((set) => ({
  isOpen: false,
  type: "",
  search: "", 
  onOpen: () => set({ isOpen: true }),
  setSearch: (i) => set((state) => ({ search:i })),
  setType: (i) => set((state) => ({ type:i })),
  onClose: () => set({ isOpen: false }),
 
}));


 /* 
  const useMenuStore = create((set) => ({
  index: -1,
  setMenuIndex: (i) => set((state) => ({ index:i })),
  removeAllindex: () => set({ index: 0 }),
}))

 
 */