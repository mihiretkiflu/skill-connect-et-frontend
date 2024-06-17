import { Route, Routes } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import Layout from "./Layout/Layout";
import AuthWrapper from "./components/AuthWrapper";
import Clients from "./pages/Admin/Clients";
import Dashboard from "./pages/Admin/Dashboard";
import Freelancer from "./pages/Admin/Freelalncer";
import JobCategory from "./pages/Admin/JobCategory";
import Jobs from "./pages/Admin/Jobs";
import Skills from "./pages/Admin/Skills";
import Chat from "./pages/Client/Client/Chat";
import FindFreelancer from "./pages/Client/Client/FindFreelancer";
import MyJobs from "./pages/Client/Client/MyJobs";
import PostProject from "./pages/Client/Client/PostProject";
import ContractDetail from "./pages/Client/Freelancer/ContractDetail";
import CreateProfile from "./pages/Client/Freelancer/FillProfile";
import FindWork from "./pages/Client/Freelancer/FindWork";
import MyContractOffers from "./pages/Client/Freelancer/MyContractOffers";
import ViewFreelancerProfile from "./pages/Client/Freelancer/ViewFreelancerProfile";
import WorkDetail from "./pages/Client/Freelancer/WorkDetail";
import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import SignUp from "./pages/Client/SignUp";
import { useSelector } from "react-redux";
import MyContracts from "./pages/Client/Client/MyContracts";
import MyProfile from "./pages/Client/MyProfile";
import PaymentSuccess from "./pages/Client/PaymentSuccess";

function App() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route element={<AuthWrapper />}>
        {" "}
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-profile" element={<MyProfile />} />

          <Route path="/find-work">
            <Route path="" element={<FindWork />} />
            <Route path=":id" element={<WorkDetail />} />
          </Route>
          <Route path="/profile">
            <Route path=":id/:name" element={<ViewFreelancerProfile />} />
          </Route>
          <Route path="/find-freelancer" element={<FindFreelancer />} />
          <Route path="/post-project" element={<PostProject />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/messages" element={<Chat />} />
          <Route path="/my-contracts">
            <Route
              path=""
              element={
                currentUser?.role === "freelance" ? (
                  <MyContractOffers />
                ) : (
                  <MyContracts />
                )
              }
            />
            <Route path=":id" element={<ContractDetail />} />
          </Route>
          <Route path="/my-jobs" element={<MyJobs />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="freelancers" element={<Freelancer />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="job-category" element={<JobCategory />} />
          <Route path="job-sub-category" element={<Dashboard />} />
          <Route path="Skills" element={<Skills />} />
        </Route>
        <Route path="/payment-success/:tx_no" element={<PaymentSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
