import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import { AppDispatch } from "../store/store";

export default function Login() {
    const [user, setUser] = useState<UserLogin>({username:"", password: ""});
    const dispatch = useDispatch<AppDispatch>();


   const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({...prev, [e.target.name]: e.target.value}) )
   }

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(user))
   }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleUser} value={user.username} name="username" type="text" placeholder="email or username" id="" />
      <input onChange={handleUser} value={user.password} name="password" type="text" placeholder="password" id="" />
      <input type="submit" value="login"/>
    </form>
  )
}
