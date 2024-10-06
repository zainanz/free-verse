
declare global{
  // Posts' details > Used when passed to Post components
   type Post = {
    id:number,
    content: string,
    likes: number,
    created_at: Date,
    updated_at: Date,
    user_id: number

  }
  // Used when taking login Username and Password
  type UserLogin = {
    username: string,
    password: string
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
  // User data when returned from the backend
  type LoginData = {
    token?: string,
    message?:string,
    user: string
  }
  // Type of data when stored in Redux
  type UserType = {
    user: User,
    isLoggedIn: boolean,
    isLoading: boolean,
    Error: string | null
  }

  type CreatePost = {
    user_id: number,
    content: string
  }

}

export {};
