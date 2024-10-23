import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  let hidden = true;
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const dropDownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    console.log(dropDownRef.current);
    if (hidden) {
      dropDownRef.current!.classList.remove("hidden");
    } else {
      dropDownRef.current!.classList.add("hidden");
    }
    hidden = !hidden;
  };

  const handleProfileView = () => {
    toggleDropDown();
    navigate(auth.user.username);
  };

  const logoutUser = () => {
    dispatch(logOut());
    toggleDropDown();
  };

  return (
    <>
      <div
        className="bg-zinc-800 text-white text-5xl items-center flex px-5 fixed w-full"
        style={{ height: "3.5rem" }}
      >
        {auth.isLoggedIn ? (
          <div className="my-0 text-lg w-full flex justify-between items-center">
            <p>{auth.user.username}</p>
            <p
              onClick={toggleDropDown}
              className="text-3xl hover:opacity-50 cursor-pointer"
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </p>
          </div>
        ) : (
          <div className="my-0 text-lg">
            <a className="" href="/login">
              login
            </a>
          </div>
        )}
        <div
          ref={dropDownRef}
          style={{ right: ".5rem", top: "4rem", width: "7rem" }}
          className="absolute bg-zinc-300 hidden"
        >
          <ul
            style={{ listStyle: "none" }}
            className="mx-0 px-3 flex items-center flex-col text-black text-base"
          >
            <li
              onClick={handleProfileView}
              className="my-3 hover:bg-zinc-400 w-full h-full text-center cursor-pointer"
            >
              Profile
            </li>
            <li
              onClick={logoutUser}
              className="my-3 hover:bg-zinc-400 w-full h-full text-center cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
