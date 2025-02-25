import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { RFI } from "./types"

interface RFIStore {
  rfis: RFI[]
  addRFI: (rfi: RFI) => void
  updateRFI: (id: number, rfi: Partial<RFI>) => void
  deleteRFI: (id: number) => void
}

export const useRFIStore = create<RFIStore>()(
  persist(
    (set) => ({
      rfis: [],
      addRFI: (rfi) =>
        set((state) => ({
          rfis: [...state.rfis, rfi],
        })),
      updateRFI: (id, updatedRFI) =>
        set((state) => ({
          rfis: state.rfis.map((rfi) => (rfi.id === id ? { ...rfi, ...updatedRFI } : rfi)),
        })),
      deleteRFI: (id) =>
        set((state) => ({
          rfis: state.rfis.filter((rfi) => rfi.id !== id),
        })),
    }),
    {
      name: "rfi-storage",
    },
  ),
)

