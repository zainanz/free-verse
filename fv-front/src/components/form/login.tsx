import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";


export default function Login() {

  const auth = useSelector((state: RootState) => state.auth)
  const [user, setUser] = useState<UserLogin>({username:"", password: ""});
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();


   const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({...prev, [e.target.name]: e.target.value}) )
   }

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(user))
   }

   useEffect( () => {
    auth.isLoggedIn && navigate("/")
   }, [auth, auth.isLoggedIn, navigate])

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleUser} value={user.username} name="username" type="text" placeholder="email or username" id="" />
      <input onChange={handleUser} value={user.password} name="password" type="password" placeholder="password" id="" />
      <p className="text-warning">{auth.Error}</p>
      <input type="submit" value="login"/>
    </form>
  )
}
