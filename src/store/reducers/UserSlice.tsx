import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../Types/User";

const initialState: { user: User | null } = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
