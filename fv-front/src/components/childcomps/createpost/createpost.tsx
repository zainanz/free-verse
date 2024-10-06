import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../store/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function CreatePost(){
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth)
  const [content, setContent] = useState("")


  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if(auth.isLoggedIn){
      try {
        if (auth.user.id){
          const createPostData: CreatePost = {
            user_id: auth.user.id,
            content
          }
         const context =  await dispatch(createPost(createPostData)).unwrap()
        } else {
          throw new Error("Invalid User. Please login to continue.")
        }
      } catch(er){
        console.log(auth)
        navigate("/login")

      }
    }
  }
  return ( <div className="border flex justify-center my-9">

    <form onSubmit={handleCreatePost} className="bg-zinc-900 flex flex-col p-6 rounded items-end" style={{width:"30rem"}} action="">
      <div className="flex w-full">
        <img className="rounded-full circle mr-2" alt="D" style={{ width:'3rem', height:"3rem"}} src="./logo512.png"></img>
        <input name="content" onChange={(e) => setContent(prev => e.target.value)} value={content} type="text" style={{height:"3rem"}} placeholder="Write your story.." className="mb-3 w-full border-none bg-zinc-400 px-3 rounded"/>
      </div>
      <input type="submit" className="bg-zinc-800 text-white font-bold border-none" value="Post" name="" style={{width:"5rem"}} id="" />
    </form>
  </div>)
}
