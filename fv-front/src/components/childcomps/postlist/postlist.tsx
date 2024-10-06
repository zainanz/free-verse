import axios from "../../../axiosInstance"
import { Key, useCallback, useEffect, useState } from "react"
import Card from "../card/card"

export default function Postlist(){
  const [posts, setPosts] = useState<Post[]>([])

  const FetchPosts = useCallback( async () => {
    const response = await axios.get("/posts")
    setPosts( () => response.data.posts)
  }, [])

  useEffect( () => {
    FetchPosts()
  }, [FetchPosts])

  const handleLike = () => {

  }

  return (

    <div style={{width:"100%"}} className="w-full flex flex-wrap flex-col  items-center justify-center">
      {
        posts.map( (post: Post, index: Key) => <Card key={index} post={post} onLike={handleLike}/>)
      }
    </div>
  )

}
