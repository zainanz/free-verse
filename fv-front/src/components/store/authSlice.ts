import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axiosInstance';


type UserType = {
  user: User,
  isLoggedIn: boolean,
  isLoading: boolean,
  Error: string | null
}
const initialState: UserType = {
  user: {
    username: "",
    email: "",
    token: ""
  },
  isLoggedIn: false,
  isLoading: false,
  Error: null
}

export const loginUser = createAsyncThunk<User, UserLogin, { rejectValue: string }>("auth/loginUser", async (userdata: UserLogin, {rejectWithValue}) => {
  const postdata = {
    user: userdata
  }
  try {
  const response: any = await axios.post("/login", postdata, { withCredentials: true } )
  const data: User = (response.data)
  return data

  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'An unknown error occurred');
  }

})

const authSlice = createSlice( {
  name:"auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.Error = null;
      })
      .addCase(loginUser.fulfilled, (state, {payload}:{payload: User}) => {
        state.isLoading = false;
        console.log(payload)
      })
      // .addCase(loginUser.rejected, (state, {payload}:{payload: string}) => {
      //   state.isLoading = false;
      //   state.Error = payload; // Set error message
      // });
}
})
export default authSlice.reducer;
