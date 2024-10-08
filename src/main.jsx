import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/Statistics.jsx";
import Contact from "./components/Contact/BarChartStats.jsx";
import User from "./components/User/User.jsx";
import Landing from "./components/Landing/Landing.jsx";
// import Github, {githubInfoLoader} from "./components/Github/PieChartStats.jsx";
import PieChartStats from "./components/Github/PieChartStats.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      {/* <Route path="about" element={<Statistics />} /> */}

      {/* further nesting can be done like this for sub routes */}
      {/* <Route path="about" element={<About />}>
        <Route path="subAbout" />{" "}
      </Route> */}
      
      {/* <Route path="contact" element={<Contact />} /> */}
      {/* <Route path="user/:userid" element={<User />} /> */}
      {/* <Route path="github" element={<PieChartStats />} /> */}
      {/* <Route 
      loader={githubInfoLoader}
      path="github" 
      element={<Github />} />*/}
    </Route> 
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
