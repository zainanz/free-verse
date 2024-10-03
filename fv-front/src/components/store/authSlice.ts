import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
type UserType = {
  username: string | null,
  isLoggedIn: boolean,
}
const initialState: UserType = {
  username: null,
  isLoggedIn: false
}


const likePost = createAsyncThunk("auth/likePost", (postid : Number) => {

})

const authSlice = createSlice( {
  name:"auth",
  initialState,
  reducers: {

  }
})
export default authSlice.reducer;
