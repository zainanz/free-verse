import { useCallback, useEffect, useState } from "react"
import { AppDispatch } from "../components/store/store"
import { useDispatch } from "react-redux"
import { getUserProfile } from "../components/store/authSlice";
import { useParams } from "react-router-dom";
import Card from "../components/childcomps/card/card";

export default function Profile(){
  const [userProfile, setUserProfile] = useState<User>()
  const [userPosts, setUserPost] = useState<Post[]>()
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<ProfileParams>();

  const Profile = useCallback( async () => {
    try{
      const res = await dispatch(getUserProfile(params.username!)).unwrap()
      setUserProfile(() => res.user)
      setUserPost( () => res.user_posts)

    }catch(er){

    }
  }, [dispatch, params.username])


  useEffect( () => {
    Profile()
  }, [Profile])

  return (
    <div>
      {
       <h2>{ userProfile?.username}</h2>
      }

      {
        userPosts?.map(post =>   <Card user={userProfile} key={post.id} post={post}/>)
      }
    </div>
  )
}
