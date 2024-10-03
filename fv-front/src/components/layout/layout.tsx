import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
export default function Layout() {
  return (
    <div>
      <div><Navbar/></div>
      <Outlet/>
    </div>
  )
}
