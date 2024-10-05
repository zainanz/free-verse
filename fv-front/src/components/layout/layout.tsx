import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useCallback, useEffect } from "react";
import { verifyUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
export default function Layout() {

  const dispatch = useDispatch<AppDispatch>();

  const checkUser = useCallback( () => {
    dispatch(verifyUser())
  }, [dispatch])

  useEffect( () => {
    checkUser()
  }, [checkUser])

  console.log("layout rendered")
  return (
    <div>
      <div><Navbar/></div>
      <Outlet/>
    </div>
  )
}
