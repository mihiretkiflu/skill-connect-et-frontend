import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import FindFreelancer from "./pages/Client/Client/FindFreelancer";
import PostProject from "./pages/Client/Client/PostProject";
import FindWork from "./pages/Client/Freelancer/FindWork";
import WorkDetail from "./pages/Client/Freelancer/WorkDetail";
import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import SignUp from "./pages/Client/SignUp";
import ViewFreelancerProfile from "./pages/Client/Freelancer/ViewFreelancerProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/find-work">
          <Route path="" element={<FindWork />} />
          <Route path=":id" element={<WorkDetail />} />
        </Route>
        <Route path="/profile">
          <Route path=":id/:name" element={<ViewFreelancerProfile />} />
        </Route>
        <Route path="/find-freelancer" element={<FindFreelancer />} />
        <Route path="/post-project" element={<PostProject />} />
      </Route>
      <Route path="/admin" element={<Layout />}>
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
