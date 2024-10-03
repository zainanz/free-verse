import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./components/homepage/homepage"
import Layout from './components/layout/layout';
import Login from './components/form/login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
      </Route>
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
