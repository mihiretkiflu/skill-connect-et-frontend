import { Route, Routes } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import Layout from "./Layout/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import Home from "./pages/Client/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/admin" element={<Layout />}>
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
