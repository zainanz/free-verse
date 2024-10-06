import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";


export const loadPost = createAsyncThunk( "post/loadPost", async () => {
    const response = await axios.get("/posts")
    console.log(response.data)
    return response.data.posts

})


export const createPost = createAsyncThunk( "auth/createPost", async (createPostData: CreatePost) => {
  try{
    const sendPost = {
      post: createPostData
    }
    console.log("checking post requests here.")
    const response = await axios.post("/create_post", sendPost)
    return response.data


  } catch(error: any){
      return Promise.reject(error.data.message);
  }

})

type initialState = {
  isLoading: boolean,
  posts: Post[]
}
const initialState: initialState = {
  isLoading: false,
  posts: []
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload.post)
      })
  }
})


export default postSlice.reducer;
