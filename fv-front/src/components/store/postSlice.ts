import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";
import { getUserProfile } from "./authSlice";


export const likePost = createAsyncThunk( "post/likePost", async (post_id: number) => {
  try {
    const res = await axios.get(`/like_post/${post_id}`)
    return res.data.post_id
  } catch (er) {
    return er
  }
})

export const unlikePost = createAsyncThunk( "post/unlikePost", async (post_id:number) => {
  try {
    const res = await axios.delete(`/unlike_post/${post_id}`)
    return res.data.post_id
  } catch (er) {
    return er
  }
})

export const loadPost = createAsyncThunk( "post/loadPost", async () => {
    const { data }:{data: LoadPost} = await axios.get("/posts")
    console.log(data)
    return data
})


export const createPost = createAsyncThunk( "post/createPost", async (createPostData: CreatePost) => {
  try{
    const sendPost = {
      post: createPostData
    }
    const response = await axios.post("/create_post", sendPost)
    return response.data

  } catch(error: any){
      return Promise.reject(error.data.message);
  }

})

export const updatePost = createAsyncThunk( "post/updatePost", async (postDetails: UpdatePost) => {
  try {
    const post = {
      post: postDetails
    }
    const response = await axios.patch("/update_post", post)
    return response.data
  }catch(er){

  }
})

const initialState: iniState = {
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
      .addCase(loadPost.fulfilled, (state, {payload}:{payload: LoadPost}) => {
        state.isLoading = false;
        const retrievedAttributes = payload.posts.data.map( (p: LoadDataType) => (p.attributes))
        state.posts = retrievedAttributes.reverse()
      })
      .addCase(createPost.fulfilled, (state, action: createPostActionType) => {
        console.log("hihihi", action);
        state.posts.unshift(action.payload.post)
      })
      .addCase(updatePost.fulfilled, (state, {payload}: {payload: UpdatedPostResponse} ) => {
        const index = state.posts.findIndex((post: Post) => post.id === payload.post.id);
        if (index !== -1) {
          state.posts[index] = {...state.posts[index], content: payload.post.content} ;
        }
        console.log("Updated ", state.posts[index])
      })
      .addCase(likePost.fulfilled, (state, {payload}) => {
        const post_id = parseInt(payload, 10)
        for(let i = 0; i < state.posts.length; i++ ){
          if(state.posts[i].id === post_id){
            state.posts[i].post_liked_by_current_user = true;
            state.posts[i].likes++;
            break;
          }
        }
      })
      .addCase(unlikePost.fulfilled, (state, {payload}) => {
        const post_id = parseInt(payload, 10)
        for(let i = 0; i < state.posts.length; i++ ){
          if(state.posts[i].id === post_id){
            state.posts[i].post_liked_by_current_user = false;
            state.posts[i].likes--;
            break;
          }
        }
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.posts = action.payload.user_posts.data.map( (post: LoadDataType) => post.attributes)
      })
  }
})


export default postSlice.reducer;
