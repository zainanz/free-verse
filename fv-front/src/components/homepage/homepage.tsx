// Components
import CreatePost from "../childcomps/createpost/createpost"

// React
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import Postlist from "../childcomps/postlist/postlist"


export default function Home() {

  const auth = useSelector((state: RootState) => state.auth)

  if (auth.isLoading){
    console.log("loading rendered")
    return (<h1>loading</h1>)
  }

  console.log("homepage rendered")
  return (
    <div className="container mx-auto">

      {
        auth.isLoggedIn && <CreatePost/>
      }

      {/* We will display all the posts here */}
      <Postlist/>
    </div>
  )
}
