import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";

export const Layout = () => {
  const { authUser } = useAuthContext();

  if (!authUser) return <Navigate to="/login" />;

  return (
    <div className="w-full">
      <Header />
      <SideBar />
      <div className="ml-12 mt-14 md:mt-16 md:ml-16 flex-1">
        <Outlet />
      </div>
    </div>
  );
};
