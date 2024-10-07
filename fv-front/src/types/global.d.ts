
declare global{

  // User related Type

  // Used when taking login Username and Password
  type UserLogin = {
    username: string,
    password: string
  }
  // User data when returned from the backend
  type LoginData = {
    token?: string,
    message?:string,
    user: string
  }




  // Saved User Data in Redux
  type User = {
    username: string,
    email: string,
    created_at: string,
    updated_at: string,
    jti : string,
    id: number | null
  }
  // Type of data when stored in Redux
  type UserType = {
    user: User,
    isLoggedIn: boolean,
    isLoading: boolean,
    Error: string | null
  }


  // Profile Params
  type ProfileParams = {
    username: string
  }


  // User related Type Ends here

  // Below this are Post related Type

  // Posts' details > Used when passed to Post components
  type Post = {
    id:number,
    content: string,
    likes: number,
    created_at: Date,
    updated_at: Date,
    user_id: number
    user?:{
      id: number,
      username: string
    }
  }

  // Load Post Response
  type LoadDataType = {
    id:number,
    type: string,
    attributes: Post
  }

  type LoadPost = {
    posts:{
      data: LoadDataType[]
    }
  }

  // Required Data Type when creating content > Collects user_id and content to send to the backend
  type CreatePost = {
    user_id: number,
    content: string
  }
  type createPostActionType = {


      payload:{
        post: Post
      }

  }

  // need Post_ID and updatedContent to send patch request for back end
  type UpdatePost = {
    updatedContent: string,
    post_id: number
  }
  // Patch Response after UpdatePost
  type UpdatedPostResponse = {
    message: string,
    status: string,
    post: Post
  }


  // Post Related Type Ends here
}

export {};
