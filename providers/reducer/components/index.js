import { createSlice } from "@reduxjs/toolkit";

const Components = createSlice({
  name: "Components",
  initialState: {
    menu: {
      show: false,
    },
  },
  reducers: {
    menuSetHide: (state, actions) => {
      state.menu.show = !state.menu.show;
    },
  },
});

export default Components;
