import { useEffect } from "react"
import Card from "../card/card"
import { useDispatch, useSelector } from "react-redux"
import { loadPost } from "../../store/postSlice";
import { AppDispatch, RootState } from "../../store/store";

export default function Postlist(){
  const post = useSelector((state: RootState) => state.post)
  const dispatch = useDispatch<AppDispatch>();

  useEffect( () => {
    dispatch(loadPost())
  }, [dispatch])


  return (
    <div style={{width:"100%"}} className="w-full flex flex-wrap flex-col  items-center justify-center">
      {
        post.isLoading ? <h3>Fetching all the posts for you..</h3> :
        post.posts.map( (post: Post) => <Card key={post.id} post={post}/>)
      }
    </div>
  )

}
