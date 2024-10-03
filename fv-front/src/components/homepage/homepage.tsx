import Card from "../childcomps/card/card"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useCallback, useEffect } from "react"
import axios from '../../axiosInstance';
export default function Home() {

  const FetchPosts = useCallback( () => {
    const response = axios.get("/posts")
  }, [])

  useEffect( () => {
    FetchPosts()
  }, [FetchPosts])
  const auth = useSelector((state: RootState) => state.auth)
  console.log(auth);
  return (
    <div className="container">
      {
        auth.isLoggedIn && (

          <form action="">
        <input type="text" />
        <input type="submit" name="" id="" />
      </form>
      )
      }
      {/* We will display all the psots here */}

    </div>
  )
}
