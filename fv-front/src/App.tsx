import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./components/homepage/homepage"
import Layout from './components/layout/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
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
