// Components
import Card from "../childcomps/card/card"
import CreatePost from "../childcomps/createpost/createpost"

// React
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useCallback, useEffect, useState } from "react"

// Fetcher
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

  // Handlers

  const handleLike = () => {

  }

  return (
    <div className="container mx-auto">
      {
        auth.isLoggedIn && <CreatePost/>
      }
      {/* We will display all the posts here */}
      <div style={{width:"100%"}} className="w-full flex justify-center my-5">
      {
        posts.map((p, index) => <Card key={index} post={p} onLike={handleLike}/>)
      }
      </div>
    </div>
  )
}
