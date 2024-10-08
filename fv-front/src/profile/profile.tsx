import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { AppDispatch } from "../components/store/store"
import { useDispatch } from "react-redux"
import { getUserProfile } from "../components/store/authSlice";
import { useParams } from "react-router-dom";
import Card from "../components/childcomps/card/card";

export default function Profile(){
  const [userProfile, setUserProfile] = useState<User>()
  const postStore = useSelector((state:RootState) => state.post)
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<ProfileParams>();

  const Profile = useCallback( async () => {
    try{
      const {user} = await dispatch(getUserProfile(params.username!)).unwrap()
      setUserProfile(() => user)
    }catch(er){

    }
  }, [dispatch, params.username])


  useEffect( () => {
    Profile()
  }, [Profile])

  useEffect( () => {
    console.log(userProfile)
    console.log(postStore.posts)
  }, [userProfile,postStore])


  if(!userProfile){
    return (<h1>loading..</h1>)
  }

  return (
    <div>
      {
       <h2>{ userProfile?.username}</h2>
      }

      {
        postStore.posts.map(post =>   <Card user={userProfile} key={post.id} post={post}/>)
      }
    </div>
  )
}
