
declare global{
   type Post = {
    id:number,
    content: string,
    likes: number,
    created_at: Date

  }
  type UserLogin = {
    username: string,
    password: string
  }

  type User = {
    username: string,
    email: string,
    token: string
  }

}

export {};
