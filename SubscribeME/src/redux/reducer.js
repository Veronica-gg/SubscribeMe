import { createSlice } from "@reduxjs/toolkit";
import { sortSubsArrayByDate } from "../utils/dateUtils";

const initialState = {
  name: "",
  email: "",
  subs: [],
  friends: [],
  pendingFriendsRecv: [],
  pendingFriendsSent: [],
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    updateSubs: (state, action) => {
      state.subs = sortSubsArrayByDate(action.payload.subs);
    },
    updateFriends: (state, action) => {
      state.friends = action.payload.friends;
      state.pendingFriendsRecv = action.payload.pendingFriendsRecv;
      state.pendingFriendsSent = action.payload.pendingFriendsSent;
    },
    updateProfile: (state, action) => {
      if (action.payload.name) {
        state.name = action.payload.name;
      }
      state.email = action.payload.email;
    },
  },
});

export const { updateSubs, updateFriends, updateProfile } = stateSlice.actions;

export default stateSlice.reducer;
