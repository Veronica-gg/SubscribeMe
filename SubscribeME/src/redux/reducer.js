import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  subs: [],
  friends: [],
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    updateSubs: (state, action) => {
      state.subs = action.payload.subs;
    },
    updateFriends: (state, action) => {
      state.friends = action.payload.friends;
    },
    updateProfile: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { updateSubs, updateFriends, updateProfile } = stateSlice.actions;

export default stateSlice.reducer;
