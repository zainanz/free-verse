import Card from "../childcomps/card/card"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useCallback, useEffect, useState } from "react"
import axios from '../../axiosInstance';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  const FetchPosts = useCallback( async () => {
    const response = await axios.get("/posts")
    setPosts( () => response.data.posts)
  }, [])

  useEffect( () => {
    FetchPosts()
  }, [FetchPosts])
  const auth = useSelector((state: RootState) => state.auth)
  console.log(auth);
  return (
    <div className="container mx-auto">
      {
        auth.isLoggedIn && (

          <form action="">
        <input type="text" />
        <input type="submit" name="" id="" />
      </form>
      )
      }
      {/* We will display all the posts here */}
      <div style={{width:"100%"}} className="w-full flex justify-center p-5">
      {
        posts.map((p) => <Card post={p} />)
      }
      </div>
    </div>
  )
}
