import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const auth = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<UserLogin>({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  useEffect(() => {
    auth.isLoggedIn && navigate("/");
  }, [auth, auth.isLoggedIn, navigate]);

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="login-form bg-zinc-800 flex flex-col"
        onSubmit={handleSubmit}
      >
        <h3>Login</h3>
        <input
          onChange={handleUser}
          value={user.username}
          name="username"
          type="text"
          placeholder="Email or username"
          id=""
        />
        <input
          onChange={handleUser}
          value={user.password}
          name="password"
          type="password"
          placeholder="Password"
          id=""
        />
        {auth.Error && <p>{auth.Error}</p>}
        <div>
          <a href="#">Forgot password</a>
        </div>
        <input type="submit" value="login" />
        <a className="secondary-form-btn" href="#">
          Create account
        </a>
      </form>
    </div>
  );
}
