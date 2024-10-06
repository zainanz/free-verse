import { RootState } from "../store/store"
import { useSelector } from "react-redux"
export default function Navbar(){
  const auth = useSelector((state: RootState )=> state.auth)

  return (
    <>
    <div className="bg-zinc-800 text-white text-5xl items-center flex px-5" style={{height:"3.5rem"}}>
      {
        <p className="my-0 text-lg">{auth.isLoggedIn ?  auth.user.username : <a className="" href="/login">login</a>}</p>
      }
    </div>
    </>
  )
}
