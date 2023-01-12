import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Pet from "../../Types/Pet";

const initialState: {
  newPets: Pet[];
  newAvailablePets: Pet[];
  pet: Pet | null;
} = {
  pet: null,
  newPets: [],
  newAvailablePets: [],
};

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setPet(state, action: PayloadAction<Pet | null>) {
      state.pet = action.payload;
    },
    setNewPets(state, action: PayloadAction<Pet[]>) {
      state.newPets = action.payload;
    },
    setNewAvailablePets(state, action: PayloadAction<Pet[]>) {
      state.newAvailablePets = action.payload;
    },
  },
});

export default petSlice.reducer;
