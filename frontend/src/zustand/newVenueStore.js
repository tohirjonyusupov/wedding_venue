import {create} from 'zustand';

export const useNewVenueStore = create((set) => ({
  newVenue: {
    name: "",
    capacity: "",
    price_seat: "",
    address: "Toshkent",
    phone_number: "",
    district_id: "",
    owner_id: "",
    images: []
  },
  activeSection: "basic",
  setActiveSection: (section) => set(() => ({
    activeSection: section
  })),
  setNewVenue: (newValue) => set((state) => ({
    newVenue: {
      ...state.newVenue,
      ...newValue
    }
  })),
  resetNewVenue: () => set(() => ({
    newVenue: {
      name: "",
      capacity: "",
      price_seat: "",
      address: "Toshkent",
      phone_number: "",
      district_id: "",
      owner_id: "",
      images: []
    }
  }))
}));