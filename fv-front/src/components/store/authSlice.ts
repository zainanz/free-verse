import { createSlice } from "@reduxjs/toolkit";
type UserType = {
  username: string | null,
  isLoggedIn: boolean,
}
const initialState: UserType = {
  username: null,
  isLoggedIn: false
}

const authSlice = createSlice( {
  name:"auth",
  initialState,
  reducers: {

  }
})
export default authSlice.reducer;
