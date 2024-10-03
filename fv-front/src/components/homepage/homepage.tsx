// import Card from "../childcomps/card/card"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
export default function Home() {
  const auth = useSelector((state: RootState) => state.auth)
  console.log(auth);
  return (
    <div className="container">
      {
      <form action="">
        <input type="text" />
        <input type="submit" name="" id="" />
      </form>
      }
    </div>
  )
}
