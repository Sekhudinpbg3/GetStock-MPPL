import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "Profile",
  initialState: {
    profile: {
      id: "QzXcfrT6JioYb8",
      name: "Sekhudin",
      image: "error.jpg",
      email: "Sekhudinpbg3@gmail.com",
    },
    token: {
      token: "wejjnjf.diijdfnsnf.eiKNJfiNCJKN",
      decoded: "ini adalah decoded token",
    },
  },
  reducers: {
    profileSetLogin: (state, action) => {
      console.log(action);
      state.profile.name = "Telah diubah";
    },
  },
});

export default User;
