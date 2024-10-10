import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axiosInstance';
import Cookies from "js-cookie";



const initialState: UserType = {
  user: {
    username: "",
    email: "",
    created_at: "",
    updated_at: "",
    jti: "",
    id: null
  },
  isLoggedIn: false,
  isLoading: false,
  Error: null
}


export const getUserProfile = createAsyncThunk( "auth/getUserProfile", async (username: string) => {
    try{
     const response = await  axios.get(`/profile/${username}`)
      console.log(response.data)
      return response.data
    }catch(er){
      return er
    }
})


export const logOut = createAsyncThunk( "auth/logout", async () => {
  const res = await  axios.delete("/signout")
  return res
})

export const verifyUser = createAsyncThunk( "auth/verifyUser", async () => {
  try {

    const response  = await axios.get("/verify_user")
      return response.data
  }
  catch (error: any){
    throw new Error(error.response?.data)
  }
})

export const loginUser = createAsyncThunk<LoginData, UserLogin, { rejectValue: string }>(
  "auth/loginUser",
  async (userdata: UserLogin, { rejectWithValue }) => {
    const postdata = {
      user: userdata
    };

    try {
      const response = await axios.post("/login", postdata, { withCredentials: true });
      const data: LoginData = response.data;

      // Set the JWT token in cookies
      Cookies.set("token", data.token!, { sameSite: "None", secure: true });
      // Return token and message
      return data;

    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An unknown error occurred");
    }
  }
);

const authSlice = createSlice( {
  name:"auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state = {...initialState}
      Cookies.remove("token")
    },
    forceLogout: (state, action) => {
      Object.assign(state, initialState)
      state.Error = "We were unable to identify, please login to continue.";
      Cookies.remove("token")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.Error = null;
      })
      .addCase(loginUser.fulfilled, (state, {payload}:{payload: LoginData}) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        const parsedUser = JSON.parse(payload.user)
        state.user = parsedUser
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Error = action.payload?.error ;
      })
      .addCase(verifyUser.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = payload.user
      })
      .addCase(verifyUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
      })
    }
})
export const {logout, forceLogout} = authSlice.actions;
export default authSlice.reducer;
